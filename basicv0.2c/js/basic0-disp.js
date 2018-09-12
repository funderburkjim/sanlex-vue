Vue.component('basic0-disp', {
  template: `
  <div class="CologneBasic0">
   <slot name="htmlmsg"></slot>
  </div>
  `,
  data: function () {
    return {

   };
  },
  props:{
   msg:String
  },
  methods : {
   changeEvent: function () {
    //console.log('changeEvent:',this.selected);
    this.$emit('change-parm',this.selected);
   }
  },

});
