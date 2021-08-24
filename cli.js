#!/usr/bin/env node

import fetch from 'node-fetch'
import Table from 'cli-table3'
import moment from 'moment'
import colors from 'colors'

import { EMOJIS, wordWrapCanales } from './helpers.js'

const makeTable = agenda => {
  const table = new Table()

  for (const fecha of agenda.fechas) {
    const dia = moment(fecha.fecha).locale('es').format('dddd DD [de] MMMM')
    table.push([{ colSpan: 3, content: colors.green(dia) }])

    const filtrados = fecha.torneos.filter(x => x.eventos.length !== 0)
    for (const torneo of filtrados) {
      const deporte = torneo.eventos[0].deporte.nombre.replace('\t', '')
      const titulo = `${EMOJIS[deporte]}  ${torneo.nombre}`.replace('\t', '')
      table.push([{ colSpan: 3, content: colors.red(titulo) }])

      for (const evento of torneo.eventos) {
        const horario = evento.fecha.split(' ')[1].substr(0, 5)
        const nombre = evento.nombre.replace('\t', '').split(' - ').join('\n')
        const canales = wordWrapCanales(evento.canales)
        table.push([colors.green(horario), nombre, canales])
      }
    }
  }
  return table
}

const main = async () => {
  const response = await fetch('https://www.ole.com.ar/wg-agenda-deportiva/json/agenda.json')
  const agenda = await response.json()
  const table = makeTable(agenda)
  console.log(table.toString())
}

main()
