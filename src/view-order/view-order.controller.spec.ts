import { Test, TestingModule } from '@nestjs/testing';
import { ViewOrderController } from './view-order.controller';
import { ViewOrderService } from './view-order.service';

describe('ViewOrderController', () => {
  let controller: ViewOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViewOrderController],
      providers: [ViewOrderService],
    }).compile();

    controller = module.get<ViewOrderController>(ViewOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
