(function(e){function t(t){for(var r,a,s=t[0],u=t[1],c=t[2],p=0,f=[];p<s.length;p++)a=s[p],o[a]&&f.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);l&&l(t);while(f.length)f.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,s=1;s<n.length;s++){var u=n[s];0!==o[u]&&(r=!1)}r&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={app:0},i=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var l=u;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"42e0":function(e,t,n){"use strict";var r=n("9913"),o=n.n(r);o.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("main",{attrs:{id:"app"}},[e._m(0),n("div"),n("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"user"}),n("div",{staticClass:"add-input"}),n("div",[e._v("清單")])])}],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("h1",[e._v(e._s(e.msg))]),e._m(0),n("h3",[e._v("Installed CLI Plugins")]),n("br"),n("br"),n("table",{attrs:{align:"center"}},e._l(e.records,function(t,r){return n("tr",{key:r},e._l(t,function(t,r){return n("td",{key:r},[e._v(e._s(t))])}),0)}),0)])},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("\n    For a guide and recipes on how to configure / customize this project,"),n("br"),e._v("\n    check out the\n    "),n("a",{attrs:{href:"https://cli.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-cli documentation")]),e._v(".\n  ")])}],u=(n("ac6a"),{name:"HelloWorld",props:{msg:String},data:function(){return{records:[]}},mounted:function(){this.login()},methods:{login:function(){var e=this;this.$getGapiClient().then(function(t){var n={spreadsheetId:"1fLEQHVFlidjjbqeKwuhE5_H0L7JnAtKRtGUyKLE5kPI",range:"A1:H100",valueRenderOption:"FORMATTED_VALUE",dateTimeRenderOption:"FORMATTED_STRING"};t.client.sheets.spreadsheets.values.get(n).then(function(t){e.records=t.result.values})})}}}),c=u,l=(n("42e0"),n("2877")),p=Object(l["a"])(c,a,s,!1,null,"702a08c8",null),f=p.exports,d={name:"app",components:{HelloWorld:f}},v=d,h=(n("7faf"),Object(l["a"])(v,o,i,!1,null,null,null)),g=h.exports,_=n("1685"),b=n.n(_),m={apiKey:"AIzaSyAY4THLuVYiFhrRAPZCseQDbCO3bxNJD9A",clientId:"624530488961-chtl120tenn14g9i8elqlj5m49888nau.apps.googleusercontent.com",discoveryDocs:["https://sheets.googleapis.com/$discovery/rest?version=v4"],scope:"https://www.googleapis.com/auth/spreadsheets"};r["a"].use(b.a,m),r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(g)}}).$mount("#app")},"7faf":function(e,t,n){"use strict";var r=n("8fba"),o=n.n(r);o.a},"8fba":function(e,t,n){},9913:function(e,t,n){}});
//# sourceMappingURL=app.8f006161.js.map