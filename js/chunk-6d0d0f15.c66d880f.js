(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6d0d0f15"],{"00b4":function(t,n,e){"use strict";e("ac1f");var r=e("23e7"),i=e("da84"),a=e("c65b"),o=e("e330"),u=e("1626"),c=e("861d"),s=function(){var t=!1,n=/[ac]/;return n.exec=function(){return t=!0,/./.exec.apply(this,arguments)},!0===n.test("abc")&&t}(),f=i.Error,d=o(/./.test);r({target:"RegExp",proto:!0,forced:!s},{test:function(t){var n=this.exec;if(!u(n))return d(this,t);var e=a(n,this,t);if(null!==e&&!c(e))throw new f("RegExp exec method returned something other than an Object or null");return!!e}})},"06c5":function(t,n,e){"use strict";e.d(n,"a",(function(){return i}));e("fb6a"),e("d3b7"),e("b0c0"),e("a630"),e("3ca3"),e("ac1f"),e("00b4");var r=e("6b75");function i(t,n){if(t){if("string"===typeof t)return Object(r["a"])(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?Object(r["a"])(t,n):void 0}}},3835:function(t,n,e){"use strict";function r(t){if(Array.isArray(t))return t}e.d(n,"a",(function(){return u}));e("a4d3"),e("e01a"),e("d3b7"),e("d28b"),e("3ca3"),e("ddb0");function i(t,n){var e=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=e){var r,i,a=[],o=!0,u=!1;try{for(e=e.call(t);!(o=(r=e.next()).done);o=!0)if(a.push(r.value),n&&a.length===n)break}catch(c){u=!0,i=c}finally{try{o||null==e["return"]||e["return"]()}finally{if(u)throw i}}return a}}var a=e("06c5");function o(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t,n){return r(t)||i(t,n)||Object(a["a"])(t,n)||o()}},"4df4":function(t,n,e){"use strict";var r=e("da84"),i=e("0366"),a=e("c65b"),o=e("7b0b"),u=e("9bdd"),c=e("e95a"),s=e("68ee"),f=e("07fa"),d=e("8418"),l=e("9a1f"),v=e("35a1"),h=r.Array;t.exports=function(t){var n=o(t),e=s(this),r=arguments.length,p=r>1?arguments[1]:void 0,x=void 0!==p;x&&(p=i(p,r>2?arguments[2]:void 0));var y,b,M,g,m,w,z=v(n),S=0;if(!z||this==h&&c(z))for(y=f(n),b=e?new this(y):h(y);y>S;S++)w=x?p(n[S],S):n[S],d(b,S,w);else for(g=l(n,z),m=g.next,b=e?new this:[];!(M=a(m,g)).done;S++)w=x?u(g,p,[M.value,S],!0):M.value,d(b,S,w);return b.length=S,b}},6062:function(t,n,e){"use strict";var r=e("6d61"),i=e("6566");r("Set",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),i)},6566:function(t,n,e){"use strict";var r=e("9bf2").f,i=e("7c73"),a=e("e2cc"),o=e("0366"),u=e("19aa"),c=e("2266"),s=e("7dd0"),f=e("2626"),d=e("83ab"),l=e("f183").fastKey,v=e("69f3"),h=v.set,p=v.getterFor;t.exports={getConstructor:function(t,n,e,s){var f=t((function(t,r){u(t,v),h(t,{type:n,index:i(null),first:void 0,last:void 0,size:0}),d||(t.size=0),void 0!=r&&c(r,t[s],{that:t,AS_ENTRIES:e})})),v=f.prototype,x=p(n),y=function(t,n,e){var r,i,a=x(t),o=b(t,n);return o?o.value=e:(a.last=o={index:i=l(n,!0),key:n,value:e,previous:r=a.last,next:void 0,removed:!1},a.first||(a.first=o),r&&(r.next=o),d?a.size++:t.size++,"F"!==i&&(a.index[i]=o)),t},b=function(t,n){var e,r=x(t),i=l(n);if("F"!==i)return r.index[i];for(e=r.first;e;e=e.next)if(e.key==n)return e};return a(v,{clear:function(){var t=this,n=x(t),e=n.index,r=n.first;while(r)r.removed=!0,r.previous&&(r.previous=r.previous.next=void 0),delete e[r.index],r=r.next;n.first=n.last=void 0,d?n.size=0:t.size=0},delete:function(t){var n=this,e=x(n),r=b(n,t);if(r){var i=r.next,a=r.previous;delete e.index[r.index],r.removed=!0,a&&(a.next=i),i&&(i.previous=a),e.first==r&&(e.first=i),e.last==r&&(e.last=a),d?e.size--:n.size--}return!!r},forEach:function(t){var n,e=x(this),r=o(t,arguments.length>1?arguments[1]:void 0);while(n=n?n.next:e.first){r(n.value,n.key,this);while(n&&n.removed)n=n.previous}},has:function(t){return!!b(this,t)}}),a(v,e?{get:function(t){var n=b(this,t);return n&&n.value},set:function(t,n){return y(this,0===t?0:t,n)}}:{add:function(t){return y(this,t=0===t?0:t,t)}}),d&&r(v,"size",{get:function(){return x(this).size}}),f},setStrong:function(t,n,e){var r=n+" Iterator",i=p(n),a=p(r);s(t,n,(function(t,n){h(this,{type:r,target:t,state:i(t),kind:n,last:void 0})}),(function(){var t=a(this),n=t.kind,e=t.last;while(e&&e.removed)e=e.previous;return t.target&&(t.last=e=e?e.next:t.state.first)?"keys"==n?{value:e.key,done:!1}:"values"==n?{value:e.value,done:!1}:{value:[e.key,e.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),e?"entries":"values",!e,!0),f(n)}}},"6b75":function(t,n,e){"use strict";function r(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}e.d(n,"a",(function(){return r}))},"6d61":function(t,n,e){"use strict";var r=e("23e7"),i=e("da84"),a=e("e330"),o=e("94ca"),u=e("6eeb"),c=e("f183"),s=e("2266"),f=e("19aa"),d=e("1626"),l=e("861d"),v=e("d039"),h=e("1c7e"),p=e("d44e"),x=e("7156");t.exports=function(t,n,e){var y=-1!==t.indexOf("Map"),b=-1!==t.indexOf("Weak"),M=y?"set":"add",g=i[t],m=g&&g.prototype,w=g,z={},S=function(t){var n=a(m[t]);u(m,t,"add"==t?function(t){return n(this,0===t?0:t),this}:"delete"==t?function(t){return!(b&&!l(t))&&n(this,0===t?0:t)}:"get"==t?function(t){return b&&!l(t)?void 0:n(this,0===t?0:t)}:"has"==t?function(t){return!(b&&!l(t))&&n(this,0===t?0:t)}:function(t,e){return n(this,0===t?0:t,e),this})},E=o(t,!d(g)||!(b||m.forEach&&!v((function(){(new g).entries().next()}))));if(E)w=e.getConstructor(n,t,y,M),c.enable();else if(o(t,!0)){var k=new w,O=k[M](b?{}:-0,1)!=k,A=v((function(){k.has(1)})),j=h((function(t){new g(t)})),I=!b&&v((function(){var t=new g,n=5;while(n--)t[M](n,n);return!t.has(-0)}));j||(w=n((function(t,n){f(t,m);var e=x(new g,t,w);return void 0!=n&&s(n,e[M],{that:e,AS_ENTRIES:y}),e})),w.prototype=m,m.constructor=w),(A||I)&&(S("delete"),S("has"),y&&S("get")),(I||O)&&S(M),b&&m.clear&&delete m.clear}return z[t]=w,r({global:!0,forced:w!=g},z),p(w,t),b||e.setStrong(w,t,y),w}},"802b":function(t,n,e){"use strict";e.r(n);var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("Day",{attrs:{day:22,year:2021,solutions:t.solutions},on:{"input-changed":t.onInputChanged}})},i=[],a=e("3835"),o=(e("d3b7"),e("6062"),e("3ca3"),e("ddb0"),e("159b"),e("ac1f"),e("1276"),e("d81d"),e("99af"),e("4a87")),u={components:{Day:o["default"]},data:function(){return{solutions:{partOne:null,partTwo:null}}},methods:{onInputChanged:function(t){var n=this,e=new Set,r=[];t.forEach((function(t){var n=t.split(" "),i=Object(a["a"])(n,2),o=i[0],u=i[1],c=u.split(",").map((function(t){return t.split("=")[1].split("..").map((function(t){return+t}))}));if(c[0][1]<-50||c[0][0]>50||c[1][1]<-50||c[1][0]>50||c[2][1]<-50||c[2][0]>50);else for(var s=c[0][0];s<=c[0][1];s++)for(var f=c[1][0];f<=c[1][1];f++)for(var d=c[2][0];d<=c[2][1];d++)if(s>=-50&&s<=50&&f>=-50&&f<=50&&d>=-50&&d<=50){var l="".concat(s,",").concat(f,",").concat(d);"on"!==o||e.has(l)?"off"===o&&e.has(l)&&e.delete(l):e.add(l)}r.push({on:"on"===o,xMin:c[0][0],xMax:c[0][1],yMin:c[1][0],yMax:c[1][1],zMin:c[2][0],zMax:c[2][1]})})),this.solutions.partOne=e.size;var i=[];r.forEach((function(t){var e=[];t.on&&e.push(t),i.forEach((function(r){var i=n.intersect(t,r,!r.on);i&&e.push(i)})),i=i.concat(e)})),this.solutions.partTwo=i.reduce((function(t,e){return t+n.volume(e)*(e.on?1:-1)}),0)},volume:function(t){return(t.xMax-t.xMin+1)*(t.yMax-t.yMin+1)*(t.zMax-t.zMin+1)},intersect:function(t,n,e){return t.xMin>n.xMax||t.xMax<n.xMin||t.yMin>n.yMax||t.yMax<n.yMin||t.zMin>n.zMax||t.zMax<n.zMin?null:{on:e,xMin:Math.max(t.xMin,n.xMin),xMax:Math.min(t.xMax,n.xMax),yMin:Math.max(t.yMin,n.yMin),yMax:Math.min(t.yMax,n.yMax),zMin:Math.max(t.zMin,n.zMin),zMax:Math.min(t.zMax,n.zMax)}}}},c=u,s=e("2877"),f=Object(s["a"])(c,r,i,!1,null,"286c6400",null);n["default"]=f.exports},"9bdd":function(t,n,e){var r=e("825a"),i=e("2a62");t.exports=function(t,n,e,a){try{return a?n(r(e)[0],e[1]):n(e)}catch(o){i(t,"throw",o)}}},a630:function(t,n,e){var r=e("23e7"),i=e("4df4"),a=e("1c7e"),o=!a((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:o},{from:i})},b0c0:function(t,n,e){var r=e("83ab"),i=e("5e77").EXISTS,a=e("e330"),o=e("9bf2").f,u=Function.prototype,c=a(u.toString),s=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,f=a(s.exec),d="name";r&&!i&&o(u,d,{configurable:!0,get:function(){try{return f(s,c(this))[1]}catch(t){return""}}})},d28b:function(t,n,e){var r=e("746f");r("iterator")},d81d:function(t,n,e){"use strict";var r=e("23e7"),i=e("b727").map,a=e("1dde"),o=a("map");r({target:"Array",proto:!0,forced:!o},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},e01a:function(t,n,e){"use strict";var r=e("23e7"),i=e("83ab"),a=e("da84"),o=e("e330"),u=e("1a2d"),c=e("1626"),s=e("3a9b"),f=e("577e"),d=e("9bf2").f,l=e("e893"),v=a.Symbol,h=v&&v.prototype;if(i&&c(v)&&(!("description"in h)||void 0!==v().description)){var p={},x=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:f(arguments[0]),n=s(h,this)?new v(t):void 0===t?v():v(t);return""===t&&(p[n]=!0),n};l(x,v),x.prototype=h,h.constructor=x;var y="Symbol(test)"==String(v("test")),b=o(h.toString),M=o(h.valueOf),g=/^Symbol\((.*)\)[^)]+$/,m=o("".replace),w=o("".slice);d(h,"description",{configurable:!0,get:function(){var t=M(this),n=b(t);if(u(p,t))return"";var e=y?w(n,7,-1):m(n,g,"$1");return""===e?void 0:e}}),r({global:!0,forced:!0},{Symbol:x})}}}]);
//# sourceMappingURL=chunk-6d0d0f15.c66d880f.js.map