"use strict";(self["webpackChunkadvent_of_code"]=self["webpackChunkadvent_of_code"]||[]).push([[2690],{3114:function(t,e,s){s.r(e),s.d(e,{default:function(){return p}});var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("Day",{attrs:{day:7,year:2018,solutions:t.solutions},on:{"input-changed":t.onInputChanged},scopedSlots:t._u([{key:"partTwo",fn:function(){return[s("b-table",{attrs:{"table-class":"mt-3",items:t.output,"per-page":10,"current-page":t.currentPage}}),s("b-pagination",{attrs:{"total-rows":t.output.length,"per-page":10},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})]},proxy:!0}])})},r=[],o=s(86889),a={components:{Day:o.Z},data:function(){return{solutions:{partOne:null,partTwo:null},currentPage:0,output:[]}},methods:{onInputChanged:function(t){this.mapping=new Map,this.allLetters=new Set,t.forEach((t=>{const e=t.split(" must be finished before step "),s=e[0].replace("Step ",""),n=e[1].replace(" can begin.","");if(this.allLetters.add(s),this.allLetters.add(n),this.mapping.has(n)){const t=this.mapping.get(n);t.push(s),this.mapping.set(n,t)}else this.mapping.set(n,[s])})),this.solvePartOne(),this.solvePartTwo()},solvePartOne:function(){const t=new Set(this.allLetters),e=[...t].filter((t=>!this.mapping.has(t))).sort(),s=[];while(t.size>0){const n=[...t].filter((t=>this.mapping.has(t)&&this.mapping.get(t).every((t=>s.includes(t))))).sort();n.forEach((t=>{-1===e.indexOf(t)&&e.push(t)})),e.sort();const r=e.shift();s.push(r),t.delete(r)}this.solutions.partOne=s.join("")},solvePartTwo:function(){this.output=[];const t=new Set(this.allLetters),e=[...t].filter((t=>!this.mapping.has(t))).sort(),s=[],n=Array.from(Array(5).keys()).map((t=>null));let r,o=0;while(t.size>0||n.some((t=>null!==t))){if(n.forEach(((t,e)=>{null!==t&&t.second===o&&(s.push(t.letter),n[e]=null)})),r=[],n.forEach(((t,e)=>{null===t&&r.push(e)})),r.length>0){const a=[...t].filter((t=>this.mapping.has(t)&&this.mapping.get(t).every((t=>s.includes(t))))).sort();a.forEach((t=>{-1===e.indexOf(t)&&e.push(t)})),e.sort(),r.forEach((s=>{const r=e.shift();r&&(t.delete(r),n[s]={letter:r,second:o+r.charCodeAt(0)-4})}))}this.output.push({second:o,worker1:n[0]?n[0].letter:".",worker2:n[1]?n[1].letter:".",worker3:n[2]?n[2].letter:".",worker4:n[3]?n[3].letter:".",worker5:n[4]?n[4].letter:".",done:s.join("")}),o++}this.solutions.partTwo=o-1}}},l=a,i=s(1001),u=(0,i.Z)(l,n,r,!1,null,null,null),p=u.exports}}]);
//# sourceMappingURL=2690.b36b096c.js.map