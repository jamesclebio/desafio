# TESTE FRONTEND S2IT

A solução para o teste está disponível em [http://jamesclebio.github.io/s2it-frontend/](http://jamesclebio.github.io/s2it-frontend/).

* JavaScript
  - VanillaJS
  - ES6
  - Module Pattern

* CSS
  - Sass (Sass syntax) / Compass

## Ambiente

### Requisitos

* [Node.js](https://nodejs.org/) + [npm](https://www.npmjs.com/)
* [gulp.js](https://gulpjs.com/)
* [Bower](https://bower.io/)
* [Compass](compass-style.org/)
* [Babel](https://babeljs.io/)
* [Browsersync](https://browsersync.io/)
* [JSHint](http://jshint.com/)
* [EditorConfig](http://editorconfig.org/)

### Instalação

Dependências npm:

```
npm i
```

Dependências Bower:

```
bower i
```

## Comandos gulp.js

Iniciar Browsersync em *http://localhost:3000* (proxy):

```
gulp dev
```

Gerar fontes em */assets/fonts/*:

```
gulp fonts
```

Gerar JavaScript em */assets/scripts/*:

```
gulp scripts
```

Gerar CSS em */assets/styles/*:

```
gulp styles
```

Gerar build em */dist/*:

```
gulp build
```

Listar todos os comandos:

```
gulp
```
