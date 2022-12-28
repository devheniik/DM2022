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
  default: () => Graph_model_default
});
var import_Apex = __toModule(require("./Apex.model"));
var import_Edge = __toModule(require("./Edge.model"));
class Graph_model_default {
  apexes = [];
  edges = [];
  is_oriented;
  constructor(is_oriented, quantity_of_apex) {
    this.is_oriented = is_oriented == 1;
    for (let i = 1; i <= quantity_of_apex; i++) {
      this.apexes.push(new import_Apex.default(i));
    }
  }
  listInfoApexes() {
    let response = [];
    this.apexes.forEach((apex) => {
      let input = 0;
      let exit = 0;
      let degree = 0;
      this.edges.forEach((edge) => {
        exit += edge.from === apex ? 1 : 0;
        input += edge.to === apex ? 1 : 0;
      });
      degree = input + exit;
      response.push({
        degree,
        input,
        exit,
        apex
      });
    });
    return response;
  }
  createEdge(index, from, to) {
    this.edges.push(new import_Edge.default(index, this.apexes.find((apex) => apex.index === from), this.apexes.find((apex) => apex.index === to)));
  }
  generateMatrix(heigth, width) {
    const matrix = [];
    for (let i = 0; i <= heigth; i++) {
      matrix.push([]);
      for (let j = 0; j <= width; j++) {
        matrix[i].push(0);
      }
    }
    for (let i = 1; i <= heigth; i++) {
      matrix[i][0] = i;
    }
    for (let j = 1; j <= width; j++) {
      matrix[0][j] = j;
    }
    return matrix;
  }
  generateMatrixIncidents() {
    const matrix = this.generateMatrix(this.apexes.length, this.edges.length);
    this.edges.forEach((edge) => {
      matrix[edge.from.index][edge.index] = this.is_oriented ? -1 : 1;
      matrix[edge.to.index][edge.index] = 1;
    });
    return matrix;
  }
  generateMatrixContiguity() {
    const matrix = this.generateMatrix(this.apexes.length, this.apexes.length);
    this.edges.forEach((edge) => {
      matrix[edge.from.index][edge.to.index] = 1;
      this.is_oriented ? matrix[edge.to.index][edge.from.index] = 1 : [];
    });
    return matrix;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=Graph.model.js.map
