(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-674f53e4"],{"0cb2":function(t,e,a){var n=a("e330"),r=a("7b0b"),o=Math.floor,i=n("".charAt),c=n("".replace),s=n("".slice),u=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,l=/\$([$&'`]|\d{1,2})/g;t.exports=function(t,e,a,n,d,h){var f=a+t.length,v=n.length,p=l;return void 0!==d&&(d=r(d),p=u),c(h,p,(function(r,c){var u;switch(i(c,0)){case"$":return"$";case"&":return t;case"`":return s(e,0,a);case"'":return s(e,f);case"<":u=d[s(c,1,-1)];break;default:var l=+c;if(0===l)return r;if(l>v){var h=o(l/10);return 0===h?r:h<=v?void 0===n[h-1]?i(c,1):n[h-1]+i(c,1):r}u=n[l-1]}return void 0===u?"":u}))}},5319:function(t,e,a){"use strict";var n=a("2ba4"),r=a("c65b"),o=a("e330"),i=a("d784"),c=a("d039"),s=a("825a"),u=a("1626"),l=a("5926"),d=a("50c4"),h=a("577e"),f=a("1d80"),v=a("8aa5"),p=a("dc4a"),x=a("0cb2"),y=a("14c3"),b=a("b622"),g=b("replace"),k=Math.max,w=Math.min,m=o([].concat),M=o([].push),O=o("".indexOf),$=o("".slice),T=function(t){return void 0===t?t:String(t)},C=function(){return"$0"==="a".replace(/./,"$0")}(),P=function(){return!!/./[g]&&""===/./[g]("a","$0")}(),E=!c((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}));i("replace",(function(t,e,a){var o=P?"$":"$0";return[function(t,a){var n=f(this),o=void 0==t?void 0:p(t,g);return o?r(o,t,n,a):r(e,h(n),t,a)},function(t,r){var i=s(this),c=h(t);if("string"==typeof r&&-1===O(r,o)&&-1===O(r,"$<")){var f=a(e,i,c,r);if(f.done)return f.value}var p=u(r);p||(r=h(r));var b=i.global;if(b){var g=i.unicode;i.lastIndex=0}var C=[];while(1){var P=y(i,c);if(null===P)break;if(M(C,P),!b)break;var E=h(P[0]);""===E&&(i.lastIndex=v(c,d(i.lastIndex),g))}for(var I="",S=0,_=0;_<C.length;_++){P=C[_];for(var G=h(P[0]),j=k(w(l(P.index),c.length),0),A=[],N=1;N<P.length;N++)M(A,T(P[N]));var W=P.groups;if(p){var D=m([G],A,j,c);void 0!==W&&M(D,W);var F=h(n(r,void 0,D))}else F=x(G,c,j,A,W,r);j>=S&&(I+=$(c,S,j)+F,S=j+G.length)}return I+$(c,S)}]}),!E||!C||P)},"956d":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Day",{attrs:{day:12,solutions:t.solutions},on:{"input-changed":t.onInputChanged},scopedSlots:t._u([{key:"partOne",fn:function(){return[a("div",{staticClass:"plotly-chart",attrs:{id:"partOneChart"}})]},proxy:!0},{key:"partTwo",fn:function(){return[a("div",{staticClass:"plotly-chart",attrs:{id:"partTwoChart"}})]},proxy:!0}])})},r=[],o=a("5530"),i=(a("d81d"),a("ac1f"),a("5319"),a("d3b7"),a("159b"),a("4a87")),c=a("2f62"),s={components:{Day:i["default"]},computed:Object(o["a"])({},Object(c["b"])(["darkMode"])),data:function(){var t=this;return{solutions:{partOne:null,partTwo:null},colorGradient:this.createColorGradient("#eeeeee","#c0392b",1e3),operationsOne:{N:function(t,e){t.y+=e.value},S:function(t,e){t.y-=e.value},E:function(t,e){t.x+=e.value},W:function(t,e){t.x-=e.value},L:function(e,a){e.angle=t.mod(e.angle-a.value,360)},R:function(e,a){e.angle=t.mod(e.angle+a.value,360)},F:function(e,a){switch(e.angle){case 0:t.operationsOne.N(e,a);break;case 90:t.operationsOne.E(e,a);break;case 180:t.operationsOne.S(e,a);break;case 270:t.operationsOne.W(e,a);break}}},operationsTwo:{N:function(t,e,a){e.y+=a.value},S:function(t,e,a){e.y-=a.value},E:function(t,e,a){e.x+=a.value},W:function(t,e,a){e.x-=a.value},L:function(e,a,n){var r;switch(n.value){case 90:r=a.x,a.x=-a.y,a.y=r;break;case 180:a.x=-a.x,a.y=-a.y;break;case 270:r=a.x,a.x=a.y,a.y=-r;break}e.angle=t.mod(e.angle-n.value,360)},R:function(e,a,n){var r;switch(n.value){case 90:r=a.x,a.x=a.y,a.y=-r;break;case 180:a.x=-a.x,a.y=-a.y;break;case 270:r=a.x,a.x=-a.y,a.y=r;break}e.angle=t.mod(e.angle+n.value,360)},F:function(t,e,a){t.x+=a.value*e.x,t.y+=a.value*e.y}}}},methods:{mod:function(t,e){return(t%e+e)%e},onInputChanged:function(t){this.directions=t.map((function(t){var e=+t.replace(/[a-zA-Z]+/g,""),a=t.replace(/\d*/g,"");return{instruction:a,value:e}})),this.solvePartOne(),this.solvePartTwo()},solvePartOne:function(){var t=this,e={x:0,y:0,angle:90},a=[];a.push({x:e.x,y:e.y}),this.directions.forEach((function(n){t.operationsOne[n.instruction](e,n),a.push({x:e.x,y:e.y})})),this.solutions.partOne=Math.abs(e.x)+Math.abs(e.y),this.drawPath(a,"partOneChart")},solvePartTwo:function(){var t=this,e={x:0,y:0,angle:90},a={x:10,y:1},n=[];n.push({x:e.x,y:e.y}),this.directions.forEach((function(r){t.operationsTwo[r.instruction](e,a,r),n.push({x:e.x,y:e.y})})),this.solutions.partTwo=Math.abs(e.x)+Math.abs(e.y),this.drawPath(n,"partTwoChart")},drawPath:function(t,e){for(var a=this,n=[],r=t[0].x,o=t[0].y,i=t[0].x,c=t[0].y,s=1;s<t.length;s++){var u=this.colorGradient[Math.floor((s-1)*this.colorGradient.length/t.length)];n.push({type:"line",x0:t[s-1].x,y0:t[s-1].y,x1:t[s].x,y1:t[s].y,line:{color:u,width:3}}),r=Math.min(r,t[s].x),o=Math.min(o,t[s].y),i=Math.max(i,t[s].x),c=Math.max(c,t[s].y)}var l={shapes:n,xaxis:{range:[r,i],tickfont:{color:this.darkMode?"white":"black"},gridcolor:this.darkMode?"#111111":"#eeeeee"},yaxis:{range:[o,c],tickfont:{color:this.darkMode?"white":"black"},gridcolor:this.darkMode?"#111111":"#eeeeee"},paper_bgcolor:"transparent",plot_bgcolor:"transparent"};this.$nextTick((function(){a.$plotly.purge(e),a.$plotly.newPlot(e,null,l,{responsive:!0,staticPlot:!0,displayModeBar:!1})}))}}},u=s,l=(a("ab2c"),a("2877")),d=Object(l["a"])(u,n,r,!1,null,"17295d92",null);e["default"]=d.exports},ab2c:function(t,e,a){"use strict";a("ccac")},ccac:function(t,e,a){},d81d:function(t,e,a){"use strict";var n=a("23e7"),r=a("b727").map,o=a("1dde"),i=o("map");n({target:"Array",proto:!0,forced:!i},{map:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-674f53e4.24ee4447.js.map