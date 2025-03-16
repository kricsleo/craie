import craie from '../src/index'

preview()

function preview(): void {
  const logs = ['log', 'info', 'warn', 'error']

  const frontColors: string[] = []
  const bgColors: string[] = []
  const rounds: string[] = []
  const modifiers: string[] = []

  for (const alias of Object.keys(craie)) {
    if (alias.startsWith('bg')) {
      bgColors.push(alias)
    }
    else if (alias.startsWith('round')) {
      rounds.push(alias)
    }
    else if (logs.includes(alias)) {
      continue
    }
    else {
      modifiers.push(alias)
    }
  }

  craie.log(...[
    ...frontColors,
    ...bgColors,
    // @ts-expect-error types
  ].map(alias => craie[alias](` ${alias} `)), ...[
    ...rounds,
    ...modifiers,
    // @ts-expect-error types
  ].map(alias => craie.bgRed.white[alias](` ${alias} `)))
}
