Heroku config:
```
heroku config:set BUILDPACK_URL=https://github.com/krry/heroku-buildpack-nodejs-gulp-bower 
heroku config:set NPM_CONFIG_PRODUCTION=false
```

Usage:
```
curl "$url" -F html=@hello.html > hello.pdf
```