"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page", {
  /***/ "(app-pages-browser)/./src/components/home/signInButton.tsx":
    /*!**********************************************!*\
  !*** ./src/components/home/signInButton.tsx ***!
  \**********************************************/
    /***/ function (module, __webpack_exports__, __webpack_require__) {
      eval(
        __webpack_require__.ts(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/_/_async_to_generator */ "(app-pages-browser)/../../node_modules/@swc/helpers/esm/_async_to_generator.js");\n/* harmony import */ var _swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swc/helpers/_/_ts_generator */ "(app-pages-browser)/../../node_modules/tslib/tslib.es6.mjs");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(app-pages-browser)/../../node_modules/next/dist/compiled/react/jsx-dev-runtime.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "(app-pages-browser)/../../node_modules/next/dist/compiled/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/button */ "(app-pages-browser)/./src/components/ui/button.tsx");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/react */ "(app-pages-browser)/../../node_modules/next-auth/react/index.js");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hot-toast */ "(app-pages-browser)/../../node_modules/react-hot-toast/dist/index.mjs");\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\nvar _this = undefined;\n\n\n\n\n\nvar SignInButton = function() {\n    var loginWithGoogle = function() {\n        var _ref = (0,_swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_5__._)(function() {\n            var e;\n            return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_6__.__generator)(this, function(_state) {\n                switch(_state.label){\n                    case 0:\n                        _state.trys.push([\n                            0,\n                            2,\n                            ,\n                            3\n                        ]);\n                        //   console.log("Asking for login")\n                        return [\n                            4,\n                            (0,next_auth_react__WEBPACK_IMPORTED_MODULE_3__.signIn)("google")\n                        ];\n                    case 1:\n                        _state.sent();\n                        return [\n                            3,\n                            3\n                        ];\n                    case 2:\n                        e = _state.sent();\n                        react_hot_toast__WEBPACK_IMPORTED_MODULE_4__.toast.error("Something went wrong");\n                        console.error(e);\n                        return [\n                            3,\n                            3\n                        ];\n                    case 3:\n                        return [\n                            2\n                        ];\n                }\n            });\n        });\n        return function loginWithGoogle() {\n            return _ref.apply(this, arguments);\n        };\n    }();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {\n            onClick: loginWithGoogle,\n            variant: "secondary",\n            size: "lg",\n            children: "Sign in"\n        }, void 0, false, {\n            fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/home/signInButton.tsx",\n            lineNumber: 19,\n            columnNumber: 7\n        }, _this)\n    }, void 0, false, {\n        fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/home/signInButton.tsx",\n        lineNumber: 18,\n        columnNumber: 5\n    }, _this);\n};\n_c = SignInButton;\n/* harmony default export */ __webpack_exports__["default"] = (SignInButton);\nvar _c;\n$RefreshReg$(_c, "SignInButton");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we\'re in a\n        // browser context before continuing.\n        if (typeof self !== \'undefined\' &&\n            // AMP / No-JS mode does not inject these helpers:\n            \'$RefreshHelpers$\' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we\'ll check if it\'s\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we\'ll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it\'s possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL2hvbWUvc2lnbkluQnV0dG9uLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUMwQjtBQUNZO0FBQ0c7QUFDRDtBQUV4QyxJQUFNSSxlQUFlO0lBQ25CLElBQU1DO21CQUFrQjtnQkFJYkM7Ozs7Ozs7Ozs7d0JBRlAsb0NBQW9DO3dCQUNwQzs7NEJBQU1KLHVEQUFNQSxDQUFDOzs7d0JBQWI7Ozs7Ozt3QkFDT0k7d0JBQ1BILGtEQUFLQSxDQUFDSSxLQUFLLENBQUM7d0JBQ1pDLFFBQVFELEtBQUssQ0FBQ0Q7Ozs7Ozs7Ozs7O1FBRWxCO3dCQVJNRDs7OztJQVNOLHFCQUNFLDhEQUFDSTtrQkFDQyw0RUFBQ1IsOENBQU1BO1lBQUNTLFNBQVNMO1lBQWlCTSxTQUFRO1lBQVlDLE1BQUs7c0JBQUs7Ozs7Ozs7Ozs7O0FBS3RFO0tBakJNUjtBQW1CTiwrREFBZUEsWUFBWUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9ob21lL3NpZ25JbkJ1dHRvbi50c3g/MDk4NSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuLi91aS9idXR0b25cIjtcbmltcG9ydCB7IHNpZ25JbiB9IGZyb20gXCJuZXh0LWF1dGgvcmVhY3RcIjtcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSBcInJlYWN0LWhvdC10b2FzdFwiO1xuXG5jb25zdCBTaWduSW5CdXR0b24gPSAoKSA9PiB7XG4gIGNvbnN0IGxvZ2luV2l0aEdvb2dsZSA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gICBjb25zb2xlLmxvZyhcIkFza2luZyBmb3IgbG9naW5cIilcbiAgICAgIGF3YWl0IHNpZ25JbihcImdvb2dsZVwiKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0b2FzdC5lcnJvcihcIlNvbWV0aGluZyB3ZW50IHdyb25nXCIpO1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxCdXR0b24gb25DbGljaz17bG9naW5XaXRoR29vZ2xlfSB2YXJpYW50PVwic2Vjb25kYXJ5XCIgc2l6ZT1cImxnXCI+XG4gICAgICAgIFNpZ24gaW5cbiAgICAgIDwvQnV0dG9uPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2lnbkluQnV0dG9uO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiQnV0dG9uIiwic2lnbkluIiwidG9hc3QiLCJTaWduSW5CdXR0b24iLCJsb2dpbldpdGhHb29nbGUiLCJlIiwiZXJyb3IiLCJjb25zb2xlIiwiZGl2Iiwib25DbGljayIsInZhcmlhbnQiLCJzaXplIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/home/signInButton.tsx\n',
        ),
      );

      /***/
    },
});