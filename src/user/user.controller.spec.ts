import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { SendgridService } from '../sendgrid.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    createUser: jest.fn().mockImplementation((dto) => {
      return {
        _id: 'mockId',
        ...dto,
      };
    }),
    getUser: jest.fn().mockImplementation((id) => {
      return {
        _id: id,
        email: 'test@example.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
      };
    }),
  };

  const mockSendgridService = {
    send: jest.fn(),
  };

  const mockClientProxy = {
    send: jest.fn(),
  };

  const mockModel = {
    new: jest.fn().mockReturnThis(),
    save: jest.fn().mockResolvedValue({
      _id: 'mockId',
      email: 'test@example.com',
      password: 'password',
      firstName: 'John',
      lastName: 'Doe',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: SendgridService,
          useValue: mockSendgridService,
        },
        {
          provide: 'SUBSCRIBERS_SERVICE',
          useValue: mockClientProxy,
        },
        {
          provide: getModelToken(User.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should create a user', async () => {
    const createUserDto = {
      email: 'test@example.com',
      name: 'John',
    };

    const result = await controller.createUser(createUserDto);

    expect(result).toEqual({
      _id: 'mockId',
      email: 'test@example.com',
      name: 'John',
    });

    expect(mockUserService.createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('should get a user', async () => {
    const userId = 'mockId';

    const result = await controller.getUser(userId);

    expect(result).toEqual({
      _id: userId,
      email: 'test@example.com',
      password: 'password',
      firstName: 'John',
      lastName: 'Doe',
    });
    expect(mockUserService.getUser).toHaveBeenCalledWith(userId);
  });
});
