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
