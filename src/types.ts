export type Output = [string, string]

export type LogType = 'info' | 'log' | 'warn' | 'error'

export type InferStyles<Styles> = {
  [Style in keyof Styles]: {
    (message: string): Output
  } & InferStyles<Omit<Styles, Style>>
}

export type ExpandColors<
  Colors,
  Color extends keyof Colors = keyof Colors,
  BgColor extends `bg${Capitalize<Extract<Color, string>>}` = `bg${Capitalize<Extract<Color, string>>}`,
> = Record<Color | BgColor, string>

export type ExpandRounds<
  Rounds,
  Round extends keyof Rounds = keyof Rounds,
  RoundDirection extends string = `${Extract<Round, string>}L` | `${Extract<Round, string>}R`,
> = Record<Round | RoundDirection, string>

export type InferLogs<Logs extends readonly string[]> = {
  [k in Logs[number]]: {
    (...outputs: Output[]): void
  }
}
