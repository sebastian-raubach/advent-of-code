(function(e){function n(n){for(var t,a,o=n[0],f=n[1],d=n[2],h=0,i=[];h<o.length;h++)a=o[h],Object.prototype.hasOwnProperty.call(u,a)&&u[a]&&i.push(u[a][0]),u[a]=0;for(t in f)Object.prototype.hasOwnProperty.call(f,t)&&(e[t]=f[t]);b&&b(n);while(i.length)i.shift()();return r.push.apply(r,d||[]),c()}function c(){for(var e,n=0;n<r.length;n++){for(var c=r[n],t=!0,a=1;a<c.length;a++){var o=c[a];0!==u[o]&&(t=!1)}t&&(r.splice(n--,1),e=f(f.s=c[0]))}return e}var t={},a={app:0},u={app:0},r=[];function o(e){return f.p+"js/"+({about:"about",home:"home",stats:"stats"}[e]||e)+"."+{about:"31200e5b","chunk-1e854d34":"3668f0e8","chunk-464f88b3":"2a2920ec","chunk-5421e6bc":"f89fc6dd","chunk-0c36932c":"f2631622","chunk-0c639339":"8a4ec078","chunk-0e72635c":"e68c88ab","chunk-210fcce8":"6c8e25f5","chunk-24e26d46":"dea1b71c","chunk-2805cb79":"b7f10539","chunk-2c2e385c":"5f665d4e","chunk-33999342":"3593c33a","chunk-3967334c":"5ee734b9","chunk-399f1a00":"b17deda4","chunk-42aa9a1a":"2081d02a","chunk-43ee1e67":"bbe055fe","chunk-49402242":"8eb9ecd4","chunk-4fa80bc2":"691512b7","chunk-5210664e":"1df1038a","chunk-5b7894a2":"93379390","chunk-64ac0f6a":"6bb47d76","chunk-687e0fba":"460dd3d3","chunk-6f16fd4e":"11c524d5","chunk-72b7b4b6":"f2162a80","chunk-72b9d4ab":"316f3dd6","chunk-72edb14e":"558201fc","chunk-7646f720":"9ce72d6a","chunk-7d0886b0":"6f6329d1","chunk-7e4c1dea":"a7c84126","chunk-7eb75461":"c1c619ff","chunk-9f3c2162":"cf8a09c2","chunk-a837db1e":"60c7605d","chunk-b1dad3fa":"6ef2aad2","chunk-d8e41800":"4d216af8","chunk-e0f771f2":"221e071d","chunk-f1012cdc":"f2a5f0b0","chunk-f19085c4":"ff9cdfd7",home:"52cf124e",stats:"25ce4e2b"}[e]+".js"}function f(n){if(t[n])return t[n].exports;var c=t[n]={i:n,l:!1,exports:{}};return e[n].call(c.exports,c,c.exports,f),c.l=!0,c.exports}f.e=function(e){var n=[],c={"chunk-1e854d34":1,"chunk-464f88b3":1,"chunk-2c2e385c":1,"chunk-64ac0f6a":1,"chunk-6f16fd4e":1,"chunk-d8e41800":1,home:1,stats:1};a[e]?n.push(a[e]):0!==a[e]&&c[e]&&n.push(a[e]=new Promise((function(n,c){for(var t="css/"+({about:"about",home:"home",stats:"stats"}[e]||e)+"."+{about:"31d6cfe0","chunk-1e854d34":"10133cdb","chunk-464f88b3":"a253aeeb","chunk-5421e6bc":"31d6cfe0","chunk-0c36932c":"31d6cfe0","chunk-0c639339":"31d6cfe0","chunk-0e72635c":"31d6cfe0","chunk-210fcce8":"31d6cfe0","chunk-24e26d46":"31d6cfe0","chunk-2805cb79":"31d6cfe0","chunk-2c2e385c":"a8f40523","chunk-33999342":"31d6cfe0","chunk-3967334c":"31d6cfe0","chunk-399f1a00":"31d6cfe0","chunk-42aa9a1a":"31d6cfe0","chunk-43ee1e67":"31d6cfe0","chunk-49402242":"31d6cfe0","chunk-4fa80bc2":"31d6cfe0","chunk-5210664e":"31d6cfe0","chunk-5b7894a2":"31d6cfe0","chunk-64ac0f6a":"11899214","chunk-687e0fba":"31d6cfe0","chunk-6f16fd4e":"4a6df258","chunk-72b7b4b6":"31d6cfe0","chunk-72b9d4ab":"31d6cfe0","chunk-72edb14e":"31d6cfe0","chunk-7646f720":"31d6cfe0","chunk-7d0886b0":"31d6cfe0","chunk-7e4c1dea":"31d6cfe0","chunk-7eb75461":"31d6cfe0","chunk-9f3c2162":"31d6cfe0","chunk-a837db1e":"31d6cfe0","chunk-b1dad3fa":"31d6cfe0","chunk-d8e41800":"17a065ba","chunk-e0f771f2":"31d6cfe0","chunk-f1012cdc":"31d6cfe0","chunk-f19085c4":"31d6cfe0",home:"1e4ef262",stats:"678253c8"}[e]+".css",u=f.p+t,r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var d=r[o],h=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(h===t||h===u))return n()}var i=document.getElementsByTagName("style");for(o=0;o<i.length;o++){d=i[o],h=d.getAttribute("data-href");if(h===t||h===u)return n()}var b=document.createElement("link");b.rel="stylesheet",b.type="text/css",b.onload=n,b.onerror=function(n){var t=n&&n.target&&n.target.src||u,r=new Error("Loading CSS chunk "+e+" failed.\n("+t+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=t,delete a[e],b.parentNode.removeChild(b),c(r)},b.href=u;var s=document.getElementsByTagName("head")[0];s.appendChild(b)})).then((function(){a[e]=0})));var t=u[e];if(0!==t)if(t)n.push(t[2]);else{var r=new Promise((function(n,c){t=u[e]=[n,c]}));n.push(t[2]=r);var d,h=document.createElement("script");h.charset="utf-8",h.timeout=120,f.nc&&h.setAttribute("nonce",f.nc),h.src=o(e);var i=new Error;d=function(n){h.onerror=h.onload=null,clearTimeout(b);var c=u[e];if(0!==c){if(c){var t=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;i.message="Loading chunk "+e+" failed.\n("+t+": "+a+")",i.name="ChunkLoadError",i.type=t,i.request=a,c[1](i)}u[e]=void 0}};var b=setTimeout((function(){d({type:"timeout",target:h})}),12e4);h.onerror=h.onload=d,document.head.appendChild(h)}return Promise.all(n)},f.m=e,f.c=t,f.d=function(e,n,c){f.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:c})},f.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},f.t=function(e,n){if(1&n&&(e=f(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(f.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)f.d(c,t,function(n){return e[n]}.bind(null,t));return c},f.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return f.d(n,"a",n),n},f.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},f.p="",f.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],h=d.push.bind(d);d.push=n,d=d.slice();for(var i=0;i<d.length;i++)n(d[i]);var b=h;r.push([0,"chunk-vendors"]),c()})({0:function(e,n,c){e.exports=c("56d7")},"0f13":function(e,n,c){var t={"./2018/Day1.vue":["5244","chunk-5421e6bc","chunk-5210664e"],"./2018/Day2.vue":["5d41","chunk-5421e6bc","chunk-72b9d4ab"],"./2018/Day3.vue":["b242","chunk-5421e6bc","chunk-210fcce8"],"./2018/Day4.vue":["5e40","chunk-5421e6bc","chunk-f19085c4"],"./2018/Day5.vue":["eeb0","chunk-5421e6bc","chunk-9f3c2162"],"./2018/Day6.vue":["c909","chunk-5421e6bc","chunk-5b7894a2"],"./2018/Day7.vue":["e165","chunk-5421e6bc","chunk-0e72635c"],"./2018/Day8.vue":["c3ec","chunk-5421e6bc","chunk-33999342"],"./2020/Day1.vue":["d6e2","chunk-5421e6bc","chunk-a837db1e"],"./2020/Day10.vue":["11b5","chunk-5421e6bc","chunk-7eb75461"],"./2020/Day11.vue":["fb6a7","chunk-5421e6bc","chunk-64ac0f6a"],"./2020/Day12.vue":["956d","chunk-5421e6bc","chunk-2c2e385c"],"./2020/Day13.vue":["78d9","chunk-5421e6bc","chunk-42aa9a1a"],"./2020/Day14.vue":["4e74","chunk-5421e6bc","chunk-399f1a00"],"./2020/Day15.vue":["508f","chunk-5421e6bc","chunk-e0f771f2"],"./2020/Day16.vue":["0842","chunk-5421e6bc","chunk-72edb14e"],"./2020/Day17.vue":["c054","chunk-5421e6bc","chunk-49402242"],"./2020/Day18.vue":["4678","chunk-5421e6bc","chunk-b1dad3fa"],"./2020/Day19.vue":["b21d","chunk-5421e6bc","chunk-4fa80bc2"],"./2020/Day2.vue":["68e9","chunk-5421e6bc","chunk-3967334c"],"./2020/Day20.vue":["9aaa","chunk-5421e6bc","chunk-6f16fd4e"],"./2020/Day21.vue":["f8cb","chunk-5421e6bc","chunk-2805cb79"],"./2020/Day22.vue":["fea3","chunk-5421e6bc","chunk-0c639339"],"./2020/Day23.vue":["233e","chunk-5421e6bc","chunk-24e26d46"],"./2020/Day24.vue":["7e90","chunk-5421e6bc","chunk-7d0886b0"],"./2020/Day25.vue":["bdc6","chunk-5421e6bc","chunk-72b7b4b6"],"./2020/Day3.vue":["617a","chunk-5421e6bc","chunk-d8e41800"],"./2020/Day4.vue":["67f5","chunk-5421e6bc","chunk-7646f720"],"./2020/Day5.vue":["97b7","chunk-5421e6bc","chunk-0c36932c"],"./2020/Day6.vue":["0ec0","chunk-5421e6bc","chunk-f1012cdc"],"./2020/Day7.vue":["6a7f","chunk-5421e6bc","chunk-43ee1e67"],"./2020/Day8.vue":["9bd1","chunk-5421e6bc","chunk-687e0fba"],"./2020/Day9.vue":["80e2","chunk-5421e6bc","chunk-7e4c1dea"],"./Day.vue":["4a87","chunk-5421e6bc"]};function a(e){if(!c.o(t,e))return Promise.resolve().then((function(){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}));var n=t[e],a=n[0];return Promise.all(n.slice(1).map(c.e)).then((function(){return c(a)}))}a.keys=function(){return Object.keys(t)},a.id="0f13",e.exports=a},"56d7":function(e,n,c){"use strict";c.r(n);c("e260"),c("e6cf"),c("cca6"),c("a79d");var t=c("a026"),a=function(){var e=this,n=e.$createElement,c=e._self._c||n;return c("div",{attrs:{id:"app"}},[c("b-navbar",{attrs:{toggleable:"lg",type:"dark",variant:"primary"}},[c("b-navbar-brand",{staticClass:"d-flex align-items-center",attrs:{to:{name:"home"}}},[e._v(" Advent of Code ")]),c("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),c("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[c("b-navbar-nav",e._l(e.years,(function(n){return c("b-nav-item",{key:"year-"+n,attrs:{to:{name:"year-"+n}}},[e._v(e._s(n))])})),1),c("b-navbar-nav",{staticClass:"ml-auto"},[c("b-nav-form",{on:{submit:function(e){e.preventDefault()}}},[c("b-form-checkbox",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:e.editingEnabled?"Disable editing":"Enable editing",expression:"editingEnabled ? 'Disable editing' : 'Enable editing'"}],attrs:{switch:""},model:{value:e.localEditingEnabled,callback:function(n){e.localEditingEnabled=n},expression:"localEditingEnabled"}})],1),c("b-nav-item",{attrs:{to:{name:"json-parser"}}},[e._v("Stats")]),c("b-nav-item",{attrs:{to:{name:"about"}}},[e._v("About")])],1)],1)],1),c("b-container",{staticClass:"mt-3"},[c("router-view",{key:e.$route.path})],1)],1)},u=[],r=(c("b64b"),c("5530")),o=c("2f62"),f={data:function(){return{localEditingEnabled:!1}},computed:Object(r["a"])(Object(r["a"])({},Object(o["b"])(["currentDay","editingEnabled"])),{},{years:function(){return Object.keys(this.currentDay).sort((function(e,n){return n-e}))}}),watch:{editingEnabled:function(e){this.localEditingEnabled=e},localEditingEnabled:function(e){this.onEditingChanged()}},methods:{onEditingChanged:function(){var e=this;!0===this.localEditingEnabled?this.$bvModal.msgBoxConfirm("I'm assuming you aren't using this to cheat... Enable anyway?",{okTitle:"Yes",cancelTitle:"No"}).then((function(n){!0===n?e.$store.dispatch("setEditingEnabled",!0):e.localEditingEnabled=!1})):this.$store.dispatch("setEditingEnabled",!1)}},mounted:function(){this.localEditingEnabled=this.editingEnabled}},d=f,h=(c("5c0b"),c("2877")),i=Object(h["a"])(d,a,u,!1,null,null,null),b=i.exports,s=(c("99af"),c("4160"),c("d3b7"),c("159b"),c("8c4f"));t["default"].use(o["a"]);var l=new o["a"].Store({state:{editingEnabled:!1,currentDay:{2018:8,2020:25}},getters:{editingEnabled:function(e){return e.editingEnabled},currentDay:function(e){return e.currentDay}},mutations:{ON_EDITING_ENABLED_CHANGED_MUTATION:function(e,n){e.editingEnabled=n}},actions:{setEditingEnabled:function(e,n){var c=e.commit;c("ON_EDITING_ENABLED_CHANGED_MUTATION",n)}},modules:{}});t["default"].use(s["a"]);var k=[{path:"/",name:"home",component:function(){return c.e("home").then(c.bind(null,"bb51"))}},{path:"/about",name:"about",component:function(){return c.e("about").then(c.bind(null,"f820"))}},{path:"/stats",name:"json-parser",component:function(){return c.e("stats").then(c.bind(null,"6af9"))}}];Object.keys(l.getters.currentDay).forEach((function(e){k.push({path:"/".concat(e),name:"year-".concat(e),component:function(){return c("b163")("./Year".concat(e,".vue"))}});for(var n=function(n){k.push({path:"/".concat(e,"/").concat(n),name:"year-".concat(e,"-day-").concat(n),component:function(){return c("0f13")("./".concat(e,"/Day").concat(n,".vue"))}})},t=1;t<=l.getters.currentDay[e];t++)n(t)}));var v=new s["a"]({mode:"hash",routes:k}),p=v,y=(c("fb6a"),c("ac1f"),c("25f0"),{methods:{createColorGradient:function(e,n,c){for(var t=this.hexToRgb(e),a=this.hexToRgb(n),u=[],r=0;r<c;r++){var o=r/(c-1);u.push(this.rgbToHex(Math.floor(t.r+o*(a.r-t.r)),Math.floor(t.g+o*(a.g-t.g)),Math.floor(t.b+o*(a.b-t.b))))}return u},hexToRgb:function(e){var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16)}:null},rgbToHex:function(e,n,c){return"#"+((1<<24)+(e<<16)+(n<<8)+c).toString(16).slice(1)}}}),m=c("5f5b"),g=c("d273");t["default"].use(g["a"]),t["default"].use(m["a"]),t["default"].mixin(y),t["default"].config.productionTip=!1,t["default"].use({install:function(e){e.prototype.$plotly=c("d0f4"),window.Plotly=e.prototype.$plotly}}),new t["default"]({router:p,store:l,render:function(e){return e(b)}}).$mount("#app")},"5c0b":function(e,n,c){"use strict";c("9c0c")},"9c0c":function(e,n,c){},b163:function(e,n,c){var t={"./Year2018.vue":["caa5","chunk-1e854d34"],"./Year2020.vue":["0fe7","chunk-464f88b3"]};function a(e){if(!c.o(t,e))return Promise.resolve().then((function(){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}));var n=t[e],a=n[0];return c.e(n[1]).then((function(){return c(a)}))}a.keys=function(){return Object.keys(t)},a.id="b163",e.exports=a},d0f4:function(e,n,c){var t=c("c17d");t.register([c("3d30")]),e.exports=t}});
//# sourceMappingURL=app.81877cf9.js.map