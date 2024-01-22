import { userEntity } from '@modules/Auth/core/Register/entity/userEntity.entity';
import { userRepositoryInterface } from '@modules/Auth/core/Register/userRepositoryInterface.interface';
import { DataSource } from 'typeorm';
import { UserModel } from '../../database/models/userModel.model';

export class RegisterRpositoryTypeOrm implements userRepositoryInterface {
  constructor(readonly dataSource: DataSource) {}
  async saveUser(user: userEntity): Promise<userEntity> {
    this.dataSource
      .createQueryBuilder()
      .insert()
      .into(UserModel)
      .values([
        {
          uuid: user.uuid(),
          email: user.email(),
          name: user.name(),
          password: user.password(),
          cpf: user.cpf(),
        },
      ])
      .execute();
    return user;
  }
  async getUserByEmail(email: string): Promise<userEntity> {
    const userDb = await this.dataSource
      .getRepository(UserModel)
      .createQueryBuilder()
      .where('email = :email', { email: email })
      .getOne();
    const responseUser = new userEntity(userDb);
    return responseUser;
  }
  async getUserByUuid(uuid: string): Promise<userEntity> {
    const userDb = await this.dataSource
      .getRepository(UserModel)
      .createQueryBuilder()
      .where('uuid = :uuid', { uuid: uuid })
      .getOne();
    const responseUser = new userEntity(userDb);
    return responseUser;
  }
}
