Vue.component('app-wordlist', {
  template: `
  <div :style="container_style">
  <span>{{initialSelected.words.length}} words</span><br>
  <a v-for="(d,i) in initialSelected.words"
     v-on:click.prevent="selectEvent"
     href="#"
     class="app-wordlist"
  > {{d}}</a>
  </div>
  `,
  data: function () {
    return {
     container_style: `
       display:flex; flex-wrap:nowrap;
       flex-direction:column;
       justify-content: flex-start;
       padding: 0px 5px;
       `,
      item_style:`
       /*flex-grow: 1;*/
       /*width:140px; */
       ::hover {background-color:yellow;}
      `
   };
  },
  props:{
   initialSelected:{type:Object}
  },
  methods : {
   selectEvent: function (e) {
    let word = e.target.innerText;
    //console.log('key=',word);
    this.$emit('select-word',word);
   }
  },

});
