# NestJS

- `@nestjs/common` Contains vast majority of functions, classes,...that we need from Nest.
- `@nestjs/platform-express` Lets Nest use ExpressJS for handling HTTP requests.
- `reflect-metadata` Helps make decorators work.
- `typescript` We write Nest apps with Typescript.

# Parts of Nest

- `pipe` Validate data contained in the request.
- `guard` Make sure the user is authenticated.
- **`modules`** Group together code.
- **`controller`** Route the request to a particular function.
- `service` Run some business logic.
- `repository` Access a database.
- `filters` Handles errors that occur during request handling.
- `interceptors` Adds extra logic to incoming requests or outgoing response.
