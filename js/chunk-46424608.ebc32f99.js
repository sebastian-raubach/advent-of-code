(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-46424608"],{"00b4":function(t,e,r){"use strict";r("ac1f");var n=r("23e7"),i=r("da84"),a=r("c65b"),o=r("e330"),u=r("1626"),s=r("861d"),c=function(){var t=!1,e=/[ac]/;return e.exec=function(){return t=!0,/./.exec.apply(this,arguments)},!0===e.test("abc")&&t}(),f=i.Error,l=o(/./.test);n({target:"RegExp",proto:!0,forced:!c},{test:function(t){var e=this.exec;if(!u(e))return l(this,t);var r=a(e,this,t);if(null!==r&&!s(r))throw new f("RegExp exec method returned something other than an Object or null");return!!r}})},"06c5":function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));r("fb6a"),r("d3b7"),r("b0c0"),r("a630"),r("3ca3"),r("ac1f"),r("00b4");var n=r("6b75");function i(t,e){if(t){if("string"===typeof t)return Object(n["a"])(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n["a"])(t,e):void 0}}},"0cb2":function(t,e,r){var n=r("e330"),i=r("7b0b"),a=Math.floor,o=n("".charAt),u=n("".replace),s=n("".slice),c=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,f=/\$([$&'`]|\d{1,2})/g;t.exports=function(t,e,r,n,l,d){var v=r+t.length,h=n.length,p=f;return void 0!==l&&(l=i(l),p=c),u(d,p,(function(i,u){var c;switch(o(u,0)){case"$":return"$";case"&":return t;case"`":return s(e,0,r);case"'":return s(e,v);case"<":c=l[s(u,1,-1)];break;default:var f=+u;if(0===f)return i;if(f>h){var d=a(f/10);return 0===d?i:d<=h?void 0===n[d-1]?o(u,1):n[d-1]+o(u,1):i}c=n[f-1]}return void 0===c?"":c}))}},2909:function(t,e,r){"use strict";r.d(e,"a",(function(){return s}));var n=r("6b75");function i(t){if(Array.isArray(t))return Object(n["a"])(t)}r("a4d3"),r("e01a"),r("d3b7"),r("d28b"),r("3ca3"),r("ddb0"),r("a630");function a(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}var o=r("06c5");function u(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t){return i(t)||a(t)||Object(o["a"])(t)||u()}},"4df4":function(t,e,r){"use strict";var n=r("da84"),i=r("0366"),a=r("c65b"),o=r("7b0b"),u=r("9bdd"),s=r("e95a"),c=r("68ee"),f=r("07fa"),l=r("8418"),d=r("9a1f"),v=r("35a1"),h=n.Array;t.exports=function(t){var e=o(t),r=c(this),n=arguments.length,p=n>1?arguments[1]:void 0,b=void 0!==p;b&&(p=i(p,n>2?arguments[2]:void 0));var g,y,m,x,w,S,k=v(e),O=0;if(!k||this==h&&s(k))for(g=f(e),y=r?new this(g):h(g);g>O;O++)S=b?p(e[O],O):e[O],l(y,O,S);else for(x=d(e,k),w=x.next,y=r?new this:[];!(m=a(w,x)).done;O++)S=b?u(x,p,[m.value,O],!0):m.value,l(y,O,S);return y.length=O,y}},"4ec9":function(t,e,r){"use strict";var n=r("6d61"),i=r("6566");n("Map",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),i)},5319:function(t,e,r){"use strict";var n=r("2ba4"),i=r("c65b"),a=r("e330"),o=r("d784"),u=r("d039"),s=r("825a"),c=r("1626"),f=r("5926"),l=r("50c4"),d=r("577e"),v=r("1d80"),h=r("8aa5"),p=r("dc4a"),b=r("0cb2"),g=r("14c3"),y=r("b622"),m=y("replace"),x=Math.max,w=Math.min,S=a([].concat),k=a([].push),O=a("".indexOf),j=a("".slice),A=function(t){return void 0===t?t:String(t)},E=function(){return"$0"==="a".replace(/./,"$0")}(),$=function(){return!!/./[m]&&""===/./[m]("a","$0")}(),z=!u((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}));o("replace",(function(t,e,r){var a=$?"$":"$0";return[function(t,r){var n=v(this),a=void 0==t?void 0:p(t,m);return a?i(a,t,n,r):i(e,d(n),t,r)},function(t,i){var o=s(this),u=d(t);if("string"==typeof i&&-1===O(i,a)&&-1===O(i,"$<")){var v=r(e,o,u,i);if(v.done)return v.value}var p=c(i);p||(i=d(i));var y=o.global;if(y){var m=o.unicode;o.lastIndex=0}var E=[];while(1){var $=g(o,u);if(null===$)break;if(k(E,$),!y)break;var z=d($[0]);""===z&&(o.lastIndex=h(u,l(o.lastIndex),m))}for(var I="",P=0,T=0;T<E.length;T++){$=E[T];for(var M=d($[0]),C=x(w(f($.index),u.length),0),L=[],_=1;_<$.length;_++)k(L,A($[_]));var F=$.groups;if(p){var R=S([M],L,C,u);void 0!==F&&k(R,F);var D=d(n(i,void 0,R))}else D=b(M,u,C,L,F,i);C>=P&&(I+=j(u,P,C)+D,P=C+M.length)}return I+j(u,P)}]}),!z||!E||$)},6062:function(t,e,r){"use strict";var n=r("6d61"),i=r("6566");n("Set",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),i)},6566:function(t,e,r){"use strict";var n=r("9bf2").f,i=r("7c73"),a=r("e2cc"),o=r("0366"),u=r("19aa"),s=r("2266"),c=r("7dd0"),f=r("2626"),l=r("83ab"),d=r("f183").fastKey,v=r("69f3"),h=v.set,p=v.getterFor;t.exports={getConstructor:function(t,e,r,c){var f=t((function(t,n){u(t,v),h(t,{type:e,index:i(null),first:void 0,last:void 0,size:0}),l||(t.size=0),void 0!=n&&s(n,t[c],{that:t,AS_ENTRIES:r})})),v=f.prototype,b=p(e),g=function(t,e,r){var n,i,a=b(t),o=y(t,e);return o?o.value=r:(a.last=o={index:i=d(e,!0),key:e,value:r,previous:n=a.last,next:void 0,removed:!1},a.first||(a.first=o),n&&(n.next=o),l?a.size++:t.size++,"F"!==i&&(a.index[i]=o)),t},y=function(t,e){var r,n=b(t),i=d(e);if("F"!==i)return n.index[i];for(r=n.first;r;r=r.next)if(r.key==e)return r};return a(v,{clear:function(){var t=this,e=b(t),r=e.index,n=e.first;while(n)n.removed=!0,n.previous&&(n.previous=n.previous.next=void 0),delete r[n.index],n=n.next;e.first=e.last=void 0,l?e.size=0:t.size=0},delete:function(t){var e=this,r=b(e),n=y(e,t);if(n){var i=n.next,a=n.previous;delete r.index[n.index],n.removed=!0,a&&(a.next=i),i&&(i.previous=a),r.first==n&&(r.first=i),r.last==n&&(r.last=a),l?r.size--:e.size--}return!!n},forEach:function(t){var e,r=b(this),n=o(t,arguments.length>1?arguments[1]:void 0);while(e=e?e.next:r.first){n(e.value,e.key,this);while(e&&e.removed)e=e.previous}},has:function(t){return!!y(this,t)}}),a(v,r?{get:function(t){var e=y(this,t);return e&&e.value},set:function(t,e){return g(this,0===t?0:t,e)}}:{add:function(t){return g(this,t=0===t?0:t,t)}}),l&&n(v,"size",{get:function(){return b(this).size}}),f},setStrong:function(t,e,r){var n=e+" Iterator",i=p(e),a=p(n);c(t,e,(function(t,e){h(this,{type:n,target:t,state:i(t),kind:e,last:void 0})}),(function(){var t=a(this),e=t.kind,r=t.last;while(r&&r.removed)r=r.previous;return t.target&&(t.last=r=r?r.next:t.state.first)?"keys"==e?{value:r.key,done:!1}:"values"==e?{value:r.value,done:!1}:{value:[r.key,r.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),r?"entries":"values",!r,!0),f(e)}}},"6b75":function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,"a",(function(){return n}))},"6d61":function(t,e,r){"use strict";var n=r("23e7"),i=r("da84"),a=r("e330"),o=r("94ca"),u=r("6eeb"),s=r("f183"),c=r("2266"),f=r("19aa"),l=r("1626"),d=r("861d"),v=r("d039"),h=r("1c7e"),p=r("d44e"),b=r("7156");t.exports=function(t,e,r){var g=-1!==t.indexOf("Map"),y=-1!==t.indexOf("Weak"),m=g?"set":"add",x=i[t],w=x&&x.prototype,S=x,k={},O=function(t){var e=a(w[t]);u(w,t,"add"==t?function(t){return e(this,0===t?0:t),this}:"delete"==t?function(t){return!(y&&!d(t))&&e(this,0===t?0:t)}:"get"==t?function(t){return y&&!d(t)?void 0:e(this,0===t?0:t)}:"has"==t?function(t){return!(y&&!d(t))&&e(this,0===t?0:t)}:function(t,r){return e(this,0===t?0:t,r),this})},j=o(t,!l(x)||!(y||w.forEach&&!v((function(){(new x).entries().next()}))));if(j)S=r.getConstructor(e,t,g,m),s.enable();else if(o(t,!0)){var A=new S,E=A[m](y?{}:-0,1)!=A,$=v((function(){A.has(1)})),z=h((function(t){new x(t)})),I=!y&&v((function(){var t=new x,e=5;while(e--)t[m](e,e);return!t.has(-0)}));z||(S=e((function(t,e){f(t,w);var r=b(new x,t,S);return void 0!=e&&c(e,r[m],{that:r,AS_ENTRIES:g}),r})),S.prototype=w,w.constructor=S),($||I)&&(O("delete"),O("has"),g&&O("get")),(I||E)&&O(m),y&&w.clear&&delete w.clear}return k[t]=S,n({global:!0,forced:S!=x},k),p(S,t),y||r.setStrong(S,t,g),S}},"9bdd":function(t,e,r){var n=r("825a"),i=r("2a62");t.exports=function(t,e,r,a){try{return a?e(n(r)[0],r[1]):e(r)}catch(o){i(t,"throw",o)}}},a15b:function(t,e,r){"use strict";var n=r("23e7"),i=r("e330"),a=r("44ad"),o=r("fc6a"),u=r("a640"),s=i([].join),c=a!=Object,f=u("join",",");n({target:"Array",proto:!0,forced:c||!f},{join:function(t){return s(o(this),void 0===t?",":t)}})},a630:function(t,e,r){var n=r("23e7"),i=r("4df4"),a=r("1c7e"),o=!a((function(t){Array.from(t)}));n({target:"Array",stat:!0,forced:o},{from:i})},b0c0:function(t,e,r){var n=r("83ab"),i=r("5e77").EXISTS,a=r("e330"),o=r("9bf2").f,u=Function.prototype,s=a(u.toString),c=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,f=a(c.exec),l="name";n&&!i&&o(u,l,{configurable:!0,get:function(){try{return f(c,s(this))[1]}catch(t){return""}}})},caad:function(t,e,r){"use strict";var n=r("23e7"),i=r("4d64").includes,a=r("44d2");n({target:"Array",proto:!0},{includes:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),a("includes")},d28b:function(t,e,r){var n=r("746f");n("iterator")},d81d:function(t,e,r){"use strict";var n=r("23e7"),i=r("b727").map,a=r("1dde"),o=a("map");n({target:"Array",proto:!0,forced:!o},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},e01a:function(t,e,r){"use strict";var n=r("23e7"),i=r("83ab"),a=r("da84"),o=r("e330"),u=r("1a2d"),s=r("1626"),c=r("3a9b"),f=r("577e"),l=r("9bf2").f,d=r("e893"),v=a.Symbol,h=v&&v.prototype;if(i&&s(v)&&(!("description"in h)||void 0!==v().description)){var p={},b=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:f(arguments[0]),e=c(h,this)?new v(t):void 0===t?v():v(t);return""===t&&(p[e]=!0),e};d(b,v),b.prototype=h,h.constructor=b;var g="Symbol(test)"==String(v("test")),y=o(h.toString),m=o(h.valueOf),x=/^Symbol\((.*)\)[^)]+$/,w=o("".replace),S=o("".slice);l(h,"description",{configurable:!0,get:function(){var t=m(this),e=y(t);if(u(p,t))return"";var r=g?S(e,7,-1):w(e,x,"$1");return""===r?void 0:r}}),n({global:!0,forced:!0},{Symbol:b})}},e165:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Day",{attrs:{day:7,year:2018,solutions:t.solutions},on:{"input-changed":t.onInputChanged},scopedSlots:t._u([{key:"partTwo",fn:function(){return[r("b-table",{attrs:{"table-class":"mt-3",items:t.output,"per-page":10,"current-page":t.currentPage}}),r("b-pagination",{attrs:{"total-rows":t.output.length,"per-page":10},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})]},proxy:!0}])})},i=[],a=r("2909"),o=(r("4ec9"),r("d3b7"),r("3ca3"),r("ddb0"),r("6062"),r("159b"),r("ac1f"),r("1276"),r("5319"),r("4e82"),r("4de4"),r("caad"),r("a15b"),r("d81d"),r("a630"),r("4a87")),u={components:{Day:o["default"]},data:function(){return{solutions:{partOne:null,partTwo:null},currentPage:0,output:[]}},methods:{onInputChanged:function(t){var e=this;this.mapping=new Map,this.allLetters=new Set,t.forEach((function(t){var r=t.split(" must be finished before step "),n=r[0].replace("Step ",""),i=r[1].replace(" can begin.","");if(e.allLetters.add(n),e.allLetters.add(i),e.mapping.has(i)){var a=e.mapping.get(i);a.push(n),e.mapping.set(i,a)}else e.mapping.set(i,[n])})),this.solvePartOne(),this.solvePartTwo()},solvePartOne:function(){var t=this,e=new Set(this.allLetters),r=Object(a["a"])(e).filter((function(e){return!t.mapping.has(e)})).sort(),n=[];while(e.size>0){var i=Object(a["a"])(e).filter((function(e){return t.mapping.has(e)&&t.mapping.get(e).every((function(t){return n.includes(t)}))})).sort();i.forEach((function(t){-1===r.indexOf(t)&&r.push(t)})),r.sort();var o=r.shift();n.push(o),e.delete(o)}this.solutions.partOne=n.join("")},solvePartTwo:function(){var t=this;this.output=[];var e,r=new Set(this.allLetters),n=Object(a["a"])(r).filter((function(e){return!t.mapping.has(e)})).sort(),i=[],o=Array.from(Array(5).keys()).map((function(t){return null})),u=0;while(r.size>0||o.some((function(t){return null!==t}))){if(o.forEach((function(t,e){null!==t&&t.second===u&&(i.push(t.letter),o[e]=null)})),e=[],o.forEach((function(t,r){null===t&&e.push(r)})),e.length>0){var s=Object(a["a"])(r).filter((function(e){return t.mapping.has(e)&&t.mapping.get(e).every((function(t){return i.includes(t)}))})).sort();s.forEach((function(t){-1===n.indexOf(t)&&n.push(t)})),n.sort(),e.forEach((function(t){var e=n.shift();e&&(r.delete(e),o[t]={letter:e,second:u+e.charCodeAt(0)-4})}))}this.output.push({second:u,worker1:o[0]?o[0].letter:".",worker2:o[1]?o[1].letter:".",worker3:o[2]?o[2].letter:".",worker4:o[3]?o[3].letter:".",worker5:o[4]?o[4].letter:".",done:i.join("")}),u++}this.solutions.partTwo=u-1}}},s=u,c=r("2877"),f=Object(c["a"])(s,n,i,!1,null,null,null);e["default"]=f.exports}}]);
//# sourceMappingURL=chunk-46424608.ebc32f99.js.map