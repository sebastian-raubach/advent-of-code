(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9f3c2162"],{a434:function(t,e,n){"use strict";var o=n("23e7"),r=n("23cb"),a=n("a691"),i=n("50c4"),s=n("7b0b"),l=n("65f0"),c=n("8418"),u=n("1dde"),f=n("ae40"),h=u("splice"),p=f("splice",{ACCESSORS:!0,0:0,1:2}),d=Math.max,v=Math.min,w=9007199254740991,g="Maximum allowed length exceeded";o({target:"Array",proto:!0,forced:!h||!p},{splice:function(t,e){var n,o,u,f,h,p,C=s(this),m=i(C.length),b=r(t,m),y=arguments.length;if(0===y?n=o=0:1===y?(n=0,o=m-b):(n=y-2,o=v(d(a(e),0),m-b)),m+n-o>w)throw TypeError(g);for(u=l(C,o),f=0;f<o;f++)h=b+f,h in C&&c(u,f,C[h]);if(u.length=o,n<o){for(f=b;f<m-o;f++)h=f+o,p=f+n,h in C?C[p]=C[h]:delete C[p];for(f=m;f>m-o+n;f--)delete C[f-1]}else if(n>o)for(f=m-o;f>b;f--)h=f+o-1,p=f+n-1,h in C?C[p]=C[h]:delete C[p];for(f=0;f<n;f++)C[f+b]=arguments[f+2];return C.length=m-o+n,u}})},eeb0:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Day",{attrs:{day:5,year:2018,solutions:t.solutions},on:{"input-changed":t.onInputChanged}})},r=[],a=(n("99af"),n("4de4"),n("4160"),n("a434"),n("a9e3"),n("ac1f"),n("1276"),n("4a87")),i={components:{Day:a["default"]},data:function(){return{solutions:{partOne:null,partTwo:null}}},methods:{onInputChanged:function(t){this.letters=t[0].split(""),this.solvePartOne(),this.solvePartTwo()},solvePartOne:function(){var t=this.letters.concat();this.solutions.partOne=this.doReaction(t)},solvePartTwo:function(){var t=this,e="abcdefghijklmnopqrstuvwxyz".split(""),n=Number.MAX_VALUE;e.forEach((function(e){var o=t.letters.concat().filter((function(t){return t!==e&&t!==e.toUpperCase()})),r=t.doReaction(o);n=Math.min(n,r)})),this.solutions.partTwo=n},doReaction:function(t){var e=t.length-1;while(e>0)this.canReact(t[e],t[e-1])?(t.splice(e-1,2),e--):e--;return t.length},canReact:function(t,e){if(void 0===t||void 0===e)return!1;var n=this.isUpperCase(t),o=this.isUpperCase(e);return t.toLowerCase()===e.toLowerCase()&&(n&&!o||!n&&o)},isUpperCase:function(t){return t===t.toUpperCase()}}},s=i,l=n("2877"),c=Object(l["a"])(s,o,r,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-9f3c2162.14d20c2c.js.map