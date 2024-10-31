"use strict";(self["webpackChunkadvent_of_code"]=self["webpackChunkadvent_of_code"]||[]).push([[5284],{84053:function(t,e,n){n.r(e),n.d(e,{default:function(){return d}});var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Day",{attrs:{day:23,year:2023,solutions:t.solutions},on:{"input-changed":t.onInputChanged},scopedSlots:t._u([{key:"partOne",fn:function(){return[n("div",{staticClass:"canvas-holder"},[n("canvas",{staticClass:"canvas",attrs:{id:"partOne",width:"1000",height:"1000"}})]),n("b-button",{on:{click:t.plot}},[t._v("Redraw")])]},proxy:!0}])})},i=[],h=n(86889),o=n(47695),a={components:{Day:h.Z},data:function(){return{solutions:{partOne:null,partTwo:null},dirs:[{d:[-1,0],forbidden:">"},{d:[1,0],forbidden:"<"},{d:[0,-1],forbidden:"v"},{d:[0,1],forbidden:"^"}]}},methods:{onInputChanged:function(t){const e={},n={x:0,y:0},s={x:0,y:t.length-1};this.height=t.length,this.width=t[0].length,t.forEach(((i,h)=>{const o=i.split("");0===h?n.x=o.indexOf("."):h===t.length-1&&(s.x=o.indexOf(".")),o.forEach(((t,n)=>{e[`${n}|${h}`]=t}))})),this.grid=e;const i=this.bfs(e,n,s);this.path=i[i.length-1],this.solutions.partOne=this.path.length-1;const h=this.convertToGraph(e);h[`${n.x}|${n.y}`]=Object.assign(n,{key:`${n.x}|${n.y}`}),h[`${s.x}|${s.y}`]=Object.assign(s,{key:`${s.x}|${s.y}`});const o=Object.values(h);this.graph={},Object.keys(h).forEach((t=>{this.graph[t]={cost:null,key:t,neighbors:[]}}));for(let a=0;a<o.length-1;a++)for(let t=a+1;t<o.length;t++){const n=this.bfs(e,o[a],o[t],!0);n.length>0&&(this.graph[o[a].key].neighbors.push({key:o[t].key,cost:n[0].length-1}),this.graph[o[t].key].neighbors.push({key:o[a].key,cost:n[0].length-1}))}this.solutions.partTwo=this.getLongestGraph(`${n.x}|${n.y}`,`${s.x}|${s.y}`,new Set),this.$nextTick((()=>this.plot()))},plot:function(){const t=document.getElementById("partOne"),e=7;this.pathIndex=0,t.width=this.width*e,t.height=this.height*e;const n=t.getContext("2d");this.$nextTick((()=>{n.translate(.5,.5),n.lineWidth=e/2,n.fillStyle="#57606f",n.fillRect(0,0,t.width,t.height);const s=(0,o.fb)(o.dZ,this.path.length+1),i=(0,o.fb)(o.dZ,Math.max(...Object.values(this.graph).map((t=>Math.max(...t.neighbors.map((t=>t.cost))))))+1);n.fillStyle="#2f3542";for(let t=0;t<this.height;t++)for(let s=0;s<this.width;s++){const i=this.grid[`${s}|${t}`];"#"===i&&n.fillRect(s*e,t*e,e,e)}window.requestAnimationFrame((()=>this.plotPath(n,e,s,i)))}))},plotGraph:function(t,e,n){Object.values(this.graph).forEach((s=>{const[i,h]=s.key.split("|").map(Number);this.graph[s.key].neighbors.forEach((s=>{const[o,a]=s.key.split("|").map(Number);t.strokeStyle=n[s.cost],t.beginPath(),t.moveTo((i+.5)*e,(h+.5)*e),t.lineTo((o+.5)*e,(a+.5)*e),t.stroke()}))})),Object.values(this.graph).forEach((n=>{const[s,i]=n.key.split("|").map(Number);t.fillStyle="white",t.beginPath(),t.arc((s+.5)*e,(i+.5)*e,e/2,0,2*Math.PI),t.fill()}))},plotPath:function(t,e,n,s){const i=this.path[this.pathIndex];t.fillStyle=n[this.pathIndex],t.fillRect(i.x*e,i.y*e,e,e),this.pathIndex++,this.pathIndex===this.path.length?window.requestAnimationFrame((()=>this.plotGraph(t,e,s))):window.requestAnimationFrame((()=>this.plotPath(t,e,n,s)))},convertToGraph:function(t){const e={};for(let n=0;n<this.height;n++)for(let s=0;s<this.width;s++)if("."===t[`${s}|${n}`]){const i=this.dirs.map((e=>t[`${s+e.d[0]}|${n+e.d[1]}`])).filter((t=>[">","<","v","^"].includes(t))).length>1;i&&(e[`${s}|${n}`]={x:s,y:n,key:`${s}|${n}`})}return e},getLongestGraph:function(t,e,n){if(t===e)return 0;let s=Number.MIN_SAFE_INTEGER;n.add(t);const i=this.graph[t];return i.neighbors.forEach((t=>{n.has(t.key)||(s=Math.max(s,t.cost+this.getLongestGraph(t.key,e,n)))})),n.delete(t),s},bfs:function(t,e,n,s=!1){const i=[{x:e.x,y:e.y,path:[],visited:new Set}];i[0].visited.add(`${e.x}|${e.y}`);const h=[];while(i.length>0){const e=i.shift();for(const o of this.dirs){const a={x:e.x+o.d[0],y:e.y+o.d[1]};if(a.x===n.x&&a.y===n.y){const t=e.path.concat();if(t.push({x:e.x,y:e.y}),t.push(n),s)return[t];h.push(t)}const r=t[`${a.x}|${a.y}`],c=e.visited.has(`${a.x}|${a.y}`);if(a.x>=0&&a.x<this.width&&a.y>=0&&a.x<this.height&&void 0!==r&&"#"!==r&&!c){if(s){const e=this.dirs.map((e=>t[`${a.x+e.d[0]}|${a.y+e.d[1]}`])).filter((t=>[">","<","v","^"].includes(t))).length>1;if(e)continue}if(!s&&r===o.forbidden)continue;const n=e.path.concat();n.push({x:e.x,y:e.y});const h=new Set(e.visited);h.add(`${e.x}|${e.y}`),i.push({x:a.x,y:a.y,path:n,visited:h})}}}return h}}},r=a,c=n(1001),l=(0,c.Z)(r,s,i,!1,null,null,null),d=l.exports},47695:function(t,e,n){n.d(e,{dZ:function(){return s},fb:function(){return a},wH:function(){return o}});const s=["#440154","#48186a","#472d7b","#424086","#3b528b","#33638d","#2c728e","#26828e","#21918c","#1fa088","#28ae80","#3fbc73","#5ec962","#84d44b","#addc30","#d8e219","#fde725"],i=t=>{const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null},h=(t,e,n)=>"#"+((1<<24)+(t<<16)+(e<<8)+n).toString(16).slice(1),o=(t,e,n)=>{const s=i(t),o=i(e);if(n<2)return[t];const a=[];for(let i=0;i<n;i++){const t=i/(n-1);a.push(h(Math.floor(s.r+t*(o.r-s.r)),Math.floor(s.g+t*(o.g-s.g)),Math.floor(s.b+t*(o.b-s.b))))}return a},a=(t,e)=>{if(t.length>e)return t.slice(0,e);const n=t.length-1;let s=[];for(let i=0;i<n-1;i++)s=s.concat(o(t[i],t[i+1],Math.max(1,Math.floor(e/n))));while(s.length<e)s.push(t[t.length-1]);return s}}}]);
//# sourceMappingURL=5284.d18ba08a.js.map