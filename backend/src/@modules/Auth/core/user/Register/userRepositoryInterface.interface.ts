import { userEntity } from './entity/userEntity.entity';

export interface userRepositoryInterface {
  saveUser(user: userEntity): Promise<userEntity>;
  getUserByUuid(uuid: string): Promise<userEntity>;
  getUserByEmail(email: string): Promise<userEntity>;
}
