import { Test, TestingModule } from '@nestjs/testing';
import { CiteController } from './cite.controller';

describe('CiteController', () => {
  let controller: CiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CiteController],
    }).compile();

    controller = module.get<CiteController>(CiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
