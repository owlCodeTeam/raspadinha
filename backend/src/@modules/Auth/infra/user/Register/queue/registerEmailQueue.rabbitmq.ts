import { userRepositoryInterface } from '@modules/Auth/core/user/Register/userRepositoryInterface.interface';
import { emailOptions } from '@modules/Auth/core/user/Register/RegisterEmailQueue.queue.interface';
import * as amqplib from 'amqplib';
import { RegisterEmailQueueInterface } from '@modules/Auth/core/user/Register/RegisterEmailQueue.queue.interface';
export class RegisterEmailQueue implements RegisterEmailQueueInterface {
  private exchangeName = 'emails';

  constructor(
    readonly channel: amqplib.Channel,
    readonly repo: userRepositoryInterface,
  ) {}
  async sendEmail(email: emailOptions): Promise<void> {
    const message = Buffer.from(JSON.stringify(email));
    this.channel.sendToQueue(this.exchangeName, message);
  }
}
