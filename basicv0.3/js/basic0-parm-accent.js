Vue.component('basic0-parm-accent', {
  template: `
  <div :style="container_style">
  <label for="accent" :style="item_style">accent</label>
  <select name="transLit" :style="item_style" v-bind:value="value"
   v-on:input="changeEvent"
  >
   <option value='yes'>Show</option>
   <option value='no'>Hide</option>
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

  propsUnused:{
   initialSelected:{type:String}
  },
  methods : {
   changeEvent: function (e) {
     this.$emit('input',e.target.value);
     this.$emit('change-parm');
   }
  },

});
