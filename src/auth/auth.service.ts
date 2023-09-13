import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isUserPassword = this.usersService.checkUserPassword(
        pass,
        user.password,
      );
      if (isUserPassword) {
        return user;
      }
    }
    return null;
  }
}
