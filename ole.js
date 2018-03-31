#!/usr/bin/env node

const R = require('ramda')
const moment = require('moment')
const axios = require('axios')
const chalk = require('chalk')
const Table = require('cli-table2')

const fixFecha = (fecha) => {
  const torneos = R.map(fixTorneo, fecha.torneos)
  return R.merge(fecha, { torneos })
}

const fixTorneo = (torneo) => {
  const emojis = {
    Fútbol: '⚽',
    Básquet: '🏀',
    Boxeo: '🥊',
    Polideportivo: '🏅',
    Rugby: '🏉',
    Golf: '⛳',
    Voley: '🏐',
    MMA: '🤼',
    Automovilismo: '🏎️',
    Tenis: '🎾'
  }
  const nombre = torneo.nombre.replace('\t', '')
  const eventos = R.map(fixEvento, torneo.eventos)
  const deporte = torneo.deporte.nombre
  const emoji = emojis[deporte]
  return R.merge(torneo, { nombre, eventos, deporte, emoji })
}

const fixEvento = (evento) => {
  const nombre = evento.nombre.replace('\t', '')
  const equipos = nombre.includes(' - ') ? nombre.split(' - ') : []
  const deporte = evento.deporte.nombre
  const canales = R.map((e) => e.nombre, evento.canales)
  const fecha = moment(evento.fecha)
  return R.merge(evento, { nombre, equipos, deporte, canales, fecha })
}

const makeTable = (agenda) => {
  let table = new Table({
    chars: {
      top: '',
      'top-mid': '',
      'top-left': '',
      'top-right': '',
      bottom: '',
      'bottom-mid': '',
      'bottom-left': '',
      'bottom-right': '',
      left: '',
      'left-mid': '',
      mid: '',
      'mid-mid': '',
      right: '',
      'right-mid': '',
      middle: ' '
    },
    style: { 'padding-left': 0, 'padding-right': 0 },
    colWidths: [, , 22],
    wordWrap: true
  })
  for (const fecha of agenda) {
    table.push([
      {
        hAlign: 'center',
        colSpan: 3,
        content: `\n\n${chalk.bold.underline(
          moment(fecha.fecha)
            .locale('es')
            .format('dddd DD [de] MMMM')
            .toUpperCase()
        )}`
      }
    ])
    for (const torneo of fecha.torneos) {
      table.push([
        {
          colSpan: 3,
          content: `\n${torneo.emoji}  ${chalk.green(
            torneo.nombre.toUpperCase()
          )}`
        }
      ])
      for (const evento of torneo.eventos) {
        table.push([
          chalk.red(evento.fecha.format('hh:ss')),
          evento.equipos.length !== 0
            ? evento.equipos.join('\n')
            : evento.nombre,
          { hAlign: 'right', content: evento.canales.join('\n') }
        ])
      }
    }
  }
  return table
}

module.exports = function (vorpal) {
  vorpal.command('ole', 'Outputs "bar".').action(async function printAgenda () {
    try {
      const url = 'https://www.ole.com.ar/wg-agenda-deportiva/json/agenda.json'
      const response = await axios.get(url)
      const data = response.data
      const agenda = R.pipe(
        R.prop(['fechas']),
        R.project(['fecha', 'torneos']),
        R.map(fixFecha),
        makeTable
      )(data)
      this.log(agenda.toString())
    } catch (error) {
      console.error(error)
    }
  })
}
