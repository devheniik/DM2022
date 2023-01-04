var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
__export(exports, {
  default: () => practice2_scene_default
});
var import_console = __toModule(require("console"));
var import_helper = __toModule(require("../helper"));
function practice2_scene_default() {
  const graph = (0, import_helper.readGraph)(0);
  (0, import_helper.writeTwoDementionalArray)(graph.generateMatrixContiguity(), "Matrix Contiguity");
  (0, import_helper.writeTwoDementionalArray)(graph.getDistanceMatrix(), "Matrix Distance");
  (0, import_helper.writeTwoDementionalArray)(graph.getReachabilityMatrix(), "Matrix Reachability");
  (0, import_console.log)(`Distance: ${graph.getDistance()} 
`);
  (0, import_console.log)(`Radius: ${graph.findRadius()} 
`);
  (0, import_console.log)(`Radius: ${graph.findCentres().toString()} 
`);
  (0, import_console.log)(`tiers: 
`);
  graph.findTiers().forEach((e) => {
    (0, import_console.log)(`Tier${e.index}: ${e.value} 
`);
  });
  const SimpleCyclesAnswer = graph.findSimpleCycles().length > 0 ? graph.findSimpleCycles()[0].join(" -> ") : ":(";
  (0, import_console.log)(`Simple Loop: ${SimpleCyclesAnswer} 
`);
  (0, import_console.log)(graph);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=practice2.scene.js.map
