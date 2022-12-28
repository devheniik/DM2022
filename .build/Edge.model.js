var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  default: () => Edge_model_default
});
class Edge_model_default {
  index;
  from;
  to;
  constructor(index, from, to) {
    this.index = index;
    this.from = from;
    this.to = to;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=Edge.model.js.map
