import { Test, TestingModule } from '@nestjs/testing';
import { PontosDescarteService } from './pontos-descarte.service';

describe('PontosDescarteService', () => {
  let service: PontosDescarteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PontosDescarteService],
    }).compile();

    service = module.get<PontosDescarteService>(PontosDescarteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
