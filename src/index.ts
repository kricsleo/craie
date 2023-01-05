import { Pair, Output, Styler, ExpandColor, ExpandRound, LogType, InferStyle, InferLog } from './types'

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
  // ...modifier,
  ...expandColor(color),
  ...expandRound(round),
};

type StyleMap = typeof modifier & ExpandColor<typeof color> & ExpandRound<typeof round>

export type Craie = InferStyle<StyleMap> & InferLog<typeof logs>

const craie: Craie = buildCraie(styles);

export default craie;

function buildCraie(styleMap: Pair) {
  const stylers = Object.entries(styleMap).map(([alias, style]) =>
    createStyler(alias, style)
  )
  const craie: any = {};
  stylers.forEach((styler) => {
    craie[styler.alias] = chain(
      styler,
      ...stylers.filter((t) => t !== styler)
    );
  });
  logs.forEach(logType => craie[logType] = createLogger(logType))
  return craie;
}

function chain(...stylers: Styler[]) {
  console.log('chaining', stylers.length, stylers);
  if (stylers.length <= 1) {
    return stylers[0];
  }
  const [root, ...leaves] = stylers;
  leaves.forEach((leaf) => {
    const chainLeaf = createStyler(leaf.alias, root.style + leaf.style);
    root[leaf.alias] = chainLeaf;
    chain(chainLeaf, ...leaves.filter((t) => t !== leaf));
  });
  return root;
}

function createStyler(alias: string, style: string): Styler {
  const styler = (text: string): Output => {
    return [`%c${text}`, styler.style];
  };
  styler.alias = alias;
  styler.style = style;
  return styler as Styler;
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
