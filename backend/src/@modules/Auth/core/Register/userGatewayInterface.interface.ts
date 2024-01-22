import { userEntity } from './entity/userEntity.entity';

export interface userGatewayInterface {
  validateCpf_cnpj(input: string): Promise<boolean>;
  validateEmail(email: string): Promise<string | boolean>;
  encryptPassword(password: string): Promise<string>;
  tokenGenerate(input: userEntity): Promise<string>;
  tokenDecoding(token: string): Promise<any>;
}
