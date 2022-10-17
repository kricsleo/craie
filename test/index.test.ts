import { describe, expect, test } from 'vitest';
import craie from '../src';

describe('craie', () => {
  test('style', () => {
    expect(craie.red('text')[1]).toMatchInlineSnapshot('"color:#D24735;"');

    expect(craie.red.bold('text')[1]).toMatchInlineSnapshot(
      '"color:#D24735;font-weight:bold;"'
    );

    expect(craie.red.bold.round('text')[1]).toMatchInlineSnapshot(
      '"color:#D24735;font-weight:bold;border-radius:999em;"'
    );

    expect(craie.red.bold.roundR.bgBlue('text')[1]).toMatchInlineSnapshot(
      '"color:#D24735;font-weight:bold;border-top-right-radius:999em;border-bottom-right-radius:999em;background-color:#003D74;padding:0 0.5em;"'
    );
  });
});
