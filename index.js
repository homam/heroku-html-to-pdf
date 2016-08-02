const app = require('express')();
const http = require('http')
const {exec} = require('shelljs')
const fs = require('fs')
const bodyParser = require('body-parser')
const R = require('ramda')

const binary = './bin/wkhtmltopdf-linux-amd64' // 'wkhtmltopdf' // 

const port = process.env.PORT || 3001
app.set('port', port);


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//app.use(busboy())

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

app.use(multipartMiddleware)



app.get('/', (req, res) => {
  res.end('curl -F "html=@hello.html" "url"  > hello.pdf')
})

app.post("/", (req, res) => {

  const htmlPath = req.files.html.path
  const {code, stdout, stderr} = exec(
    `${binary} -s Letter ${htmlPath} ${htmlPath}.pdf`
  )

  console.log({code, stdout, stderr})
  
  setTimeout(_ => {
    exec(`rm ${htmlPath}`)
    exec(`rm ${htmlPath}.pdf`)
  }, 30000)

  fs.createReadStream(`${htmlPath}.pdf`).pipe(res)
  

})

const server = http.createServer(app)
server.listen(port)

console.log('started on ', port)