import { remote } from 'electron';
import Vue from 'vue';
import { TitleMenu } from './components/title-menu';
import { Game } from './components/game';
import { HowToPlay } from './components/how-to-play';
import './style.css';
import './audio/menu_game.wav';

const music = new Audio('./audio/menu_game.wav');
music.loop = true;

var vm = new Vue({
  el: '#app',
  components: {
    'title-menu': TitleMenu,
    'game': Game,
    'how-to-play': HowToPlay
  },
  data: {
    currentComponent: 'title-menu'
  },
  mounted: function() {
    music.play()
  },
  methods: {
    onMenuOption: function(menuOption: number) {
      switch (menuOption) {
        case 0:
          this.currentComponent = 'game';
          music.pause();
          music.currentTime = 0;
          break;
        case 1:
          this.currentComponent = 'how-to-play';
          break;
        case 2:
          remote.app.quit();
          break;
        case 3:
          this.currentComponent = 'title-menu';
          music.play();
      }
    }
  }
});