(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-011f911c"],{"096e":function(n,t,e){"use strict";e.r(t);var r=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("Day",{attrs:{day:3,solutions:n.solutions,taskInput:n.taskInput},on:{"input-changed":n.onInputChanged},scopedSlots:n._u([{key:"partOne",fn:function(){return[e("pre",{staticClass:"day-3-code border"},[e("code",{domProps:{innerHTML:n._s(n.gridOne)}}),n._v("\n      ")])]},proxy:!0},{key:"partTwo",fn:function(){return[e("pre",{staticClass:"day-3-code border"},[e("code",{domProps:{innerHTML:n._s(n.gridTwo)}}),n._v("\n      ")])]},proxy:!0}])})},a=[],i=(e("d81d"),e("13d5"),e("ac1f"),e("1276"),e("4a87")),o=(e("99af"),e("4160"),e("159b"),e("d4ec")),u=e("bee2"),s=function(){function n(t,e){Object(o["a"])(this,n),this.$input=t,this.$paths=e}return Object(u["a"])(n,[{key:"getPathGrid",value:function(){var n=this,t="",e=this.$paths.map((function(t){return Math.ceil(t[t.length-1].x/n.$input[0].length)})).reduce((function(n,t){return Math.max(n,t)})),r={};this.$paths.forEach((function(n){n.forEach((function(n){r["".concat(n.x,"-").concat(n.y)]=n.hit}))}));for(var a=0;a<this.$input.length;a++){for(var i=0;i<e;i++)for(var o=0;o<this.$input[a].length;o++){var u=this.$input[a][o]?"#":".",s=this.$input[a].length*i+o,c=r["".concat(s,"-").concat(a)];t+=!0===c?'<span class="day-3-path-hit">X</span>':!1===c?'<span class="day-3-path-miss">O</span>':u}t+="<br/>"}return t}}]),n}(),c={components:{Day:i["default"]},data:function(){return{taskInput:e("ca57").default,solutions:{partOne:null,partTwo:null},parsedInput:[],paths:{1:[],2:[]},gridOne:null,gridTwo:null}},methods:{onInputChanged:function(n){this.parsedInput=n.map((function(n){return n.split("").map((function(n){return"#"===n}))})),this.paths={1:[],2:[]},this.gridOne=null,this.gridTwo=null,this.solvePartOne(),this.solvePartTwo()},solvePartOne:function(){var n=this.checkSlope(3,1);this.paths[1].push(n.path),this.solutions.partOne=n.trees,this.gridOne=new s(this.parsedInput,this.paths[1]).getPathGrid()},solvePartTwo:function(){var n=this,t=[[1,1],[3,1],[5,1],[7,1],[1,2]];this.solutions.partTwo=t.map((function(t){var e=n.checkSlope(t[0],t[1]);return n.paths[2].push(e.path),e.trees})).reduce((function(n,t){return n*t}),1),this.gridTwo=new s(this.parsedInput,this.paths[2]).getPathGrid()},checkSlope:function(n,t){for(var e=0,r=0,a=0,i=[],o=t;o<this.parsedInput.length;o+=t)a+=n,r=(r+n)%this.parsedInput[o].length,this.parsedInput[o][r]?(e++,i.push({x:a,y:o,hit:!0})):i.push({x:a,y:o,hit:!1});return{path:i,trees:e}}}},h=c,p=(e("1ac2"),e("2877")),f=Object(p["a"])(h,r,a,!1,null,null,null);t["default"]=f.exports},"13d5":function(n,t,e){"use strict";var r=e("23e7"),a=e("d58f").left,i=e("a640"),o=e("ae40"),u=e("2d00"),s=e("605d"),c=i("reduce"),h=o("reduce",{1:0}),p=!s&&u>79&&u<83;r({target:"Array",proto:!0,forced:!c||!h||p},{reduce:function(n){return a(this,n,arguments.length,arguments.length>1?arguments[1]:void 0)}})},"1ac2":function(n,t,e){"use strict";e("1fb6")},"1fb6":function(n,t,e){},"99af":function(n,t,e){"use strict";var r=e("23e7"),a=e("d039"),i=e("e8b5"),o=e("861d"),u=e("7b0b"),s=e("50c4"),c=e("8418"),h=e("65f0"),p=e("1dde"),f=e("b622"),d=e("2d00"),l=f("isConcatSpreadable"),g=9007199254740991,v="Maximum allowed index exceeded",b=d>=51||!a((function(){var n=[];return n[l]=!1,n.concat()[0]!==n})),y=p("concat"),w=function(n){if(!o(n))return!1;var t=n[l];return void 0!==t?!!t:i(n)},m=!b||!y;r({target:"Array",proto:!0,forced:m},{concat:function(n){var t,e,r,a,i,o=u(this),p=h(o,0),f=0;for(t=-1,r=arguments.length;t<r;t++)if(i=-1===t?o:arguments[t],w(i)){if(a=s(i.length),f+a>g)throw TypeError(v);for(e=0;e<a;e++,f++)e in i&&c(p,f,i[e])}else{if(f>=g)throw TypeError(v);c(p,f++,i)}return p.length=f,p}})},bee2:function(n,t,e){"use strict";function r(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function a(n,t,e){return t&&r(n.prototype,t),e&&r(n,e),n}e.d(t,"a",(function(){return a}))},ca57:function(n,t,e){"use strict";e.r(t),t["default"]="....#...##.#.........#....#....\n#.......#...#...#.#............\n#..#..#.#.##....#.#........#...\n........##...................#.\n........#...##...#.#.###.......\n##............#...#.....#.##...\n...........#....###...#.....#..\n.......#......#..##..#.....#...\n..#.#..#....#.........#...#..#.\n.........##......#.....##..##..\n........#.....#....#..##......#\n..#..#.......#..............#..\n.....#.#.......................\n.#.#....#.........#............\n.......#.....#.###.............\n......##......#...........#..#.\n.#...............##...#........\n.....#..##........###.........#\n#...........#..#............#..\n.........#....#..#.#......#....\n.......#.........#..##.........\n.##.....#..................#...\n....#............#.#....#.....#\n..#....#...##....#...#.#...#...\n..........#................#.#.\n#...#.#.#.####..#.#..........#.\n..#...#.##......#...........#..\n..#.....#...#.......#......#..#\n..............#.......#........\n.#..#..........#.....#...#..#.#\n#........#...#......#.......#..\n#..................#...........\n..#...#........#...#..#........\n..............#.....#.....#..#.\n#.#.......#..............##.##.\n....#.#.....##....#...........#\n......#....#...#..#.......#....\n....#..#.#.....#..##.....#....#\n...........#.......#.#.#.......\n#.......#..##........#..#......\n.........#.##..#..............#\n...........#............###.#..\n..#.....#.....##...#.........#.\n....##............##........#..\n.....###..........#......##....\n#...##..#..#..........#........\n....#.....#.......#..#.#...##..\n.#....#........#.#.........#.#.\n##...#.#.....#......#..........\n.....##.....#....#.....###.#..#\n..............#..###..#...#..#.\n....#...#....#.............#.#.\n.#.........#.....#........#.##.\n....#.........#..........#.....\n.......#........#.#.#..........\n#........##....#.........#.....\n..##..........#....#.#...#....#\n#...#.#......#..##..........#.#\n.....#..#...#..#...............\n#...#..............#...........\n.#...#....#..##.....#....#.#...\n.#...#.......#...#..#.##....#..\n#....#........#....#...#.......\n#..#......#.....#.....#..##....\n......#.#....##....##..#...#...\n..#....#.#.###..............#..\n.#.##.......#.#.#..#...#..#....\n..#..........#.#....#..#.#....#\n..........#...#...#..........#.\n..........#.....#.#..#..#....##\n.#.#...##...#...........####...\n........##..#.#..........#.##.#\n#......###...........#...#.....\n..#.#....##.........##....#....\n#....#.##..##..#..#.....#.....#\n.##.....##....##....#.......#..\n#...#.....##....#..........#...\n............#.#.##....#....#...\n....#............#.....#......#\n....................#..........\n..#....................#..#....\n....#.....#........#..##...#...\n#.....#.#....................##\n.#....#.#.#...#..........#....#\n....#...#......#...#.....##...#\n.....#.........................\n.......#..#.#...#...#...#.....#\n...#......#.##.#...#..#...##.#.\n...........................#..#\n..#.#.....#........##..........\n....#...##........#.#.#..#...##\n..##.....#..###.........##.##..\n.#..#.....#...#.............#..\n#..............##...#....##....\n.##......#.#............#......\n.............##...#.#.......#..\n.........#..#..#...............\n........##......#....##........\n...#.........#.#.#.............\n#..........#......#......#..#..\n.............##.#.#..#.#.#...#.\n.....#.........#...............\n..##.#..#.....##..#........#.#.\n.#..........#.#.......#......##\n.#........................#....\n#....#....#...#..#......#......\n........#.......#......#.....#.\n.....#....##..#...###...#....#.\n....#.........#....#......#....\n.............#...#....#.......#\n.....#.........#..#.#..........\n.........#..#........#.#.#.....\n......#.##......#....#.#.##.#..\n.#...#.#...#...#.#......#....##\n.#................#......#.....\n#.#.#...............#..........\n.....#.#.......#...#........#..\n#...#.#.#.##..#...........#..#.\n.............###.........#....#\n.#.....#.......##....##.......#\n....#...#.......#.##.....#.....\n...........##.........#...#....\n..............#.#..#.....#..#..\n#.#...#..#.#.........#......#.#\n#.##.....##....#........#.#.#.#\n##.#.###.........##.......#..#.\n#.....#.....................#..\n.........##........#...........\n.###........##....#...#........\n....#.#........##...........#..\n..........#.....#..........#..#\n......#..............#......#..\n.....#...#......#...#...#......\n..........#.#..#....#...#..###.\n#..##........#................#\n..#............................\n.....#.........#.#.............\n........#...#.....#...##......#\n..#........#................#..\n......#....#..#......#.........\n...........##....#..#.#........\n.....#.............###.........\n#............#......#..#.......\n..#..#.................#..#..##\n.......#......#.....#........#.\n....................#..#.##...#\n.#..##...............##...#....\n...#...#....#........#.........\n.....##...#.....###............\n.###.........#........#.....##.\n.............#...#.............\n...#.#...............#..##..#.#\n...#...............#..#.....#..\n....#.#..................#...#.\n..........#...........#.#...###\n#...#......#................#..\n...#.#.......#...#......#.##...\n......#..........#.............\n##.......#.##.#...........#....\n......#...#.#.....#............\n.#.....#.....#.....#.........#.\n..................#............\n.#.#.#.....#......#.##.........\n.......#..##.##......#..#....#.\n...#.#.#......#...#........#...\n..#............#......#.......#\n..#......#........#.........#..\n..#..#.#.#.....#.............#.\n..#.#..##......#...#...##......\n.##...#....##.#.#...........#..\n..............#..#...#....#....\n.......#.#........#............\n.....##..###........#..........\n......................#........\n..##....#....#.................\n.##.#.###.#........#.##..#...#.\n##................#...........#\n....#..##.....##...............\n.#.....#..#............#.....#.\n#.........#..............#.....\n...##.#......#...#.............\n................#..............\n...#.....#....##...#..#....#...\n..............##..#...#.##..#..\n......................#..#....#\n.......#....#..#.##.........#.#\n#...#........##.......#........\n...##...............#.....#....\n.##...##...#...................\n.........##.#...#.........#....\n............#............#..#..\n.............................#.\n....#.#....#...................\n......#......#...#..##.........\n#........#.#.#.#.#......#....#.\n.#.........#.#...#......#..#.#.\n..............#....##.........#\n.#.......#..#....#.#.#....#....\n...###.#.#..#...#....#....#....\n#........#....................#\n......#...##.###..#..##...#....\n.....#........#.......#........\n#..#...........#.#.............\n....##.#...#..##............##.\n#.#..##..#...#...#.....#.......\n..#.............#.##..#...#.##.\n.#.....##.#..#...#...........#.\n....#...#....................##\n....##......#.###......#......#\n...#...#.........#..#.##....#..\n#......#..#....###.........#...\n#...........##.............#.#.\n#..............##....#......#..\n.........#...#.#...#...#.......\n....#....#............#.......#\n........#...#....#......##.....\n..........#.#..#.........#.....\n#........#.##....##......#.....\n...#.......#...................\n###...#...#..#.##....#.....#...\n........##..........#.##..#....\n.....#......#..#.....#.....#.#.\n...#..#..##..###.....##.#......\n#..#......##...#............#..\n#............#....#..#.........\n#........#.......#......#..##.#\n...#.#.........#.#.............\n#..............#..............#\n#.#......#..........##.........\n#..##...........#..##...#......\n.....#.#.....#......#.....#.#.#\n.#.##...#...##...........#....#\n#.............#........#.......\n..##.............#...#.........\n....#.#......###....#..........\n...#..#.....#..##.#....#...#.#.\n.............##................\n#.#............#........#..#.#.\n.#......#.....#...........#....\n...#.........#...........#.##..\n.....#...#.....#..#..........#.\n........#.#...............#.#..\n.......#..#..#.....#.......##..\n.#...#...#..#...##...#.........\n..........##....#..#.##..#.....\n....#.................#...#....\n.........#...#......#....#....#\n.........#..#...#.##........##.\n#.#....##.......#.#............\n##.......##..................#.\n......#...#......##............\n##.#...#.#...........#..#......\n.........#.........#..#.#...#..\n.#...#.......#.#...###.........\n................#.#.....#......\n..#...#.....#........#.........\n.........##.###.#.#.....#...#..\n#..#..........#....#.#...#...##\n##.#.#....#..##.............#.#\n.###....#..#...............##..\n............#......#.#.#....#..\n........#...#..#...#...........\n##.........#................#..\n...###...#.#..#...#..........##\n...#......#......##........#...\n.......#............#..........\n.....#.....##....#.....###.....\n.#...#...#.....#..#..#....#..#.\n#.#........#..#.......##...#.##\n.....#.....##..#.##........#..#\n.....#...#...........#.........\n..#....#.#...#..#....##...#...#\n...........#...##.........#....\n..#....#....##........#.####...\n#.............#.#.............#\n...................#.....#.#..#\n.#....#.#.............#.#......\n#...........#............#.#...\n..#.........#.#....#.......##..\n#....####......#...#......#....\n....##....#...................#\n....#.##....#.............#....\n.........##........#.....#..#..\n............#...#..............\n............#..##....#.....##.#\n............#.....#......#.....\n........#..#........##.#.......\n...#.#........#..............#.\n............#.........#..#.#...\n................#.............#\n..##..........##......#.#......\n..#..#.##....#.........#...#...\n...........##...#.#.#..........\n.#.#.......#.#...#.........#...\n.........#..#........#..#.#....\n..........##..#.##....#....#...\n....#...............#.......#..\n##..........##.................\n....#.#.#.....#..........##.#..\n..............#.##..........##.\n##...............#...#..#......\n..#..#..........#......#.......\n#...#..##.#.#..................\n....#....##......##.#...#....##\n.#...#.#....##.............#..#\n................#......###.....\n..#..#.............#.#.......#.\n..#..................#.......#.\n.....#.......#....#.##...#.##..\n.....##.......#......#..#......\n#..#.......#........#..........\n..#...#..#....#.........#......\n#..#..#......##..#.##....####..\n......##.#.....#..#.......#....\n.##...#.....#..#...#.#.........\n#.....#........###....#...#..#.\n.#....#.#..#......#............\n.........#..#..#.....#........#\n..#.......#..........#..#......\n......#.......##.#....#.#.#....\n.#............#.....#.......#..\n...#..#...............#........\n.....#........................."},d4ec:function(n,t,e){"use strict";function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}e.d(t,"a",(function(){return r}))},d58f:function(n,t,e){var r=e("1c0b"),a=e("7b0b"),i=e("44ad"),o=e("50c4"),u=function(n){return function(t,e,u,s){r(e);var c=a(t),h=i(c),p=o(c.length),f=n?p-1:0,d=n?-1:1;if(u<2)while(1){if(f in h){s=h[f],f+=d;break}if(f+=d,n?f<0:p<=f)throw TypeError("Reduce of empty array with no initial value")}for(;n?f>=0:p>f;f+=d)f in h&&(s=e(s,h[f],f,c));return s}};n.exports={left:u(!1),right:u(!0)}},d81d:function(n,t,e){"use strict";var r=e("23e7"),a=e("b727").map,i=e("1dde"),o=e("ae40"),u=i("map"),s=o("map");r({target:"Array",proto:!0,forced:!u||!s},{map:function(n){return a(this,n,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-011f911c.8029984b.js.map