(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-42d1c8e6"],{"3ca3":function(t,n,r){"use strict";var e=r("6547").charAt,i=r("69f3"),o=r("7dd0"),a="String Iterator",u=i.set,s=i.getterFor(a);o(String,"String",(function(t){u(this,{type:a,string:String(t),index:0})}),(function(){var t,n=s(this),r=n.string,i=n.index;return i>=r.length?{value:void 0,done:!0}:(t=e(r,i),n.index+=t.length,{value:t,done:!1})}))},"4df4":function(t,n,r){"use strict";var e=r("0366"),i=r("7b0b"),o=r("9bdd"),a=r("e95a"),u=r("50c4"),s=r("8418"),f=r("35a1");t.exports=function(t){var n,r,c,l,d,v,h=i(t),p="function"==typeof this?this:Array,g=arguments.length,y=g>1?arguments[1]:void 0,x=void 0!==y,b=f(h),m=0;if(x&&(y=e(y,g>2?arguments[2]:void 0,2)),void 0==b||p==Array&&a(b))for(n=u(h.length),r=new p(n);n>m;m++)v=x?y(h[m],m):h[m],s(r,m,v);else for(l=b.call(h),d=l.next,r=new p;!(c=d.call(l)).done;m++)v=x?o(l,y,[c.value,m],!0):c.value,s(r,m,v);return r.length=m,r}},"4ec9":function(t,n,r){"use strict";var e=r("6d61"),i=r("6566");t.exports=e("Map",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),i)},6566:function(t,n,r){"use strict";var e=r("9bf2").f,i=r("7c73"),o=r("e2cc"),a=r("0366"),u=r("19aa"),s=r("2266"),f=r("7dd0"),c=r("2626"),l=r("83ab"),d=r("f183").fastKey,v=r("69f3"),h=v.set,p=v.getterFor;t.exports={getConstructor:function(t,n,r,f){var c=t((function(t,e){u(t,c,n),h(t,{type:n,index:i(null),first:void 0,last:void 0,size:0}),l||(t.size=0),void 0!=e&&s(e,t[f],{that:t,AS_ENTRIES:r})})),v=p(n),g=function(t,n,r){var e,i,o=v(t),a=y(t,n);return a?a.value=r:(o.last=a={index:i=d(n,!0),key:n,value:r,previous:e=o.last,next:void 0,removed:!1},o.first||(o.first=a),e&&(e.next=a),l?o.size++:t.size++,"F"!==i&&(o.index[i]=a)),t},y=function(t,n){var r,e=v(t),i=d(n);if("F"!==i)return e.index[i];for(r=e.first;r;r=r.next)if(r.key==n)return r};return o(c.prototype,{clear:function(){var t=this,n=v(t),r=n.index,e=n.first;while(e)e.removed=!0,e.previous&&(e.previous=e.previous.next=void 0),delete r[e.index],e=e.next;n.first=n.last=void 0,l?n.size=0:t.size=0},delete:function(t){var n=this,r=v(n),e=y(n,t);if(e){var i=e.next,o=e.previous;delete r.index[e.index],e.removed=!0,o&&(o.next=i),i&&(i.previous=o),r.first==e&&(r.first=i),r.last==e&&(r.last=o),l?r.size--:n.size--}return!!e},forEach:function(t){var n,r=v(this),e=a(t,arguments.length>1?arguments[1]:void 0,3);while(n=n?n.next:r.first){e(n.value,n.key,this);while(n&&n.removed)n=n.previous}},has:function(t){return!!y(this,t)}}),o(c.prototype,r?{get:function(t){var n=y(this,t);return n&&n.value},set:function(t,n){return g(this,0===t?0:t,n)}}:{add:function(t){return g(this,t=0===t?0:t,t)}}),l&&e(c.prototype,"size",{get:function(){return v(this).size}}),c},setStrong:function(t,n,r){var e=n+" Iterator",i=p(n),o=p(e);f(t,n,(function(t,n){h(this,{type:e,target:t,state:i(t),kind:n,last:void 0})}),(function(){var t=o(this),n=t.kind,r=t.last;while(r&&r.removed)r=r.previous;return t.target&&(t.last=r=r?r.next:t.state.first)?"keys"==n?{value:r.key,done:!1}:"values"==n?{value:r.value,done:!1}:{value:[r.key,r.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),r?"entries":"values",!r,!0),c(n)}}},"6d61":function(t,n,r){"use strict";var e=r("23e7"),i=r("da84"),o=r("94ca"),a=r("6eeb"),u=r("f183"),s=r("2266"),f=r("19aa"),c=r("861d"),l=r("d039"),d=r("1c7e"),v=r("d44e"),h=r("7156");t.exports=function(t,n,r){var p=-1!==t.indexOf("Map"),g=-1!==t.indexOf("Weak"),y=p?"set":"add",x=i[t],b=x&&x.prototype,m=x,w={},A=function(t){var n=b[t];a(b,t,"add"==t?function(t){return n.call(this,0===t?0:t),this}:"delete"==t?function(t){return!(g&&!c(t))&&n.call(this,0===t?0:t)}:"get"==t?function(t){return g&&!c(t)?void 0:n.call(this,0===t?0:t)}:"has"==t?function(t){return!(g&&!c(t))&&n.call(this,0===t?0:t)}:function(t,r){return n.call(this,0===t?0:t,r),this})};if(o(t,"function"!=typeof x||!(g||b.forEach&&!l((function(){(new x).entries().next()})))))m=r.getConstructor(n,t,p,y),u.REQUIRED=!0;else if(o(t,!0)){var S=new m,j=S[y](g?{}:-0,1)!=S,k=l((function(){S.has(1)})),E=d((function(t){new x(t)})),z=!g&&l((function(){var t=new x,n=5;while(n--)t[y](n,n);return!t.has(-0)}));E||(m=n((function(n,r){f(n,m,t);var e=h(new x,n,m);return void 0!=r&&s(r,e[y],{that:e,AS_ENTRIES:p}),e})),m.prototype=b,b.constructor=m),(k||z)&&(A("delete"),A("has"),p&&A("get")),(z||j)&&A(y),g&&b.clear&&delete b.clear}return w[t]=m,e({global:!0,forced:m!=x},w),v(m,t),g||r.setStrong(m,t,p),m}},"9bdd":function(t,n,r){var e=r("825a"),i=r("2a62");t.exports=function(t,n,r,o){try{return o?n(e(r)[0],r[1]):n(r)}catch(a){throw i(t),a}}},a15b:function(t,n,r){"use strict";var e=r("23e7"),i=r("44ad"),o=r("fc6a"),a=r("a640"),u=[].join,s=i!=Object,f=a("join",",");e({target:"Array",proto:!0,forced:s||!f},{join:function(t){return u.call(o(this),void 0===t?",":t)}})},a630:function(t,n,r){var e=r("23e7"),i=r("4df4"),o=r("1c7e"),a=!o((function(t){Array.from(t)}));e({target:"Array",stat:!0,forced:a},{from:i})},d81d:function(t,n,r){"use strict";var e=r("23e7"),i=r("b727").map,o=r("1dde"),a=r("ae40"),u=o("map"),s=a("map");e({target:"Array",proto:!0,forced:!u||!s},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},db17:function(t,n,r){"use strict";r.r(n);var e=function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("Day",{attrs:{day:21,year:2017,solutions:t.solutions},on:{"input-changed":t.onInputChanged}})},i=[],o=(r("4de4"),r("4160"),r("a630"),r("a15b"),r("d81d"),r("4ec9"),r("d3b7"),r("ac1f"),r("25f0"),r("3ca3"),r("1276"),r("159b"),r("ddb0"),r("4a87")),a={components:{Day:o["default"]},data:function(){return{solutions:{partOne:null,partTwo:null}}},methods:{onInputChanged:function(t){var n=this,r=new Map;t.forEach((function(t){var n=t.split(" => ");r.set(n[0],n[1])}));for(var e=".#./..#/###",i=0;i<2;i++){var o=this.splitGrid(e),a=o.map((function(t){return n.toArray(r.get(n.findRule(r,n.alterations(n.toString(t)))))}));e=this.joinGrid(a),console.log(e)}},countBits:function(t){return t.split("").filter((function(t){return"#"===t})).length},toArray:function(t){return t.split("/").map((function(t){return t.split("")}))},toString:function(t){return t.map((function(t){return t.join("")})).join("/")},flipH:function(t){return t.split("/").map((function(t){return t.split("").reverse().join("")})).join("/")},flipV:function(t){return t.split("/").reverse().join("/")},findRule:function(t,n){return n.filter((function(n){return t.has(n)}))[0]},joinGrid:function(t){var n=t[0].length,r=Array.from(Array(n)).map((function(t){return Array.from(Array(n))}));return t.forEach((function(t,e){for(var i=e/n,o=e%n,a=0;a<t.length;a++)for(var u=0;u<t.length;u++)r[i*n+a][o*n+u]=t[a][u]})),r},splitGrid:function(t){for(var n=this.toArray(t),r=n.length,e=r%2===0?2:3,i=[],o=0;o<r/e;o++)for(var a=0;a<r/e;a++){for(var u=[],s=0;s<e;s++){for(var f=[],c=0;c<e;c++)f.push(n[o*e+s][a*e+c]);u.push(f)}i.push(u)}return i},alterations:function(t){var n=this,r=[],e=this.toArray(t);r.push(e);for(var i=0;i<3;i++)r.push(this.rotate90(r[i]));return r=r.map((function(t){return n.toString(t)})),r.forEach((function(t){r.push(n.flipH(t)),r.push(n.flipV(t))})),r},rotate90:function(t){for(var n=JSON.parse(JSON.stringify(t)),r=0;r<t.length;r++)for(var e=0;e<t[r].length;e++)n[r][e]=t[t.length-e-1][r];return n}}},u=a,s=r("2877"),f=Object(s["a"])(u,e,i,!1,null,"b1846c86",null);n["default"]=f.exports},ddb0:function(t,n,r){var e=r("da84"),i=r("fdbc"),o=r("e260"),a=r("9112"),u=r("b622"),s=u("iterator"),f=u("toStringTag"),c=o.values;for(var l in i){var d=e[l],v=d&&d.prototype;if(v){if(v[s]!==c)try{a(v,s,c)}catch(p){v[s]=c}if(v[f]||a(v,f,l),i[l])for(var h in o)if(v[h]!==o[h])try{a(v,h,o[h])}catch(p){v[h]=o[h]}}}}}]);
//# sourceMappingURL=chunk-42d1c8e6.089f4d06.js.map