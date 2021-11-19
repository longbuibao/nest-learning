```bash
nest generate controller messages/messages --flat
```

- `controller`: Type of class to generate.
- `messages/messages`: Place the file in the messages folder, and call the class _messages_
- `--flat`: Don't create an extra folder called _controllers_

### HTTP Request

- `@Param('something')` If we want to extract a parameter or essentially a wildcard value out of the URL.
- `@Query()` Extract part of the query string.
- `@Headers()` Get access to the header of the incoming request.
- `@Body()` Get the information out of the body of the request.

#### DTO aka Data Transfer Object
