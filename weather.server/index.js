const app = require('express')()
const fetch = require('node-fetch')
const PORT = 4500

const weatherCtrl = require('./ctrls/weather.ctrl')


app.use(weatherCtrl)


app.listen(PORT, () => console.log(`started at port ${PORT}`))