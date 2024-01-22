import { RegisterGateway } from '@modules/Auth/infra/Register/gateway/registerGatewayLocal.local';
import { userRepositoryInterface } from '../userRepositoryInterface.interface';
import { userEntity } from '../entity/userEntity.entity';
import { apiError } from '../../../../../http/helpers/api-Error.helper';
import { randomUUID } from 'crypto';
import { RegisterEmailQueueInterface } from '../RegisterEmailQueue.queue.interface';

export type saveUserInput = {
  email: string;
  cpf: string;
  name: string;
  password: string;
};
export class saveUserUsecase {
  constructor(
    readonly repo: userRepositoryInterface,
    readonly gateway: RegisterGateway,
    readonly emailGateway: RegisterEmailQueueInterface,
  ) {}
  public async execute(user: saveUserInput): Promise<userEntity> {
    const userDb: userEntity = await this.repo.getUserByEmail(user.email);
    if ((await this.gateway.validateCpf_cnpj(user.cpf)) === false) {
      throw new apiError('Cpf inválido', 400, 'invalid_item');
    } else if ((await this.gateway.validateEmail(user.email)) === false) {
      throw new apiError('Email inválido', 400, 'invalid_item');
    } else if (userDb && userDb.is_verify() === true) {
      throw new apiError('Email já existe', 400, 'invalid_item');
    } else if (userDb && userDb.is_verify() === false) {
      throw new apiError(
        'Você ja cadastrou sua conta, mas ainda não a verificou,  use o toke de autenticação para verifica-lá',
        401,
        'item_already_exist',
      );
    }
    const userInput = new userEntity({
      cpf: user.cpf,
      email: user.email,
      password: await this.gateway.encryptPassword(user.password),
      name: user.name,
      uuid: randomUUID(),
    });
    const token = await this.gateway.tokenGenerate(userInput);
    const emailContent = {
      from: process.env.EMAILADMIN,
      to: user.email,
      subject: 'Verificação de conta',
      text: 'Clique no botão abaixo e será redirecionado para o site.',
      html: `<a href='http://localhost:9000/#/verify-account/${user.email}/${token}'><button style='font-size: 16px; font-weight: 600; padding: 1vh 1vw; cursor: pointer;border-radius: 1vh; color: #fff; background-color: #303f9f; border: none;'>Clique aqui!</button></a>`,
    };
    await this.emailGateway.sendEmail(emailContent);
    return await this.repo.saveUser(userInput);
  }
}
