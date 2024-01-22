import { UserModel } from '../models/userModel.model';
import * as bcryptjs from 'bcryptjs';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const repo = dataSource.getRepository(UserModel);
    await repo.createQueryBuilder('users').delete().execute();
    const password = await bcryptjs.hash('123456', 10);
    const users = [
      {
        uuid: '018979ce-6b9e-403a-adcb-3fb537c67b16',
        name: 'Usuário teste 01',
        cpf: '00000000001',
        email: 'usuario01@email.com',
        password,
      },
      {
        uuid: '028979ce-6b9e-403a-adcb-3fb537c67b16',
        name: 'Usuário teste 02',
        cpf: '00000000002',
        email: 'usuario02@email.com',
        password,
        is_verify: true,
      },
    ];
    await repo.insert(users);
  }
}
