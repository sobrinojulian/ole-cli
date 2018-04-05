# agenda-ole-cli

> CLI para la Agenda deportiva Olé

## Install

```
$ npm install --global agenda-ole-cli
```

## Usage

```
$ ole --help

	Usage
    $ ole <options>
    $ ole <options> | less
    $ ole --interactive

  Options
    --interactive -i
    --dia,        -d  <0|1|2|3>
    --horario,    -h  <1|2|3>
    --canal,      -c  <canal>
    --deporte,    -D  <deporte>
    --torneo,     -t  <torneo>
    --equipo,     -e  <equipo>


  Examples
    $ ole
    Imprime todos los eventos
    $ ole -d 0
    Imprime los eventos de hoy
    $ ole -d 0 1
    Imprime los eventos de hoy y mañana
    $ ole -d 0 1 -e boca river spurs
    Imprime los eventos de hoy y mañana de boca river y spurs
    $ ole -c 'fox sports 2' espn
    Imprime ESPN, ESPN 2, ESPN 3 y FOX SPORTS 2
```

## License

MIT © [Sobrino Julian](https://github.com/sobrinojulian)
