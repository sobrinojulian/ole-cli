#!/usr/bin/env node

const https = require('https')
const Table = require('cli-table3')
const colors = require('colors/safe')
const moment = require('moment')

const main = () => {
  const url = 'https://www.ole.com.ar/wg-agenda-deportiva/json/agenda.json'
  https.get(url, res => {
    let data = ''
    res.on('data', chunk => (data += chunk))
    res.on('end', () => {
      const agenda = JSON.parse(data)
      const table = makeTable(agenda)
      console.log(table.toString())
    })
  })
}

const arrIsEmpty = arr => arr.length === 0

const wordWrapCanales = canales => {
  let str = ''
  for (let i = 0; i < canales.length; i++) {
    const canal = canales[i]
    str += canal.nombre.match(/.{1,16}/g).join('\n')

    const lastIteration = i === canales.length - 1
    if (!lastIteration) str += '\n'
  }
  return str
}

const makeTable = agenda => {
  let table = new Table()

  for (const fecha of agenda.fechas) {
    const dia = moment(fecha.fecha).format('dddd DD [de] MMMM')
    table.push([{ colSpan: 3, content: colors.green(dia) }])

    for (const torneo of fecha.torneos) {
      if (arrIsEmpty(torneo.eventos)) continue
      const deporte = torneo.eventos[0].deporte.nombre.replace('\t', '')
      const emoji = emojis[deporte]
      const deporteTorneo = `${emoji}  ${torneo.nombre}`.replace('\t', '')
      table.push([{ colSpan: 3, content: colors.red(deporteTorneo) }])

      for (const evento of torneo.eventos) {
        const horario = evento.fecha.split(' ')[1].substr(0, 5)
        const nombre = evento.nombre
          .replace('\t', '')
          .split(' - ')
          .join('\n')
        const canales = wordWrapCanales(evento.canales)
        table.push([colors.green(horario), nombre, canales])
      }
    }
  }
  return table
}

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

main()
