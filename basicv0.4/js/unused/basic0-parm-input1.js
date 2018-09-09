Vue.component('basic0-parm-input1', {
  template: `
  <div :style="container_style">
  <label for="transLit" :style="item_style">input1</label>
  <!--
  <input v-bind:value="value"
     v-on:input="$emit('input',$event.target.value)"
  >
  -->

  <select name="transLit" :style="item_style" v-bind:value="value"
   v-on:input="$emit('input',$event.target.value)"
  >
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
       padding: 0px 5px;
       `,
      item_style:`
       flex-grow: 1;
       width:90px;
      `
   };
  },
  props:{
   value:{type:String}
  },
  methods : {
   changeEvent: function () {
    //console.log('changeEvent:',this.selected);
    this.$emit('change-parm',this.selected);
   }
  },

});
