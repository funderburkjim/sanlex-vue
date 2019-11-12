var app = new Vue({
  el: '#app',
  template:`
  <div>
  <h2>Basic Display using <i>Vue</i></h2>
  <div :style="style_parms">
   <basic0-parm-input v-bind:initialSelected='parms.input'
    v-on:change-parm="(v) => updateParm(v,'input')"></basic0-parm-input>

   <basic0-parm-output v-bind:initialSelected='parms.output'
    v-on:change-parm="(v) => updateParm(v,'output')"></basic0-parm-output>
   <basic0-parm-accent v-if="false" v-bind:initialSelected='parms.accent'
     v-on:change-parm="(v) => updateParm(v,'accent')"></basic0-parm-accent>
   <basic0-parm-dict v-bind:initialSelected='parms.dict'
    v-on:change-parm="(v) => updateParm(v,'dict')"></basic0-parm-dict>

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
    parms: {
      input:'slp1',  // default value. Get from cookies
      output:'deva',
      dict:'MW',
      accent:'no',
      key:''
    },
    getdatax_html:'',
    style_basic0:`
     max-width: 500px;
     height: 500px;
     overflow: auto;
     margin-top:10px;
     padding-top:5px;
     border-top:solid;
     /*border-style:solid;*/
    `,
    style_parms:`
     display:flex;
     max-width:500px;
     flex-wrap:wrap;
    `
  },
  methods:{
  updateParm: function(v,parm){
    this.parms[parm] = v;
    this.setCookie(parm,v,365);
  },

  cologne_apidev_url: function () {
  let url = "https://www.sanskrit-lexicon.uni-koeln.de/scans/";
  url = `${url}awork/apidev/getword.php?`;
  url = `${url}dict=${this.parms.dict}&key=${this.parms.key}&input=${this.parms.input}&output=${this.parms.output}&accent=${this.parms.accent}`;
  return url;
  },
  citationEnter: function(e) {
   // construct getdatax_html value
   this.parms.key = e.target.value;
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
  setCookie: function(cname,cvalue,exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires=" + d.toGMTString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },

  getCookie: function(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }

},
 created: function () {
   let cnames = ['input','output','accent','dict'];
   for(cname in this.parms) {
     if (cnames.includes(cname)) {
       //console.log('mounted',x,this.parms[x]);
       let cval = this.getCookie(cname);
       //console.log('mounted: cookie value for ',cname,'=',cval);
	     if(cval != '') {
          this.parms[cname] = cval;

	     } else {
         this.setCookie(cname,this.parms[cname],365);
	     }
     }
   }
 }
});
