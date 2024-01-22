import { RegisterEmailQueueInterface, emailOptions } from '@modules/Auth/core/Register/RegisterEmailQueue.queue.interface';

export class registerEmailQueueMemory implements RegisterEmailQueueInterface {
  async sendEmail(email: emailOptions): Promise<void> {}
}
