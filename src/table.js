const Table = require('cli-table2')
const moment = require('moment')

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
    colWidths: [, , 22],
    wordWrap: true
  })
  for (const fecha of agenda) {
    // FECHA
    table.push([
      {
        hAlign: 'center',
        colSpan: 3,
        content: `\n\n${moment(fecha.fecha)
          .locale('es')
          .format('dddd DD [de] MMMM')
          .toUpperCase()}`
      }
    ])
    for (const torneo of fecha.torneos) {
      // TORNEO
      if (torneo.eventos.length === 0) continue
      table.push([
        {
          colSpan: 3,
          content: `\n${torneo.emoji}  ${torneo.nombre.toUpperCase()}`
        }
      ])
      for (const evento of torneo.eventos) {
        // EVENTO
        table.push([
          evento.fecha.format('hh:mm'),
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
module.exports = makeTable
