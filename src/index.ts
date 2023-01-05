import { Pair, Output, ExpandColor, ExpandRound, LogType, InferStyle, InferLog } from './types'

export const modifier = {
  bold: 'font-weight:bold;',
  italic: 'font-style:italic;',
}

export const color = {
  red: '#f87171',
  blue: '#60a5fa',
  yellow: '#facc15'
}

export const round = {
  round: '999em'
}

export const logs: LogType[] = ['info', 'log', 'warn', 'error']

const styles = {
  ...modifier,
  ...expandColor(color),
  ...expandRound(round),
};

type StyleMap = typeof modifier & ExpandColor<typeof color> & ExpandRound<typeof round>

export type Craie = InferStyle<StyleMap> & InferLog<typeof logs>

const craie: Craie = buildCraie(styles);

export default craie;

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
