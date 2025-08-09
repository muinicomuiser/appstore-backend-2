import { Test, TestingModule } from '@nestjs/testing';
import { AplicacionesController } from './aplicaciones.controller';

describe('AplicacionesController', () => {
  let controller: AplicacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AplicacionesController],
    }).compile();

    controller = module.get<AplicacionesController>(AplicacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
