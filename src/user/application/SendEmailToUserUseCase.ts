import { UserRepository } from "../domain/UserRepository";

export class SendEmailToUserUseCase {
  constructor(readonly userRepository: UserRepository) { }

  async run(email: string, subject: string, content: string): Promise<boolean> {
    try {
      const success = await this.userRepository.sendEmailToUser(email, subject, content);
      return success;
    } catch (error) {
      return false;
    }
  }
}
