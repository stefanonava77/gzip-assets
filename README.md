# Gzip Assets compression

## Description
Utility plugin for gzip using pure javascript.

## Installation

Using npm:
```shell
$ npm i -g npm
$ npm i gzip-assets
```

In Node.js:
```js
// Load gzip-assets.
const gzipAssets = require('gzip-assets');
```

## Usage

```js
const assetsArray = ['build/css','build/js' ];
gzipAssets.run(assetsArray);
```