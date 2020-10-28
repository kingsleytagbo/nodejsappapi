# NodeJS Api Server

## heroku-cli commands
heroku addons
heroku config --app nodejsappapi
heroku pg:info --app nodejsappapi
heroku pg:psql --app nodejsappapi

## References
Heroku Postgress docs: https://devcenter.heroku.com/articles/heroku-postgresql

Build a Node.js, Express & PostgreSQL REST API:
https://www.taniarascia.com/node-express-postgresql-heroku/

## Heroku + Postgress + Database Commands
### connect to a heroku database
heroku pg:psql --app nodejsappapi
### create user a table based on a script file
cat db/postgress/user.sql | heroku pg:psql  -a  nodejsappapi

## Git
#### mkdir NodeApi
#### cd NodeApi
#### git init
#### git pull --allow-unrelated-histories https://github.com/kingsleytagbo/nodejsappapi.git
#### npm init
#### git add --all
#### git commit -am "npm init"
#### git remote add origin https://github.com/kingsleytagbo/nodejsappapi.git
#### git push --set-upstream origin master

