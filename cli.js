#!/usr/bin/env node

const cli = require('commander');
const https = require('https');
const _ = require('lodash');

const splitWithComma = (val) => {
  if (val !== undefined) return val.split(',');
};

const dia = val => splitWithComma(val);
const horario = val => splitWithComma(val);
const canal = val => splitWithComma(val);
const deporte = val => splitWithComma(val);
const torneo = val => splitWithComma(val);

const esMismoDia = dia => (element, index, array) => element.dia === dia;
const esMismoHorario = horario => (element, index, array) => element.horario === horario;
const esMismoCanal = canal => (element, index, array) => element.canal === canal;
const esMismoDeporte = deporte => (element, index, array) => element.deporte === deporte;
const esMismoTorneo = torneo => (element, index, array) => element.torneo === torneo;

const arrEstaVacio = arr => arr.length === 0;

const filtrar = (cli, arr) => {
  let filtrado = arr;
  if (!arrEstaVacio(cli.dia)) filtrado = filtrado.filter(esMismoDia(cli.dia[0]));
  if (!arrEstaVacio(cli.horario)) filtrado = filtrado.filter(esMismoHorario(cli.horario[0]));
  if (!arrEstaVacio(cli.canal)) filtrado = filtrado.filter(esMismoCanal(cli.canal[0]));
  if (!arrEstaVacio(cli.deporte)) filtrado = filtrado.filter(esMismoDeporte(cli.deporte[0]));
  if (!arrEstaVacio(cli.torneo)) filtrado = filtrado.filter(esMismoTorneo(cli.torneo[0]));
  return filtrado;
};

const main = () => {
  cli
    .version('0.1.0')
    .usage('[options]')
    .option('-d, --dia <hoy,maniana,pasado,lunes,martes,...>', 'Filtra por dia', dia, [])
    .option('-o, --horario <maniana,tarde,noche>', 'Filtra por horario', horario, [])
    .option('-c, --canal <c1,c2,...>', 'Filtra por canal', canal, [])
    .option('-D, --deporte <d1,d2,...>', 'Filtra por deporte', deporte, [])
    .option('-t, --torneo <t1,t2,...>', 'Filtra por torneo', torneo, [])
    .parse(process.argv);

  const url = 'https://www.ole.com.ar/wg-agenda-deportiva/json/agenda.json';
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => (data += chunk));
    res.on('end', () => {
      const agenda = JSON.parse(data);
      _.forEach(agenda.fechas, (fecha) => {
        console.log('%j', fecha.fecha);
        _.forEach(fecha.torneos, (torneo) => {
          console.log('  %j', torneo.nombre);
          _.forEach(torneo.eventos, (evento) => {
            console.log('    Fecha: %j', evento.fecha);
            console.log('    Nombre: %j', evento.nombre);
            console.log('    Horario: %j', evento.horaDia);
            console.log('    Canales: %j', evento.canales);
            console.log('    Deporte: %j', evento.deporte.nombre);
            console.log();
          });
        });
      });
    });
  });
};
main(cli);
