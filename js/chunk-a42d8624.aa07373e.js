(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a42d8624"],{"4ec9":function(t,e,n){"use strict";var i=n("6d61"),r=n("6566");i("Map",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),r)},6566:function(t,e,n){"use strict";var i=n("9bf2").f,r=n("7c73"),o=n("e2cc"),s=n("0366"),a=n("19aa"),u=n("2266"),c=n("7dd0"),l=n("2626"),f=n("83ab"),d=n("f183").fastKey,v=n("69f3"),h=v.set,p=v.getterFor;t.exports={getConstructor:function(t,e,n,c){var l=t((function(t,i){a(t,v),h(t,{type:e,index:r(null),first:void 0,last:void 0,size:0}),f||(t.size=0),void 0!=i&&u(i,t[c],{that:t,AS_ENTRIES:n})})),v=l.prototype,x=p(e),g=function(t,e,n){var i,r,o=x(t),s=w(t,e);return s?s.value=n:(o.last=s={index:r=d(e,!0),key:e,value:n,previous:i=o.last,next:void 0,removed:!1},o.first||(o.first=s),i&&(i.next=s),f?o.size++:t.size++,"F"!==r&&(o.index[r]=s)),t},w=function(t,e){var n,i=x(t),r=d(e);if("F"!==r)return i.index[r];for(n=i.first;n;n=n.next)if(n.key==e)return n};return o(v,{clear:function(){var t=this,e=x(t),n=e.index,i=e.first;while(i)i.removed=!0,i.previous&&(i.previous=i.previous.next=void 0),delete n[i.index],i=i.next;e.first=e.last=void 0,f?e.size=0:t.size=0},delete:function(t){var e=this,n=x(e),i=w(e,t);if(i){var r=i.next,o=i.previous;delete n.index[i.index],i.removed=!0,o&&(o.next=r),r&&(r.previous=o),n.first==i&&(n.first=r),n.last==i&&(n.last=o),f?n.size--:e.size--}return!!i},forEach:function(t){var e,n=x(this),i=s(t,arguments.length>1?arguments[1]:void 0);while(e=e?e.next:n.first){i(e.value,e.key,this);while(e&&e.removed)e=e.previous}},has:function(t){return!!w(this,t)}}),o(v,n?{get:function(t){var e=w(this,t);return e&&e.value},set:function(t,e){return g(this,0===t?0:t,e)}}:{add:function(t){return g(this,t=0===t?0:t,t)}}),f&&i(v,"size",{get:function(){return x(this).size}}),l},setStrong:function(t,e,n){var i=e+" Iterator",r=p(e),o=p(i);c(t,e,(function(t,e){h(this,{type:i,target:t,state:r(t),kind:e,last:void 0})}),(function(){var t=o(this),e=t.kind,n=t.last;while(n&&n.removed)n=n.previous;return t.target&&(t.last=n=n?n.next:t.state.first)?"keys"==e?{value:n.key,done:!1}:"values"==e?{value:n.value,done:!1}:{value:[n.key,n.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),n?"entries":"values",!n,!0),l(e)}}},"6d61":function(t,e,n){"use strict";var i=n("23e7"),r=n("da84"),o=n("e330"),s=n("94ca"),a=n("6eeb"),u=n("f183"),c=n("2266"),l=n("19aa"),f=n("1626"),d=n("861d"),v=n("d039"),h=n("1c7e"),p=n("d44e"),x=n("7156");t.exports=function(t,e,n){var g=-1!==t.indexOf("Map"),w=-1!==t.indexOf("Weak"),m=g?"set":"add",y=r[t],b=y&&y.prototype,k=y,z={},E=function(t){var e=o(b[t]);a(b,t,"add"==t?function(t){return e(this,0===t?0:t),this}:"delete"==t?function(t){return!(w&&!d(t))&&e(this,0===t?0:t)}:"get"==t?function(t){return w&&!d(t)?void 0:e(this,0===t?0:t)}:"has"==t?function(t){return!(w&&!d(t))&&e(this,0===t?0:t)}:function(t,n){return e(this,0===t?0:t,n),this})},O=s(t,!f(y)||!(w||b.forEach&&!v((function(){(new y).entries().next()}))));if(O)k=n.getConstructor(e,t,g,m),u.enable();else if(s(t,!0)){var S=new k,T=S[m](w?{}:-0,1)!=S,I=v((function(){S.has(1)})),C=h((function(t){new y(t)})),P=!w&&v((function(){var t=new y,e=5;while(e--)t[m](e,e);return!t.has(-0)}));C||(k=e((function(t,e){l(t,b);var n=x(new y,t,k);return void 0!=e&&c(e,n[m],{that:n,AS_ENTRIES:g}),n})),k.prototype=b,b.constructor=k),(I||P)&&(E("delete"),E("has"),g&&E("get")),(P||T)&&E(m),w&&b.clear&&delete b.clear}return z[t]=k,i({global:!0,forced:k!=y},z),p(k,t),w||n.setStrong(k,t,g),k}},b242:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Day",{attrs:{day:3,year:2018,solutions:t.solutions},on:{"input-changed":t.onInputChanged}})},r=[],o=(n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0"),n("159b"),n("ac1f"),n("1276"),n("d81d"),n("99af"),n("4a87")),s={components:{Day:o["default"]},data:function(){return{solutions:{partOne:null,partTwo:null}}},methods:{onInputChanged:function(t){var e=this;this.cells=new Map,this.claims=[],t.forEach((function(t){var n=t.split(" @ ")[1].split(": "),i=n[0].split(",").map((function(t){return+t})),r=n[1].split("x").map((function(t){return+t}));e.claims.push({position:i,size:r});for(var o=i[0];o<i[0]+r[0];o++)for(var s=i[1];s<i[1]+r[1];s++){var a="".concat(o,",").concat(s);e.cells.has(a)?e.cells.set(a,e.cells.get(a)+1):e.cells.set(a,1)}})),this.solvePartOne(),this.solvePartTwo()},solvePartOne:function(){var t=0;this.cells.forEach((function(e,n){e>1&&t++})),this.solutions.partOne=t},solvePartTwo:function(){for(var t=0;t<this.claims.length;t++){var e=!0,n=this.claims[t];t:for(var i=n.position[0];i<n.position[0]+n.size[0];i++)for(var r=n.position[1];r<n.position[1]+n.size[1];r++){var o="".concat(i,",").concat(r);if(this.cells.get(o)>1){e=!1;break t}}if(e)return void(this.solutions.partTwo=t+1)}}}},a=s,u=n("2877"),c=Object(u["a"])(a,i,r,!1,null,null,null);e["default"]=c.exports},d81d:function(t,e,n){"use strict";var i=n("23e7"),r=n("b727").map,o=n("1dde"),s=o("map");i({target:"Array",proto:!0,forced:!s},{map:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-a42d8624.aa07373e.js.map