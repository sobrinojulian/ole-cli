#!/usr/bin/env node

const vorpal = require('vorpal')()
const ole = require('./ole')
const less = require('vorpal-less')

vorpal
  .delimiter('')
  .use(ole)
  .use(less)
  .show()
  .exec('ole | less')
  .then(vorpal.exec('exit'))
