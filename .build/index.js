var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var import_helper = __toModule(require("./helper"));
var import_practice1 = __toModule(require("./scenes/practice1.scene"));
var import_practice2 = __toModule(require("./scenes/practice2.scene"));
(0, import_helper.question)("What practice you want to run (1, 2, 3, 4, 5)?\n", (e) => {
  if (e === "1") {
    (0, import_practice1.default)();
  }
  if (e === "2") {
    (0, import_practice2.default)();
  }
  return false;
}, false);
//# sourceMappingURL=index.js.map
