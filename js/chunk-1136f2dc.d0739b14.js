(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1136f2dc"],{"00b4":function(t,r,e){"use strict";e("ac1f");var n=e("23e7"),a=e("da84"),o=e("c65b"),i=e("e330"),c=e("1626"),u=e("861d"),s=function(){var t=!1,r=/[ac]/;return r.exec=function(){return t=!0,/./.exec.apply(this,arguments)},!0===r.test("abc")&&t}(),f=a.Error,d=i(/./.test);n({target:"RegExp",proto:!0,forced:!s},{test:function(t){var r=this.exec;if(!c(r))return d(this,t);var e=o(r,this,t);if(null!==e&&!u(e))throw new f("RegExp exec method returned something other than an Object or null");return!!e}})},"06c5":function(t,r,e){"use strict";e.d(r,"a",(function(){return a}));e("fb6a"),e("d3b7"),e("b0c0"),e("a630"),e("3ca3"),e("ac1f"),e("00b4");var n=e("6b75");function a(t,r){if(t){if("string"===typeof t)return Object(n["a"])(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?Object(n["a"])(t,r):void 0}}},"0ccb":function(t,r,e){var n=e("e330"),a=e("50c4"),o=e("577e"),i=e("1148"),c=e("1d80"),u=n(i),s=n("".slice),f=Math.ceil,d=function(t){return function(r,e,n){var i,d,l=o(c(r)),p=a(e),h=l.length,b=void 0===n?" ":o(n);return p<=h||""==b?l:(i=p-h,d=u(b,f(i/b.length)),d.length>i&&(d=s(d,0,i)),t?l+d:d+l)}};t.exports={start:d(!1),end:d(!0)}},1148:function(t,r,e){"use strict";var n=e("da84"),a=e("5926"),o=e("577e"),i=e("1d80"),c=n.RangeError;t.exports=function(t){var r=o(i(this)),e="",n=a(t);if(n<0||n==1/0)throw c("Wrong number of repetitions");for(;n>0;(n>>>=1)&&(r+=r))1&n&&(e+=r);return e}},2909:function(t,r,e){"use strict";e.d(r,"a",(function(){return u}));var n=e("6b75");function a(t){if(Array.isArray(t))return Object(n["a"])(t)}e("a4d3"),e("e01a"),e("d3b7"),e("d28b"),e("3ca3"),e("ddb0"),e("a630");function o(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}var i=e("06c5");function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t){return a(t)||o(t)||Object(i["a"])(t)||c()}},"4d90":function(t,r,e){"use strict";var n=e("23e7"),a=e("0ccb").start,o=e("9a0c");n({target:"String",proto:!0,forced:o},{padStart:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},"4df4":function(t,r,e){"use strict";var n=e("da84"),a=e("0366"),o=e("c65b"),i=e("7b0b"),c=e("9bdd"),u=e("e95a"),s=e("68ee"),f=e("07fa"),d=e("8418"),l=e("9a1f"),p=e("35a1"),h=n.Array;t.exports=function(t){var r=i(t),e=s(this),n=arguments.length,b=n>1?arguments[1]:void 0,v=void 0!==b;v&&(b=a(b,n>2?arguments[2]:void 0));var g,y,m,I,S,w,x=p(r),j=0;if(!x||this==h&&u(x))for(g=f(r),y=e?new this(g):h(g);g>j;j++)w=v?b(r[j],j):r[j],d(y,j,w);else for(I=l(r,x),S=I.next,y=e?new this:[];!(m=o(S,I)).done;j++)w=v?c(I,b,[m.value,j],!0):m.value,d(y,j,w);return y.length=j,y}},"6b75":function(t,r,e){"use strict";function n(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}e.d(r,"a",(function(){return n}))},7716:function(t,r,e){"use strict";e.r(r);var n=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("Day",{attrs:{day:16,year:2021,solutions:t.solutions},on:{"input-changed":t.onInputChanged}})},a=[],o=e("2909"),i=(e("d3b7"),e("159b"),e("ac1f"),e("1276"),e("4d90"),e("25f0"),e("d81d"),e("a15b"),e("fb6a"),e("4a87")),c={components:{Day:i["default"]},data:function(){return{solutions:{partOne:null,partTwo:null}}},methods:{onInputChanged:function(t){var r=[];t[0].split("").forEach((function(t){return parseInt(t,16).toString(2).padStart(4,"0").split("").forEach((function(t){return r.push(t)}))}));var e=this.parsePacket(r);this.solutions.partOne=this.sumVersions(e),this.solutions.partTwo=this.getTotal(e)},sumVersions:function(t){var r=this;return t.version+t.packets.map((function(t){return r.sumVersions(t)})).reduce((function(t,r){return t+r}),0)},getTotal:function(t){var r=this,e=t.packets.map((function(t){return r.getTotal(t)}));switch(t.typeId){case 0:return e.reduce((function(t,r){return t+r}),0);case 1:return e.reduce((function(t,r){return t*r}),1);case 2:return Math.min.apply(Math,Object(o["a"])(e));case 3:return Math.max.apply(Math,Object(o["a"])(e));case 4:return t.value;case 5:return e[0]>e[1]?1:0;case 6:return e[0]<e[1]?1:0;case 7:return e[0]===e[1]?1:0;default:return 0}},parsePacket:function(t){var r={version:parseInt(parseInt(t.slice(0,3).join(""),2).toString(10)),typeId:parseInt(parseInt(t.slice(3,6).join(""),2).toString(10)),packets:[],endIndex:0,value:0};switch(r.typeId){case 4:for(var e=t.slice(6,t.length),n=Math.floor(e.length/5),a="",o=0;o<5*n;o+=5)if(a+=e.slice(o+1,o+5).join(""),"0"===e[o])break;r.value=parseInt(parseInt(a,2).toString(10)),r.endIndex=6+o+5;break;default:var i=0===parseInt(t[6]);if(i){var c=parseInt(parseInt(t.slice(7,22).join(""),2).toString(10)),u=0;while(u<c){var s=this.parsePacket(t.slice(22+u,22+c));r.packets.push(s),u+=s.endIndex}r.endIndex=22+u}else{for(var f=parseInt(parseInt(t.slice(7,18).join(""),2).toString(10)),d=0,l=0;l<f;l++){var p=this.parsePacket(t.slice(18+length+d,t.length));r.packets.push(p),d+=p.endIndex}r.endIndex=18+d}break}return r}}},u=c,s=e("2877"),f=Object(s["a"])(u,n,a,!1,null,null,null);r["default"]=f.exports},"9a0c":function(t,r,e){var n=e("342f");t.exports=/Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(n)},"9bdd":function(t,r,e){var n=e("825a"),a=e("2a62");t.exports=function(t,r,e,o){try{return o?r(n(e)[0],e[1]):r(e)}catch(i){a(t,"throw",i)}}},a15b:function(t,r,e){"use strict";var n=e("23e7"),a=e("e330"),o=e("44ad"),i=e("fc6a"),c=e("a640"),u=a([].join),s=o!=Object,f=c("join",",");n({target:"Array",proto:!0,forced:s||!f},{join:function(t){return u(i(this),void 0===t?",":t)}})},a630:function(t,r,e){var n=e("23e7"),a=e("4df4"),o=e("1c7e"),i=!o((function(t){Array.from(t)}));n({target:"Array",stat:!0,forced:i},{from:a})},b0c0:function(t,r,e){var n=e("83ab"),a=e("5e77").EXISTS,o=e("e330"),i=e("9bf2").f,c=Function.prototype,u=o(c.toString),s=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,f=o(s.exec),d="name";n&&!a&&i(c,d,{configurable:!0,get:function(){try{return f(s,u(this))[1]}catch(t){return""}}})},d28b:function(t,r,e){var n=e("746f");n("iterator")},d81d:function(t,r,e){"use strict";var n=e("23e7"),a=e("b727").map,o=e("1dde"),i=o("map");n({target:"Array",proto:!0,forced:!i},{map:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},e01a:function(t,r,e){"use strict";var n=e("23e7"),a=e("83ab"),o=e("da84"),i=e("e330"),c=e("1a2d"),u=e("1626"),s=e("3a9b"),f=e("577e"),d=e("9bf2").f,l=e("e893"),p=o.Symbol,h=p&&p.prototype;if(a&&u(p)&&(!("description"in h)||void 0!==p().description)){var b={},v=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:f(arguments[0]),r=s(h,this)?new p(t):void 0===t?p():p(t);return""===t&&(b[r]=!0),r};l(v,p),v.prototype=h,h.constructor=v;var g="Symbol(test)"==String(p("test")),y=i(h.toString),m=i(h.valueOf),I=/^Symbol\((.*)\)[^)]+$/,S=i("".replace),w=i("".slice);d(h,"description",{configurable:!0,get:function(){var t=m(this),r=y(t);if(c(b,t))return"";var e=g?w(r,7,-1):S(r,I,"$1");return""===e?void 0:e}}),n({global:!0,forced:!0},{Symbol:v})}}}]);
//# sourceMappingURL=chunk-1136f2dc.d0739b14.js.map