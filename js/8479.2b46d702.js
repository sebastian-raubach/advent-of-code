(self["webpackChunkadvent_of_code"]=self["webpackChunkadvent_of_code"]||[]).push([[8479,1978],{35077:(t,e,r)=>{"use strict";r.r(e),r.d(e,{default:()=>h});var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Day",{attrs:{day:11,year:2015,solutions:t.solutions},on:{"input-changed":t.onInputChanged}})},i=[],o=(r(74916),r(23123),r(92222),r(69600),r(41539),r(26699),r(32023),r(57327),r(83024));const s={components:{Day:o["default"]},data:function(){return{solutions:{partOne:null,partTwo:null},forbidden:["i","o","l"]}},methods:{onInputChanged:function(t){var e=t[0].split("").reverse(),r=!1;while(!r)e=this.increment(e),r=this.checkPassword(e.concat().reverse());this.solutions.partOne=e.concat().reverse().join(""),r=!1;while(!r)e=this.increment(e),r=this.checkPassword(e.concat().reverse());this.solutions.partTwo=e.concat().reverse().join("")},checkPassword:function(t){var e=this;if(t.some((function(t){return e.forbidden.includes(t)})))return!1;for(var r=!1,n=2;n<t.length;n++)if(this.isNext(t[n-2],t[n-1],1)&&this.isNext(t[n-1],t[n],1)){r=!0;break}if(!r)return!1;for(var i=[],o=1;o<t.length;o++)t[o-1]===t[o]&&i.push({index:o-1,letter:t[o]});return i.some((function(t){return i.filter((function(e){return Math.abs(t.index-e.index)>1&&t.letter!==e.letter})).length>0}))},increment:function(t){var e=0,r=t.concat();while(1){if(r[e]=this.incrementLetter(r[e]),"a"!==r[e])return r;if(e++,e===r.length)return r.push("a"),r}},isNext:function(t,e,r){return String.fromCharCode(t.charCodeAt(0)+r)===e},incrementLetter:function(t){return"z"===t?"a":String.fromCharCode(t.charCodeAt(0)+1)}}},c=s;var a=r(1001),u=(0,a.Z)(c,n,i,!1,null,null,null);const h=u.exports},84964:(t,e,r)=>{var n=r(5112),i=n("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(r){try{return e[i]=!1,"/./"[t](e)}catch(n){}}return!1}},3929:(t,e,r)=>{var n=r(47850);t.exports=function(t){if(n(t))throw TypeError("The method doesn't accept regular expressions");return t}},26699:(t,e,r)=>{"use strict";var n=r(82109),i=r(41318).includes,o=r(51223),s=r(29207),c=s("indexOf",{ACCESSORS:!0,1:0});n({target:"Array",proto:!0,forced:!c},{includes:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),o("includes")},69600:(t,e,r)=>{"use strict";var n=r(82109),i=r(68361),o=r(45656),s=r(9341),c=[].join,a=i!=Object,u=s("join",",");n({target:"Array",proto:!0,forced:a||!u},{join:function(t){return c.call(o(this),void 0===t?",":t)}})},32023:(t,e,r)=>{"use strict";var n=r(82109),i=r(3929),o=r(84488),s=r(84964);n({target:"String",proto:!0,forced:!s("includes")},{includes:function(t){return!!~String(o(this)).indexOf(i(t),arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=8479.2b46d702.js.map