"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("src/middleware", {
  /***/ "(middleware)/../../node_modules/next/dist/esm/server/web/exports/next-response.js":
    /*!****************************************************************************!*\
  !*** ../../node_modules/next/dist/esm/server/web/exports/next-response.js ***!
  \****************************************************************************/
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      eval(
        '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* reexport safe */ _spec_extension_response__WEBPACK_IMPORTED_MODULE_0__.NextResponse)\n/* harmony export */ });\n/* harmony import */ var _spec_extension_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../spec-extension/response */ "(middleware)/../../node_modules/next/dist/esm/server/web/spec-extension/response.js");\n// This file is for modularized imports for next/server to get fully-treeshaking.\n //# sourceMappingURL=next-response.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4uLy4uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvZXNtL3NlcnZlci93ZWIvZXhwb3J0cy9uZXh0LXJlc3BvbnNlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaUZBQWlGO0FBQ1osQ0FFckUseUNBQXlDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uLi8uLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2VzbS9zZXJ2ZXIvd2ViL2V4cG9ydHMvbmV4dC1yZXNwb25zZS5qcz80MDQ5Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0cyBmb3IgbmV4dC9zZXJ2ZXIgdG8gZ2V0IGZ1bGx5LXRyZWVzaGFraW5nLlxuZXhwb3J0IHsgTmV4dFJlc3BvbnNlIGFzIGRlZmF1bHQgfSBmcm9tIFwiLi4vc3BlYy1leHRlbnNpb24vcmVzcG9uc2VcIjtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bmV4dC1yZXNwb25zZS5qcy5tYXAiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZGVmYXVsdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/../../node_modules/next/dist/esm/server/web/exports/next-response.js\n',
      );

      /***/
    },

  /***/ "(middleware)/./src/middleware.ts":
    /*!***************************!*\
  !*** ./src/middleware.ts ***!
  \***************************/
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      eval(
        '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth_jwt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/jwt */ "(middleware)/../../node_modules/next-auth/jwt/index.js");\n/* harmony import */ var next_auth_jwt__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_jwt__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/middleware */ "(middleware)/../../node_modules/next-auth/middleware.js");\n/* harmony import */ var next_auth_middleware__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_middleware__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ "(middleware)/../../node_modules/next/dist/esm/server/web/exports/next-response.js");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_auth_middleware__WEBPACK_IMPORTED_MODULE_1__.withAuth)(async function middleware(req) {\n    const pathname = req.nextUrl.pathname;\n    // Manage route protection\n    const isAuth = await (0,next_auth_jwt__WEBPACK_IMPORTED_MODULE_0__.getToken)({\n        req\n    });\n    const isLoginPage = pathname.startsWith("/");\n    const sensitiveRoutes = [\n        "/wallet",\n        "/create"\n    ];\n    const isAccessingSensitiveRoute = sensitiveRoutes.some((route)=>pathname.startsWith(route));\n    if (isLoginPage) {\n        if (isAuth) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_2__["default"].redirect(new URL("/wallet", req.url));\n        }\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_2__["default"].next();\n    }\n// if (!isAuth && isAccessingSensitiveRoute) {\n//   return NextResponse.redirect(new URL(\'/\', req.url))\n// }\n// if (pathname === \'/\') {\n//   return NextResponse.redirect(new URL(\'/dashboard\', req.url))\n// }\n}, {\n    callbacks: {\n        async authorized () {\n            return true;\n        }\n    }\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL21pZGRsZXdhcmUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQXdDO0FBQ087QUFDTDtBQUUxQyxpRUFBZUMsOERBQVFBLENBQ3JCLGVBQWVFLFdBQVdDLEdBQUc7SUFDM0IsTUFBTUMsV0FBV0QsSUFBSUUsT0FBTyxDQUFDRCxRQUFRO0lBRXJDLDBCQUEwQjtJQUMxQixNQUFNRSxTQUFTLE1BQU1QLHVEQUFRQSxDQUFDO1FBQUVJO0lBQUk7SUFDcEMsTUFBTUksY0FBY0gsU0FBU0ksVUFBVSxDQUFDO0lBRXhDLE1BQU1DLGtCQUFrQjtRQUFDO1FBQVc7S0FBVTtJQUM5QyxNQUFNQyw0QkFBNEJELGdCQUFnQkUsSUFBSSxDQUFDLENBQUNDLFFBQ3REUixTQUFTSSxVQUFVLENBQUNJO0lBR3RCLElBQUlMLGFBQWE7UUFDZixJQUFJRCxRQUFRO1lBQ1YsT0FBT0wsa0ZBQVlBLENBQUNZLFFBQVEsQ0FBQyxJQUFJQyxJQUFJLFdBQVdYLElBQUlZLEdBQUc7UUFDekQ7UUFFQSxPQUFPZCxrRkFBWUEsQ0FBQ2UsSUFBSTtJQUMxQjtBQUVBLDhDQUE4QztBQUM5Qyx3REFBd0Q7QUFDeEQsSUFBSTtBQUVKLDBCQUEwQjtBQUMxQixpRUFBaUU7QUFDakUsSUFBSTtBQUNOLEdBQ0E7SUFDRUMsV0FBVztRQUNULE1BQU1DO1lBQ0osT0FBTztRQUNUO0lBQ0Y7QUFDRixJQUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9taWRkbGV3YXJlLnRzP2QxOTkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0VG9rZW4gfSBmcm9tICduZXh0LWF1dGgvand0J1xuaW1wb3J0IHsgd2l0aEF1dGggfSBmcm9tICduZXh0LWF1dGgvbWlkZGxld2FyZSdcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoQXV0aChcbiAgYXN5bmMgZnVuY3Rpb24gbWlkZGxld2FyZShyZXEpIHtcbiAgICBjb25zdCBwYXRobmFtZSA9IHJlcS5uZXh0VXJsLnBhdGhuYW1lXG5cbiAgICAvLyBNYW5hZ2Ugcm91dGUgcHJvdGVjdGlvblxuICAgIGNvbnN0IGlzQXV0aCA9IGF3YWl0IGdldFRva2VuKHsgcmVxIH0pXG4gICAgY29uc3QgaXNMb2dpblBhZ2UgPSBwYXRobmFtZS5zdGFydHNXaXRoKCcvJylcblxuICAgIGNvbnN0IHNlbnNpdGl2ZVJvdXRlcyA9IFsnL3dhbGxldCcsICcvY3JlYXRlJ11cbiAgICBjb25zdCBpc0FjY2Vzc2luZ1NlbnNpdGl2ZVJvdXRlID0gc2Vuc2l0aXZlUm91dGVzLnNvbWUoKHJvdXRlKSA9PlxuICAgICAgcGF0aG5hbWUuc3RhcnRzV2l0aChyb3V0ZSlcbiAgICApXG5cbiAgICBpZiAoaXNMb2dpblBhZ2UpIHtcbiAgICAgIGlmIChpc0F1dGgpIHtcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5yZWRpcmVjdChuZXcgVVJMKCcvd2FsbGV0JywgcmVxLnVybCkpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UubmV4dCgpXG4gICAgfVxuXG4gICAgLy8gaWYgKCFpc0F1dGggJiYgaXNBY2Nlc3NpbmdTZW5zaXRpdmVSb3V0ZSkge1xuICAgIC8vICAgcmV0dXJuIE5leHRSZXNwb25zZS5yZWRpcmVjdChuZXcgVVJMKCcvJywgcmVxLnVybCkpXG4gICAgLy8gfVxuXG4gICAgLy8gaWYgKHBhdGhuYW1lID09PSAnLycpIHtcbiAgICAvLyAgIHJldHVybiBOZXh0UmVzcG9uc2UucmVkaXJlY3QobmV3IFVSTCgnL2Rhc2hib2FyZCcsIHJlcS51cmwpKVxuICAgIC8vIH1cbiAgfSxcbiAge1xuICAgIGNhbGxiYWNrczoge1xuICAgICAgYXN5bmMgYXV0aG9yaXplZCgpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0sXG4gICAgfSxcbiAgfVxuKVxuXG4vLyBleHBvcnQgY29uc3QgY29uZmlnID0ge1xuLy8gICBtYXRjaHRlcjogWycvJywgJy8nLCAnL3dhbGxldCcsICcvY3JlYXRlJ10sXG4vLyB9Il0sIm5hbWVzIjpbImdldFRva2VuIiwid2l0aEF1dGgiLCJOZXh0UmVzcG9uc2UiLCJtaWRkbGV3YXJlIiwicmVxIiwicGF0aG5hbWUiLCJuZXh0VXJsIiwiaXNBdXRoIiwiaXNMb2dpblBhZ2UiLCJzdGFydHNXaXRoIiwic2Vuc2l0aXZlUm91dGVzIiwiaXNBY2Nlc3NpbmdTZW5zaXRpdmVSb3V0ZSIsInNvbWUiLCJyb3V0ZSIsInJlZGlyZWN0IiwiVVJMIiwidXJsIiwibmV4dCIsImNhbGxiYWNrcyIsImF1dGhvcml6ZWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(middleware)/./src/middleware.ts\n',
      );

      /***/
    },
});
