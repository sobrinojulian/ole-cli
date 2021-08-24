export const EMOJIS = {
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

export function wordWrapCanales (canales) {
  let str = ''
  for (let i = 0; i < canales.length; i++) {
    const canal = canales[i]
    str += canal.nombre.match(/.{1,14}/g).join('-\n')

    const lastIteration = i === canales.length - 1
    if (!lastIteration) str += '\n'
  }
  return str
}
