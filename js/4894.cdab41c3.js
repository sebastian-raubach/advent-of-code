"use strict";(self["webpackChunkadvent_of_code"]=self["webpackChunkadvent_of_code"]||[]).push([[4894],{64551:function(n,t,e){e.r(t),e.d(t,{default:function(){return c}});var r=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("Day",{attrs:{day:12,year:2023,solutions:n.solutions},on:{"input-changed":n.onInputChanged}})},s=[],u=e(86889),o={components:{Day:u.Z},data:function(){return{solutions:{partOne:null,partTwo:null}}},methods:{onInputChanged:function(n){const t=n.map((n=>{const[t,e]=n.split(" ").map(((n,t)=>0===t?n:n.split(",").map(Number)));return{conditions:t,runLengths:e,possibleArrangements:[],possibleCount:0}}));this.solutions.partOne=t.map((n=>{const t=n.runLengths.reduce(((n,t)=>n+t+1));return n.possibleCount=this.countArrangments(n.conditions,0,n.runLengths,t,[]),n.possibleCount})).reduce(((n,t)=>n+t)),this.solutions.partTwo=t.map((n=>{n.conditions=[0,1,2,3,4].map((t=>n.conditions)).join("?"),n.runLengths=[0,1,2,3,4].map((t=>n.runLengths)).flat();const t=n.runLengths.reduce(((n,t)=>n+t+1));return n.possibleCount=this.countArrangments(n.conditions,0,n.runLengths,t,[]),n.possibleCount})).reduce(((n,t)=>n+t))},countArrangments:function(n,t,e,r,s){function u(n){return s[t]||(s[t]=[]),s[t][e.length]=n,n}if(s[t]&&"number"===typeof s[t][e.length])return s[t][e.length];if(0===e.length)return n.indexOf("#",t)>=0?0:1;if(t+r>n.length)return u(0);if("."===n[t]){let o=t;while("."===n[o])o++;return u(this.countArrangments(n,o,e,r,s))}if(t>=n.length)return u(0===e.length?1:0);if("#"===n[t]){if(n.length-t<e[0])return u(0);for(let r=0;r<e[0];r++)if("."===n[t+r])return u(0);return"#"===n[t+e[0]]?u(0):u(this.countArrangments(n,t+e[0]+1,e.slice(1),r-e[0]-1,s))}if("?"===n[t]){let o=this.countArrangments(n,t+1,e,r,s);if(n.length-t<e[0])return u(o);for(let r=0;r<e[0];r++)if("."===n[t+r])return u(o);return"#"===n[t+e[0]]||(o+=this.countArrangments(n,t+e[0]+1,e.slice(1),r-e[0]-1,s)),u(o)}}}},i=o,l=e(1001),a=(0,l.Z)(i,r,s,!1,null,null,null),c=a.exports}}]);
//# sourceMappingURL=4894.cdab41c3.js.map