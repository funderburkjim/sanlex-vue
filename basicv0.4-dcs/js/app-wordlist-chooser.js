Vue.component('app-wordlist-chooser', {
  template: `

  <select name="wlchooser"  v-model="selecteditem" v-on:change="changeEvent"
    style="width:150px;"
  >
   <option disabled value=''>Choose Wordlist</option>
   <option v-for="(d,i) in selectOptions"
     v-bind:selected=" i == 0"
     v-bind:value='d'>{{d.name}}</option>
     <!-- v-bind:value='d.name'>{{d.name}}</option> -->
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
    let wordlist_obj = this.selecteditem;
    console.log('wordlist-chooser changeEvent:',wordlist_obj);
    //console.log('type of selected=',typeof(x));
    self = this;
    let url = wordlist_obj.url;
    axios.get(url)
    .then(function(data) {
     //console.log('getData:',data.data);
     let words = self.get_words_from_csv(data.data);
     //console.log(words);
     wordlist = { name:wordlist_obj.name,
       input:wordlist_obj.input,
       words:words
     };
     self.$emit('change-wordlist',wordlist);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      console.log('why is this printing?');
      wordlist = { name:wordlist_obj.name,
        input:wordlist_obj.input,
        words:['error getting words']
      };
      self.$emit('change-wordlist',wordlist);

    });
  },
   get_words_from_csv: function(text){
     let lines = text.split(/\n/);
     let words=lines.map(function(x) {
       // line x is a space-delimited string
       let parts = x.split(/ +/);
       return parts[0];
     });
     return words;
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
