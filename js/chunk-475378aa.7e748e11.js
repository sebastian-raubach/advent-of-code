(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-475378aa"],{2909:function(t,r,n){"use strict";function e(t,r){(null==r||r>t.length)&&(r=t.length);for(var n=0,e=new Array(r);n<r;n++)e[n]=t[n];return e}function a(t){if(Array.isArray(t))return e(t)}n.d(r,"a",(function(){return u}));n("a4d3"),n("e01a"),n("d28b"),n("a630"),n("d3b7"),n("3ca3"),n("ddb0");function i(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}n("fb6a"),n("b0c0"),n("25f0");function o(t,r){if(t){if("string"===typeof t)return e(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(t,r):void 0}}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t){return a(t)||i(t)||o(t)||c()}},"3ca3":function(t,r,n){"use strict";var e=n("6547").charAt,a=n("69f3"),i=n("7dd0"),o="String Iterator",c=a.set,u=a.getterFor(o);i(String,"String",(function(t){c(this,{type:o,string:String(t),index:0})}),(function(){var t,r=u(this),n=r.string,a=r.index;return a>=n.length?{value:void 0,done:!0}:(t=e(n,a),r.index+=t.length,{value:t,done:!1})}))},"4df4":function(t,r,n){"use strict";var e=n("0366"),a=n("7b0b"),i=n("9bdd"),o=n("e95a"),c=n("50c4"),u=n("8418"),l=n("35a1");t.exports=function(t){var r,n,s,f,v,d,p=a(t),h="function"==typeof this?this:Array,y=arguments.length,g=y>1?arguments[1]:void 0,b=void 0!==g,m=l(p),S=0;if(b&&(g=e(g,y>2?arguments[2]:void 0,2)),void 0==m||h==Array&&o(m))for(r=c(p.length),n=new h(r);r>S;S++)d=b?g(p[S],S):p[S],u(n,S,d);else for(f=m.call(p),v=f.next,n=new h;!(s=v.call(f)).done;S++)d=b?i(f,g,[s.value,S],!0):s.value,u(n,S,d);return n.length=S,n}},5319:function(t,r,n){"use strict";var e=n("d784"),a=n("825a"),i=n("7b0b"),o=n("50c4"),c=n("a691"),u=n("1d80"),l=n("8aa5"),s=n("14c3"),f=Math.max,v=Math.min,d=Math.floor,p=/\$([$&'`]|\d\d?|<[^>]*>)/g,h=/\$([$&'`]|\d\d?)/g,y=function(t){return void 0===t?t:String(t)};e("replace",2,(function(t,r,n,e){var g=e.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,b=e.REPLACE_KEEPS_$0,m=g?"$":"$0";return[function(n,e){var a=u(this),i=void 0==n?void 0:n[t];return void 0!==i?i.call(n,a,e):r.call(String(a),n,e)},function(t,e){if(!g&&b||"string"===typeof e&&-1===e.indexOf(m)){var i=n(r,t,this,e);if(i.done)return i.value}var u=a(t),d=String(this),p="function"===typeof e;p||(e=String(e));var h=u.global;if(h){var x=u.unicode;u.lastIndex=0}var w=[];while(1){var A=s(u,d);if(null===A)break;if(w.push(A),!h)break;var E=String(A[0]);""===E&&(u.lastIndex=l(d,o(u.lastIndex),x))}for(var $="",I=0,O=0;O<w.length;O++){A=w[O];for(var T=String(A[0]),P=f(v(c(A.index),d.length),0),_=[],k=1;k<A.length;k++)_.push(y(A[k]));var j=A.groups;if(p){var C=[T].concat(_,P,d);void 0!==j&&C.push(j);var M=String(e.apply(void 0,C))}else M=S(T,d,P,_,j,e);P>=I&&($+=d.slice(I,P)+M,I=P+T.length)}return $+d.slice(I)}];function S(t,n,e,a,o,c){var u=e+t.length,l=a.length,s=h;return void 0!==o&&(o=i(o),s=p),r.call(c,s,(function(r,i){var c;switch(i.charAt(0)){case"$":return"$";case"&":return t;case"`":return n.slice(0,e);case"'":return n.slice(u);case"<":c=o[i.slice(1,-1)];break;default:var s=+i;if(0===s)return r;if(s>l){var f=d(s/10);return 0===f?r:f<=l?void 0===a[f-1]?i.charAt(1):a[f-1]+i.charAt(1):r}c=a[s-1]}return void 0===c?"":c}))}}))},"9bdd":function(t,r,n){var e=n("825a"),a=n("2a62");t.exports=function(t,r,n,i){try{return i?r(e(n)[0],n[1]):r(n)}catch(o){throw a(t),o}}},a630:function(t,r,n){var e=n("23e7"),a=n("4df4"),i=n("1c7e"),o=!i((function(t){Array.from(t)}));e({target:"Array",stat:!0,forced:o},{from:a})},b0c0:function(t,r,n){var e=n("83ab"),a=n("9bf2").f,i=Function.prototype,o=i.toString,c=/^\s*function ([^ (]*)/,u="name";e&&!(u in i)&&a(i,u,{configurable:!0,get:function(){try{return o.call(this).match(c)[1]}catch(t){return""}}})},d28b:function(t,r,n){var e=n("746f");e("iterator")},d45f:function(t,r,n){"use strict";n.r(r);var e=function(){var t=this,r=t.$createElement,n=t._self._c||r;return n("Day",{attrs:{day:9,year:2018,solutions:t.solutions},on:{"input-changed":t.onInputChanged}})},a=[],i=(n("a630"),n("d81d"),n("d3b7"),n("ac1f"),n("3ca3"),n("5319"),n("1276"),n("ddb0"),n("2909")),o=n("4a87"),c={components:{Day:o["default"]},data:function(){return{solutions:{partOne:null,partTwo:null}}},methods:{onInputChanged:function(t){var r=t[0].split(" players; last marble is worth ");this.players=+r[0],this.count=+r[1].replace(" points",""),this.solvePartOne(),this.solvePartTwo()},solvePartOne:function(){this.solutions.partOne=this.play(this.players,this.count)},solvePartTwo:function(){this.solutions.partTwo=this.play(this.players,100*this.count)},play:function(t,r){var n=Array.from(Array(t).keys()).map((function(t){return 0})),e=0,a=0,o={value:a};o.next=o,o.prev=o,a++;while(a<r){if(a%23===0){n[e]+=a;var c=o.prev.prev.prev.prev.prev.prev.prev,u=c.prev,l=c.next;u.next=l,l.prev=u,c.next=null,c.prev=null,n[e]+=c.value,o=l}else{var s=o.next,f=o.next.next;o={value:a,prev:s,next:f},s.next=o,f.prev=o}e=(e+1)%this.players,a++}return Math.max.apply(Math,Object(i["a"])(n))}}},u=c,l=n("2877"),s=Object(l["a"])(u,e,a,!1,null,null,null);r["default"]=s.exports},d81d:function(t,r,n){"use strict";var e=n("23e7"),a=n("b727").map,i=n("1dde"),o=n("ae40"),c=i("map"),u=o("map");e({target:"Array",proto:!0,forced:!c||!u},{map:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},ddb0:function(t,r,n){var e=n("da84"),a=n("fdbc"),i=n("e260"),o=n("9112"),c=n("b622"),u=c("iterator"),l=c("toStringTag"),s=i.values;for(var f in a){var v=e[f],d=v&&v.prototype;if(d){if(d[u]!==s)try{o(d,u,s)}catch(h){d[u]=s}if(d[l]||o(d,l,f),a[f])for(var p in i)if(d[p]!==i[p])try{o(d,p,i[p])}catch(h){d[p]=i[p]}}}},e01a:function(t,r,n){"use strict";var e=n("23e7"),a=n("83ab"),i=n("da84"),o=n("5135"),c=n("861d"),u=n("9bf2").f,l=n("e893"),s=i.Symbol;if(a&&"function"==typeof s&&(!("description"in s.prototype)||void 0!==s().description)){var f={},v=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),r=this instanceof v?new s(t):void 0===t?s():s(t);return""===t&&(f[r]=!0),r};l(v,s);var d=v.prototype=s.prototype;d.constructor=v;var p=d.toString,h="Symbol(test)"==String(s("test")),y=/^Symbol\((.*)\)[^)]+$/;u(d,"description",{configurable:!0,get:function(){var t=c(this)?this.valueOf():this,r=p.call(t);if(o(f,t))return"";var n=h?r.slice(7,-1):r.replace(y,"$1");return""===n?void 0:n}}),e({global:!0,forced:!0},{Symbol:v})}}}]);
//# sourceMappingURL=chunk-475378aa.7e748e11.js.map