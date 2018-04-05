const yargsInteractive = require('yargs-interactive')

const options = {
  name: {
    type: 'input',
    default: 'nano',
    describe: 'Enter your name'
  },
  likesPizza: {
    type: 'confirm',
    default: false,
    describe: 'Do you like pizza?'
  }
}

yargsInteractive()
  .usage('$0 <command> [args]')
  .interactive(options)
  .then((result) => {
    // The tool will prompt questions and will output your answers.
    // TODO: Do something with the result (e.g result.name)
    console.log(result)
  })

/*
  https://github.com/nanovazquez/yargs-interactive#prompt-just-some-questions-mixed-mode
  Prompt questions with default values (full-interactive)
  Prompt just some questions (mixed mode)
  No prompt at all (ye olde yargs)
*/
