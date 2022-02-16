import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: string) => {
        const idNum: number = +id;
        return Promise.resolve({
          id: idNum,
          email: 'blong1102@gmail.com',
          password: '11011010',
        });
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: '111lfkjhdfl' }]);
      },
      // remove: (id: string) => {
      //   return Promise.resolve({
      //     id: 1,
      //     email: 'hello@gmail.com',
      //     password: '111ldskfh',
      //   });
      // },
      // update: (id: string) => {},
    };
    fakeAuthService = {
      // signup: function () {},
      signin: function (email: string, password: string) {
        return Promise.resolve({
          id: 1,
          email: 'blong1102@gmail.com',
          password: 'ldfjldfj',
        });
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find all users with given email', async () => {
    const users = await controller.findAllUsers('asdf@gmail.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@gmail.com');
  });

  it('find one user with a given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('throw an error if given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    const user = await controller.findUser('1');
    expect(user).toBeNull();
  });

  it('sign in, update session object, return a user', async () => {
    const sesssion = {
      userId: -1,
    };

    const user = await controller.signin(
      {
        email: 'lfjdlf@gmail.com',
        password: '11011010',
      },
      sesssion,
    );

    expect(user.id).toEqual(1);
    expect(sesssion.userId).toEqual(1);
  });
});
