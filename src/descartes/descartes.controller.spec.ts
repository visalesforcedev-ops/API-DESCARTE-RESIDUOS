import { Test, TestingModule } from '@nestjs/testing';
import { DescartesController } from './descartes.controller';

describe('DescartesController', () => {
  let controller: DescartesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DescartesController],
    }).compile();

    controller = module.get<DescartesController>(DescartesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
