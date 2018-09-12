Vue.component('basic0-parm-dict', {
  template: `
  <div> <!--:style="container_style"> -->
  <label v-if="show_label!='no'" for="dict" :style="item_style">dictionary</label>
  <select name="dict" :style="item_style" v-bind:value="value"
   v-on:input="changeEvent"
  >
  <option v-for="d in selectOptions"
     v-bind:value='d[0]'>{{d[1]}}</option>
  </select>
  </div>
  `,
  data: function () {
    return {
     //selected:this.initialSelected,
     selectOptions:[['WIL' , 'Wilson Sanskrit-English Dictionary'],
                    ['YAT' , 'Yates Sanskrit-English Dictionary'],
                    ['GST' , 'Goldstücker Sanskrit-English Dictionary'],
                    ['BEN' , 'Benfey Sanskrit-English Dictionary'],
                    ['MW72' , '(1872) Monier-Williams Sanskrit-English Dictionary'],
                    ['AP90' , 'Apte Practical Sanskrit-English Dictionary'],
                    ['CAE' , 'Cappeller Sanskrit-English Dictionary'],
                    ['MD' , 'Macdonell Sanskrit-English Dictionary'],
                    ['MW' , '(1899) Monier-Williams Sanskrit-English Dictionary'],
                    ['SHS' , 'Shabda-Sagara Sanskrit-English Dictionary'],
                    ['BHS' , 'Edgerton Buddhist Hybrid Sanskrit Dictionary'],
                    ['AP' , '(1957) Practical Sanskrit-English Dictionary, revised edition'],
                    ['PD' , 'An Encyclopedic Dictionary of Sanskrit on Historical Principles'],
                    ['MWE' , 'Monier-Williams English-Sanskrit Dictionary'],
                    ['BOR' , 'Borooah English-Sanskrit Dictionary'],
                    ['AE' , 'Apte Student English-Sanskrit Dictionary'],
                    ['BUR' , 'Burnouf Dictionnaire Sanscrit-Français'],
                    ['STC' , 'Stchoupak Dictionnaire Sanscrit-Français'],
                    ['PWG' , 'Böhtlingk and Roth Grosses Petersburger Wörterbuch'],
                    ['GRA' , 'Grassman Wörterbuch zum Rig Veda'],
                    ['PW' , 'Böhtlingk Sanskrit-Wörterbuch in kürzerer Fassung'],
                    ['CCS' , 'Cappeller Sanskrit Wörterbuch'],
                    ['SCH' , 'Schmidt Nachträge zum Sanskrit-Wörterbuch'],
                    ['BOP' , 'Bopp Glossarium Sanscritum'],
                    ['SKD' , 'Sabda-kalpadruma'],
                    ['VCP' , 'Vacaspatyam'],
                    ['INM' , 'Index to the Names in the Mahabharata'],
                    ['VEI' , 'The Vedic Index of Names and Subjects'],
                    ['PUI' , 'The Purana Index'],
                    ['ACC' , 'Aufrecht Catalogus Catalogorum'],
                    ['KRM' , 'Kṛdantarūpamālā'],
                    ['IEG' , 'Indian Epigraphical Glossary'],
                    ['SNP' , 'Meulenbeld Sanskrit Names of Plants'],
                    ['PE' , 'Puranic Encyclopedia'],
                    ['PGN' , 'Personal and Geographical Names in the Gupta Inscriptions'],
                    ['MCI' , 'Mahabharata Cultural Index']
],

     container_style: `
       display:flex;
       flex-direction:row; /*column;*/
       justify-content: flex-end; /*flex-start;*/
       padding: 0px 5px;
       `,
      item_style:`
       flex-grow: 1;
       width:140px;
      `
   };
  },
  props:{
   value:{type:String},
   show_label:{type:String}
  },
  methods : {
   changeEvent: function (e) {
     this.$emit('input',e.target.value);
     this.$emit('change-parm');
   }
  },

});
