GET INPUT

GET FILE

events =>
for f in agenda.fechas:
  for t in torneos:
    for e in eventos:
      evento = {
        fecha = iso8601(e.fecha)
        torneo = t.nombre
        nombre = e.nombre
        canales = [c.nombre for c in e.canales]
        deporte = e.deporte.nombre
      }


FILTER
getFranjaHoraria

PRINTING

Hoy
  emoji  torneo
      15:30 | Holanda   | ESPN2/HD
              Portugal
  torneo
      15:30 | Holanda   | ESPN2/HD
              Portugal

Mañana


WordWrap
Color
Each day is a Table


get
