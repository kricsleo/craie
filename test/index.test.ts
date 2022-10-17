import { describe, expect, test } from 'vitest';
import craier from '../src';

describe('craier', () => {
  test('style', () => {
    expect(craier.red('text')[1]).toMatchInlineSnapshot('"color:#D24735;"');

    expect(craier.red.bold('text')[1]).toMatchInlineSnapshot(
      '"color:#D24735;font-weight:bold;"'
    );

    expect(craier.red.bold.round('text')[1]).toMatchInlineSnapshot(
      '"color:#D24735;font-weight:bold;border-radius:999em;"'
    );

    expect(craier.red.bold.roundR.bgBlue('text')[1]).toMatchInlineSnapshot(
      '"color:#D24735;font-weight:bold;border-top-right-radius:999em;border-bottom-right-radius:999em;background-color:#003D74;padding:0 0.5em;"'
    );
  });
});
