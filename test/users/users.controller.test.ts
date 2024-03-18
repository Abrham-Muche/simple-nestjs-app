import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../src/users/users.controller';
import { BadRequestException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a invalid uuid', async () => {
    const result = await controller.getUserById('test-invalid-uuid-id');
    expect(result).toThrow(BadRequestException);
  });
});
