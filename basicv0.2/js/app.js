var app = new Vue({
  el: '#app',
  template:`
  <div>
  <h2>Basic Display using <i>Vue</i></h2>
  <div style="display:flex">
   <basic0-parm-input v-bind:initialSelected='parmInput' v-on:change-parm="updateParmInput"></basic0-parm-input>
   <basic0-parm-output v-bind:initialSelected='parmOutput' v-on:change-parm="updateParmOutput"></basic0-parm-output>
   <basic0-parm-accent v-bind:initialSelected='parmAccent' v-on:change-parm="updateParmAccent"></basic0-parm-accent>
   <basic0-parm-dict v-bind:initialSelected='parmDict' v-on:change-parm="updateParmDict"></basic0-parm-dict>
   </div>

   <div style="left: 10px; padding-top:10px;padding-bottom:5px;">
    <label for="citation">Citation: </label>
    <input type="text" v-on:keyup.enter="citationEnter">
   </div>


   <basic0-disp :style="style_basic0">
    <template slot="htmlmsg">
      <div v-html="getdatax_html"></div>
    </template>
   </basic0-disp>

   </div>
  `,

  data: {
    parmInput:'slp1',  // default value. Get from cookies
    parmOutput:'deva',
    parmDict:'MW',
    parmAccent:'no',
    parmKey:'',
    getdatax_html:'',
    style_basic0:`
     width: 500px;
     height: 500px;
     overflow: auto;
     padding-top:10px;
     border-style:solid;
    `
  },
  methods:{
  updateParmInput: function(v) {
   //console.log('updateParmInput value=',v);
   this.parmInput = v;
  },

  updateParmOutput: function(v) {
   //console.log('updateParmOutput value=',v);
   this.parmOutput = v;
  },
  updateParmDict: function(v) {
   //console.log('updateParmDict value=',v);
   this.parmDict = v;
  },
  updateParmAccent: function(v) {
   //console.log('updateParmAccent value=',v);
   this.parmAccent = v;
  },
  cologne_webtc_url: function() {
  //let url = "https://funderburkjim.pythonanywhere.com/cologne/";
  let url = "https://www.sanskrit-lexicon.uni-koeln.de/scans/";
  let dictyearmap = {"ACC":"2014" , "AE":"2014" , "AP":"2014" , "AP90":"2014",
      "BEN":"2014" , "BHS":"2014" , "BOP":"2014" , "BOR":"2014",
      "BUR":"2013" , "CAE":"2014" , "CCS":"2014" , "GRA":"2014",
      "GST":"2014" , "IEG":"2014" , "INM":"2013" , "KRM":"2014",
      "MCI":"2014" , "MD":"2014" , "MW":"2014" , "MW72":"2014",
      "MWE":"2013" , "PD":"2014" , "PE":"2014" , "PGN":"2014",
      "PUI":"2014" , "PWG":"2013" , "PW":"2014" , "SCH":"2014",
      "SHS":"2014" , "SKD":"2013" , "SNP":"2014" , "STC":"2013",
      "VCP":"2013" , "VEI":"2014" , "WIL":"2014" , "YAT":"2014"};
  if (!dictyearmap.hasOwnProperty(this.parmDict)) {
   this.getdatax_html = `<p>Invalid Dictionary: ${this.parmDict}</p>`;
    return '';
  }
  let year = '2020'; dictyearmap[this.parmDict];
  
  url = `${url}/${this.parmDict}Scan/${year}/web/webtc/getword.php?`;
  url = `${url}key=${this.parmKey}&input=${this.parmInput}&output=${this.parmOutput}&accent=${this.parmAccent}`;
  return url;
  },
  cologne_apidev_url: function () {
  //let url = "https://funderburkjim.pythonanywhere.com/cologne/";
  let url = "https://www.sanskrit-lexicon.uni-koeln.de/scans/";
  url = `${url}awork/apidev/getword.php?`;
  url = `${url}dict=${this.parmDict}&key=${this.parmKey}&input=${this.parmInput}&output=${this.parmOutput}&accent=${this.parmAccent}`;
  return url;
  },
  citationEnter: function(e) {
   // construct getdatax_html value
   this.parmKey = e.target.value;
   // construct url
   let url = this.cologne_apidev_url();
   if (url == ''){return;} // error condition
   console.log('citationEnter: url=',url);
   let self = this;
   axios.get(url)
   .then(function(data) {
    console.log('citationEnter:',data);
    self.getdatax_html = data.data;
   })
   .catch(function (error) {
     // handle error
     //this.console.log(error);
     self.getdatax_html="<p>Error from axios. check console</p>";
   });
  },
  }
});
