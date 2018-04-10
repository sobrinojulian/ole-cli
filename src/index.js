const yargsInteractive = require('yargs-interactive')
const agenda = require('./ole')

const options = {
  dia: {
    alias: 'd',
    type: 'input',
    describe: 'Ingrese dia(s)'
  },
  horario: {
    alias: 'h',
    type: 'input',
    describe: 'Ingrese horario(s)'
  },
  canal: {
    alias: 'c',
    type: 'input',
    describe: 'Ingrese canale(s)'
  },
  deporte: {
    alias: 'D',
    type: 'input',
    describe: 'Ingrese deporte(s)'
  },
  torneo: {
    alias: 't',
    type: 'input',
    describe: 'Ingrese torneo(s)'
  },
  equipo: {
    alias: 'e',
    type: 'input',
    describe: 'Ingrese equipo(s)'
  }
}

yargsInteractive()
  .usage('$0 <command> [args]')
  .interactive(options)
  .then((args) => {
    agenda()
      .then(console.log)
      .catch(console.error)
  })
