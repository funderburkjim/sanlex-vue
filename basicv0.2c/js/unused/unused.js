/* method in app.js, uses webtc/getword url */
methods = {
cologne_webtc_url function() {
let url = "https://funderburkjim.pythonanywhere.com/cologne/";
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
let year = dictyearmap[this.parmDict];
url = `${url}/${this.parmDict}Scan/${year}/web/webtc/getword.php?`;
url = `${url}key=${this.parmKey}&input=${this.parmInput}&output=${this.parmOutput}&accent=${this.parmAccent}`;
return url;
},
};
/* these cookie things have been written into app.js */
/* this is not used. */
CologneDisplays.cookieUpdate = function(flag) {
 // Cookie for holding input, output, accent, dict values;
 // When flag is true, update cookies from corresponding dom values
 // When flag is false, initialize dom values from cookie values,
 //  but use default values if cookie values not present.
 var cookieNames = ['input','output','accent','dict'];
 var domids = ['#input','#output','#accent','#dict'];
 var cookieOptions = {expires: 365, path:'/'}; // 365 days
 var i,cookieName,cookieValue,domid;
 if (flag) { // set values of cookies acc. to 'value' of corresponding ids
  for(i=0;i<cookieNames.length;i++) {
   cookieName=cookieNames[i];
   domid=domids[i];
   cookieValue=$(domid).val();
   $.cookie(cookieName,cookieValue,cookieOptions);
  }
  return;
 }
 // When flag is false. For initializing (a) cookies, and (b) dom values
 var cookieDefaultValues = ['hk','deva','no','mw'];
 for(i=0;i<cookieNames.length;i++) {
  cookieName=cookieNames[i];
  domid=domids[i];
  cookieValue = $.cookie(cookieName); // old value of cookie
  if(! cookieValue) { // cookie not defined.
   cookieValue= cookieDefaultValues[i]; // Use default value
   $.cookie(cookieName,cookieValue,cookieOptions); // and set cook
  }
  // set dom value
  $(domid).val(cookieValue);
 }
};
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
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

function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
           setCookie("username", user, 30);
       }
    }
}
