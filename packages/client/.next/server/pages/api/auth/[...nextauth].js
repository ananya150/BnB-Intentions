"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
  var exports = {};
  exports.id = "pages/api/auth/[...nextauth]";
  exports.ids = ["pages/api/auth/[...nextauth]"];
  exports.modules = {
    /***/ "@next-auth/upstash-redis-adapter":
      /*!***************************************************!*\
  !*** external "@next-auth/upstash-redis-adapter" ***!
  \***************************************************/
      /***/ (module) => {
        module.exports = require("@next-auth/upstash-redis-adapter");

        /***/
      },

    /***/ "@upstash/redis":
      /*!*********************************!*\
  !*** external "@upstash/redis" ***!
  \*********************************/
      /***/ (module) => {
        module.exports = require("@upstash/redis");

        /***/
      },

    /***/ "next-auth/next":
      /*!*********************************!*\
  !*** external "next-auth/next" ***!
  \*********************************/
      /***/ (module) => {
        module.exports = require("next-auth/next");

        /***/
      },

    /***/ "next-auth/providers/google":
      /*!*********************************************!*\
  !*** external "next-auth/providers/google" ***!
  \*********************************************/
      /***/ (module) => {
        module.exports = require("next-auth/providers/google");

        /***/
      },

    /***/ "../../../api-utils/node":
      /*!*****************************************************!*\
  !*** external "next/dist/server/api-utils/node.js" ***!
  \*****************************************************/
      /***/ (module) => {
        module.exports = require("next/dist/server/api-utils/node.js");

        /***/
      },

    /***/ "../route-module?407b":
      /*!************************************************************************!*\
  !*** external "next/dist/server/future/route-modules/route-module.js" ***!
  \************************************************************************/
      /***/ (module) => {
        module.exports = require("next/dist/server/future/route-modules/route-module.js");

        /***/
      },

    /***/ "(api)/../../node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js":
      /*!***************************************************************************************!*\
  !*** ../../node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js ***!
  \***************************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '/**\n * Hoists a name from a module or promised module.\n *\n * @param module the module to hoist the name from\n * @param name the name to hoist\n * @returns the value on the module (or promised module)\n */ \nObject.defineProperty(exports, "__esModule", ({\n    value: true\n}));\nObject.defineProperty(exports, "hoist", ({\n    enumerable: true,\n    get: function() {\n        return hoist;\n    }\n}));\nfunction hoist(module, name) {\n    // If the name is available in the module, return it.\n    if (name in module) {\n        return module[name];\n    }\n    // If a property called `then` exists, assume it\'s a promise and\n    // return a promise that resolves to the name.\n    if ("then" in module && typeof module.then === "function") {\n        return module.then((mod)=>hoist(mod, name));\n    }\n    // If we\'re trying to hoise the default export, and the module is a function,\n    // return the module itself.\n    if (typeof module === "function" && name === "default") {\n        return module;\n    }\n    // Otherwise, return undefined.\n    return undefined;\n}\n\n//# sourceMappingURL=helpers.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvbmV4dC1yb3V0ZS1sb2FkZXIvaGVscGVycy5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFpQjtBQUNqQiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7QUFDRix5Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ab3BpbnRlbnRzL2NsaWVudC8uLi8uLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LXJvdXRlLWxvYWRlci9oZWxwZXJzLmpzPzY3NmEiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBIb2lzdHMgYSBuYW1lIGZyb20gYSBtb2R1bGUgb3IgcHJvbWlzZWQgbW9kdWxlLlxuICpcbiAqIEBwYXJhbSBtb2R1bGUgdGhlIG1vZHVsZSB0byBob2lzdCB0aGUgbmFtZSBmcm9tXG4gKiBAcGFyYW0gbmFtZSB0aGUgbmFtZSB0byBob2lzdFxuICogQHJldHVybnMgdGhlIHZhbHVlIG9uIHRoZSBtb2R1bGUgKG9yIHByb21pc2VkIG1vZHVsZSlcbiAqLyBcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImhvaXN0XCIsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBob2lzdDtcbiAgICB9XG59KTtcbmZ1bmN0aW9uIGhvaXN0KG1vZHVsZSwgbmFtZSkge1xuICAgIC8vIElmIHRoZSBuYW1lIGlzIGF2YWlsYWJsZSBpbiB0aGUgbW9kdWxlLCByZXR1cm4gaXQuXG4gICAgaWYgKG5hbWUgaW4gbW9kdWxlKSB7XG4gICAgICAgIHJldHVybiBtb2R1bGVbbmFtZV07XG4gICAgfVxuICAgIC8vIElmIGEgcHJvcGVydHkgY2FsbGVkIGB0aGVuYCBleGlzdHMsIGFzc3VtZSBpdCdzIGEgcHJvbWlzZSBhbmRcbiAgICAvLyByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIG5hbWUuXG4gICAgaWYgKFwidGhlblwiIGluIG1vZHVsZSAmJiB0eXBlb2YgbW9kdWxlLnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gbW9kdWxlLnRoZW4oKG1vZCk9PmhvaXN0KG1vZCwgbmFtZSkpO1xuICAgIH1cbiAgICAvLyBJZiB3ZSdyZSB0cnlpbmcgdG8gaG9pc2UgdGhlIGRlZmF1bHQgZXhwb3J0LCBhbmQgdGhlIG1vZHVsZSBpcyBhIGZ1bmN0aW9uLFxuICAgIC8vIHJldHVybiB0aGUgbW9kdWxlIGl0c2VsZi5cbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJmdW5jdGlvblwiICYmIG5hbWUgPT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICAgIHJldHVybiBtb2R1bGU7XG4gICAgfVxuICAgIC8vIE90aGVyd2lzZSwgcmV0dXJuIHVuZGVmaW5lZC5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1oZWxwZXJzLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/../../node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js\n',
        );

        /***/
      },

    /***/ "(api)/../../node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2F%5B...nextauth%5D&preferredRegion=&absolutePagePath=.%2Fsrc%2Fpages%2Fapi%2Fauth%2F%5B...nextauth%5D.ts&middlewareConfigBase64=e30%3D!":
      /*!****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2F%5B...nextauth%5D&preferredRegion=&absolutePagePath=.%2Fsrc%2Fpages%2Fapi%2Fauth%2F%5B...nextauth%5D.ts&middlewareConfigBase64=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   routeModule: () => (/* binding */ routeModule)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/pages-api/module */ "(api)/../../node_modules/next/dist/server/future/route-modules/pages-api/module.js");\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_pages_api_module__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ "(api)/../../node_modules/next/dist/server/future/route-kind.js");\n/* harmony import */ var next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/webpack/loaders/next-route-loader/helpers */ "(api)/../../node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js");\n/* harmony import */ var _src_pages_api_auth_nextauth_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/pages/api/auth/[...nextauth].ts */ "(api)/./src/pages/api/auth/[...nextauth].ts");\n// @ts-ignore this need to be imported from next/dist to be external\n\n\n\nconst PagesAPIRouteModule = next_dist_server_future_route_modules_pages_api_module__WEBPACK_IMPORTED_MODULE_0__.PagesAPIRouteModule;\n// Import the userland code.\n// @ts-expect-error - replaced by webpack/turbopack loader\n\n// Re-export the handler (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_api_auth_nextauth_ts__WEBPACK_IMPORTED_MODULE_3__, "default"));\n// Re-export config.\nconst config = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_api_auth_nextauth_ts__WEBPACK_IMPORTED_MODULE_3__, "config");\n// Create and export the route module that will be consumed.\nconst routeModule = new PagesAPIRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES_API,\n        page: "/api/auth/[...nextauth]",\n        pathname: "/api/auth/[...nextauth]",\n        // The following aren\'t used in production.\n        bundlePath: "",\n        filename: ""\n    },\n    userland: _src_pages_api_auth_nextauth_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n\n//# sourceMappingURL=pages-api.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvbmV4dC1yb3V0ZS1sb2FkZXIvaW5kZXguanM/a2luZD1QQUdFU19BUEkmcGFnZT0lMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQmcHJlZmVycmVkUmVnaW9uPSZhYnNvbHV0ZVBhZ2VQYXRoPS4lMkZzcmMlMkZwYWdlcyUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RC50cyZtaWRkbGV3YXJlQ29uZmlnQmFzZTY0PWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUNpRjtBQUNsQjtBQUNtQjtBQUNsRiw0QkFBNEIsdUdBQTBCO0FBQ3REO0FBQ0E7QUFDa0U7QUFDbEU7QUFDQSxpRUFBZSxnR0FBSyxDQUFDLDREQUFRLFlBQVksRUFBQztBQUMxQztBQUNPLGVBQWUsZ0dBQUssQ0FBQyw0REFBUTtBQUNwQztBQUNPO0FBQ1A7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsWUFBWTtBQUNaLENBQUM7O0FBRUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ab3BpbnRlbnRzL2NsaWVudC8/MzI2MiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAdHMtaWdub3JlIHRoaXMgbmVlZCB0byBiZSBpbXBvcnRlZCBmcm9tIG5leHQvZGlzdCB0byBiZSBleHRlcm5hbFxuaW1wb3J0ICogYXMgbW9kdWxlIGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL3BhZ2VzLWFwaS9tb2R1bGVcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBob2lzdCB9IGZyb20gXCJuZXh0L2Rpc3QvYnVpbGQvd2VicGFjay9sb2FkZXJzL25leHQtcm91dGUtbG9hZGVyL2hlbHBlcnNcIjtcbmNvbnN0IFBhZ2VzQVBJUm91dGVNb2R1bGUgPSBtb2R1bGUuUGFnZXNBUElSb3V0ZU1vZHVsZTtcbi8vIEltcG9ydCB0aGUgdXNlcmxhbmQgY29kZS5cbi8vIEB0cy1leHBlY3QtZXJyb3IgLSByZXBsYWNlZCBieSB3ZWJwYWNrL3R1cmJvcGFjayBsb2FkZXJcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIuL3NyYy9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLnRzXCI7XG4vLyBSZS1leHBvcnQgdGhlIGhhbmRsZXIgKHNob3VsZCBiZSB0aGUgZGVmYXVsdCBleHBvcnQpLlxuZXhwb3J0IGRlZmF1bHQgaG9pc3QodXNlcmxhbmQsIFwiZGVmYXVsdFwiKTtcbi8vIFJlLWV4cG9ydCBjb25maWcuXG5leHBvcnQgY29uc3QgY29uZmlnID0gaG9pc3QodXNlcmxhbmQsIFwiY29uZmlnXCIpO1xuLy8gQ3JlYXRlIGFuZCBleHBvcnQgdGhlIHJvdXRlIG1vZHVsZSB0aGF0IHdpbGwgYmUgY29uc3VtZWQuXG5leHBvcnQgY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgUGFnZXNBUElSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuUEFHRVNfQVBJLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgYXJlbid0IHVzZWQgaW4gcHJvZHVjdGlvbi5cbiAgICAgICAgYnVuZGxlUGF0aDogXCJcIixcbiAgICAgICAgZmlsZW5hbWU6IFwiXCJcbiAgICB9LFxuICAgIHVzZXJsYW5kXG59KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFnZXMtYXBpLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/../../node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2F%5B...nextauth%5D&preferredRegion=&absolutePagePath=.%2Fsrc%2Fpages%2Fapi%2Fauth%2F%5B...nextauth%5D.ts&middlewareConfigBase64=e30%3D!\n',
        );

        /***/
      },

    /***/ "(api)/./src/lib/auth.ts":
      /*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var _next_auth_upstash_redis_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @next-auth/upstash-redis-adapter */ "@next-auth/upstash-redis-adapter");\n/* harmony import */ var _next_auth_upstash_redis_adapter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_next_auth_upstash_redis_adapter__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./db */ "(api)/./src/lib/db.ts");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/google */ "next-auth/providers/google");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _utils_redis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/redis */ "(api)/./src/utils/redis.ts");\n\n\n\n\nfunction getGoogleCredentials() {\n    const clientId = process.env.GOOGLE_CLIENT_ID;\n    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;\n    if (!clientId || clientId.length === 0) {\n        throw new Error("Missing GOOGLE_CLIENT_ID");\n    }\n    if (!clientSecret || clientSecret.length === 0) {\n        throw new Error("Missing GOOGLE_CLIENT_SECRET");\n    }\n    return {\n        clientId,\n        clientSecret\n    };\n}\nconst authOptions = {\n    adapter: (0,_next_auth_upstash_redis_adapter__WEBPACK_IMPORTED_MODULE_0__.UpstashRedisAdapter)(_db__WEBPACK_IMPORTED_MODULE_1__.db),\n    session: {\n        strategy: "jwt"\n    },\n    pages: {\n        signIn: "/"\n    },\n    providers: [\n        next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2___default()({\n            clientId: getGoogleCredentials().clientId,\n            clientSecret: getGoogleCredentials().clientSecret\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            const dbUserResult = await (0,_utils_redis__WEBPACK_IMPORTED_MODULE_3__.fetchRedis)("get", `user:${token.id}`);\n            if (!dbUserResult) {\n                if (user) {\n                    token.id = user.id;\n                }\n                return token;\n            }\n            const dbUser = JSON.parse(dbUserResult);\n            return {\n                id: dbUser.id,\n                name: dbUser.name,\n                email: dbUser.email,\n                picture: dbUser.image\n            };\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.id;\n                session.user.name = token.name;\n                session.user.email = token.email;\n                session.user.image = token.picture;\n            }\n            return session;\n        },\n        redirect () {\n            return "/wallet";\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvbGliL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUN1RTtBQUM3QztBQUM4QjtBQUNaO0FBRTVDLFNBQVNJO0lBQ1AsTUFBTUMsV0FBV0MsUUFBUUMsR0FBRyxDQUFDQyxnQkFBZ0I7SUFDN0MsTUFBTUMsZUFBZUgsUUFBUUMsR0FBRyxDQUFDRyxvQkFBb0I7SUFFckQsSUFBSSxDQUFDTCxZQUFZQSxTQUFTTSxNQUFNLEtBQUssR0FBRztRQUN0QyxNQUFNLElBQUlDLE1BQU07SUFDbEI7SUFFQSxJQUFJLENBQUNILGdCQUFnQkEsYUFBYUUsTUFBTSxLQUFLLEdBQUc7UUFDOUMsTUFBTSxJQUFJQyxNQUFNO0lBQ2xCO0lBRUEsT0FBTztRQUFFUDtRQUFVSTtJQUFhO0FBQ2xDO0FBRU8sTUFBTUksY0FBK0I7SUFDMUNDLFNBQVNkLHFGQUFtQkEsQ0FBQ0MsbUNBQUVBO0lBQy9CYyxTQUFTO1FBQ1BDLFVBQVU7SUFDWjtJQUVBQyxPQUFPO1FBQ0xDLFFBQVE7SUFDVjtJQUNBQyxXQUFXO1FBQ1RqQixpRUFBY0EsQ0FBQztZQUNiRyxVQUFVRCx1QkFBdUJDLFFBQVE7WUFDekNJLGNBQWNMLHVCQUF1QkssWUFBWTtRQUNuRDtLQUNEO0lBQ0RXLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRUMsSUFBSSxFQUFFO1lBQ3ZCLE1BQU1DLGVBQWdCLE1BQU1yQix3REFBVUEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFbUIsTUFBTUcsRUFBRSxDQUFDLENBQUM7WUFJaEUsSUFBSSxDQUFDRCxjQUFjO2dCQUNqQixJQUFJRCxNQUFNO29CQUNSRCxNQUFNRyxFQUFFLEdBQUdGLEtBQU1FLEVBQUU7Z0JBQ3JCO2dCQUVBLE9BQU9IO1lBQ1Q7WUFFQSxNQUFNSSxTQUFTQyxLQUFLQyxLQUFLLENBQUNKO1lBRTFCLE9BQU87Z0JBQ0xDLElBQUlDLE9BQU9ELEVBQUU7Z0JBQ2JJLE1BQU1ILE9BQU9HLElBQUk7Z0JBQ2pCQyxPQUFPSixPQUFPSSxLQUFLO2dCQUNuQkMsU0FBU0wsT0FBT00sS0FBSztZQUN2QjtRQUNGO1FBQ0EsTUFBTWpCLFNBQVEsRUFBRUEsT0FBTyxFQUFFTyxLQUFLLEVBQUU7WUFDOUIsSUFBSUEsT0FBTztnQkFDVFAsUUFBUVEsSUFBSSxDQUFDRSxFQUFFLEdBQUdILE1BQU1HLEVBQUU7Z0JBQzFCVixRQUFRUSxJQUFJLENBQUNNLElBQUksR0FBR1AsTUFBTU8sSUFBSTtnQkFDOUJkLFFBQVFRLElBQUksQ0FBQ08sS0FBSyxHQUFHUixNQUFNUSxLQUFLO2dCQUNoQ2YsUUFBUVEsSUFBSSxDQUFDUyxLQUFLLEdBQUdWLE1BQU1TLE9BQU87WUFDcEM7WUFFQSxPQUFPaEI7UUFDVDtRQUNBa0I7WUFDRSxPQUFPO1FBQ1Q7SUFDRjtBQUNGLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ab3BpbnRlbnRzL2NsaWVudC8uL3NyYy9saWIvYXV0aC50cz82NjkyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCB7IFVwc3Rhc2hSZWRpc0FkYXB0ZXIgfSBmcm9tIFwiQG5leHQtYXV0aC91cHN0YXNoLXJlZGlzLWFkYXB0ZXJcIjtcbmltcG9ydCB7IGRiIH0gZnJvbSBcIi4vZGJcIjtcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGVcIjtcbmltcG9ydCB7IGZldGNoUmVkaXMgfSBmcm9tIFwiLi4vdXRpbHMvcmVkaXNcIjtcblxuZnVuY3Rpb24gZ2V0R29vZ2xlQ3JlZGVudGlhbHMoKSB7XG4gIGNvbnN0IGNsaWVudElkID0gcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRDtcbiAgY29uc3QgY2xpZW50U2VjcmV0ID0gcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVQ7XG5cbiAgaWYgKCFjbGllbnRJZCB8fCBjbGllbnRJZC5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIEdPT0dMRV9DTElFTlRfSURcIik7XG4gIH1cblxuICBpZiAoIWNsaWVudFNlY3JldCB8fCBjbGllbnRTZWNyZXQubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBHT09HTEVfQ0xJRU5UX1NFQ1JFVFwiKTtcbiAgfVxuXG4gIHJldHVybiB7IGNsaWVudElkLCBjbGllbnRTZWNyZXQgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIGFkYXB0ZXI6IFVwc3Rhc2hSZWRpc0FkYXB0ZXIoZGIpLFxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6IFwiand0XCIsXG4gIH0sXG5cbiAgcGFnZXM6IHtcbiAgICBzaWduSW46IFwiL1wiLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICBHb29nbGVQcm92aWRlcih7XG4gICAgICBjbGllbnRJZDogZ2V0R29vZ2xlQ3JlZGVudGlhbHMoKS5jbGllbnRJZCxcbiAgICAgIGNsaWVudFNlY3JldDogZ2V0R29vZ2xlQ3JlZGVudGlhbHMoKS5jbGllbnRTZWNyZXQsXG4gICAgfSksXG4gIF0sXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcbiAgICAgIGNvbnN0IGRiVXNlclJlc3VsdCA9IChhd2FpdCBmZXRjaFJlZGlzKFwiZ2V0XCIsIGB1c2VyOiR7dG9rZW4uaWR9YCkpIGFzXG4gICAgICAgIHwgc3RyaW5nXG4gICAgICAgIHwgbnVsbDtcblxuICAgICAgaWYgKCFkYlVzZXJSZXN1bHQpIHtcbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICB0b2tlbi5pZCA9IHVzZXIhLmlkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYlVzZXIgPSBKU09OLnBhcnNlKGRiVXNlclJlc3VsdCkgYXMgVXNlcjtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IGRiVXNlci5pZCxcbiAgICAgICAgbmFtZTogZGJVc2VyLm5hbWUsXG4gICAgICAgIGVtYWlsOiBkYlVzZXIuZW1haWwsXG4gICAgICAgIHBpY3R1cmU6IGRiVXNlci5pbWFnZSxcbiAgICAgIH07XG4gICAgfSxcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkO1xuICAgICAgICBzZXNzaW9uLnVzZXIubmFtZSA9IHRva2VuLm5hbWU7XG4gICAgICAgIHNlc3Npb24udXNlci5lbWFpbCA9IHRva2VuLmVtYWlsO1xuICAgICAgICBzZXNzaW9uLnVzZXIuaW1hZ2UgPSB0b2tlbi5waWN0dXJlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICB9LFxuICAgIHJlZGlyZWN0KCkge1xuICAgICAgcmV0dXJuIFwiL3dhbGxldFwiO1xuICAgIH0sXG4gIH0sXG59O1xuIl0sIm5hbWVzIjpbIlVwc3Rhc2hSZWRpc0FkYXB0ZXIiLCJkYiIsIkdvb2dsZVByb3ZpZGVyIiwiZmV0Y2hSZWRpcyIsImdldEdvb2dsZUNyZWRlbnRpYWxzIiwiY2xpZW50SWQiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX0NMSUVOVF9JRCIsImNsaWVudFNlY3JldCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwibGVuZ3RoIiwiRXJyb3IiLCJhdXRoT3B0aW9ucyIsImFkYXB0ZXIiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJwYWdlcyIsInNpZ25JbiIsInByb3ZpZGVycyIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwidXNlciIsImRiVXNlclJlc3VsdCIsImlkIiwiZGJVc2VyIiwiSlNPTiIsInBhcnNlIiwibmFtZSIsImVtYWlsIiwicGljdHVyZSIsImltYWdlIiwicmVkaXJlY3QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/lib/auth.ts\n',
        );

        /***/
      },

    /***/ "(api)/./src/lib/db.ts":
      /*!***********************!*\
  !*** ./src/lib/db.ts ***!
  \***********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var _upstash_redis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @upstash/redis */ "@upstash/redis");\n/* harmony import */ var _upstash_redis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_upstash_redis__WEBPACK_IMPORTED_MODULE_0__);\n\nconst url = process.env.UPSTASH_REDIS_REST_URL || "";\nconst token = process.env.UPSTASH_REDIS_REST_TOKEN || "";\nconst db = new _upstash_redis__WEBPACK_IMPORTED_MODULE_0__.Redis({\n    url: url,\n    token: token\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvbGliL2RiLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUF1QztBQUV2QyxNQUFNQyxNQUFNQyxRQUFRQyxHQUFHLENBQUNDLHNCQUFzQixJQUFJO0FBQ2xELE1BQU1DLFFBQVFILFFBQVFDLEdBQUcsQ0FBQ0csd0JBQXdCLElBQUk7QUFFL0MsTUFBTUMsS0FBSyxJQUFJUCxpREFBS0EsQ0FBQztJQUMxQkMsS0FBS0E7SUFDTEksT0FBT0E7QUFDVCxHQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQG9waW50ZW50cy9jbGllbnQvLi9zcmMvbGliL2RiLnRzPzllNGYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVkaXMgfSBmcm9tIFwiQHVwc3Rhc2gvcmVkaXNcIjtcblxuY29uc3QgdXJsID0gcHJvY2Vzcy5lbnYuVVBTVEFTSF9SRURJU19SRVNUX1VSTCB8fCBcIlwiO1xuY29uc3QgdG9rZW4gPSBwcm9jZXNzLmVudi5VUFNUQVNIX1JFRElTX1JFU1RfVE9LRU4gfHwgXCJcIjtcblxuZXhwb3J0IGNvbnN0IGRiID0gbmV3IFJlZGlzKHtcbiAgdXJsOiB1cmwsXG4gIHRva2VuOiB0b2tlbixcbn0pO1xuIl0sIm5hbWVzIjpbIlJlZGlzIiwidXJsIiwicHJvY2VzcyIsImVudiIsIlVQU1RBU0hfUkVESVNfUkVTVF9VUkwiLCJ0b2tlbiIsIlVQU1RBU0hfUkVESVNfUkVTVF9UT0tFTiIsImRiIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/lib/db.ts\n',
        );

        /***/
      },

    /***/ "(api)/./src/pages/api/auth/[...nextauth].ts":
      /*!*********************************************!*\
  !*** ./src/pages/api/auth/[...nextauth].ts ***!
  \*********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/next */ "next-auth/next");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_next__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/auth */ "(api)/./src/lib/auth.ts");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth_next__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXNDO0FBQ1U7QUFFaEQsaUVBQWVBLHFEQUFRQSxDQUFDQyxrREFBV0EsQ0FBQ0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0BvcGludGVudHMvY2xpZW50Ly4vc3JjL3BhZ2VzL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0udHM/NTBhMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSBcIm5leHQtYXV0aC9uZXh0XCI7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCIuLi8uLi8uLi9saWIvYXV0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBOZXh0QXV0aChhdXRoT3B0aW9ucyk7XG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJhdXRoT3B0aW9ucyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/auth/[...nextauth].ts\n',
        );

        /***/
      },

    /***/ "(api)/./src/utils/redis.ts":
      /*!****************************!*\
  !*** ./src/utils/redis.ts ***!
  \****************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchRedis: () => (/* binding */ fetchRedis)\n/* harmony export */ });\nconst upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;\nconst authToken = process.env.UPSTASH_REDIS_REST_TOKEN;\nasync function fetchRedis(command, ...args) {\n    const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join("/")}`;\n    const response = await fetch(commandUrl, {\n        headers: {\n            Authorization: `Bearer ${authToken}`\n        },\n        cache: "no-store"\n    });\n    if (!response.ok) {\n        throw new Error(`Error executing Redis command: ${response.statusText}`);\n    }\n    const data = await response.json();\n    return data.result;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvdXRpbHMvcmVkaXMudHMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLHNCQUFzQkMsUUFBUUMsR0FBRyxDQUFDQyxzQkFBc0I7QUFDOUQsTUFBTUMsWUFBWUgsUUFBUUMsR0FBRyxDQUFDRyx3QkFBd0I7QUFJL0MsZUFBZUMsV0FDcEJDLE9BQWdCLEVBQ2hCLEdBQUdDLElBQXlCO0lBRTVCLE1BQU1DLGFBQWEsQ0FBQyxFQUFFVCxvQkFBb0IsQ0FBQyxFQUFFTyxRQUFRLENBQUMsRUFBRUMsS0FBS0UsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUV4RSxNQUFNQyxXQUFXLE1BQU1DLE1BQU1ILFlBQVk7UUFDdkNJLFNBQVM7WUFDUEMsZUFBZSxDQUFDLE9BQU8sRUFBRVYsVUFBVSxDQUFDO1FBQ3RDO1FBQ0FXLE9BQU87SUFDVDtJQUVBLElBQUksQ0FBQ0osU0FBU0ssRUFBRSxFQUFFO1FBQ2hCLE1BQU0sSUFBSUMsTUFBTSxDQUFDLCtCQUErQixFQUFFTixTQUFTTyxVQUFVLENBQUMsQ0FBQztJQUN6RTtJQUVBLE1BQU1DLE9BQU8sTUFBTVIsU0FBU1MsSUFBSTtJQUNoQyxPQUFPRCxLQUFLRSxNQUFNO0FBQ3BCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQG9waW50ZW50cy9jbGllbnQvLi9zcmMvdXRpbHMvcmVkaXMudHM/ODc5YSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB1cHN0YXNoUmVkaXNSZXN0VXJsID0gcHJvY2Vzcy5lbnYuVVBTVEFTSF9SRURJU19SRVNUX1VSTDtcbmNvbnN0IGF1dGhUb2tlbiA9IHByb2Nlc3MuZW52LlVQU1RBU0hfUkVESVNfUkVTVF9UT0tFTjtcblxudHlwZSBDb21tYW5kID0gXCJ6cmFuZ2VcIiB8IFwic2lzbWVtYmVyXCIgfCBcImdldFwiIHwgXCJzbWVtYmVyc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hSZWRpcyhcbiAgY29tbWFuZDogQ29tbWFuZCxcbiAgLi4uYXJnczogKHN0cmluZyB8IG51bWJlcilbXVxuKSB7XG4gIGNvbnN0IGNvbW1hbmRVcmwgPSBgJHt1cHN0YXNoUmVkaXNSZXN0VXJsfS8ke2NvbW1hbmR9LyR7YXJncy5qb2luKFwiL1wiKX1gO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goY29tbWFuZFVybCwge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthdXRoVG9rZW59YCxcbiAgICB9LFxuICAgIGNhY2hlOiBcIm5vLXN0b3JlXCIsXG4gIH0pO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIGV4ZWN1dGluZyBSZWRpcyBjb21tYW5kOiAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gIH1cblxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gZGF0YS5yZXN1bHQ7XG59XG4iXSwibmFtZXMiOlsidXBzdGFzaFJlZGlzUmVzdFVybCIsInByb2Nlc3MiLCJlbnYiLCJVUFNUQVNIX1JFRElTX1JFU1RfVVJMIiwiYXV0aFRva2VuIiwiVVBTVEFTSF9SRURJU19SRVNUX1RPS0VOIiwiZmV0Y2hSZWRpcyIsImNvbW1hbmQiLCJhcmdzIiwiY29tbWFuZFVybCIsImpvaW4iLCJyZXNwb25zZSIsImZldGNoIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJjYWNoZSIsIm9rIiwiRXJyb3IiLCJzdGF0dXNUZXh0IiwiZGF0YSIsImpzb24iLCJyZXN1bHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/utils/redis.ts\n',
        );

        /***/
      },

    /***/ "(api)/../../node_modules/next/dist/server/future/route-kind.js":
      /*!****************************************************************!*\
  !*** ../../node_modules/next/dist/server/future/route-kind.js ***!
  \****************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({\n    value: true\n}));\nObject.defineProperty(exports, "RouteKind", ({\n    enumerable: true,\n    get: function() {\n        return RouteKind;\n    }\n}));\nvar RouteKind;\n(function(RouteKind) {\n    RouteKind[/**\n   * `PAGES` represents all the React pages that are under `pages/`.\n   */ "PAGES"] = "PAGES";\n    RouteKind[/**\n   * `PAGES_API` represents all the API routes under `pages/api/`.\n   */ "PAGES_API"] = "PAGES_API";\n    RouteKind[/**\n   * `APP_PAGE` represents all the React pages that are under `app/` with the\n   * filename of `page.{j,t}s{,x}`.\n   */ "APP_PAGE"] = "APP_PAGE";\n    RouteKind[/**\n   * `APP_ROUTE` represents all the API routes and metadata routes that are under `app/` with the\n   * filename of `route.{j,t}s{,x}`.\n   */ "APP_ROUTE"] = "APP_ROUTE";\n})(RouteKind || (RouteKind = {}));\n\n//# sourceMappingURL=route-kind.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmQuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7QUFDRiw2Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixJQUFJLEVBQUUsR0FBRztBQUNqQztBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsSUFBSSxFQUFFLEdBQUc7QUFDbEM7QUFDQSxDQUFDLDhCQUE4Qjs7QUFFL0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ab3BpbnRlbnRzL2NsaWVudC8uLi8uLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZC5qcz84NTNkIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUm91dGVLaW5kXCIsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBSb3V0ZUtpbmQ7XG4gICAgfVxufSk7XG52YXIgUm91dGVLaW5kO1xuKGZ1bmN0aW9uKFJvdXRlS2luZCkge1xuICAgIFJvdXRlS2luZFsvKipcbiAgICogYFBBR0VTYCByZXByZXNlbnRzIGFsbCB0aGUgUmVhY3QgcGFnZXMgdGhhdCBhcmUgdW5kZXIgYHBhZ2VzL2AuXG4gICAqLyBcIlBBR0VTXCJdID0gXCJQQUdFU1wiO1xuICAgIFJvdXRlS2luZFsvKipcbiAgICogYFBBR0VTX0FQSWAgcmVwcmVzZW50cyBhbGwgdGhlIEFQSSByb3V0ZXMgdW5kZXIgYHBhZ2VzL2FwaS9gLlxuICAgKi8gXCJQQUdFU19BUElcIl0gPSBcIlBBR0VTX0FQSVwiO1xuICAgIFJvdXRlS2luZFsvKipcbiAgICogYEFQUF9QQUdFYCByZXByZXNlbnRzIGFsbCB0aGUgUmVhY3QgcGFnZXMgdGhhdCBhcmUgdW5kZXIgYGFwcC9gIHdpdGggdGhlXG4gICAqIGZpbGVuYW1lIG9mIGBwYWdlLntqLHR9c3sseH1gLlxuICAgKi8gXCJBUFBfUEFHRVwiXSA9IFwiQVBQX1BBR0VcIjtcbiAgICBSb3V0ZUtpbmRbLyoqXG4gICAqIGBBUFBfUk9VVEVgIHJlcHJlc2VudHMgYWxsIHRoZSBBUEkgcm91dGVzIGFuZCBtZXRhZGF0YSByb3V0ZXMgdGhhdCBhcmUgdW5kZXIgYGFwcC9gIHdpdGggdGhlXG4gICAqIGZpbGVuYW1lIG9mIGByb3V0ZS57aix0fXN7LHh9YC5cbiAgICovIFwiQVBQX1JPVVRFXCJdID0gXCJBUFBfUk9VVEVcIjtcbn0pKFJvdXRlS2luZCB8fCAoUm91dGVLaW5kID0ge30pKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cm91dGUta2luZC5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/../../node_modules/next/dist/server/future/route-kind.js\n',
        );

        /***/
      },

    /***/ "(api)/../../node_modules/next/dist/server/future/route-modules/pages-api/module.js":
      /*!************************************************************************************!*\
  !*** ../../node_modules/next/dist/server/future/route-modules/pages-api/module.js ***!
  \************************************************************************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({\n    value: true\n}));\n0 && (0);\nfunction _export(target, all) {\n    for(var name in all)Object.defineProperty(target, name, {\n        enumerable: true,\n        get: all[name]\n    });\n}\n_export(exports, {\n    PagesAPIRouteModule: function() {\n        return PagesAPIRouteModule;\n    },\n    default: function() {\n        return _default;\n    }\n});\nconst _routemodule = __webpack_require__(/*! ../route-module */ "../route-module?407b");\nconst _node = __webpack_require__(/*! ../../../api-utils/node */ "../../../api-utils/node");\nclass PagesAPIRouteModule extends _routemodule.RouteModule {\n    /**\n   *\n   * @param req the incoming server request\n   * @param res the outgoing server response\n   * @param context the context for the render\n   */ async render(req, res, context) {\n        await (0, _node.apiResolver)(req, res, context.query, this.userland, {\n            ...context.previewProps,\n            revalidate: context.revalidate,\n            trustHostHeader: context.trustHostHeader,\n            allowedRevalidateHeaderKeys: context.allowedRevalidateHeaderKeys,\n            hostname: context.hostname\n        }, context.minimalMode, context.dev, context.page);\n    }\n}\nconst _default = PagesAPIRouteModule;\n\n//# sourceMappingURL=module.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvcGFnZXMtYXBpL21vZHVsZS5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQztBQUNGLE1BQU0sQ0FHTDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxxQkFBcUIsbUJBQU8sQ0FBQyw2Q0FBaUI7QUFDOUMsY0FBYyxtQkFBTyxDQUFDLHdEQUF5QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ab3BpbnRlbnRzL2NsaWVudC8uLi8uLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9wYWdlcy1hcGkvbW9kdWxlLmpzPzhkMTMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG4wICYmIChtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBQYWdlc0FQSVJvdXRlTW9kdWxlOiBudWxsLFxuICAgIGRlZmF1bHQ6IG51bGxcbn0pO1xuZnVuY3Rpb24gX2V4cG9ydCh0YXJnZXQsIGFsbCkge1xuICAgIGZvcih2YXIgbmFtZSBpbiBhbGwpT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgbmFtZSwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6IGFsbFtuYW1lXVxuICAgIH0pO1xufVxuX2V4cG9ydChleHBvcnRzLCB7XG4gICAgUGFnZXNBUElSb3V0ZU1vZHVsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBQYWdlc0FQSVJvdXRlTW9kdWxlO1xuICAgIH0sXG4gICAgZGVmYXVsdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfZGVmYXVsdDtcbiAgICB9XG59KTtcbmNvbnN0IF9yb3V0ZW1vZHVsZSA9IHJlcXVpcmUoXCIuLi9yb3V0ZS1tb2R1bGVcIik7XG5jb25zdCBfbm9kZSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9hcGktdXRpbHMvbm9kZVwiKTtcbmNsYXNzIFBhZ2VzQVBJUm91dGVNb2R1bGUgZXh0ZW5kcyBfcm91dGVtb2R1bGUuUm91dGVNb2R1bGUge1xuICAgIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gcmVxIHRoZSBpbmNvbWluZyBzZXJ2ZXIgcmVxdWVzdFxuICAgKiBAcGFyYW0gcmVzIHRoZSBvdXRnb2luZyBzZXJ2ZXIgcmVzcG9uc2VcbiAgICogQHBhcmFtIGNvbnRleHQgdGhlIGNvbnRleHQgZm9yIHRoZSByZW5kZXJcbiAgICovIGFzeW5jIHJlbmRlcihyZXEsIHJlcywgY29udGV4dCkge1xuICAgICAgICBhd2FpdCAoMCwgX25vZGUuYXBpUmVzb2x2ZXIpKHJlcSwgcmVzLCBjb250ZXh0LnF1ZXJ5LCB0aGlzLnVzZXJsYW5kLCB7XG4gICAgICAgICAgICAuLi5jb250ZXh0LnByZXZpZXdQcm9wcyxcbiAgICAgICAgICAgIHJldmFsaWRhdGU6IGNvbnRleHQucmV2YWxpZGF0ZSxcbiAgICAgICAgICAgIHRydXN0SG9zdEhlYWRlcjogY29udGV4dC50cnVzdEhvc3RIZWFkZXIsXG4gICAgICAgICAgICBhbGxvd2VkUmV2YWxpZGF0ZUhlYWRlcktleXM6IGNvbnRleHQuYWxsb3dlZFJldmFsaWRhdGVIZWFkZXJLZXlzLFxuICAgICAgICAgICAgaG9zdG5hbWU6IGNvbnRleHQuaG9zdG5hbWVcbiAgICAgICAgfSwgY29udGV4dC5taW5pbWFsTW9kZSwgY29udGV4dC5kZXYsIGNvbnRleHQucGFnZSk7XG4gICAgfVxufVxuY29uc3QgX2RlZmF1bHQgPSBQYWdlc0FQSVJvdXRlTW9kdWxlO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2R1bGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/../../node_modules/next/dist/server/future/route-modules/pages-api/module.js\n',
        );

        /***/
      },
  };
  // load runtime
  var __webpack_require__ = require("../../../webpack-api-runtime.js");
  __webpack_require__.C(exports);
  var __webpack_exec__ = (moduleId) =>
    __webpack_require__((__webpack_require__.s = moduleId));
  var __webpack_exports__ = __webpack_exec__(
    "(api)/../../node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2F%5B...nextauth%5D&preferredRegion=&absolutePagePath=.%2Fsrc%2Fpages%2Fapi%2Fauth%2F%5B...nextauth%5D.ts&middlewareConfigBase64=e30%3D!",
  );
  module.exports = __webpack_exports__;
})();
