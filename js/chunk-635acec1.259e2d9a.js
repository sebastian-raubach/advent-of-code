(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-635acec1"],{2201:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Day",{attrs:{day:6,year:2021,solutions:t.solutions},on:{"input-changed":t.onInputChanged}})},i=[],o=(n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0"),n("159b"),n("ac1f"),n("1276"),n("a630"),n("4a87")),s={components:{Day:o["default"]},data:function(){return{solutions:{partOne:null,partTwo:null}}},methods:{onInputChanged:function(t){this.solutions.partOne=this.solve(t,80),this.solutions.partTwo=this.solve(t,256)},solve:function(t,e){for(var n=new Map,r=0;r<=8;r++)n.set(r,0);t[0].split(",").forEach((function(t){return n.set(+t,n.get(+t)+1)}));for(var i=0;i<e;i++){for(var o=0;o<=8;o++)n.set(o-1,n.get(o));n.set(6,n.get(6)+n.get(-1)),n.set(8,n.get(-1)),n.delete(-1)}return Array.from(n.values()).reduce((function(t,e){return t+e}),0)}}},a=s,u=n("2877"),f=Object(u["a"])(a,r,i,!1,null,"2f32d2f2",null);e["default"]=f.exports},"4df4":function(t,e,n){"use strict";var r=n("da84"),i=n("0366"),o=n("c65b"),s=n("7b0b"),a=n("9bdd"),u=n("e95a"),f=n("68ee"),c=n("07fa"),d=n("8418"),v=n("9a1f"),l=n("35a1"),h=r.Array;t.exports=function(t){var e=s(t),n=f(this),r=arguments.length,p=r>1?arguments[1]:void 0,g=void 0!==p;g&&(p=i(p,r>2?arguments[2]:void 0));var x,w,y,b,k,m,z=l(e),E=0;if(!z||this==h&&u(z))for(x=c(e),w=n?new this(x):h(x);x>E;E++)m=g?p(e[E],E):e[E],d(w,E,m);else for(b=v(e,z),k=b.next,w=n?new this:[];!(y=o(k,b)).done;E++)m=g?a(b,p,[y.value,E],!0):y.value,d(w,E,m);return w.length=E,w}},"4ec9":function(t,e,n){"use strict";var r=n("6d61"),i=n("6566");r("Map",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),i)},6566:function(t,e,n){"use strict";var r=n("9bf2").f,i=n("7c73"),o=n("e2cc"),s=n("0366"),a=n("19aa"),u=n("2266"),f=n("7dd0"),c=n("2626"),d=n("83ab"),v=n("f183").fastKey,l=n("69f3"),h=l.set,p=l.getterFor;t.exports={getConstructor:function(t,e,n,f){var c=t((function(t,r){a(t,l),h(t,{type:e,index:i(null),first:void 0,last:void 0,size:0}),d||(t.size=0),void 0!=r&&u(r,t[f],{that:t,AS_ENTRIES:n})})),l=c.prototype,g=p(e),x=function(t,e,n){var r,i,o=g(t),s=w(t,e);return s?s.value=n:(o.last=s={index:i=v(e,!0),key:e,value:n,previous:r=o.last,next:void 0,removed:!1},o.first||(o.first=s),r&&(r.next=s),d?o.size++:t.size++,"F"!==i&&(o.index[i]=s)),t},w=function(t,e){var n,r=g(t),i=v(e);if("F"!==i)return r.index[i];for(n=r.first;n;n=n.next)if(n.key==e)return n};return o(l,{clear:function(){var t=this,e=g(t),n=e.index,r=e.first;while(r)r.removed=!0,r.previous&&(r.previous=r.previous.next=void 0),delete n[r.index],r=r.next;e.first=e.last=void 0,d?e.size=0:t.size=0},delete:function(t){var e=this,n=g(e),r=w(e,t);if(r){var i=r.next,o=r.previous;delete n.index[r.index],r.removed=!0,o&&(o.next=i),i&&(i.previous=o),n.first==r&&(n.first=i),n.last==r&&(n.last=o),d?n.size--:e.size--}return!!r},forEach:function(t){var e,n=g(this),r=s(t,arguments.length>1?arguments[1]:void 0);while(e=e?e.next:n.first){r(e.value,e.key,this);while(e&&e.removed)e=e.previous}},has:function(t){return!!w(this,t)}}),o(l,n?{get:function(t){var e=w(this,t);return e&&e.value},set:function(t,e){return x(this,0===t?0:t,e)}}:{add:function(t){return x(this,t=0===t?0:t,t)}}),d&&r(l,"size",{get:function(){return g(this).size}}),c},setStrong:function(t,e,n){var r=e+" Iterator",i=p(e),o=p(r);f(t,e,(function(t,e){h(this,{type:r,target:t,state:i(t),kind:e,last:void 0})}),(function(){var t=o(this),e=t.kind,n=t.last;while(n&&n.removed)n=n.previous;return t.target&&(t.last=n=n?n.next:t.state.first)?"keys"==e?{value:n.key,done:!1}:"values"==e?{value:n.value,done:!1}:{value:[n.key,n.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),n?"entries":"values",!n,!0),c(e)}}},"6d61":function(t,e,n){"use strict";var r=n("23e7"),i=n("da84"),o=n("e330"),s=n("94ca"),a=n("6eeb"),u=n("f183"),f=n("2266"),c=n("19aa"),d=n("1626"),v=n("861d"),l=n("d039"),h=n("1c7e"),p=n("d44e"),g=n("7156");t.exports=function(t,e,n){var x=-1!==t.indexOf("Map"),w=-1!==t.indexOf("Weak"),y=x?"set":"add",b=i[t],k=b&&b.prototype,m=b,z={},E=function(t){var e=o(k[t]);a(k,t,"add"==t?function(t){return e(this,0===t?0:t),this}:"delete"==t?function(t){return!(w&&!v(t))&&e(this,0===t?0:t)}:"get"==t?function(t){return w&&!v(t)?void 0:e(this,0===t?0:t)}:"has"==t?function(t){return!(w&&!v(t))&&e(this,0===t?0:t)}:function(t,n){return e(this,0===t?0:t,n),this})},A=s(t,!d(b)||!(w||k.forEach&&!l((function(){(new b).entries().next()}))));if(A)m=n.getConstructor(e,t,x,y),u.enable();else if(s(t,!0)){var S=new m,I=S[y](w?{}:-0,1)!=S,O=l((function(){S.has(1)})),C=h((function(t){new b(t)})),T=!w&&l((function(){var t=new b,e=5;while(e--)t[y](e,e);return!t.has(-0)}));C||(m=e((function(t,e){c(t,k);var n=g(new b,t,m);return void 0!=e&&f(e,n[y],{that:n,AS_ENTRIES:x}),n})),m.prototype=k,k.constructor=m),(O||T)&&(E("delete"),E("has"),x&&E("get")),(T||I)&&E(y),w&&k.clear&&delete k.clear}return z[t]=m,r({global:!0,forced:m!=b},z),p(m,t),w||n.setStrong(m,t,x),m}},"9bdd":function(t,e,n){var r=n("825a"),i=n("2a62");t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(s){i(t,"throw",s)}}},a630:function(t,e,n){var r=n("23e7"),i=n("4df4"),o=n("1c7e"),s=!o((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:s},{from:i})}}]);
//# sourceMappingURL=chunk-635acec1.259e2d9a.js.map