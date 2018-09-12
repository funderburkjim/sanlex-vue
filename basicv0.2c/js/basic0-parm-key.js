Vue.component('basic0-parm-key', {
  template: `
  <div >
    <!--
  <input name="key" v-bind:value="value"
     v-on:keyup.enter="$emit('input',$event.target.value)"
  >
  -->
  <input name="key" v-bind:value="value"
     v-on:keyup.enter="changeEvent"
     v-bind:placeholder="place_holder ? place_holder : 'Enter search word'"
  >

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
   value:{type:String},
   place_holder:{type:String}
  },
  methods : {
   changeEvent: function (e) {
    //console.log('changeEvent:',this.selected);
    //this.$emit('change-parm',this.selected);
    this.$emit('input',e.target.value);
    this.$emit('get-data');
   }
  },

});
