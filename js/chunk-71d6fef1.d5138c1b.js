(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71d6fef1"],{"790c":function(t,n,o){"use strict";o.r(n);var r=function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("Day",{attrs:{day:3,year:2021,solutions:t.solutions},on:{"input-changed":t.onInputChanged}})},e=[],i=(o("d81d"),o("ac1f"),o("1276"),o("a15b"),o("99af"),o("4de4"),o("d3b7"),o("159b"),o("cb29"),o("4a87")),a={components:{Day:i["default"]},data:function(){return{solutions:{partOne:null,partTwo:null}}},methods:{onInputChanged:function(t){var n=t.map((function(t){return t.split("").map((function(t){return+t}))}));this.solvePartOne(n),this.solvePartTwo(n)},solvePartOne:function(t){var n=this.getBitCount(t),o=parseInt(n.map((function(n){return Math.floor(n/(t.length/2))})).join(""),2),r=parseInt(n.map((function(n){return 1-Math.floor(n/(t.length/2))})).join(""),2);this.solutions.partOne=o*r},solvePartTwo:function(t){for(var n=t.concat(),o=t.concat(),r=0;r<t[0].length;r++){if(n.length>1){var e=this.getBitCount(n),i=Math.floor(e[r]/(n.length/2));n=this.filter(n,i,r)}if(o.length>1){var a=this.getBitCount(o),u=1-Math.floor(a[r]/(o.length/2));o=this.filter(o,u,r)}}this.solutions.partTwo=parseInt(n[0].join(""),2)*parseInt(o[0].join(""),2)},filter:function(t,n,o){var r=[];return t.forEach((function(t,e){t[o]!==n&&r.push(e)})),r.length===t.length&&r.pop(),t.filter((function(t,n){return-1===r.indexOf(n)}))},getBitCount:function(t){return t.reduce((function(t,n){return t.map((function(t,o){return t+n[o]}))}),new Array(t[0].length).fill(0))}}},u=a,l=o("2877"),c=Object(l["a"])(u,r,e,!1,null,null,null);n["default"]=c.exports},"81d5":function(t,n,o){"use strict";var r=o("7b0b"),e=o("23cb"),i=o("07fa");t.exports=function(t){var n=r(this),o=i(n),a=arguments.length,u=e(a>1?arguments[1]:void 0,o),l=a>2?arguments[2]:void 0,c=void 0===l?o:e(l,o);while(c>u)n[u++]=t;return n}},a15b:function(t,n,o){"use strict";var r=o("23e7"),e=o("e330"),i=o("44ad"),a=o("fc6a"),u=o("a640"),l=e([].join),c=i!=Object,f=u("join",",");r({target:"Array",proto:!0,forced:c||!f},{join:function(t){return l(a(this),void 0===t?",":t)}})},cb29:function(t,n,o){var r=o("23e7"),e=o("81d5"),i=o("44d2");r({target:"Array",proto:!0},{fill:e}),i("fill")},d81d:function(t,n,o){"use strict";var r=o("23e7"),e=o("b727").map,i=o("1dde"),a=i("map");r({target:"Array",proto:!0,forced:!a},{map:function(t){return e(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-71d6fef1.d5138c1b.js.map