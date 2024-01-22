import { emailOptions } from "@modules/auth/core/login/LoginEmailQueue.queue.interface";
import * as amqplib from "amqplib";
import { RegisterRepostioryInterface } from "@modules/auth/core/registerUser/registerRepository.interface";
import { RegisterEmailQueueInterface } from "@modules/auth/core/registerUser/RegisterEmailQueue.queue.interface";
export class RegisterEmailQueue implements RegisterEmailQueueInterface {
  private exchangeName = "emails";

  constructor(
    readonly channel: amqplib.Channel,
    readonly repo: RegisterRepostioryInterface,
  ) {}
  async sendEmail(email: emailOptions): Promise<void> {
    const message = Buffer.from(JSON.stringify(email));
    this.channel.sendToQueue(this.exchangeName, message);
  }
}
