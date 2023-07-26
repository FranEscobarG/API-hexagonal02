import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class CreateUserUseCase {
  constructor(readonly userRepository: UserRepository) { }

  async run(
    name: string,
    lastname: string,
    email: string,
    phone: string,
    password: string
  ): Promise<User | null> {
    try {
      const user = await this.userRepository.createUser(
        name,
        lastname,
        email,
        phone,
        password
      );
      return user;
    } catch (error) {
      return null;
    }
  }
}
