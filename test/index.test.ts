import { describe, expect, it } from 'vitest'
import craie from '../src'

describe('craie', () => {
  it('style', () => {
    expect(craie.red.italic('text')).toMatchInlineSnapshot(`
      [
        "%ctext",
        "color:#f87171;font-style:italic;",
      ]
    `)

    expect(craie.bgBlue.red('text')).toMatchInlineSnapshot(
      `
      [
        "%ctext",
        "background-color:#60a5fa;padding:0 0.5em;color:#f87171;",
      ]
    `,
    )

    expect(craie.red.bold.round('text')).toMatchInlineSnapshot(
      `
      [
        "%ctext",
        "color:#f87171;font-weight:bold;border-radius:0.2em;",
      ]
    `,
    )

    expect(craie.red.bold.roundR.bgBlue('text')).toMatchInlineSnapshot(
      `
      [
        "%ctext",
        "color:#f87171;font-weight:bold;border-top-right-radius:0.2em;border-bottom-right-radius:0.2em;background-color:#60a5fa;padding:0 0.5em;",
      ]
    `,
    )
  })
})
