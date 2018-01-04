;(() => {
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

    builder($player1, $player2) {
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

    lifebarUpdate() {
      this.settings.$player1Lifebar.style.height = `${this.settings.$player1.dataset.life}%`;
      this.settings.$player2Lifebar.style.height = `${this.settings.$player2.dataset.life}%`;
    },

    attacking($player, $buttonAttack, $target) {
      $player.classList.add(this.settings.attackingClass);
      $buttonAttack.setAttribute('disabled', true);

      this.damage($target);

      setTimeout(() => {
        $player.classList.remove(this.settings.attackingClass);
        $buttonAttack.removeAttribute('disabled');
      }, 1000);
    },

    damage($target) {
      $target.dataset.life = $target.dataset.life - 20;

      if ($target.dataset.life == 0) {
        let $winner = this.settings.$player1;

        if ($target === this.settings.$player1) {
          $winner = this.settings.$player2;
        }

        main.game.end($winner);
      }

      this.lifebarUpdate();
    }
  };
})();
