import { Test, TestingModule } from '@nestjs/testing';
import { AplicacionesService } from './aplicaciones.service';

describe('AplicacionesService', () => {
  let service: AplicacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AplicacionesService],
    }).compile();

    service = module.get<AplicacionesService>(AplicacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
