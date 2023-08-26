"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/wallet/page", {
  /***/ "(app-pages-browser)/./src/components/wallet/Portfolio.tsx":
    /*!*********************************************!*\
  !*** ./src/components/wallet/Portfolio.tsx ***!
  \*********************************************/
    /***/ function (module, __webpack_exports__, __webpack_require__) {
      eval(
        __webpack_require__.ts(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swc/helpers/_/_async_to_generator */ "(app-pages-browser)/../../node_modules/@swc/helpers/esm/_async_to_generator.js");\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ "(app-pages-browser)/../../node_modules/@swc/helpers/esm/_sliced_to_array.js");\n/* harmony import */ var _swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swc/helpers/_/_ts_generator */ "(app-pages-browser)/../../node_modules/tslib/tslib.es6.mjs");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(app-pages-browser)/../../node_modules/next/dist/compiled/react/jsx-dev-runtime.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "(app-pages-browser)/../../node_modules/next/dist/compiled/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Chart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Chart */ "(app-pages-browser)/./src/components/wallet/Chart.tsx");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ "(app-pages-browser)/../../node_modules/next/link.js");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-icons/fa */ "(app-pages-browser)/../../node_modules/react-icons/fa/index.esm.js");\n/* harmony import */ var react_icons_bi__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-icons//bi */ "(app-pages-browser)/../../node_modules/react-icons/bi/index.esm.js");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/image */ "(app-pages-browser)/../../node_modules/next/image.js");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_4__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nvar Portfolio = function() {\n    var delay = function delay(ms) {\n        return new Promise(function(resolve) {\n            return setTimeout(resolve, ms);\n        });\n    };\n    _s();\n    var address = "0xEf351a3440ab4144554286BF7830Dc3E1200Cb17";\n    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_5__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), 2), copied = _useState[0], setCopied = _useState[1];\n    var copyAddress = function() {\n        var _ref = (0,_swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_6__._)(function() {\n            return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_7__.__generator)(this, function(_state) {\n                switch(_state.label){\n                    case 0:\n                        setCopied(true);\n                        navigator.clipboard.writeText(address);\n                        return [\n                            4,\n                            delay(2000)\n                        ];\n                    case 1:\n                        _state.sent();\n                        setCopied(false);\n                        return [\n                            2\n                        ];\n                }\n            });\n        });\n        return function copyAddress() {\n            return _ref.apply(this, arguments);\n        };\n    }();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n        className: "h-full w-full bg-[#F3EF52] rounded-2xl py-6 px-6 flex flex-col",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                className: "",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {\n                    className: "text-black text-[32px] tracking-wide font-medium font-satoshi w-full",\n                    children: "Portfolio"\n                }, void 0, false, {\n                    fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                    lineNumber: 30,\n                    columnNumber: 13\n                }, _this)\n            }, void 0, false, {\n                fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                lineNumber: 29,\n                columnNumber: 9\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                className: "pt-4 flex justify-between items-center",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {\n                        href: "#",\n                        className: "",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {\n                            className: "text-black text-[20px] tracking-wide font-satoshi hover:text-blue-600",\n                            children: [\n                                address.slice(0, 8),\n                                "......",\n                                address.slice(-5)\n                            ]\n                        }, void 0, true, {\n                            fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                            lineNumber: 34,\n                            columnNumber: 17\n                        }, _this)\n                    }, void 0, false, {\n                        fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                        lineNumber: 33,\n                        columnNumber: 13\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                        className: "cursor-pointer",\n                        onClick: copyAddress,\n                        children: copied ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_icons_fa__WEBPACK_IMPORTED_MODULE_8__.FaCheck, {\n                            className: "h-4 w-4"\n                        }, void 0, false, {\n                            fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                            lineNumber: 38,\n                            columnNumber: 17\n                        }, _this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_icons_bi__WEBPACK_IMPORTED_MODULE_9__.BiSolidCopy, {\n                            className: "h-5 w-5"\n                        }, void 0, false, {\n                            fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                            lineNumber: 40,\n                            columnNumber: 17\n                        }, _this)\n                    }, void 0, false, {\n                        fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                        lineNumber: 36,\n                        columnNumber: 13\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                lineNumber: 32,\n                columnNumber: 9\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Chart__WEBPACK_IMPORTED_MODULE_2__["default"], {\n                    width: 400,\n                    height: 200\n                }, void 0, false, {\n                    fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                    lineNumber: 48,\n                    columnNumber: 13\n                }, _this)\n            }, void 0, false, {\n                fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                lineNumber: 47,\n                columnNumber: 9\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                className: "py-[50px] flex flex-col space-y-11",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                        className: "flex justify-between items-center",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                                className: "flex space-x-4 items-center",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                                        className: "bg-black rounded-full w-[65px] h-[65px] py-3 px-3",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {\n                                            src: "/Bnb2.png",\n                                            alt: "logo",\n                                            height: 80,\n                                            width: 80,\n                                            className: "w-[42px] h-[42px]"\n                                        }, void 0, false, {\n                                            fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                                            lineNumber: 54,\n                                            columnNumber: 25\n                                        }, _this)\n                                    }, void 0, false, {\n                                        fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                                        lineNumber: 53,\n                                        columnNumber: 21\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                                        className: "flex flex-col h-full justify-between",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                                                children: "BNB"\n                                            }, void 0, false, {\n                                                fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                                                lineNumber: 57,\n                                                columnNumber: 25\n                                            }, _this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                                                children: "1.3"\n                                            }, void 0, false, {\n                                                fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                                                lineNumber: 58,\n                                                columnNumber: 25\n                                            }, _this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                                        lineNumber: 56,\n                                        columnNumber: 21\n                                    }, _this)\n                                ]\n                            }, void 0, true, {\n                                fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                                lineNumber: 52,\n                                columnNumber: 17\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                                children: "$273.18"\n                            }, void 0, false, {\n                                fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                                lineNumber: 61,\n                                columnNumber: 17\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                        lineNumber: 51,\n                        columnNumber: 13\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                        className: "flex justify-between items-center",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                                className: "flex space-x-4 items-center",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {\n                                        src: "/Busd.png",\n                                        alt: "logo",\n                                        height: 100,\n                                        width: 100,\n                                        className: "w-[65px] h-[65px]"\n                                    }, void 0, false, {\n                                        fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                                        lineNumber: 67,\n                                        columnNumber: 21\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                                        className: "flex flex-col justify-between",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                                                children: "BUSD"\n                                            }, void 0, false, {\n                                                fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                                                lineNumber: 69,\n                                                columnNumber: 25\n                                            }, _this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                                                children: "16"\n                                            }, void 0, false, {\n                                                fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                                                lineNumber: 70,\n                                                columnNumber: 25\n                                            }, _this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                                        lineNumber: 68,\n                                        columnNumber: 21\n                                    }, _this)\n                                ]\n                            }, void 0, true, {\n                                fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                                lineNumber: 66,\n                                columnNumber: 17\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {\n                                children: "$16"\n                            }, void 0, false, {\n                                fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                                lineNumber: 73,\n                                columnNumber: 17\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                        lineNumber: 65,\n                        columnNumber: 13\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n                lineNumber: 50,\n                columnNumber: 9\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: "/home/notacoder/Desktop/crypto/opintents/packages/client/src/components/wallet/Portfolio.tsx",\n        lineNumber: 28,\n        columnNumber: 5\n    }, _this);\n};\n_s(Portfolio, "XZOOE1kbvkSoscYYsu01EUKt5bQ=");\n_c = Portfolio;\n/* harmony default export */ __webpack_exports__["default"] = (Portfolio);\nvar _c;\n$RefreshReg$(_c, "Portfolio");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we\'re in a\n        // browser context before continuing.\n        if (typeof self !== \'undefined\' &&\n            // AMP / No-JS mode does not inject these helpers:\n            \'$RefreshHelpers$\' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we\'ll check if it\'s\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we\'ll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it\'s possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL3dhbGxldC9Qb3J0Zm9saW8udHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ3lCO0FBQ0U7QUFDRTtBQUNJO0FBQ1E7QUFDSztBQUNmO0FBRS9CLElBQU1PLFlBQVk7UUFLTEMsUUFBVCxTQUFTQSxNQUFNQyxFQUFVO1FBQ3JCLE9BQU8sSUFBSUMsUUFBUUMsU0FBQUE7bUJBQVdDLFdBQVdELFNBQVNGOztJQUNwRDs7SUFMRixJQUFNSSxVQUFVO0lBQ2hCLElBQTJCVixZQUFBQSwrREFBQUEsQ0FBQUEsK0NBQVFBLENBQUMsWUFBN0JXLFNBQW9CWCxjQUFiWSxZQUFhWjtJQU0zQixJQUFNYTttQkFBYzs7Ozt3QkFDaEJELFVBQVU7d0JBQ1ZFLFVBQVVDLFNBQVMsQ0FBQ0MsU0FBUyxDQUFDTjt3QkFDOUI7OzRCQUFPTCxNQUFNOzs7d0JBQWI7d0JBQ0FPLFVBQVU7Ozs7OztRQUNaO3dCQUxJQzs7OztJQVFSLHFCQUNFLDhEQUFDSTtRQUFJQyxXQUFVOzswQkFDWCw4REFBQ0Q7Z0JBQUlDLFdBQVU7MEJBQ1gsNEVBQUNDO29CQUFLRCxXQUFVOzhCQUF1RTs7Ozs7Ozs7Ozs7MEJBRTNGLDhEQUFDRDtnQkFBSUMsV0FBVTs7a0NBQ1gsOERBQUNuQixrREFBSUE7d0JBQUNxQixNQUFLO3dCQUFJRixXQUFVO2tDQUNyQiw0RUFBQ0M7NEJBQUtELFdBQVU7O2dDQUF5RVIsUUFBUVcsS0FBSyxDQUFDLEdBQUU7Z0NBQUc7Z0NBQU9YLFFBQVFXLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7a0NBRXRJLDhEQUFDSjt3QkFBSUMsV0FBVTt3QkFBaUJJLFNBQVNUO2tDQUNwQ0YsdUJBQ0QsOERBQUNWLG1EQUFPQTs0QkFBQ2lCLFdBQVU7Ozs7O2tEQUVuQiw4REFBQ2hCLHVEQUFXQTs0QkFBQ2dCLFdBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQU8vQiw4REFBQ0Q7MEJBQ0csNEVBQUNuQiw4Q0FBS0E7b0JBQUN5QixPQUFPO29CQUFLQyxRQUFROzs7Ozs7Ozs7OzswQkFFL0IsOERBQUNQO2dCQUFJQyxXQUFVOztrQ0FDWCw4REFBQ0Q7d0JBQUlDLFdBQVU7OzBDQUNYLDhEQUFDRDtnQ0FBSUMsV0FBVTs7a0RBQ1gsOERBQUNEO3dDQUFJQyxXQUFVO2tEQUNYLDRFQUFDZixtREFBS0E7NENBQUNzQixLQUFJOzRDQUFZQyxLQUFJOzRDQUFPRixRQUFROzRDQUFJRCxPQUFPOzRDQUFJTCxXQUFVOzs7Ozs7Ozs7OztrREFFdkUsOERBQUNEO3dDQUFJQyxXQUFVOzswREFDWCw4REFBQ0Q7MERBQUk7Ozs7OzswREFDTCw4REFBQ0E7MERBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQ0FHYiw4REFBQ0E7MENBQUk7Ozs7Ozs7Ozs7OztrQ0FJVCw4REFBQ0E7d0JBQUlDLFdBQVU7OzBDQUNYLDhEQUFDRDtnQ0FBSUMsV0FBVTs7a0RBQ1gsOERBQUNmLG1EQUFLQTt3Q0FBQ3NCLEtBQUk7d0NBQVlDLEtBQUk7d0NBQU9GLFFBQVE7d0NBQUtELE9BQU87d0NBQUtMLFdBQVU7Ozs7OztrREFDckUsOERBQUNEO3dDQUFJQyxXQUFVOzswREFDWCw4REFBQ0Q7MERBQUk7Ozs7OzswREFDTCw4REFBQ0E7MERBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQ0FHYiw4REFBQ0E7MENBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9yQjtHQXRFTWI7S0FBQUE7QUF3RU4sK0RBQWVBLFNBQVNBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvd2FsbGV0L1BvcnRmb2xpby50c3g/MzY3YSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgQ2hhcnQgZnJvbSAnLi9DaGFydCdcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEZhQ2hlY2sgfSBmcm9tICdyZWFjdC1pY29ucy9mYSc7XG5pbXBvcnQgeyBCaVNvbGlkQ29weSB9IGZyb20gXCJyZWFjdC1pY29ucy8vYmlcIjsgXG5pbXBvcnQgSW1hZ2UgZnJvbSAnbmV4dC9pbWFnZSc7XG5cbmNvbnN0IFBvcnRmb2xpbyA9ICgpID0+IHtcblxuICAgIGNvbnN0IGFkZHJlc3MgPSAnMHhFZjM1MWEzNDQwYWI0MTQ0NTU0Mjg2QkY3ODMwRGMzRTEyMDBDYjE3JztcbiAgICBjb25zdCBbY29waWVkLHNldENvcGllZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgICBmdW5jdGlvbiBkZWxheShtczogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbiAgICAgIH1cblxuICAgIGNvbnN0IGNvcHlBZGRyZXNzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBzZXRDb3BpZWQodHJ1ZSk7XG4gICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGFkZHJlc3MpXG4gICAgICAgIGF3YWl0IChkZWxheSgyMDAwKSk7XG4gICAgICAgIHNldENvcGllZChmYWxzZSk7XG4gICAgICB9XG4gICAgXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImgtZnVsbCB3LWZ1bGwgYmctWyNGM0VGNTJdIHJvdW5kZWQtMnhsIHB5LTYgcHgtNiBmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPScnPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0LWJsYWNrIHRleHQtWzMycHhdIHRyYWNraW5nLXdpZGUgZm9udC1tZWRpdW0gZm9udC1zYXRvc2hpIHctZnVsbCc+UG9ydGZvbGlvPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3B0LTQgZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyJz5cbiAgICAgICAgICAgIDxMaW5rIGhyZWY9JyMnIGNsYXNzTmFtZT0nJz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQtYmxhY2sgdGV4dC1bMjBweF0gdHJhY2tpbmctd2lkZSBmb250LXNhdG9zaGkgaG92ZXI6dGV4dC1ibHVlLTYwMCc+e2FkZHJlc3Muc2xpY2UoMCw4KX0uLi4uLi57YWRkcmVzcy5zbGljZSgtNSl9PC9zcGFuPlxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2N1cnNvci1wb2ludGVyJyBvbkNsaWNrPXtjb3B5QWRkcmVzc30+XG4gICAgICAgICAgICAgICAge2NvcGllZD8gXG4gICAgICAgICAgICAgICAgPEZhQ2hlY2sgY2xhc3NOYW1lPSdoLTQgdy00Jy8+IFxuICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICA8QmlTb2xpZENvcHkgY2xhc3NOYW1lPSdoLTUgdy01JyAvPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgey8qIDxkaXYgY2xhc3NOYW1lPSdweS02Jz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dC1ibGFjayB0ZXh0LVsyNXB4XSB0cmFja2luZy13aWRlIGZvbnQtbWVkaXVtIGZvbnQtc2F0b3NoaSB3LWZ1bGwnPiQzNjUuNzY8L3NwYW4+XG4gICAgICAgIDwvZGl2PiAqL31cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxDaGFydCB3aWR0aD17NDAwfSBoZWlnaHQ9ezIwMH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdweS1bNTBweF0gZmxleCBmbGV4LWNvbCBzcGFjZS15LTExJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXInPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4IHNwYWNlLXgtNCBpdGVtcy1jZW50ZXInPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYmctYmxhY2sgcm91bmRlZC1mdWxsIHctWzY1cHhdIGgtWzY1cHhdIHB5LTMgcHgtMyc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugc3JjPScvQm5iMi5wbmcnIGFsdD0nbG9nbycgaGVpZ2h0PXs4MH0gd2lkdGg9ezgwfSBjbGFzc05hbWU9J3ctWzQycHhdIGgtWzQycHhdJyAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZsZXggZmxleC1jb2wgaC1mdWxsIGp1c3RpZnktYmV0d2Vlbic+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PkJOQjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj4xLjM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgJDI3My4xOFxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZmxleCBzcGFjZS14LTQgaXRlbXMtY2VudGVyJz5cbiAgICAgICAgICAgICAgICAgICAgPEltYWdlIHNyYz0nL0J1c2QucG5nJyBhbHQ9J2xvZ28nIGhlaWdodD17MTAwfSB3aWR0aD17MTAwfSBjbGFzc05hbWU9J3ctWzY1cHhdIGgtWzY1cHhdJyAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4nPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5CVVNEPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PjE2PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICQxNlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcnRmb2xpbyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNoYXJ0IiwiTGluayIsInVzZVN0YXRlIiwiRmFDaGVjayIsIkJpU29saWRDb3B5IiwiSW1hZ2UiLCJQb3J0Zm9saW8iLCJkZWxheSIsIm1zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwiYWRkcmVzcyIsImNvcGllZCIsInNldENvcGllZCIsImNvcHlBZGRyZXNzIiwibmF2aWdhdG9yIiwiY2xpcGJvYXJkIiwid3JpdGVUZXh0IiwiZGl2IiwiY2xhc3NOYW1lIiwic3BhbiIsImhyZWYiLCJzbGljZSIsIm9uQ2xpY2siLCJ3aWR0aCIsImhlaWdodCIsInNyYyIsImFsdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/wallet/Portfolio.tsx\n',
        ),
      );

      /***/
    },
});