(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-64ac0f6a"],{"70c2":function(n,t,r){},"7c5b":function(n,t,r){"use strict";r("70c2")},a15b:function(n,t,r){"use strict";var o=r("23e7"),a=r("44ad"),e=r("fc6a"),i=r("a640"),u=[].join,s=a!=Object,l=i("join",",");o({target:"Array",proto:!0,forced:s||!l},{join:function(n){return u.call(e(this),void 0===n?",":n)}})},d81d:function(n,t,r){"use strict";var o=r("23e7"),a=r("b727").map,e=r("1dde"),i=r("ae40"),u=e("map"),s=i("map");o({target:"Array",proto:!0,forced:!u||!s},{map:function(n){return a(this,n,arguments.length>1?arguments[1]:void 0)}})},fb6a7:function(n,t,r){"use strict";r.r(t);var o=function(){var n=this,t=n.$createElement,r=n._self._c||t;return r("Day",{attrs:{day:11,solutions:n.solutions},on:{"input-changed":n.onInputChanged},scopedSlots:n._u([{key:"partOne",fn:function(){return[r("pre",{staticClass:"day-10-code border"},[r("code",{domProps:{innerHTML:n._s(n.finalSeating.partOne)}})])]},proxy:!0},{key:"partTwo",fn:function(){return[r("pre",{staticClass:"day-10-code border"},[r("code",{domProps:{innerHTML:n._s(n.finalSeating.partTwo)}})])]},proxy:!0}])})},a=[],e=(r("4de4"),r("a15b"),r("d81d"),r("ac1f"),r("1276"),r("4a87")),i={components:{Day:e["default"]},data:function(){return{solutions:{partOne:null,partTwo:null},finalSeating:{partOne:null,partTwo:null}}},methods:{onInputChanged:function(n){var t=n.map((function(n){return n.split("").map((function(n){return"L"!==n&&null}))}));this.solvePartOne(t),this.solvePartTwo(t)},solvePartOne:function(n){var t=this.solve(n,4,(function(n,t,r,o){var a=n[t+o[1]];return void 0!==a&&!0===a[r+o[0]]}));this.solutions.partOne=t.count,this.finalSeating.partOne=t.gridSolution},solve:function(n,t,r){var o=1,a=0,e=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];while(o>0){o=0,a=0;for(var i=JSON.parse(JSON.stringify(n)),u=function(u){for(var s=function(s){var l=n[u][s];if(null!==l){var c=e.filter((function(t){return r(n,u,s,t)})).length;!0===l&&c>=t?(o++,i[u][s]=!1):!1===l&&0===c&&(o++,i[u][s]=!0),a+=!0===i[u][s]?1:0}},l=0;l<n[u].length;l++)s(l)},s=0;s<n.length;s++)u(s);n=i}return{count:a,gridSolution:this.getGridPrinted(n)}},solvePartTwo:function(n){var t=Math.max(n.length,n[0].length),r=this.solve(n,5,(function(n,r,o,a){for(var e=1;e<t;e++){var i=n[r+a[1]*e];if(void 0===i)return!1;var u=i[o+a[0]*e];if(void 0===u)return!1;if(null!==u)return u}return!1}));this.solutions.partTwo=r.count,this.finalSeating.partTwo=r.gridSolution},getGridPrinted:function(n){return n.map((function(n){return n.map((function(n){return!0===n?'<span class="day-10-seat-full">#</span>':!1===n?'<span class="day-10-seat-empty">L</span>':"."})).join("")})).join("<br/>")}}},u=i,s=(r("7c5b"),r("2877")),l=Object(s["a"])(u,o,a,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-64ac0f6a.a421198d.js.map