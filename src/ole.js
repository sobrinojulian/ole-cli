const R = require('ramda')
const moment = require('moment')
const axios = require('axios')

const fix = require('./fix')
const filter = require('./filter')
const table = require('./table')

module.exports = async () => {
  const url = 'https://www.ole.com.ar/wg-agenda-deportiva/json/agenda.json'
  const response = await axios.get(url)
  const agenda = R.pipe(
    R.prop(['fechas']),
    R.project(['fecha', 'torneos']),
    R.map(fix),
    //filter,
    table
  )(response.data)
  return agenda.toString()
}
