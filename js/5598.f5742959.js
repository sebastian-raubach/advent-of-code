"use strict";(self["webpackChunkadvent_of_code"]=self["webpackChunkadvent_of_code"]||[]).push([[5598],{91614:function(t,s,o){o.r(s),o.d(s,{default:function(){return d}});var e=function(){var t=this,s=t.$createElement,o=t._self._c||s;return o("Day",{attrs:{day:11,year:2018,solutions:t.solutions},on:{"input-changed":t.onInputChanged}})},i=[],r=o(86889),n={components:{Day:r.Z},data:function(){return{solutions:{partOne:null,partTwo:null}}},methods:{onInputChanged:function(t){this.serialNumber=+t[0],this.grid=[];for(let s=0;s<300;s++){const t=[];for(let o=0;o<300;o++){const e=o+1+10;let i=e*(s+1);i+=this.serialNumber,i*=e;const r=`${i}`.split("");i=r.length<3?0:+r[r.length-3],t.push(i-5)}this.grid.push(t)}this.solvePartOne(),this.solvePartTwo()},solvePartOne:function(){let t=0,s=null;for(let o=0;o<297;o++)for(let e=0;e<297;e++){let i=this.grid[o][e]+this.grid[o][e+1]+this.grid[o][e+2];i+=this.grid[o+1][e]+this.grid[o+1][e+1]+this.grid[o+1][e+2],i+=this.grid[o+2][e]+this.grid[o+2][e+1]+this.grid[o+2][e+2],i>t&&(t=i,s={x:e+1,y:o+1})}this.solutions.partOne=`${s.x},${s.y}`},solvePartTwo:function(){let t={sum:-Number.MAX_VALUE,coords:null,size:1};for(let s=0;s<300;s++)for(let o=0;o<300;o++){let e=this.grid[s][o];e>t.sum&&(t={sum:e,coords:{x:o+1,y:s+1},size:1});const i=Math.max(o,s),r=300-i-1;for(let n=2;n<=r;n++){for(let t=0;t<n;t++)e+=this.grid[s+t][o+n-1];for(let t=0;t<n;t++)e+=this.grid[s+n-1][o+t];e-=this.grid[s+n-1][o+n-1],e>t.sum&&(t={sum:e,coords:{x:o+1,y:s+1},size:n})}}this.solutions.partTwo=`${t.coords.x},${t.coords.y},${t.size}`}}},l=n,u=o(1001),h=(0,u.Z)(l,e,i,!1,null,null,null),d=h.exports}}]);
//# sourceMappingURL=5598.f5742959.js.map