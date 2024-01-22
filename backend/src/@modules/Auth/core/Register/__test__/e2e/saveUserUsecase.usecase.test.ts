import dataSource from '@modules/shared/infra/database/datasource';
import { saveUserUsecase } from '../../usecase/saveUserUsecase.usecase';
import { RegisterRpositoryTypeOrm } from '@modules/Auth/infra/Register/repository/registerRepositoryTypeOrm.orm';
import { RegisterGateway } from '@modules/Auth/infra/Register/gateway/registerGatewayLocal.local';
import { UserModel } from '@modules/Auth/infra/database/models/userModel.model';
import { registerEmailQueueMemory } from '@modules/Auth/infra/Register/queue/registerEmailQueue.memory.rabbitmq';

let repo: RegisterRpositoryTypeOrm;
let gateway: RegisterGateway;
let emailGateway: registerEmailQueueMemory;
describe('Deve testar o saveUserUsecase', () => {
  beforeAll(async () => {
    repo = new RegisterRpositoryTypeOrm(dataSource);
    gateway = new RegisterGateway(dataSource);
    emailGateway = new registerEmailQueueMemory();
    await dataSource.initialize();
  });
  afterAll(async () => {
    await dataSource.destroy();
  });
  test('Deve criar um usuario', async () => {
    const action = new saveUserUsecase(repo, gateway, emailGateway);
    const user = {
      name: 'joão Pedro Leseux',
      cpf: '288.784.925-58',
      email: 'usuario98@email.com',
      password: '123456',
    };
    await action.execute(user);
    const userDb = await dataSource
      .getRepository(UserModel)
      .createQueryBuilder()
      .where(' email = :email', { email: user.email })
      .getOne();

    expect(userDb.email).toBe(user.email);
    expect(userDb.name).toBe(user.name);
    expect(userDb.cpf).toBe('28878492558');

    await dataSource
      .createQueryBuilder()
      .delete()
      .from(UserModel)
      .where('uuid = :uuid', { uuid: userDb.uuid })
      .execute();
  });
  test('Deve emitir um erro de cpf inválido', async () => {
    const action = new saveUserUsecase(repo, gateway, emailGateway);
    const user = {
      name: 'joão Pedro Leseux',
      cpf: '169.055.640-49',
      email: 'usuario01@email.com',
      password: '123456',
    };
    await expect(async () => {
      await action.execute(user);
    }).rejects.toThrow('Cpf inválido');
  });
  test('Deve emitir um erro de email inválido', async () => {
    const action = new saveUserUsecase(repo, gateway, emailGateway);
    const user = {
      name: 'joão Pedro Leseux',
      cpf: '169.055.640-44',
      email: 'joaopleseux#gmail.com',
      password: '123456',
    };
    await expect(async () => {
      await action.execute(user);
    }).rejects.toThrow('Email inválido');
  });
  test('Deve emitir um erro de email já cadastrado no banco de dados', async () => {
    const action = new saveUserUsecase(repo, gateway, emailGateway);
    const user = {
      name: 'joão Pedro Leseux',
      cpf: '169.055.640-44',
      email: 'usuario02@email.com',
      password: '123456',
    };
    await expect(async () => {
      await action.execute(user);
    }).rejects.toThrow('Email já existe');
  });
  test('Deve emitir um erro de email já cadastrado no banco de dados mas a conta não foi verificada', async () => {
    const action = new saveUserUsecase(repo, gateway, emailGateway);
    const user = {
      name: 'joão Pedro Leseux',
      cpf: '169.055.640-44',
      email: 'usuario01@email.com',
      password: '123456',
    };
    await expect(async () => {
      await action.execute(user);
    }).rejects.toThrow(
      'Você ja cadastrou sua conta, mas ainda não a verificou,  use o toke de autenticação para verifica-lá',
    );
  });
});
