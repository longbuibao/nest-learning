# Inversion of Control

> Pipe -> MessagesController -> MessagesService -> MessagesRepository

- The **_service_** depends upon the **_repository_** to work correctly, If that **_repository_** does not exist, our **_service_** would not work correctly.
- Likewise, the **_controller_** depends upon the **_service_**, if the **_service_** did not exist, the **_controller_** would not work.
  > _Classes should not create instances of its dependencies on its own_

**BAD CODE**

```ts
export class MessagesService {
  messageRepo: MessagesRepository
  constructor() {
    this.messagesRepo = new MessagesRepository()
  }
}
```

**BETTER**
`MessagesService` _receives_ its dependency

```ts
export class MessagesService {
  messageRepo: MessagesRepository
  constructor(repo: MessagesRepository) {
    this.messagesRepo = repo
  }
}
```

The downside to messaging service is that it always relies upon specifically a copy of `MessagesRepository` being passed into the constructor. So we always have to create specifically messages repository.

**BEST**
`MessagesService` _receives_ its dependency, and it doesn't specifically require `MessagesRepository`.

```ts
interface Repository {
  findOne(id: string)
  findAll()
  create(content: string)
}
export class MessagesService {
  messageRepo: Repository
  constructor(repo: Repository) {
    this.messagesRepo = repo
  }
}
```

# Why the _Good_ case is good

In production

```ts
class MessagesService {
  // I need something that has a findOne, findAll, and create method to work correctly
}

class MessagesRepository {
  // I can help you! I write to the hard disk, so i am a little slower
}
```

While **AUTOMATED** testing

```ts
class MessagesService {
  // I need something that has a findOne, findAll, and create method to work correctly
}

class FakeRepository {
  // I can help you! I don't actually write to the hard disk, so i run really fast
}
```

# Downside of inversion of control

To make a _controller_, we'd have to first create a _service_ and to make a _service_, we first have to create a _repository_

```ts
const repo = new MessagesRepository()
const service = new MessagesService(repo)
const controller = new MessagesController(service)
```

To solve this problem and still be able to use inverion of control, we're going to introduce a technique referred to as _depedency injection_

# Dependency Injection

Dependency Injection is all about making use of inverion of control, but not having to create a ton of defferent classes or a ton of different instances every single time we want a controller.

# Nest DI Container/Injector

- Is an object that has a couple of different properties in it. Assume that it has two sets of information
  - _List of classes and their dependencies_
  - _List of instances that I have created_

Whenever you create a new Nest application, a DI container is created for us. When we start up our application, we are going to take a look at all the different classes that we have created inside of our applicaton except for our controllers. And we're going to attempt to register each of these different classes with our DI container.

```ts
export class MessagesService {
  messagesRepo: MessagesRepository
  constructor(repo: MessagesRepository) {
    this.messagesRepo = repo
  }
}
```

The DI container is then going to analyze our class above (`MessagesService`) , take a look at all the different constructor arguments. The DI container is then going to set up some internal records say that: _OK if we ever want to create a copy of messages service then we have to make sure that we first create a copy of messages repository because that is a dependency_
