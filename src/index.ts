type Styler = {
  (text: string): [string, string];
  style: string;
  alias: string;
} & {
  [k: string]: Styler;
};

type StyleMap = Record<string, string>;

const styles = {
  bold: 'font-weight:bold;',
  ...expandRadius({
    round: '999em',
  }),
  ...expandColor({
    red: '#D24735',
    blue: '#003D74',
  }),
};

function chain(...stylers: Styler[]) {
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

function buildCraie(stylers: Styler[]) {
  const craie: Record<string, Styler> = {};
  stylers.forEach((styler) => {
    craie[styler.alias] = chain(
      styler,
      ...stylers.filter((t) => t !== styler)
    );
  });
  return craie;
}

const craie = buildCraie(createStylers(styles));

function createStylers(styleMap: StyleMap) {
  return Object.entries(styleMap).map(([alias, style]) =>
    createStyler(alias, style)
  );
}

function createStyler(alias: string, style: string): Styler {
  const styler = (text: string): [string, string] => {
    return [`%c${text}`, styler.style];
  };
  styler.alias = alias;
  styler.style = style;
  return styler as Styler;
}

function expandColor(styleMap: StyleMap) {
  return Object.entries(styleMap).reduce((all, [alias, color]) => {
    all[alias] = `color:${color};`;
    const bgName = 'bg' + alias[0].toUpperCase() + alias.slice(1);
    all[bgName] = `background-color:${color};padding:0 0.5em;`;
    return all;
  }, {} as StyleMap);
}

function expandRadius(styleMap: StyleMap) {
  return Object.entries(styleMap).reduce((all, [alias, radius]) => {
    all[alias] = `border-radius:${radius};`;
    all[
      alias + 'L'
    ] = `border-top-left-radius:${radius};border-bottom-left-radius:${radius};`;
    all[
      alias + 'R'
    ] = `border-top-right-radius:${radius};border-bottom-right-radius:${radius};`;
    return all;
  }, {} as StyleMap);
}

export default craie;
