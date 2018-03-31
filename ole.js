#!/usr/bin/env node

const R = require('ramda')
const table = require('text-table')
const moment = require('moment')
const axios = require('axios')

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
  const deporte = evento.deporte.nombre
  const canales = R.map((e) => e.nombre, evento.canales)
  const fecha = moment(evento.fecha)
  return R.merge(evento, { nombre, deporte, canales, fecha })
}

const makeTable = (agenda) => {
  let table = []
  moment.locale('es')
  for (const fecha of agenda) {
    table.push([
      moment(fecha.fecha)
        .locale('es')
        .format('dddd DD [de] MMMM')
        .toUpperCase()
    ])
    for (const torneo of fecha.torneos) {
      table.push([`${torneo.emoji}  ${torneo.nombre.toUpperCase()}`])
      for (const evento of torneo.eventos) {
        table.push([
          `${evento.fecha.format('hh:ss')} ${evento.nombre}`,
          evento.canales
        ])
      }
      table.push([])
    }
    table.push([])
  }
  return table
}

async function printAgenda () {
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
    console.log(table(agenda, { align: ['l', 'r'] }))
  } catch (error) {
    console.error(error)
  }
}
printAgenda()
