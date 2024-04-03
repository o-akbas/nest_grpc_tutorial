import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UserServiceClient } from '../proto/user/user';
import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class OrderService implements OnModuleInit {
  private logger = new Logger(OrderService.name);

  private userServiceClient: UserServiceClient;

  constructor(
    @Inject('USER_PACKAGE')
    private grpcClient: ClientGrpc,
    private readonly httpService: HttpService,
  ) {}

  onModuleInit() {
    this.userServiceClient =
      this.grpcClient.getService<UserServiceClient>('UserService');
  }

  async getRestOrder(userId: string) {
    const url = 'http://localhost:4000/rest'; // USER SERVICE IP

    return await firstValueFrom(
      this.httpService.get(url).pipe(
        map((response) => {
          return response.data;
        }),
        catchError((error) => {
          throw new Error('Failed to fetch permissions: ' + error);
        }),
      ),
    );
  }

  async getOrders(userId: string) {
    const user = await firstValueFrom(
      this.userServiceClient.getUser({ id: userId }),
    );

    return user;
  }
}
