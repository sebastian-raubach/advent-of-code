(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f027d5de"],{"0cb2":function(n,t,r){var a=r("e330"),e=r("7b0b"),o=Math.floor,i=a("".charAt),c=a("".replace),u=a("".slice),s=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,f=/\$([$&'`]|\d{1,2})/g;n.exports=function(n,t,r,a,d,v){var l=r+n.length,p=a.length,h=f;return void 0!==d&&(d=e(d),h=s),c(v,h,(function(e,c){var s;switch(i(c,0)){case"$":return"$";case"&":return n;case"`":return u(t,0,r);case"'":return u(t,l);case"<":s=d[u(c,1,-1)];break;default:var f=+c;if(0===f)return e;if(f>p){var v=o(f/10);return 0===v?e:v<=p?void 0===a[v-1]?i(c,1):a[v-1]+i(c,1):e}s=a[f-1]}return void 0===s?"":s}))}},"1ec4":function(n,t,r){"use strict";r.r(t);var a=function(){var n=this,t=n.$createElement,r=n._self._c||t;return r("Day",{attrs:{day:20,year:2017,solutions:n.solutions},on:{"input-changed":n.onInputChanged}})},e=[],o=(r("d81d"),r("ac1f"),r("1276"),r("5319"),r("e9c4"),r("aff5"),r("a9e3"),r("d3b7"),r("159b"),r("99af"),r("4de4"),r("4a87")),i={components:{Day:o["default"]},data:function(){return{solutions:{partOne:null,partTwo:null}}},methods:{onInputChanged:function(n){for(var t=this,r=n.map((function(n,t){var r=n.split(", ").map((function(n){var t=n.replace(">","").split("=<")[1].split(",");return{x:+t[0],y:+t[1],z:+t[2]}}));return{id:t,p:r[0],v:r[1],a:r[2]}})),a=JSON.parse(JSON.stringify(r)),e=0,o=function(n){var r=Number.MAX_SAFE_INTEGER;a.forEach((function(n){t.move(n);var a=t.dist(n.p);a<r&&(r=a,e=n.id)}))},i=0;i<500;i++)o(i);this.solutions.partOne=e,a=JSON.parse(JSON.stringify(r));for(var c=function(n){var r={};a.forEach((function(n){t.move(n);var a="".concat(n.p.x,",").concat(n.p.y,",").concat(n.p.z),e=r[a];e||(e=0),e++,r[a]=e})),a=a.filter((function(n){return r["".concat(n.p.x,",").concat(n.p.y,",").concat(n.p.z)]<2}))},u=0;u<500;u++)c(u);this.solutions.partTwo=a.length},move:function(n){n.v=this.add(n.v,n.a),n.p=this.add(n.p,n.v)},dist:function(n){return Math.abs(n.x)+Math.abs(n.y)+Math.abs(n.z)},match:function(n,t){return n.x===t.x&&n.y===t.y&&n.z===t.z},add:function(n,t){return{x:n.x+t.x,y:n.y+t.y,z:n.z+t.z}}}},c=i,u=r("2877"),s=Object(u["a"])(c,a,e,!1,null,"ceda13c6",null);t["default"]=s.exports},5319:function(n,t,r){"use strict";var a=r("2ba4"),e=r("c65b"),o=r("e330"),i=r("d784"),c=r("d039"),u=r("825a"),s=r("1626"),f=r("5926"),d=r("50c4"),v=r("577e"),l=r("1d80"),p=r("8aa5"),h=r("dc4a"),b=r("0cb2"),g=r("14c3"),x=r("b622"),y=x("replace"),m=Math.max,$=Math.min,w=o([].concat),z=o([].push),E=o("".indexOf),M=o("".slice),N=function(n){return void 0===n?n:String(n)},O=function(){return"$0"==="a".replace(/./,"$0")}(),I=function(){return!!/./[y]&&""===/./[y]("a","$0")}(),S=!c((function(){var n=/./;return n.exec=function(){var n=[];return n.groups={a:"7"},n},"7"!=="".replace(n,"$<a>")}));i("replace",(function(n,t,r){var o=I?"$":"$0";return[function(n,r){var a=l(this),o=void 0==n?void 0:h(n,y);return o?e(o,n,a,r):e(t,v(a),n,r)},function(n,e){var i=u(this),c=v(n);if("string"==typeof e&&-1===E(e,o)&&-1===E(e,"$<")){var l=r(t,i,c,e);if(l.done)return l.value}var h=s(e);h||(e=v(e));var x=i.global;if(x){var y=i.unicode;i.lastIndex=0}var O=[];while(1){var I=g(i,c);if(null===I)break;if(z(O,I),!x)break;var S=v(I[0]);""===S&&(i.lastIndex=p(c,d(i.lastIndex),y))}for(var k="",A=0,J=0;J<O.length;J++){I=O[J];for(var _=v(I[0]),T=m($(f(I.index),c.length),0),C=[],D=1;D<I.length;D++)z(C,N(I[D]));var F=I.groups;if(h){var G=w([_],C,T,c);void 0!==F&&z(G,F);var R=v(a(e,void 0,G))}else R=b(_,c,T,C,F,e);T>=A&&(k+=M(c,A,T)+R,A=T+_.length)}return k+M(c,A)}]}),!S||!O||I)},aff5:function(n,t,r){var a=r("23e7");a({target:"Number",stat:!0},{MAX_SAFE_INTEGER:9007199254740991})},d81d:function(n,t,r){"use strict";var a=r("23e7"),e=r("b727").map,o=r("1dde"),i=o("map");a({target:"Array",proto:!0,forced:!i},{map:function(n){return e(this,n,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-f027d5de.3d361676.js.map