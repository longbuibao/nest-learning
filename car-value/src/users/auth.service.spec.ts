import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;

  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    //create fake copy of user service
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({
          id: 1,
          email,
          password,
        }),
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

  it('throw an error if user signs up with a email that in use', (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'asdf@gmail.com', password: '11011010' },
      ]);

    service.signup('asdf@asdf.com', 'asdf').catch((e) => done());
  });

  it('throw if signin is called with an unused email', (done) => {
    service.signin('asdf@gmail.com', '11011010').catch((e) => done());
  });
});
