#!/usr/bin/env node

const R = require('ramda')
const { table } = require('table')
const table2 = require('text-table')
const moment = require('moment')
const axios = require('axios')

// FIX
const fixNombre = (evento) => {
  const nombre = evento.nombre.replace('\t', '')
  return R.merge(evento, { nombre })
}
const fixDeporte = (evento) => {
  const deporte = evento.deporte.nombre
  return R.merge(evento, { deporte })
}
const fixCanales = (evento) => {
  const canales = R.map((e) => e.nombre, evento.canales)
  return R.merge(evento, { canales })
}
const fixFecha = (evento) => {
  const fecha = moment(evento.fecha)
  return R.merge(evento, { fecha })
}

// ADD
const addEmoji = (evento) => {
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
  const deporte = evento.deporte
  const emoji = emojis[deporte]
  return R.merge(evento, { emoji })
}

const addEquipos = (evento) => {
  const separador = ' - '
  const nombre = evento.nombre
  const equipos = nombre.includes(separador) ? nombre.split(separador) : []
  return R.merge(evento, { equipos })
}

const updateEvento = R.pipe(
  fixNombre,
  fixDeporte,
  fixCanales,
  fixFecha,
  addEmoji,
  addEquipos
)

const addTorneo = R.curry((nombre, evento) =>
  R.merge(evento, { torneo: nombre })
)
const updateTorneo = (torneo) => {
  const eventos = R.map(addTorneo(torneo.nombre), torneo.eventos)
  return R.merge(torneo, { eventos })
}

const eventoToArray = (evento) => {
  const { emoji, fecha, nombre, canales, torneo } = evento
  const hora = fecha.format('hh:mm')
  return [hora, nombre, canales]
}

async function printAgenda () {
  try {
    const url = 'https://www.ole.com.ar/wg-agenda-deportiva/json/agenda.json'
    const response = await axios.get(url)
    const data = response.data
    const fechas = R.pipe(
      R.prop(['fechas']),
      R.pluck('torneos'),
      R.flatten(),
      R.map(updateTorneo),
      R.flatten(),
      R.pluck('eventos'),
      R.flatten(),
      R.map(updateEvento)
      //R.groupWith((x,y) => x.fecha.isSame(y.fecha, 'day')),
      //R.groupWith((x,y) => x.torneo === x.torneo),
    )(data)
    console.log(fechas)
  } catch (error) {
    console.error(error)
  }
}
printAgenda()
