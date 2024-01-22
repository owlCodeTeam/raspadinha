import { RegisterEmailQueueInterface, emailOptions } from "@modules/auth/core/registerUser/RegisterEmailQueue.queue.interface";

export class registerEmailQueueMemory implements RegisterEmailQueueInterface {
  async sendEmail(email: emailOptions): Promise<void> {}
}
