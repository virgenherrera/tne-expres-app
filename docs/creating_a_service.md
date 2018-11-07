# Creating a web service with `@tne/express-app`

## raw javascript
1. create a folder to hold the entire code and navigate into it with console.
```
$ mkdir your_web_service_name && cd $_
```

2. init npm package
```
$ npm init -y
```

3. install [@tne/express-app](https://github.com/virgenherrera/tne-express-app#readme)
```
npm install --save @tne/express-app
```

4. Create base folder structure and config files
```
$ mkdir config src
$ touch config/development.json config/production.json config/test.json config/keys.json src/index.js
```

5. init config files
```
echo {} | tee config/development.json config/keys.json config/production.json config/test.json
```

the above steps will produce a file structure like this:
-
![Initial Scaffolding](./img/initial_scaffolding.png "Logo Title Text 1")
