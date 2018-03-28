#!/usr/bin/env node

const R = require('ramda')
const { table } = require('table')
const agenda = require('./agenda.json')

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

const getEquipos = (evento) => evento.nombre.split(' - ')
const getDate = (event) => event.fecha.split(' ')[0]
const getTime = (event) => event.fecha.split(' ')[1].slice(0, -3)

const eventoToArray = (evento) => {
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
  const { nombre, canales, deporte } = evento
  return [`${emojis[deporte]}  ${getTime(evento)}`, nombre, canales]
}

const sameDay = (a, b) => getDate(a) === getDate(b)

const eventos = R.pipe(
  R.prop(['fechas']),
  R.pluck('torneos'),
  R.flatten(),
  R.pluck('eventos'),
  R.flatten(),
  R.map(fixNombre),
  R.map(fixDeporte),
  R.map(fixCanales)
)(agenda)

const tabla = R.pipe(
  R.groupWith(sameDay),
  R.forEach((day) => R.prepend([day[0].fecha, '', ''])),
  // R.map(eventoToArray),
  table
)(eventos)

console.log(tabla)
