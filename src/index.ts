import { Pair, Output, ExpandColor, ExpandRound, LogType, InferStyle, InferLog } from './types'

const modifier = {
  bold: 'font-weight:bold;',
  italic: 'font-style:italic;',
  underline: 'text-decoration:underline;',
  strikethrough: 'text-decoration:line-through;'
}

const color = {
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

const round = {
  round: '0.2em',
  roundFull: '999em'
}

const logs: LogType[] = ['info', 'log', 'warn', 'error']

const styles = {
  ...modifier,
  ...expandColor(color),
  ...expandRound(round),
};

type StyleMap = typeof modifier & ExpandColor<typeof color> & ExpandRound<typeof round>

type Craie = InferStyle<StyleMap> & InferLog<typeof logs>

const craie: Craie = buildCraie(styles);

export default craie

function buildCraie(styleMap: Pair): Craie {
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
      }
    })
  })
  logs.forEach(logType => craie[logType] = createLogger(logType))
  return craie as Craie;
}

function expandColor<T extends Pair>(styleMap: T): ExpandColor<T> {
  return Object.entries(styleMap).reduce((all, [alias, color]) => {
    all[alias] = `color:${color};`;
    const bgName = 'bg' + alias[0].toUpperCase() + alias.slice(1);
    all[bgName] = `background-color:${color};padding:0 0.5em;`;
    return all;
  }, {} as any);
}

function expandRound<T extends Pair>(styleMap: T): ExpandRound<T> {
  return Object.entries(styleMap).reduce((all, [alias, radius]) => {
    all[alias] = `border-radius:${radius};`;
    all[
      alias + 'L'
    ] = `border-top-left-radius:${radius};border-bottom-left-radius:${radius};`;
    all[
      alias + 'R'
    ] = `border-top-right-radius:${radius};border-bottom-right-radius:${radius};`;
    return all;
  }, {} as any);
}

function createLogger(logType: LogType) {
  return function(...outputs: Output[]) {
    let text = ''
    const styles: string[] = []
    outputs.forEach(output => {
      text += output[0]
      styles.push(output[1])
    })
    console[logType](text, ...styles)
  }
}

// for previe only
// ouputPreview()

// function ouputPreview() {
//   outputFrontColor()
//   outputBackgroundColor()
//   outputRound()
//   outputModifer()
// }

// function outputFrontColor() {
//   const expandedColor = expandColor(color)
//   const frontColors = Object.keys(expandedColor).filter(color => !color.startsWith('bg'))
//   // @ts-ignore
//   const outputs = frontColors.map(alias => craie[alias](` ${alias} `))
//   craie.log(...outputs)
// }

// function outputBackgroundColor() {
//   const expandedColor = expandColor(color)
//   const backgroundColors = Object.keys(expandedColor).filter(color => color.startsWith('bg'))
//   // @ts-ignore
//   const outputs = backgroundColors.map(alias => craie[alias](` ${alias} `))
//   craie.log(...outputs)
// }

// function outputRound() {
//   const rounds = expandRound(round)
//   // @ts-ignore
//   const outputs = Object.keys(rounds).map(alias => craie.bgRed.white[alias](` ${alias} `))
//   craie.log(...outputs)
// }

// function outputModifer() {
//   // @ts-ignore
//   const outputs = Object.keys(modifier).map(alias => craie.bgRed.white[alias](` ${alias} `))
//   craie.log(...outputs)
// }
