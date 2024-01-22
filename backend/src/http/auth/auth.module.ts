import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RegisterEmailQueue } from '@modules/Auth/infra/Register/queue/registerEmailQueue.rabbitmq';
require('dotenv').config();
import * as amqplib from 'amqplib';
import { RegisterRpositoryTypeOrm } from '@modules/Auth/infra/Register/repository/registerRepositoryTypeOrm.orm';
import { rejects } from 'assert';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RegisterGatewayLocal } from '@modules/Auth/infra/Register/gateway/registerGatewayLocal.local';
import { ConsumeEmailService } from './consumeEmailsService.service';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: RegisterRpositoryTypeOrm,
      useFactory: (dataSource: DataSource) => {
        return new RegisterRpositoryTypeOrm(dataSource);
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: RegisterGatewayLocal,
      useFactory: (dataSource: DataSource) => {
        return new RegisterGatewayLocal(dataSource);
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: RegisterEmailQueue,
      useFactory: async (repo: RegisterRpositoryTypeOrm) => {
        const connection = await amqplib.connect(process.env.RABBITMQ_URL);
        connection.once('error', (error) => {
          console.log('Deu Erro - connection', error);
        });
        const channel = await connection.createChannel();
        channel.on('error', (error) => {
          console.log('Deu Erro - channel', error);
          rejects(error);
        });
        channel.prefetch(1);
        const queue = new RegisterEmailQueue(channel, repo);
        return queue;
      },
      inject: [RegisterRpositoryTypeOrm],
    },
    ConsumeEmailService,
  ],
})
export class AuthModule {}
