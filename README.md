A basic Library CRUD API with Nest, TypeORM and MySQL. Improving complexity overtime to learn new concepts.

Tables in the system so far:

customer(__id__, name, age, email)

author(__id__, first_name, last_name, email)

book(__id__, title, author_id[fk "author"])


- dotenvexample file at root shows environment variables necessary to run the api

- no seeds available for now

- swagger doc to be implementated

- "npm start" for running the api

- "npm run start:dev" for running the api on watch mode

- "npm run test" for running tests

- typeorm cli scripts at package.json 