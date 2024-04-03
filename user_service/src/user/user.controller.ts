import { Controller, Get, Logger } from '@nestjs/common';
import {
  GetUserRequest,
  User,
  UserServiceController,
  UserServiceControllerMethods,
} from '../proto/user/user';

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  text1 = this.generateRandomString(2000000);
  text2 = this.generateRandomString(2000000);

  getUser(request: GetUserRequest): Promise<User> {
    const item: User = {
      id: this.text2,
      name: this.text1,
      isActive: true,
    };
    return Promise.resolve(item);
  }

  generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  @Get('rest')
  getRestOrders() {
    const item: User = {
      id: this.text2,
      name: this.text1,
      isActive: true,
    };
    return Promise.resolve(item);
  }
}
