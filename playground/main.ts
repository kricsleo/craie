import craie from 'craie'

ouputPreview()

function ouputPreview(): void {
  craie.log(craie.white.bgTeal.roundFull('Preview'))
  // outputFrontColor()
  // outputBackgroundColor()
  // outputRound()
  // outputModifer()
}

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
//   const outputs = Object.keys(modifier).map(alias => craie.bgRed.white[alias](` ${alias} `))
//   craie.log(...outputs)
// }
