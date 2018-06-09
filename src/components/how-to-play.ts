import Vue from "vue";

export const HowToPlay = Vue.extend({
  template: `
	<div>
    <h1>How to play</h1>
    <div class="how-to-play">
		<p>Goal: stay alive as long as possible and beat your last score</p>
		<p>1- Use arrows to change directions</p>
		<p>2- To make points, you need to eat feeds</p>
		<p>3- Use space bar to slowdown movements (half points but more acurate)</p>
    <p>4- Make most points before it gets too fast to play or your snake is too long to move</p>    
		<hr></hr>
    <p>Press Enter to go back to menu</p>
    </div>
	</div>
  `,
  mounted: function() {
    document.addEventListener('keyup', this.handleKeys);
  },
  destroyed: function() {
    document.removeEventListener('keyup', this.handleKeys);
  },
  methods: {
    handleKeys: function(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        this.$emit('menu-option', 3);
      }
    }
  }
});