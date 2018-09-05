Vue.component('basic0-parm-accent', {
  template: `
  <div :style="container_style">
  <label for="accent" :style="item_style">accent</label>
  <select name="accent" :style="item_style" v-model="selected" v-on:change="changeEvent">
   <option value='yes'>Show</option>
   <option value='no'>Hide</option>
  </select>
  </div>
  `,
  data: function () {
    return {
     selected:this.initialSelected,
     container_style: `
       display:flex;
       flex-direction:column;
       justify-content: flex-start;
       padding: 0px 10px;
       `,
      item_style:`
       flex-grow: 1;
       width:100px;
      `
   };
  },
  props:{
   initialSelected:{type:String}
  },
  methods : {
   changeEvent: function () {
    //console.log('changeEvent:',this.selected);
    this.$emit('change-parm',this.selected);
   }
  },

});
