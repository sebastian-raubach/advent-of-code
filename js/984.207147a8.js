"use strict";(self["webpackChunkadvent_of_code"]=self["webpackChunkadvent_of_code"]||[]).push([[984],{1921:function(e,t,a){a.r(t),a.d(t,{default:function(){return o}});var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("Day",{attrs:{day:19,year:2023,solutions:e.solutions},on:{"input-changed":e.onInputChanged}})},r=[],n=a(86889),l={components:{Day:n.Z},data:function(){return{solutions:{partOne:null,partTwo:null},checks:{"<":(e,t)=>t[e.variable]<e.value,">":(e,t)=>t[e.variable]>e.value}}},methods:{onInputChanged:function(e){const t={},a=[];let s=!1;const r=/(?<name>.+)\{(?<rules>.+)\}/,n=/(?<variable>.{1})(?<check>.{1})(?<value>\d+):(?<target>.+)/;e.forEach((e=>{if(""!==e)if(s)a.push(JSON.parse(e.replace("{",'{"').replaceAll(",",',"').replaceAll("=",'":').replace("}","}")));else{const a=e.match(r).groups,s=a.rules.split(","),l={name:a.name,rules:[],target:null};s.forEach((e=>{if(e.includes(":")){const t=e.match(n).groups;l.rules.push({variable:t.variable,check:t.check,value:+t.value,target:t.target})}else l.target=e})),t[l.name]=l}else s=!0})),this.solutions.partOne=a.map((e=>{let a="in";while("A"!==a&&"R"!==a){const s=t[a];let r=!1;for(let t=0;t<s.rules.length;t++)if(this.checks[s.rules[t].check](s.rules[t],e)){a=s.rules[t].target,r=!0;break}r||(a=s.target)}return"A"===a?Object.values(e).reduce(((e,t)=>e+t)):0})).reduce(((e,t)=>e+t));const l={x:[1,4e3],m:[1,4e3],a:[1,4e3],s:[1,4e3]};this.solutions.partTwo=this.getRanges(t,"in",l).map((e=>Object.values(e).reduce(((e,[t,a])=>e*(a-t+1)),1))).reduce(((e,t)=>e+t))},getRanges:function(e,t,a){if("R"===t)return[];if("A"===t)return[JSON.parse(JSON.stringify(a))];{const s=e[t],r=[];for(let t=0;t<s.rules.length;t++){const n=s.rules[t];if("<"===n.check){const t=JSON.parse(JSON.stringify(a));t[n.variable][1]=n.value-1,r.push(...this.getRanges(e,n.target,t)),a[n.variable][0]=n.value}else{const t=JSON.parse(JSON.stringify(a));t[n.variable][0]=n.value+1,r.push(...this.getRanges(e,n.target,t)),a[n.variable][1]=n.value}}return r.push(...this.getRanges(e,s.target,JSON.parse(JSON.stringify(a)))),r}}}},u=l,c=a(1001),i=(0,c.Z)(u,s,r,!1,null,null,null),o=i.exports}}]);
//# sourceMappingURL=984.207147a8.js.map