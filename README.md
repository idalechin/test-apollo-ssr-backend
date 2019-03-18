# Bigdaymade API

## Run in develop

`git clone git@github.com:iancornwall/wapp-api.git`

You need to copy `development.js` file to `./src/config/env/development.js`, to get this file ask a@konyushevskiy.com or
ian@bigdaymade.com

`npm i`

`npm i -g cross-env`

`npm i -g nodemon`

`npm run dev`

## Generate apidoc

`npm run apidoc`

## Run in production

All production configs are stored on server in proccess.json

`pm2 start proccess.json`

## Logs on production

`pm2 logs api --lines 150`

## Stop production

`pm2 stop api`