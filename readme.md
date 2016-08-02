Heroku config:
```
heroku config:set BUILDPACK_URL=https://github.com/krry/heroku-buildpack-nodejs-gulp-bower 
heroku config:set NPM_CONFIG_PRODUCTION=false
```

Usage:
```
curl "$url" -F html=@hello.html > hello.pdf
```


Node:
```
const config = {
  url: url,
  encoding: null, //IMPORTANT! This produces a binary body response instead of text
  formData: {
    html: {
      value:  new Buffer(content),
      options: {
        filename: 'hello.html',
        contentType: 'text/html'
      }
    }
  }
};

request.post(config, function(err, response, body) {
  fs.writeFile('test.pdf', body, "binary", function(writeErr) {
    console.log('Saved!');
  });
});
```
