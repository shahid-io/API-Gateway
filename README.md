# API-Gateway

`src` -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests. (You might want to make separate tests folder)

Lets take a look inside the `src` folder

- `config` -> In this folder anything and everything regarding any configurations or setup of a library or module will be done. For example: setting up `dotenv` so that we can use the environment variables anywhere in a cleaner fashion, this is done in the `server-config.js`. One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here.

- `routes` -> In the routes folder, we register a route and the corresponding middleware and controllers to it.

- `middlewares` -> they are just going to intercept the incoming requests where we can write our validators, authenticators etc.

- `controllers` -> they are kind of the last middlewares as post them you call you business layer to execute the budiness logic. In controllers we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output.

- `repositories` -> this folder contains all the logic using which we interact the DB by writing queries, all the raw queries or ORM queries will go here.

- `services` -> contains the buiness logic and interacts with repositories for data from the database

- `utils` -> contains helper methods, error classes etc.

### Setup the project

- Download this template from github and open it in your favourite text editor.
- Go inside the folder path and execute the following command:

```
npm install
```

- In the root directory create a `.env` file and add the following env variables
  `  PORT=<port number of your choice>
  `
  `
    SALT_ROUNDS=<pass number of time you want hashing>
  ` 
  `    
    JWT_SECRET=<pass jwt token string>
  `
  `
    JWT_EXPIRY=<pass duration of expiry>
  `
  ex:
    ```
    PORT=3001
    SALT_ROUNDS=8
    JWT_SECRET="localhost_333#"
    JWT_EXPIRY="1h"
  ```

- go inside the `src` folder and execute the following command:
  ```
    npx sequelize init
  ```
- By executing the above command you will get migrations and seeders folder along with a config.json inside the config folder.
- If you're setting up your development environment, then write the username of your db, password of your db and in dialect mention whatever db you are using for ex: mysql, mariadb etc
- If you're setting up test or prod environment, make sure you also replace the host with the hosted db url.

- To run the server execute

```
npm run dev
```
### JWT working and uses.

* JWT - To achieve authentication with jwt (json web token)
```
const bcrypt = require("bcrypt"); const jwt = require("jsonwebtoken");
```
```
User.beforeCreate(function encryt(user) {
    const encryptedPasssword = bcrypt.hashSync(
      user.password,
      parseInt(ServerConfig.SALT_ROUNDS)
    );
    user.password = encryptedPasssword;
  });
```
```
bcrypt.hashSync(<password>,<salt_round>)
```
- >The hasSync function is part of the bcrypt node module and it accepts two arguments: the first argument is password and the second is salt round which is an integer. Salt round is basically used as how many rounds we want to hashed our password and after that the encrypted password to be generated.

```
bcrypt.compareSync(plainPassword, encryptedPassword)
```
- >compareSync function will return true or false after comparing. The function is available in the bcrypt node module.

```
jwt.sign(input, ServerConfig.JWT_SECRET, { expiresIn: ServerConfig.JWT_EXPIRY } );
```
- >Sign function will return a token which accepts three arguments input, then a secret key to be sent and also expiry time. This function is part of the jsonwebtoken node module.
```
sign(object,<secret_key>,{ expiresIn: <time> }) 
```

```
jwt.verify(token, ServerConfig.JWT_SECRET)
```

- > Verify function is the part of JWT jsonwebtoken node module. To verify and get true or false responses we use this function.

