# ad_cod

## Environment
```
vue 5.0.8
nodejs 18.17.0
npm 9.6.7
```

## !!! Important !!!

You **MUST** create .env file in the root folder
the file **SHOULD** contain:
```                                                                                                   .env
VUE_APP_BACKEND_URL="http://<your ip address>:8080/"
VUE_APP_MYSQL_USERNAME=""
VUE_APP_MYSQL_PASSWORD=""
```
Note: The BACKEND_URL port may not always be 8080, depending on your network configuration.

Note: You may need to edit corsOptions in server.js and webSocketURL in vue.config.js.

## Backend setup (8080 port)
```
node .\server.js
```

## Project setup (8081 port, can be changed)
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```



### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
