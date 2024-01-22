import { RegisterEmailQueueInterface, emailOptions } from '@modules/Auth/core/user/Register/RegisterEmailQueue.queue.interface';

export class registerEmailQueueMemory implements RegisterEmailQueueInterface {
  async sendEmail(email: emailOptions): Promise<void> {}
}
