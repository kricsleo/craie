import type {
  ExpandColors,
  ExpandRounds,
  InferLogs,
  InferStyles,
  LogType,
  Output,
} from './types'

const modifiers = {
  bold: 'font-weight:bold;',
  italic: 'font-style:italic;',
  underline: 'text-decoration:underline;',
  strikethrough: 'text-decoration:line-through;',
}

const colors = {
  black: '#000',
  white: '#fff',
  rose: '#fb7185',
  pink: '#f472b6',
  fuchsia: '#e879f9',
  purple: '#c084fc',
  violet: '#a78bfa',
  indigo: '#818cf8',
  blue: '#60a5fa',
  sky: '#38bdf8',
  cyan: '#22d3ee',
  teal: '#2dd4bf',
  emerald: '#34d399',
  green: '#4ade80',
  lime: '#a3e635',
  yellow: '#facc15',
  amber: '#fbbf24',
  orange: '#fb923c',
  red: '#f87171',
  gray: '#9ca3af',
  slate: '#94a3b8',
  zinc: '#a1a1aa',
  neutral: '#a3a3a3',
  stone: '#a8a29e',
  light: '#f6f6f6',
  dark: '#222222',
}

const rounds = {
  round: '0.2em',
  roundFull: '999em',
}

const styles = {
  ...modifiers,
  ...expandColors(colors),
  ...expandRounds(rounds),
}

type Styles = typeof modifiers
  & ExpandColors<typeof colors>
  & ExpandRounds<typeof rounds>

const logs: LogType[] = ['info', 'log', 'warn', 'error']

type Craie = InferStyles<Styles> & InferLogs<typeof logs>

const craie: Craie = buildCraie(styles)

export default craie

function buildCraie(styleMap: Record<string, any>): Craie {
  let cachedStyle = ''

  const craie: any = (message: string) => {
    const style = cachedStyle
    cachedStyle = ''
    return [`%c${message}`, style]
  }

  Object.entries(styleMap).forEach(([alias, style]) => {
    Object.defineProperty(craie, alias, {
      get() {
        cachedStyle += style
        return craie
      },
    })
  })

  logs.forEach(logType => craie[logType] = createLogger(logType))

  return craie
}

function expandColors<T extends Record<string, string>>(styles: T): ExpandColors<T> {
  return Object.entries(styles).reduce<any>((all, [alias, color]) => {
    all[alias] = `color:${color};`
    const bgName = `bg${alias[0]!.toUpperCase()}${alias.slice(1)}`
    all[bgName] = `background-color:${color};padding:0 0.5em;`
    return all
  }, {})
}

function expandRounds<T extends Record<string, string>>(styles: T): ExpandRounds<T> {
  return Object.entries(styles).reduce((all, [alias, radius]) => {
    all[alias] = `border-radius:${radius};`
    all[`${alias}L`] = `border-top-left-radius:${radius};border-bottom-left-radius:${radius};`
    all[`${alias}R`] = `border-top-right-radius:${radius};border-bottom-right-radius:${radius};`
    return all
  }, {} as any)
}

function createLogger(logType: LogType) {
  return function (...outputs: Output[]) {
    let text = ''
    const styles: string[] = []
    outputs.forEach((output) => {
      text += output[0]
      styles.push(output[1])
    })
    // eslint-disable-next-line no-console
    console[logType](text, ...styles)
  }
}
