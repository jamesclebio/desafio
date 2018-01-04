'use strict';

;(function () {
  'use strict';

  window.main = window.main || {};

  main.game = {
    settings: {
      autoinit: true,
      $body: document.querySelector('body'),
      $pane: document.querySelector('.pane'),
      $winner: document.querySelector('.winner'),
      $player1: document.querySelector('#player1'),
      $player2: document.querySelector('#player2'),
      playingBodyClass: 'playing',
      finalizedBodyClass: 'finalized'
    },

    init: function init() {
      this.handler();
      this.start();
    },
    handler: function handler() {
      var _this = this;

      var $buttonNew = this.settings.$pane.querySelector('.new');
      var $buttonAttack = document.querySelectorAll('.player .attack');

      // New
      $buttonNew.addEventListener('click', function (event) {
        _this.start();
        $buttonNew.blur();
        event.preventDefault();
      });

      // Attack
      for (var _ref = [0, $buttonAttack.length], i = _ref[0], length = _ref[1]; i < length; i++) {
        $buttonAttack[i].addEventListener('click', function (event) {
          _this.attack(event.path[1], event.target);
          event.preventDefault();
        });
      }
    },
    attack: function attack($player, $buttonAttack) {
      var $target = this.settings.$player1;

      if ($player === this.settings.$player1) {
        $target = this.settings.$player2;
      }

      main.player.attacking($player, $buttonAttack, $target);
    },
    start: function start() {
      var _this2 = this;

      this.settings.$body.classList.remove(this.settings.playingBodyClass);

      setTimeout(function () {
        main.player.builder(_this2.settings.$player1, _this2.settings.$player2);
        _this2.settings.$body.classList.remove(_this2.settings.finalizedBodyClass);
        _this2.settings.$body.classList.add(_this2.settings.playingBodyClass);
      }, 1000);
    },
    end: function end($winner) {
      var winnerId = $winner.getAttribute('id').replace(/player(\d)/, '$1');

      this.settings.$winner.innerText = 'Jogador ' + winnerId + ' venceu!';
      this.settings.$body.classList.add(this.settings.finalizedBodyClass);
    }
  };
})();
'use strict';

;(function () {
  'use strict';

  window.main = window.main || {};

  main.player = {
    settings: {
      autoinit: false,
      $player1: null,
      $player2: null,
      $player1Lifebar: null,
      $player2Lifebar: null,
      attackingClass: 'attacking'
    },

    builder: function builder($player1, $player2) {
      this.settings.$player1 = $player1;
      this.settings.$player2 = $player2;

      if (!this.settings.$player1Lifebar) {
        this.settings.$player1Lifebar = $player1.querySelector('.lifebar div');
        this.settings.$player2Lifebar = $player2.querySelector('.lifebar div');
      }

      $player1.dataset.life = 100;
      $player2.dataset.life = 100;

      this.lifebarUpdate();
    },
    lifebarUpdate: function lifebarUpdate() {
      this.settings.$player1Lifebar.style.height = this.settings.$player1.dataset.life + '%';
      this.settings.$player2Lifebar.style.height = this.settings.$player2.dataset.life + '%';
    },
    attacking: function attacking($player, $buttonAttack, $target) {
      var _this = this;

      $player.classList.add(this.settings.attackingClass);
      $buttonAttack.setAttribute('disabled', true);

      this.damage($target);

      setTimeout(function () {
        $player.classList.remove(_this.settings.attackingClass);
        $buttonAttack.removeAttribute('disabled');
      }, 1000);
    },
    damage: function damage($target) {
      $target.dataset.life = $target.dataset.life - 20;

      if ($target.dataset.life == 0) {
        var $winner = this.settings.$player1;

        if ($target === this.settings.$player1) {
          $winner = this.settings.$player2;
        }

        main.game.end($winner);
      }

      this.lifebarUpdate();
    }
  };
})();
'use strict';

;(function () {
  'use strict';

  window.main = window.main || {};

  main.init = function () {
    for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
      plugins[_key] = arguments[_key];
    }

    var resources = [];

    if (plugins.length) {
      resources = plugins;
    } else {
      for (var i in main) {
        resources.push(i);
      }
    }

    main.initTrigger(main, resources);
  };

  main.initTrigger = function (object, resources) {
    if (!resources) {
      resources = [];

      for (var i in object) {
        resources.push(i);
      }
    }

    for (var _i in resources) {
      if (object[resources[_i]].hasOwnProperty('settings') && object[resources[_i]].settings.autoinit) {
        object[resources[_i]].init();
      }
    }
  };

  main.init();
})();