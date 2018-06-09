import Vue from 'vue';

export const TitleMenu = Vue.extend({
  template: `
    <div>
      <h1>Snake Game</h1>
      <ul>
        <li v-for="item in items"><button ref="buttons"><h2>{{item.text}}</h2></button></li>
      </ul>		
    </div>
    `,
  mounted: function() {
    this.setFocus(this.selected);
    document.addEventListener('keyup', this.handleKeys);
  },
  destroyed: function() {
    document.removeEventListener('keyup', this.handleKeys);
  },
  data: function() {
    return {
      items: [
        { id: 0, text: 'New Game' },
        { id: 1, text: 'How to play' },
        { id: 2, text: 'Exit Game' }
      ],
      selected: 0
    };
  },
  methods: {
    handleKeys: function(event: KeyboardEvent) {
      if (event.key === 'ArrowDown') {
        this.selected = Math.max(0, Math.min(this.selected + 1, 2));
        this.setFocus(this.selected);
      }
      if (event.key === 'ArrowUp') {
        this.selected = Math.max(0, Math.min(this.selected - 1, 2));
        this.setFocus(this.selected);
      }
      if (event.key === 'Enter') {
        this.$emit('menu-option', this.selected);
      }
    },
    setFocus: function(selected: number) {
      (<HTMLButtonElement[]>this.$refs.buttons)[selected].focus();
    }
  }
});
