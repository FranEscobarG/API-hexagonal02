import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class LoginUserUseCase {
  constructor(readonly userRepository: UserRepository) { }

  async run(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.userRepository.login(email, password);
      return user;
    } catch (error) {
      return null;
    }
  }
}
