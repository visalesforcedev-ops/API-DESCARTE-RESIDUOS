import { Test, TestingModule } from '@nestjs/testing';
import { DescartesService } from './descartes.service';

describe('DescartesService', () => {
  let service: DescartesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DescartesService],
    }).compile();

    service = module.get<DescartesService>(DescartesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
