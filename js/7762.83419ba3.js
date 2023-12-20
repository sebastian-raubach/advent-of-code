"use strict";(self["webpackChunkadvent_of_code"]=self["webpackChunkadvent_of_code"]||[]).push([[7762],{25437:function(t,n,e){e.r(n),e.d(n,{default:function(){return h}});var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("Day",{attrs:{day:15,year:2023,solutions:t.solutions},on:{"input-changed":t.onInputChanged},scopedSlots:t._u([{key:"partTwo",fn:function(){return[e("div",{staticClass:"canvas-holder"},[e("canvas",{staticClass:"canvas",attrs:{id:"partTwo",width:"200",height:"1536"}})])]},proxy:!0}])})},r=[],l=e(86889),s=e(24002),a=e(47695),i={components:{Day:l.Z},data:function(){return{solutions:{partOne:null,partTwo:null}}},methods:{hash:function(t){const n=t.split("");let e=0;return n.forEach((t=>{e+=t.charCodeAt(0),e*=17,e=(0,s.wQ)(e,256)})),e},onInputChanged:function(t){this.solutions.partOne=t[0].split(",").map((t=>this.hash(t))).reduce(((t,n)=>t+n),0);const n=Array.from(Array(256).keys()).map((t=>[]));t[0].split(",").forEach((t=>{if(t.endsWith("-")){const e=t.substring(0,t.length-1),o=this.hash(e),r=n[o],l=r.findIndex((t=>t.label===e));-1!==l&&r.splice(l,1)}else{const[e,o]=t.split("="),r=this.hash(e),l=n[r],s=l.findIndex((t=>t.label===e));-1!==s?l[s].lens=+o:l.push({label:e,lens:+o})}})),this.solutions.partTwo=n.map(((t,n)=>t.map(((t,e)=>(n+1)*(e+1)*t.lens)).reduce(((t,n)=>t+n),0))).reduce(((t,n)=>t+n),0),this.$nextTick((()=>this.plot(n)))},plot:function(t){const n=Math.max(...t.map((t=>t.length))),e=Math.max(...t.map((t=>Math.max(...t.map((t=>t.lens)))))),o=(0,a.fb)(a.dZ,e+1),r=document.getElementById("partTwo"),l=20,s=30,i=2;r.width=(n+i)*s+30,r.height=(t.length+i)*l;const c=r.getContext("2d");c.font="10px sans-serif",c.textAlign="end",c.textBaseline="middle",c.fillStyle="#222222",c.fillRect(0,0,r.width,r.height),t.forEach(((t,n)=>{c.fillStyle="#ffffff",c.fillText(`${n+1}`,30,n*l+l/2),t.forEach(((t,r)=>{const a=.7+.7*t.lens/e*s/2,u=30+i+r*s+s/2,f=n*l+i/2;c.fillStyle=o[t.lens],c.beginPath(),c.moveTo(u,f),console.log(a,a),c.bezierCurveTo(u+a,f+.25*l,u+a,f+.75*l,u,f+l-i-i/2),c.bezierCurveTo(u-a,f+.75*l,u-a,f+.25*l,u,f),c.fill()}))}))}}},c=i,u=e(1001),f=(0,u.Z)(c,o,r,!1,null,null,null),h=f.exports},47695:function(t,n,e){e.d(n,{dZ:function(){return o},fb:function(){return a},wH:function(){return s}});const o=["#440154","#48186a","#472d7b","#424086","#3b528b","#33638d","#2c728e","#26828e","#21918c","#1fa088","#28ae80","#3fbc73","#5ec962","#84d44b","#addc30","#d8e219","#fde725"],r=t=>{const n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16)}:null},l=(t,n,e)=>"#"+((1<<24)+(t<<16)+(n<<8)+e).toString(16).slice(1),s=(t,n,e)=>{const o=r(t),s=r(n);if(e<2)return[t];const a=[];for(let r=0;r<e;r++){const t=r/(e-1);a.push(l(Math.floor(o.r+t*(s.r-o.r)),Math.floor(o.g+t*(s.g-o.g)),Math.floor(o.b+t*(s.b-o.b))))}return a},a=(t,n)=>{if(t.length>n)return t.slice(0,n);const e=t.length-1;let o=[];for(let r=0;r<e-1;r++)o=o.concat(s(t[r],t[r+1],Math.max(1,Math.floor(n/e))));while(o.length<n)o.push(t[t.length-1]);return o}},24002:function(t,n,e){e.d(n,{p4:function(){return r},uq:function(){return i},wQ:function(){return o}});const o=(t,n)=>(t%n+n)%n,r=t=>{const n=t.length,e=t[0].length,o=[];for(let r=0;r<e;r++)o[r]=Array(n);for(let r=0;r<n;r++)for(let n=0;n<e;n++)o[n][r]=t[r][n];return o},l=(t,n)=>0===n?t:l(n,t%n),s=(t,n)=>t/l(t,n)*n,a=t=>t.reduce(s,1),i=t=>a(t)}}]);
//# sourceMappingURL=7762.83419ba3.js.map