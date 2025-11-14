import { Test, TestingModule } from '@nestjs/testing';
import { PontosDescarteController } from './pontos-descarte.controller';

describe('PontosDescarteController', () => {
  let controller: PontosDescarteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PontosDescarteController],
    }).compile();

    controller = module.get<PontosDescarteController>(PontosDescarteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
