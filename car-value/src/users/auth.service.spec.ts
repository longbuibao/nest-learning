import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from '../users/user.entity';

describe('AuthService', () => {
  let service: AuthService;

  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    //create fake copy of user service
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filterdUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filterdUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999),
          email,
          password,
        };
        users.push(user);

        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('create a new user with hased password', async () => {
    const user = await service.signup('test@gmail.com', 'asdf');
    expect(user.password).not.toEqual('asdf');

    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throw an error if user signs up with a email that in use', async () => {
    await service.signup('uyo@gmail.com', '11011010');
    try {
      await service.signup('uyo@gmail.com', '11011010');
    } catch (e) {
      expect(e.toString()).toMatch('Email in use');
    }
  });

  it('throw if signin is called with an unused email', (done) => {
    service.signin('asdf@gmail.com', '11011010').catch((e) => done());
  });

  it('throw if an invalid password was provided', async () => {
    await service.signup('longbui@gmail.com', '11011010');
    try {
      await service.signin('longbui@gmail.com', '11011010a');
    } catch (e) {
      expect(JSON.stringify(e)).toMatch('Bad password');
    }
  });

  it('return a user if the password is good', async () => {
    await service.signup('asdf@gmail.com', '11011010');
    const user = await service.signin('asdf@gmail.com', '11011010');
    expect(user).toBeDefined();
  });
});
