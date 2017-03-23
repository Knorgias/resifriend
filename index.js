const express = require ('express')
let app = express()
let db = require(__dirname + '/modules/database')
let appPort = 9090

app.listen(appPort, function () {
  console.log('Application listening on port ' + appPort + '!')
})
