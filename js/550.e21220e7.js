"use strict";(self["webpackChunkadvent_of_code"]=self["webpackChunkadvent_of_code"]||[]).push([[550],{17930:function(e,t,n){n.r(t),n.d(t,{default:function(){return u}});var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Day",{attrs:{day:16,year:2018,solutions:e.solutions},on:{"input-changed":e.onInputChanged}})},o=[],i=n(86889),r=n(59217),a={components:{Day:i.Z},data:function(){return{solutions:{partOne:null,partTwo:null}}},methods:{onInputChanged:function(e){this.samples=[],this.program=[];let t={},n=0,s=!1;for(let o=0;o<e.length;o++){const i=e[o];""===i?(t.before&&t.after&&t.ins&&this.samples.push(t),t={},n++,n>1&&(s=!0)):i.includes("Before: ")?(n=0,t.before=i.replace(/\D/g,"").split("").map((e=>+e))):i.includes("After: ")?(n=0,t.after=i.replace(/\D/g,"").split("").map((e=>+e))):(n=0,s?this.program.push(i.split(" ").map((e=>+e))):t.ins=i.split(" ").map((e=>+e)))}this.solvePartOne(),this.solvePartTwo()},solvePartOne:function(){this.opcodeMapping={},this.solutions.partOne=this.samples.map((e=>{const t=e.ins[0],n=Object.keys(r.Z).filter((t=>{const n=e.before.concat();return r.Z[t](e.ins[1],e.ins[2],e.ins[3],n),n.every(((t,n)=>t===e.after[n]))}));return this.opcodeMapping[t]?n.forEach((e=>this.opcodeMapping[t].add(e))):this.opcodeMapping[t]=new Set,n.length>=3?1:0})).reduce(((e,t)=>e+t))},solvePartTwo:function(){const e={};while(Object.keys(e).length!==Object.keys(this.opcodeMapping).length){const t=Object.keys(this.opcodeMapping).filter((e=>1===this.opcodeMapping[e].size));t.forEach((t=>{const n=this.opcodeMapping[t].values().next().value;e[t]=n,Object.keys(this.opcodeMapping).forEach((e=>this.opcodeMapping[e].delete(n)))}))}const t=[0,0,0,0];this.program.forEach((n=>r.Z[e[n[0]]](n[1],n[2],n[3],t))),this.solutions.partTwo=t[0]}}},p=a,c=n(1001),l=(0,c.Z)(p,s,o,!1,null,null,null),u=l.exports},59217:function(e,t){t.Z={addr:(e,t,n,s)=>{s[n]=s[e]+s[t]},addi:(e,t,n,s)=>{s[n]=s[e]+t},mulr:(e,t,n,s)=>{s[n]=s[e]*s[t]},muli:(e,t,n,s)=>{s[n]=s[e]*t},banr:(e,t,n,s)=>{s[n]=s[e]&s[t]},bani:(e,t,n,s)=>{s[n]=s[e]&t},borr:(e,t,n,s)=>{s[n]=s[e]|s[t]},bori:(e,t,n,s)=>{s[n]=s[e]|t},setr:(e,t,n,s)=>{s[n]=s[e]},seti:(e,t,n,s)=>{s[n]=e},gtir:(e,t,n,s)=>{s[n]=e>s[t]?1:0},gtri:(e,t,n,s)=>{s[n]=s[e]>t?1:0},gtrr:(e,t,n,s)=>{s[n]=s[e]>s[t]?1:0},eqir:(e,t,n,s)=>{s[n]=e===s[t]?1:0},eqri:(e,t,n,s)=>{s[n]=s[e]===t?1:0},eqrr:(e,t,n,s)=>{s[n]=s[e]===s[t]?1:0}}}}]);
//# sourceMappingURL=550.e21220e7.js.map