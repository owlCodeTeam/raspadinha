require('dotenv').config();
import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { UserModel } from '@modules/Auth/infra/user/database/models/userModel.model';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_DEFAULT_DRIVER as any,
      host: process.env.DB_DEFAULT_HOST,
      port: process.env.DB_DEFAULT_PORT as any,
      database: process.env.DB_DEFAULT_NAME,
      username: process.env.DB_DEFAULT_USENAME,
      schema: process.env.DB_DEFAULT_SCHEMA ?? 'public',
      password: process.env.DB_DEFAULT_PASSWORD,
      entities: [
        //auth
        UserModel,
      ],
    }),
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://admin:admin@rabbitmq:5672',
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
