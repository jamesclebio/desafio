;(() => {
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

    init() {
      this.handler();
      this.start();
    },

    handler() {
      let $buttonNew = this.settings.$pane.querySelector('.new');
      let $buttonAttack = document.querySelectorAll('.player .attack');

      // New
      $buttonNew.addEventListener('click', (event) => {
        this.start();
        $buttonNew.blur();
        event.preventDefault();
      });

      // Attack
      for (let [i, length] = [0, $buttonAttack.length]; i < length; i++) {
        $buttonAttack[i].addEventListener('click', (event) => {
          this.attack(event.path[1], event.target);
          event.preventDefault();
        });
      }
    },

    attack($player, $buttonAttack) {
      let $target = this.settings.$player1;

      if ($player === this.settings.$player1) {
        $target = this.settings.$player2;
      }

      main.player.attacking($player, $buttonAttack, $target);
    },

    start() {
      this.settings.$body.classList.remove(this.settings.playingBodyClass);

      setTimeout(() => {
        main.player.builder(this.settings.$player1, this.settings.$player2);
        this.settings.$body.classList.remove(this.settings.finalizedBodyClass);
        this.settings.$body.classList.add(this.settings.playingBodyClass);
      }, 1000);
    },

    end($winner) {
      let winnerId = $winner.getAttribute('id').replace(/player(\d)/, '$1');

      this.settings.$winner.innerText = `Jogador ${winnerId} venceu!`;
      this.settings.$body.classList.add(this.settings.finalizedBodyClass);
    }
  };
})();
