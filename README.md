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
```
MONGODB_URL=
VUE_APP_BACKEND_URL=
```
For example: (Using **MongoDB Atlas**)
```
MONGODB_URL="mongodb+srv://<username>:<password>@cluster0.nnojg.mongodb.net/?retryWrites=true&w=majority"
VUE_APP_BACKEND_URL="http://localhost:8080/"
```
Note: The MongoDB Atlas is not required but MUST have corresponding **MongoDB** end-point to access for saving data.

Note: The BACKEND_URL port may not always be 8080, depending on your network configuration.

## Backend setup (8080 port)
```
node .\server.js
```

## Project setup (8081 port)
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
