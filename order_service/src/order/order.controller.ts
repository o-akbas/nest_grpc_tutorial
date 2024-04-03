import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('grpc')
  getOrders() {
    return this.orderService.getOrders('userId1');
  }

  @Get('rest')
  getRestOrders() {
    return this.orderService.getRestOrder('userId1');
  }
}
