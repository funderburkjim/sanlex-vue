Vue.component('basic0-parm-output', {
  template: `
  <div :style="container_style">
  <label for="filter" :style="item_style">output</label>
  <select name="filter" :style="item_style" v-bind:value="value"
   v-on:input="changeEvent"
  >
   <option value='deva'>Devanagari</option>
   <option value='roman'>IAST</option>
   <option value='hk' >KH</option>
   <option value='slp1'>SLP1</option>
   <option value='iast'>ITRANS</option>
  </select>
  </div>
  `,
  data: function () {
    return {
     //selected:this.initialSelected,
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
   changeEvent: function (e) {
     this.$emit('input',e.target.value);
     this.$emit('change-parm');
   }
  },

});
