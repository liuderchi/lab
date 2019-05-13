This is resource about testing a simple TODO list api

## Up and run TODO api

Prepare nodejs environment, recommend using version 10 or higher.

install dependency and run the server!

```bash
npm i  # install dependency
npm run start:watch  # start the server
```

the server should up and run by listening on `localhost:3333`. Go check it in browser

## Test TODO api using Postman

1. import collection file in `postman/` folder, you will see a new collection `api-tdd-postman`
2. mouse hover on it, you will see a play button; click on it then in expanded panel click `Run` button
3. in dialog select `/todos` folder and click `Run api-tdd-postman`
4. Postman will run all requests sequentially and you will see the result!
5. you can discover all requests made in the runner and customize params/headers/url/tests... 👍
