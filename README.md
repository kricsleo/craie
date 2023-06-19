<h1 align="center">🧶 craie</h1>
<p align="center">
<a href="https://www.npmjs.com/package/craie">
  <img src="https://img.shields.io/npm/v/craie?style=flat&colorA=18181B&colorB=F0DB4F" />
</a>

<a href="https://www.npmjs.com/package/craie">
  <img src="https://img.shields.io/npm/types/craie?style=flat&colorA=18181B&colorB=F0DB4F" />
</a>

<a href="https://bundlephobia.com/package/craie">
  <img src="https://img.shields.io/bundlephobia/minzip/craie?style=flat&colorA=18181B&colorB=F0DB4F" />
</a>

<a href="https://github.com/kricsleo/craie/blob/master/LICENSE">
  <img src="https://img.shields.io/github/license/kricsleo/craie.svg?style=flat&colorA=18181B&colorB=F0DB4F" />
</a>

</p>
<h3 align="center">
  Output colorful logs, much like <a href="https://github.com/chalk/chalk">chalk</a> but works for the browser.
</h3>

<br >

<p align="center">
  <img src="./screenshots/preview.png" alt="preview" style="border-radius: 4px;" />
</p>

## Features

- 🚀 Tiny < 1kB
- 💪🏻  Full typescript support
- 📦 No dependencies
- 🪢 Elegant chain calls

## Usage

### NPM

```bash
npm i craie
```

```ts
import craie from 'craie'

craie.log(craie.blue.bgRed.round('Message'))
```

### CDN

```html
<script src="
  https://cdn.jsdelivr.net/npm/craie/dist/index.global.min.js
"></script>
```

Or try it now!

Execute the script below on browser address bar, then use the global `craie` as you want.

```js
javascript:(function () { var script = document.createElement('script'); script.src="https://cdn.jsdelivr.net/npm/craie/dist/index.global.min.js"; document.body.appendChild(script); })();
```

## License

[MIT](./LICENSE) License © 2023 [Kricsleo](https://github.com/kricsleo)
