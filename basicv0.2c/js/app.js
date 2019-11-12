var app = new Vue({
  el: '#app',
  template:`
  <div>
  <h2>Basic Display with two dictionaries</h2>
  <div>
   <div style="display:flex; flex-direction:row; flex-wrap:wrap;">
    <basic0-parm-input v-model="parms.input" v-on:change-parm="updateParmCookies"></basic0-parm-input>
    <basic0-parm-output v-model="parms.output" v-on:change-parm="updateParmCookies"></basic0-parm-output>
    <basic0-parm-accent v-model="parms.accent" v-on:change-parm="updateParmCookies"></basic0-parm-accent>

    <basic0-parm-key v-model="parms.key0" v-on:get-data="getData0"
     place_holder='search word both dictionaries'
     style="height:20px; align-self:flex-end;margin-left:50px;">
    </basic0-parm-key>
   </div>

  </div>
  <div style="display:flex; "> <!-- wrapper for two dictionaries -->
   <div> <!-- dictionary 1 -->
    <div style="display:flex; flex-direction:row;align-items:top;margin-top:5px; justify-content:space-between">
     <!-- parms for first dictionary -->
     <basic0-parm-dict v-model="parms.dict" v-on:change-parm="updateParmCookies" show_label="no"></basic0-parm-dict>
     <basic0-parm-key v-model="parms.key" v-on:get-data="getData"
      place_holder='search word this dictionary'
      style="margin-left:10px; height:20px;">
     </basic0-parm-key>
    </div>
    <div>
     <!-- display for first dictionary -->
     <div :style="style_basic0">
      <basic0-disp>
       <template slot="htmlmsg">
        <div v-html="getdatax_html"></div>
       </template>
      </basic0-disp>
     </div>
    </div>
   </div>  <!-- dictionary 1 -->

   <div > <!-- dictionary 2 -->
    <div style="display:flex; flex-direction:row;align-items:top;margin-top:5px; justify-content:space-between" >
     <!-- parms for second dictionary -->
     <basic0-parm-key v-model="parms.key2" v-on:get-data="getData2"
      place_holder='search word this dictionary'
      style="margin-left:10px; height:20px;">
     </basic0-parm-key>
     <basic0-parm-dict v-model="parms.dict2" v-on:change-parm="updateParmCookies" show_label="no"></basic0-parm-dict>
    </div>
    <div>
     <!-- display for first dictionary -->
     <div :style="style_basic0">
      <basic0-disp>
       <template slot="htmlmsg">
        <div v-html="getdatax2_html"></div>
       </template>
      </basic0-disp>
     </div>
    </div>
   </div>  <!-- dictionary 2 -->

  </div> <!-- wrapper for two dictionaries -->
</div>
  `,

  data: {
    parms: {
      input:'slp1',  // default value. Get from cookies
      output:'deva',
      dict:'MW',
      accent:'no',
      key:'',
      dict2:'MW',
      key2:'',
      key0:''
    },

    getdatax_html:'',
    getdatax2_html:'',
    style_basic0:`
     width:400px;
     max-width: 400px;
     height: 500px;
     overflow: auto;
     margin-top:5px;
     margin-left:10px;
     padding-top:5px;
     border:solid;
     /*border-style:solid;*/
    `,

    style_app_wordlist_div:`
     width:150px;
     border-top:solid;
     margin-top:5px;
     height: 500px;
     border:solid;
     overflow:auto;
    `,
    style_keys:`
     display:flex;
     flex-direction:row;
    `,
    wordlist:{name:'',words:[],'input':''}
  },
  watch: {
    parms: function () {
    }
  },
  methods:{
  updateParmCookies: function() {
    //console.log('updateParmCookies');
    const cnames=['input','output','dict','accent','dict2'];
    cnames.forEach( (cname) =>this.setCookie(cname,this.parms[cname],365));

  },
  changeWordlist: function(v) {
    //console.log('app.changeWordlist. v=',v);
    this.wordlist = v;
  },
  updateParm: function(v,parm){
    //this.parms[parm] = v;
    //this.parms.$set(parm,v);
    Vue.set(this.parms,parm,v);
    this.setCookie(parm,v,365);
  },
  selectWord: function(v) {
    this.updateParm(v,'key');
    this.updateParm(this.wordlist.input,'input');
    this.getData();

  },
  cologne_apidev_url: function () {
  let url = "https://www.sanskrit-lexicon.uni-koeln.de/scans/";
  url = `${url}awork/apidev/getword.php?`;
  url = `${url}dict=${this.parms.dict}&key=${this.parms.key}&input=${this.parms.input}&output=${this.parms.output}&accent=${this.parms.accent}&dispcss=no`;
  //console.log('cologne_apidev_url: ',url);
  return url;
  },
  getData: function() {
    // construct getdatax_html value
    // construct url
    this.getdatax_html=''; // clear initially, so scroll will be at top
    let url = this.cologne_apidev_url();
    if (url == ''){return;} // error condition
    let self = this;
    axios.get(url)
    .then(function(data) {
     //console.log('getData:',data);
     self.getdatax_html = data.data;
    })
    .catch(function (error) {
      // handle error
      this.console.log(error);
      self.getdatax_html="<p>Error from getData. check console</p>";
    });
  },
  cologne_apidev_url2: function () {
  let url = "https://www.sanskrit-lexicon.uni-koeln.de/scans/";
  url = `${url}awork/apidev/getword.php?`;
  url = `${url}dict=${this.parms.dict2}&key=${this.parms.key2}&input=${this.parms.input}&output=${this.parms.output}&accent=${this.parms.accent}&dispcss=no`;
  //console.log('cologne_apidev_url2: ',url);
  return url;
  },
  getData2: function() {
    // construct getdatax2_html value
    // construct url
    this.getdatax2_html=''; // clear initially, so scroll will be at top
    let url = this.cologne_apidev_url2();
    if (url == ''){return;} // error condition
    let self = this;
    axios.get(url)
    .then(function(data) {
     //console.log('getData2:',data);
     self.getdatax2_html = data.data;
    })
    .catch(function (error) {
      // handle error
      this.console.log(error);
      self.getdatax2_html="<p>Error from getData. check console</p>";
    });
  },
  getData0: function() {
    let key0 = this.parms.key0;
    Vue.set(this.parms,'key',key0);
    Vue.set(this.parms,'key2',key0);
    this.getData();
    this.getData2();
  },
  /*
  citationEnter: function(e) {
   this.parms.key = e.target.value;
   this.getData();
  },
  */
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
   let cnames = ['input','output','accent','dict','dict2'];
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
