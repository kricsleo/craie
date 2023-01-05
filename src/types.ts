export type Pair = Record<string, string>

export type Output = [string, string]

export type LogType = 'info' | 'log' | 'warn' | 'error'

export interface Styler {
  (message: string): Output
  [k: string]: any
}

export type InferStyle<styleMap> = {
  [Style in keyof styleMap]: Styler & InferStyle<Omit<styleMap, Style>>
}

export type ExpandColor<
  ColorMap, 
  Color extends keyof ColorMap = keyof ColorMap, 
  BgColor extends `bg${Capitalize<Extract<Color, string>>}` = `bg${Capitalize<Extract<Color, string>>}`
> = Record<Color | BgColor, string>

export type ExpandRound<
  RoundMap, 
  Round extends keyof RoundMap = keyof RoundMap, 
  RoundCorner extends string = `${Extract<Round, string>}L` | `${Extract<Round, string>}R`
> = Record<Round | RoundCorner, string>

export type InferLog<Logs extends readonly string[]> = {
  [k in Logs[number]]: {
    (...outputs: Output[]): void
  }
}
