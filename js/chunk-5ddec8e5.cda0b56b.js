(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5ddec8e5"],{"13d5":function(n,t,e){"use strict";var r=e("23e7"),u=e("d58f").left,o=e("a640"),a=e("ae40"),i=e("2d00"),c=e("605d"),d=o("reduce"),f=a("reduce",{1:0}),s=!c&&i>79&&i<83;r({target:"Array",proto:!0,forced:!d||!f||s},{reduce:function(n){return u(this,n,arguments.length,arguments.length>1?arguments[1]:void 0)}})},af9c:function(n,t,e){"use strict";e.r(t);var r=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("Day",{attrs:{day:1,year:2021,solutions:n.solutions},on:{"input-changed":n.onInputChanged}})},u=[],o=(e("d81d"),e("13d5"),e("fb6a"),e("4a87")),a={components:{Day:o["default"]},data:function(){return{solutions:{partOne:null,partTwo:null}}},methods:{onInputChanged:function(n){var t=n.map((function(n){return+n}));this.solutions.partOne=t.map((function(n,e){return e>0&&n>t[e-1]?1:0})).reduce((function(n,t){return n+t}));for(var e=0,r=1;r<t.length-2;r++){var u=t.slice(r-1,r+2).reduce((function(n,t){return n+t})),o=t.slice(r,r+3).reduce((function(n,t){return n+t}));o>u&&e++}this.solutions.partTwo=e}}},i=a,c=e("2877"),d=Object(c["a"])(i,r,u,!1,null,null,null);t["default"]=d.exports},d58f:function(n,t,e){var r=e("1c0b"),u=e("7b0b"),o=e("44ad"),a=e("50c4"),i=function(n){return function(t,e,i,c){r(e);var d=u(t),f=o(d),s=a(d.length),l=n?s-1:0,p=n?-1:1;if(i<2)while(1){if(l in f){c=f[l],l+=p;break}if(l+=p,n?l<0:s<=l)throw TypeError("Reduce of empty array with no initial value")}for(;n?l>=0:s>l;l+=p)l in f&&(c=e(c,f[l],l,d));return c}};n.exports={left:i(!1),right:i(!0)}},d81d:function(n,t,e){"use strict";var r=e("23e7"),u=e("b727").map,o=e("1dde"),a=e("ae40"),i=o("map"),c=a("map");r({target:"Array",proto:!0,forced:!i||!c},{map:function(n){return u(this,n,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-5ddec8e5.cda0b56b.js.map