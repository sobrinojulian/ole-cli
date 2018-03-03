#!/usr/bin/env node

const https = require('https')
const cli = require('commander')
const Table = require('cli-table2')
const colors = require('colors/safe')

const arrEstaVacio = arr => arr.length === 0

const main = () => {
  cli
    .version('0.1.0')
    .usage('[options]')
    .option('-d, --dia <hoy,maniana,pasado,lunes,martes,...>', 'Filtra por dia')
    .option('-o, --horario <maniana,tarde,noche>', 'Filtra por horario')
    .option('-c, --canal <c1,c2,...>', 'Filtra por canal')
    .option('-D, --deporte <d1,d2,...>', 'Filtra por deporte')
    .option('-t, --torneo <t1,t2,...>', 'Filtra por torneo')
    .parse(process.argv)

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
    const dia = fecha.fecha.replace('\t', '')
    table.push([{ colSpan: 3, content: colors.green(dia) }])

    for (const torneo of fecha.torneos) {
      if (arrEstaVacio(torneo.eventos)) continue
      const dep = torneo.eventos[0].deporte.nombre.replace('\t', '')
      const deporteTorneo = `${emojis[dep]}  ${torneo.nombre}`.replace('\t', '')
      table.push([{ colSpan: 3, content: colors.red(deporteTorneo) }])

      for (const evento of torneo.eventos) {
        const horario = `${evento.fecha.split(' ')[1].substr(0, 5)}`
        const nombre = `${evento.nombre
          .replace('\t', '')
          .split(' - ')
          .join('\n')}`
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

main(cli)
