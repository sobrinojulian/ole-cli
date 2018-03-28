#!/usr/bin/env node

const R = require('ramda')
const agenda = require('./agenda.json')

const probando = R.pipe(
  R.pick(['fechas'])
)(agenda)
console.log(probando)

const filterByEquipo =  => x
const filterByDia = x => x
const filterByHorario = x => x
const filterByCanal = x => x
const filterByDeporte = x => x
const filterByTorneo = x => x

const e1 = {
  "canales":  ["ESPN 2/HD"],
  "deporte": "Futbol",
  "fecha": "yyyy-mm-ddThh:mm:ss.ffffff",
  "horaDia": 2,
  "nombre": "Portugal - Holanda"
}

const eventos = R.pipe(
  R.pick(['fechas']),
  R.map(updateCanales),
  R.map(updateDeporte),
  R.map(updateFecha),
)(agenda)

const filterByNombre = (e, p) => e.nombre.includes(p)
const filterByDia = (e, p) => {
  let dia = Date()
  if (p === '0<=n<=3') dia = Date(today+1)
  if (p === 'hoy') dia = Date(today)
  if (p === 'maniana') dia = Date(today+1)
  if (p === 'pasado') dia = Date(today+1)
  if (p === 'lunes') dia = Date(today)
  if (p === 'martes...') dia = Date(today)
}
const filterByHorario = (e, p) => {
  if (p === 'maniana') dia = Date(today+1)
  if (p === 'tarde') dia = Date(today)
  if (p === 'noche') dia = Date(today+1)
}
const filterByCanal = (e, p) => e.canales[0].includes(p)
const filterByDeporte = (e, p) => e.deporte.includes(p)
const filterByTorneo = (e, p) => e.torneo.includes(p)
const filteredEvents = R.pipe(
  R.filter(filterByNombre),
  R.filter(filterByDia),
  R.filter(filterByHorario),
  R.filter(filterByCanal),
  R.filter(filterByDeporte),
  R.filter(filterByTorneo),
)(updatedEvents)

const table = R.pipe(

)(filteredEvents)

