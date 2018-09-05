Vue.component('basic0-parm-input', {
  template: `
  <div :style="container_style">
  <label for="transLit" :style="item_style">input</label>
  <select name="transLit" :style="item_style" v-model="selected" v-on:change="changeEvent">
   <option value='hk' >KH</option>
   <option value='slp1'>SLP1</option>
   <option value='itrans'>ITRANS</option>
   <option value='deva'>Devanagari</option>
   <option value='roman'>IAST</option>
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
