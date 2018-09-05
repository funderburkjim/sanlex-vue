Vue.component('app-wordlist-chooser', {
  template: `
  
  <select name="wlchooser"  v-model="selecteditem" v-on:change="changeEvent"
    style="width:150px;"
  >
   <option disabled value=''>Choose Wordlist</option>
   <option v-for="(d,i) in selectOptions"
     v-bind:selected=" i == 0"
     v-bind:value='d.name'>{{d.name}}</option>
   </select>

  `,
  data: function () {
    return {
     selecteditem:'', //this.initialSelected ,
     container_style: `
       display:flex;
       flex-direction:column;
       justify-content: flex-start;
       padding: 0px 5px;
       `,
      selectOptions: app_wordlists

   };
  },
  props:{
   //initialSelected:{type:String},
   width:{type:String}
  },
  methods : {
   changeEvent: function () {
    let wordlist_name = this.selecteditem;
    console.log('wordlist-chooser changeEvent:',wordlist_name);
    //console.log('type of selected=',typeof(x));
    for(const wordlist of this.selectOptions) {
      if (wordlist.name == wordlist_name) {
        let ans = wordlist;
        this.$emit('change-wordlist',ans);
        break;
      }
    }
   }
  },
  computed: {
    /*
    selecteditem: function() {
      let x = this.selectOptions.name;
      return x;
    }
    */
  },
  created: function () {
    /*
    console.log('app-wordlist-chooser: created. selected=',this.selected)
    this.selected = this.selectOptions[0][1];
    console.log('app-wordlist-chooser: created. selected=',this.selected)
    //this.initialSelected = this.selectOptions[0][1];
    */
    /*
    x=this.selectOptions[0].name;
    console.log('created. enter=');
    if (this.initialSelected  == 'None'){
     //this.selectedItem = x;
    }else {
      x = this.initialSelected;
    }
    this.selectedItem = x;
    console.log('created. this.selectedItem=',x);
    */
  }
});
