(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e860711a"],{"3ca3":function(t,n,e){"use strict";var r=e("6547").charAt,i=e("69f3"),o=e("7dd0"),a="String Iterator",u=i.set,s=i.getterFor(a);o(String,"String",(function(t){u(this,{type:a,string:String(t),index:0})}),(function(){var t,n=s(this),e=n.string,i=n.index;return i>=e.length?{value:void 0,done:!0}:(t=r(e,i),n.index+=t.length,{value:t,done:!1})}))},"4ec9":function(t,n,e){"use strict";var r=e("6d61"),i=e("6566");t.exports=r("Map",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),i)},6566:function(t,n,e){"use strict";var r=e("9bf2").f,i=e("7c73"),o=e("e2cc"),a=e("0366"),u=e("19aa"),s=e("2266"),c=e("7dd0"),f=e("2626"),d=e("83ab"),l=e("f183").fastKey,v=e("69f3"),h=v.set,p=v.getterFor;t.exports={getConstructor:function(t,n,e,c){var f=t((function(t,r){u(t,f,n),h(t,{type:n,index:i(null),first:void 0,last:void 0,size:0}),d||(t.size=0),void 0!=r&&s(r,t[c],{that:t,AS_ENTRIES:e})})),v=p(n),g=function(t,n,e){var r,i,o=v(t),a=b(t,n);return a?a.value=e:(o.last=a={index:i=l(n,!0),key:n,value:e,previous:r=o.last,next:void 0,removed:!1},o.first||(o.first=a),r&&(r.next=a),d?o.size++:t.size++,"F"!==i&&(o.index[i]=a)),t},b=function(t,n){var e,r=v(t),i=l(n);if("F"!==i)return r.index[i];for(e=r.first;e;e=e.next)if(e.key==n)return e};return o(f.prototype,{clear:function(){var t=this,n=v(t),e=n.index,r=n.first;while(r)r.removed=!0,r.previous&&(r.previous=r.previous.next=void 0),delete e[r.index],r=r.next;n.first=n.last=void 0,d?n.size=0:t.size=0},delete:function(t){var n=this,e=v(n),r=b(n,t);if(r){var i=r.next,o=r.previous;delete e.index[r.index],r.removed=!0,o&&(o.next=i),i&&(i.previous=o),e.first==r&&(e.first=i),e.last==r&&(e.last=o),d?e.size--:n.size--}return!!r},forEach:function(t){var n,e=v(this),r=a(t,arguments.length>1?arguments[1]:void 0,3);while(n=n?n.next:e.first){r(n.value,n.key,this);while(n&&n.removed)n=n.previous}},has:function(t){return!!b(this,t)}}),o(f.prototype,e?{get:function(t){var n=b(this,t);return n&&n.value},set:function(t,n){return g(this,0===t?0:t,n)}}:{add:function(t){return g(this,t=0===t?0:t,t)}}),d&&r(f.prototype,"size",{get:function(){return v(this).size}}),f},setStrong:function(t,n,e){var r=n+" Iterator",i=p(n),o=p(r);c(t,n,(function(t,n){h(this,{type:r,target:t,state:i(t),kind:n,last:void 0})}),(function(){var t=o(this),n=t.kind,e=t.last;while(e&&e.removed)e=e.previous;return t.target&&(t.last=e=e?e.next:t.state.first)?"keys"==n?{value:e.key,done:!1}:"values"==n?{value:e.value,done:!1}:{value:[e.key,e.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),e?"entries":"values",!e,!0),f(n)}}},"6d61":function(t,n,e){"use strict";var r=e("23e7"),i=e("da84"),o=e("94ca"),a=e("6eeb"),u=e("f183"),s=e("2266"),c=e("19aa"),f=e("861d"),d=e("d039"),l=e("1c7e"),v=e("d44e"),h=e("7156");t.exports=function(t,n,e){var p=-1!==t.indexOf("Map"),g=-1!==t.indexOf("Weak"),b=p?"set":"add",x=i[t],y=x&&x.prototype,w=x,E={},m=function(t){var n=y[t];a(y,t,"add"==t?function(t){return n.call(this,0===t?0:t),this}:"delete"==t?function(t){return!(g&&!f(t))&&n.call(this,0===t?0:t)}:"get"==t?function(t){return g&&!f(t)?void 0:n.call(this,0===t?0:t)}:"has"==t?function(t){return!(g&&!f(t))&&n.call(this,0===t?0:t)}:function(t,e){return n.call(this,0===t?0:t,e),this})};if(o(t,"function"!=typeof x||!(g||y.forEach&&!d((function(){(new x).entries().next()})))))w=e.getConstructor(n,t,p,b),u.REQUIRED=!0;else if(o(t,!0)){var k=new w,I=k[b](g?{}:-0,1)!=k,S=d((function(){k.has(1)})),j=l((function(t){new x(t)})),O=!g&&d((function(){var t=new x,n=5;while(n--)t[b](n,n);return!t.has(-0)}));j||(w=n((function(n,e){c(n,w,t);var r=h(new x,n,w);return void 0!=e&&s(e,r[b],{that:r,AS_ENTRIES:p}),r})),w.prototype=y,y.constructor=w),(S||O)&&(m("delete"),m("has"),p&&m("get")),(O||I)&&m(b),g&&y.clear&&delete y.clear}return E[t]=w,r({global:!0,forced:w!=x},E),v(w,t),g||e.setStrong(w,t,p),w}},"88ff":function(t,n,e){"use strict";e.r(n),n["default"]=".......#\n....#...\n...###.#\n#...###.\n....##..\n##.#..#.\n###.#.#.\n....#..."},9397:function(t,n,e){"use strict";e.r(n);var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("Day",{attrs:{day:17,solutions:t.solutions,taskInput:t.taskInput},on:{"input-changed":t.onInputChanged}})},i=[],o=(e("99af"),e("4160"),e("a15b"),e("d81d"),e("4ec9"),e("d3b7"),e("ac1f"),e("3ca3"),e("1276"),e("159b"),e("ddb0"),e("4a87")),a={components:{Day:o["default"]},data:function(){return{taskInput:e("88ff").default,solutions:{partOne:null,partTwo:null},neighborsThree:[[-1,-1,-1],[-1,-1,0],[-1,-1,1],[-1,0,-1],[-1,0,0],[-1,0,1],[-1,1,-1],[-1,1,0],[-1,1,1],[0,-1,-1],[0,-1,0],[0,-1,1],[0,0,-1],[0,0,1],[0,1,-1],[0,1,0],[0,1,1],[1,-1,-1],[1,-1,0],[1,-1,1],[1,0,-1],[1,0,0],[1,0,1],[1,1,-1],[1,1,0],[1,1,1]],neighborsFour:[[-1,-1,-1,-1],[-1,-1,-1,0],[-1,-1,-1,1],[-1,-1,0,-1],[-1,-1,0,0],[-1,-1,0,1],[-1,-1,1,-1],[-1,-1,1,0],[-1,-1,1,1],[-1,0,-1,-1],[-1,0,-1,0],[-1,0,-1,1],[-1,0,0,-1],[-1,0,0,0],[-1,0,0,1],[-1,0,1,-1],[-1,0,1,0],[-1,0,1,1],[-1,1,-1,-1],[-1,1,-1,0],[-1,1,-1,1],[-1,1,0,-1],[-1,1,0,0],[-1,1,0,1],[-1,1,1,-1],[-1,1,1,0],[-1,1,1,1],[0,-1,-1,-1],[0,-1,-1,0],[0,-1,-1,1],[0,-1,0,-1],[0,-1,0,0],[0,-1,0,1],[0,-1,1,-1],[0,-1,1,0],[0,-1,1,1],[0,0,-1,-1],[0,0,-1,0],[0,0,-1,1],[0,0,0,-1],[0,0,0,1],[0,0,1,-1],[0,0,1,0],[0,0,1,1],[0,1,-1,-1],[0,1,-1,0],[0,1,-1,1],[0,1,0,-1],[0,1,0,0],[0,1,0,1],[0,1,1,-1],[0,1,1,0],[0,1,1,1],[1,-1,-1,-1],[1,-1,-1,0],[1,-1,-1,1],[1,-1,0,-1],[1,-1,0,0],[1,-1,0,1],[1,-1,1,-1],[1,-1,1,0],[1,-1,1,1],[1,0,-1,-1],[1,0,-1,0],[1,0,-1,1],[1,0,0,-1],[1,0,0,0],[1,0,0,1],[1,0,1,-1],[1,0,1,0],[1,0,1,1],[1,1,-1,-1],[1,1,-1,0],[1,1,-1,1],[1,1,0,-1],[1,1,0,0],[1,1,0,1],[1,1,1,-1],[1,1,1,0],[1,1,1,1]]}},methods:{onInputChanged:function(t){this.input=t.map((function(t){return t.split("").map((function(t){return"#"===t}))})),this.solvePartOne(),this.solvePartTwo()},iterate:function(t,n){var e=new Map(t);return t.forEach((function(r,i){var o=0;n.forEach((function(n){var r=i.split(",").map((function(t,e){return+t+n[e]})),a=r.join(","),u=t.get(a);!0===u?o++:void 0===u&&e.set(a,!1)})),r?e.set(i,2===o||3===o):e.set(i,3===o)})),e},expand:function(t,n){var e=new Map(t);return t.forEach((function(t,r){n.forEach((function(t){var n=r.split(",").map((function(n,e){return+n+t[e]})),i=n.join(",");e.has(i)||e.set(i,!1)}))})),e},run:function(t,n){var e=new Map;this.input.forEach((function(t,r){t.forEach((function(t,i){var o=n(i,r);e.set(o,t)}))})),e=this.expand(e,t);for(var r=0;r<6;r++)e=this.iterate(e,t);var i=0;return e.forEach((function(t){t&&i++})),i},solvePartOne:function(){this.solutions.partOne=this.run(this.neighborsThree,(function(t,n){return"0,".concat(n,",").concat(t)}))},solvePartTwo:function(){this.solutions.partTwo=this.run(this.neighborsFour,(function(t,n){return"0,0,".concat(n,",").concat(t)}))}}},u=a,s=e("2877"),c=Object(s["a"])(u,r,i,!1,null,null,null);n["default"]=c.exports},"99af":function(t,n,e){"use strict";var r=e("23e7"),i=e("d039"),o=e("e8b5"),a=e("861d"),u=e("7b0b"),s=e("50c4"),c=e("8418"),f=e("65f0"),d=e("1dde"),l=e("b622"),v=e("2d00"),h=l("isConcatSpreadable"),p=9007199254740991,g="Maximum allowed index exceeded",b=v>=51||!i((function(){var t=[];return t[h]=!1,t.concat()[0]!==t})),x=d("concat"),y=function(t){if(!a(t))return!1;var n=t[h];return void 0!==n?!!n:o(t)},w=!b||!x;r({target:"Array",proto:!0,forced:w},{concat:function(t){var n,e,r,i,o,a=u(this),d=f(a,0),l=0;for(n=-1,r=arguments.length;n<r;n++)if(o=-1===n?a:arguments[n],y(o)){if(i=s(o.length),l+i>p)throw TypeError(g);for(e=0;e<i;e++,l++)e in o&&c(d,l,o[e])}else{if(l>=p)throw TypeError(g);c(d,l++,o)}return d.length=l,d}})},a15b:function(t,n,e){"use strict";var r=e("23e7"),i=e("44ad"),o=e("fc6a"),a=e("a640"),u=[].join,s=i!=Object,c=a("join",",");r({target:"Array",proto:!0,forced:s||!c},{join:function(t){return u.call(o(this),void 0===t?",":t)}})},bb2f:function(t,n,e){var r=e("d039");t.exports=!r((function(){return Object.isExtensible(Object.preventExtensions({}))}))},d81d:function(t,n,e){"use strict";var r=e("23e7"),i=e("b727").map,o=e("1dde"),a=e("ae40"),u=o("map"),s=a("map");r({target:"Array",proto:!0,forced:!u||!s},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},ddb0:function(t,n,e){var r=e("da84"),i=e("fdbc"),o=e("e260"),a=e("9112"),u=e("b622"),s=u("iterator"),c=u("toStringTag"),f=o.values;for(var d in i){var l=r[d],v=l&&l.prototype;if(v){if(v[s]!==f)try{a(v,s,f)}catch(p){v[s]=f}if(v[c]||a(v,c,d),i[d])for(var h in o)if(v[h]!==o[h])try{a(v,h,o[h])}catch(p){v[h]=o[h]}}}},f183:function(t,n,e){var r=e("d012"),i=e("861d"),o=e("5135"),a=e("9bf2").f,u=e("90e3"),s=e("bb2f"),c=u("meta"),f=0,d=Object.isExtensible||function(){return!0},l=function(t){a(t,c,{value:{objectID:"O"+ ++f,weakData:{}}})},v=function(t,n){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,c)){if(!d(t))return"F";if(!n)return"E";l(t)}return t[c].objectID},h=function(t,n){if(!o(t,c)){if(!d(t))return!0;if(!n)return!1;l(t)}return t[c].weakData},p=function(t){return s&&g.REQUIRED&&d(t)&&!o(t,c)&&l(t),t},g=t.exports={REQUIRED:!1,fastKey:v,getWeakData:h,onFreeze:p};r[c]=!0}}]);
//# sourceMappingURL=chunk-e860711a.49d5101f.js.map