"use strict";(self["webpackChunkadvent_of_code"]=self["webpackChunkadvent_of_code"]||[]).push([[4584,1978],{54760:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  "default": () => (/* binding */ Day1)\n});\n\n;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/2022/Day1.vue?vue&type=template&id=f31e7d92&\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(\'Day\',{attrs:{"day":1,"year":2022,"solutions":_vm.solutions},on:{"input-changed":_vm.onInputChanged}})}\nvar staticRenderFns = []\n\n\n// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js\nvar es_object_to_string = __webpack_require__(41539);\n// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js\nvar web_dom_collections_for_each = __webpack_require__(54747);\n// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js\nvar es_array_sort = __webpack_require__(2707);\n// EXTERNAL MODULE: ./src/components/Day.vue + 5 modules\nvar Day = __webpack_require__(85619);\n;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/2022/Day1.vue?vue&type=script&lang=js&\n\n\n\n\n\n\n//\n//\n//\n//\n//\n\n/* harmony default export */ const Day1vue_type_script_lang_js_ = ({\n  components: {\n    Day: Day["default"]\n  },\n  data: function data() {\n    return {\n      solutions: {\n        partOne: null,\n        partTwo: null\n      }\n    };\n  },\n  methods: {\n    onInputChanged: function onInputChanged(input) {\n      var elves = [];\n      var sum = 0;\n      input.forEach(function (i) {\n        if (i === \'\') {\n          // If we encounter an empty line, store the sum and reset\n          elves.push(sum);\n          sum = 0;\n        } else {\n          // Otherwise, add to the sum\n          sum += +i;\n        }\n      }); // Add the last one\n\n      elves.push(sum); // Sort them\n\n      elves.sort(function (a, b) {\n        return b - a;\n      }); // Get the largest value for part one\n\n      this.solutions.partOne = elves[0]; // Sum up three largest for part two\n\n      this.solutions.partTwo = elves[0] + elves[1] + elves[2];\n    }\n  }\n});\n;// CONCATENATED MODULE: ./src/components/2022/Day1.vue?vue&type=script&lang=js&\n /* harmony default export */ const _2022_Day1vue_type_script_lang_js_ = (Day1vue_type_script_lang_js_); \n// EXTERNAL MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js\nvar componentNormalizer = __webpack_require__(1001);\n;// CONCATENATED MODULE: ./src/components/2022/Day1.vue\n\n\n\n\n\n/* normalize component */\n;\nvar component = (0,componentNormalizer/* default */.Z)(\n  _2022_Day1vue_type_script_lang_js_,\n  render,\n  staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* harmony default export */ const Day1 = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTQ3NjAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMEJBQTBCLGFBQWEsMEJBQTBCLHdCQUF3QixpQkFBaUIsT0FBTyw4Q0FBOEMsS0FBSyxvQ0FBb0M7QUFDeE07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDS0E7QUFFQSxtRUFBZTtBQUNmQTtBQUNBQyxTQUFBQSxjQUFBQTtBQURBLEdBREE7QUFJQUM7QUFDQTtBQUNBQztBQUNBQyxxQkFEQTtBQUVBQztBQUZBO0FBREE7QUFNQSxHQVhBO0FBWUFDO0FBQ0FDO0FBQ0E7QUFFQTtBQUVBQztBQUNBO0FBQ0E7QUFDQUM7QUFDQUM7QUFDQSxTQUpBLE1BSUE7QUFDQTtBQUNBQTtBQUNBO0FBQ0EsT0FUQSxFQUxBLENBZ0JBOztBQUNBRCxzQkFqQkEsQ0FtQkE7O0FBQ0FBO0FBQUE7QUFBQSxTQXBCQSxDQXNCQTs7QUFDQSx3Q0F2QkEsQ0F3QkE7O0FBQ0E7QUFDQTtBQTNCQTtBQVpBLEc7O0FDUndRLENBQUMseUVBQWUsNEJBQUcsRUFBQyxDOzs7O0FDQXpNO0FBQzNCO0FBQ0w7OztBQUduRDtBQUNBLENBQXNHO0FBQ3RHLGdCQUFnQixzQ0FBVTtBQUMxQixFQUFFLGtDQUFNO0FBQ1IsRUFBRSxNQUFNO0FBQ1IsRUFBRSxlQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQ0FBZSIsInNvdXJjZXMiOlsid2VicGFjazovL2FkdmVudC1vZi1jb2RlLy4vc3JjL2NvbXBvbmVudHMvMjAyMi9EYXkxLnZ1ZT8zZDRlIiwid2VicGFjazovL2FkdmVudC1vZi1jb2RlL3NyYy9jb21wb25lbnRzLzIwMjIvRGF5MS52dWU/YzMwYyIsIndlYnBhY2s6Ly9hZHZlbnQtb2YtY29kZS8uL3NyYy9jb21wb25lbnRzLzIwMjIvRGF5MS52dWU/NmY0NyIsIndlYnBhY2s6Ly9hZHZlbnQtb2YtY29kZS8uL3NyYy9jb21wb25lbnRzLzIwMjIvRGF5MS52dWU/NWZlOCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiBfYygnRGF5Jyx7YXR0cnM6e1wiZGF5XCI6MSxcInllYXJcIjoyMDIyLFwic29sdXRpb25zXCI6X3ZtLnNvbHV0aW9uc30sb246e1wiaW5wdXQtY2hhbmdlZFwiOl92bS5vbklucHV0Q2hhbmdlZH19KX1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiPHRlbXBsYXRlPlxuICA8RGF5IDpkYXk9XCIxXCIgOnllYXI9XCIyMDIyXCIgOnNvbHV0aW9ucz1cInNvbHV0aW9uc1wiIEBpbnB1dC1jaGFuZ2VkPVwib25JbnB1dENoYW5nZWRcIj5cbiAgPC9EYXk+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IERheSBmcm9tICdAL2NvbXBvbmVudHMvRGF5J1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHtcbiAgICBEYXlcbiAgfSxcbiAgZGF0YTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzb2x1dGlvbnM6IHtcbiAgICAgICAgcGFydE9uZTogbnVsbCxcbiAgICAgICAgcGFydFR3bzogbnVsbFxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIG9uSW5wdXRDaGFuZ2VkOiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgIGNvbnN0IGVsdmVzID0gW11cblxuICAgICAgbGV0IHN1bSA9IDBcblxuICAgICAgaW5wdXQuZm9yRWFjaChpID0+IHtcbiAgICAgICAgaWYgKGkgPT09ICcnKSB7XG4gICAgICAgICAgLy8gSWYgd2UgZW5jb3VudGVyIGFuIGVtcHR5IGxpbmUsIHN0b3JlIHRoZSBzdW0gYW5kIHJlc2V0XG4gICAgICAgICAgZWx2ZXMucHVzaChzdW0pXG4gICAgICAgICAgc3VtID0gMFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSwgYWRkIHRvIHRoZSBzdW1cbiAgICAgICAgICBzdW0gKz0gK2lcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8gQWRkIHRoZSBsYXN0IG9uZVxuICAgICAgZWx2ZXMucHVzaChzdW0pXG5cbiAgICAgIC8vIFNvcnQgdGhlbVxuICAgICAgZWx2ZXMuc29ydCgoYSwgYikgPT4gYiAtIGEpXG5cbiAgICAgIC8vIEdldCB0aGUgbGFyZ2VzdCB2YWx1ZSBmb3IgcGFydCBvbmVcbiAgICAgIHRoaXMuc29sdXRpb25zLnBhcnRPbmUgPSBlbHZlc1swXVxuICAgICAgLy8gU3VtIHVwIHRocmVlIGxhcmdlc3QgZm9yIHBhcnQgdHdvXG4gICAgICB0aGlzLnNvbHV0aW9ucy5wYXJ0VHdvID0gZWx2ZXNbMF0gKyBlbHZlc1sxXSArIGVsdmVzWzJdXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGhyZWFkLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC00MFswXS5ydWxlc1swXS51c2VbMV0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0B2dWUvdnVlLWxvYWRlci12MTUvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9EYXkxLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGhyZWFkLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC00MFswXS5ydWxlc1swXS51c2VbMV0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0B2dWUvdnVlLWxvYWRlci12MTUvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9EYXkxLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vRGF5MS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ZjMxZTdkOTImXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vRGF5MS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0RheTEudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHZ1ZS92dWUtbG9hZGVyLXYxNS9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiXSwibmFtZXMiOlsiY29tcG9uZW50cyIsIkRheSIsImRhdGEiLCJzb2x1dGlvbnMiLCJwYXJ0T25lIiwicGFydFR3byIsIm1ldGhvZHMiLCJvbklucHV0Q2hhbmdlZCIsImlucHV0IiwiZWx2ZXMiLCJzdW0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///54760\n')}}]);