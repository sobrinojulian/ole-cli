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
    ole [options]

  Options
    -d --dia=<hoy|maniana|lunes|...>
    -h --horario=<maniana|tarde|noche>
    -c --canal=<'ESPN HD'|'Fox Premium'|...>
    -D --deporte=<basquet|futbol|tenis|...>
    -t --torneo=<torneo>

  Examples
    $ ole
    $ ole -d=hoy
    $ ole -d=hoy,maniana
    $ ole -c='ESPN HD','Fox Premium'
    $ ole -D=futbol
    $ ole -t='NBA'
    $ ole -d=hoy -t='NBA'
```

## License

MIT © [Sobrino Julian](https://github.com/sobrinojulian)
