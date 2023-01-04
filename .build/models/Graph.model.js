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
var import_helper = __toModule(require("../helper"));
var import_console = __toModule(require("console"));
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
    for (let i = 0; i < heigth; i++) {
      matrix.push([]);
      for (let j = 0; j < width; j++) {
        matrix[i].push(0);
      }
    }
    return matrix;
  }
  generateMatrixIncidents() {
    const matrix = this.generateMatrix(this.apexes.length, this.edges.length);
    this.edges.forEach((edge) => {
      matrix[edge.from.index - 1][edge.index - 1] = this.is_oriented ? -1 : 1;
      matrix[edge.to.index - 1][edge.index - 1] = 1;
    });
    return matrix;
  }
  generateMatrixContiguity() {
    const matrix = this.generateMatrix(this.apexes.length, this.apexes.length);
    this.edges.forEach((edge) => {
      matrix[edge.from.index - 1][edge.to.index - 1] = 1;
      !this.is_oriented ? matrix[edge.to.index - 1][edge.from.index - 1] = 1 : [];
    });
    return matrix;
  }
  getDistanceMatrix(graph = this.getEdgesArray(), apexes_quantity = this.apexes.length) {
    let distanceMatrix = [];
    for (let i = 0; i < apexes_quantity; i++) {
      distanceMatrix[i] = [];
      for (let j = 0; j < apexes_quantity; j++) {
        distanceMatrix[i][j] = Infinity;
      }
    }
    for (const [u, v] of graph) {
      distanceMatrix[u - 1][v - 1] = 1;
      distanceMatrix[v - 1][u - 1] = 1;
    }
    distanceMatrix = (0, import_helper.boolMainDiagonal)(distanceMatrix, 0);
    for (let k = 0; k < apexes_quantity; k++) {
      for (let i = 0; i < apexes_quantity; i++) {
        for (let j = 0; j < apexes_quantity; j++) {
          distanceMatrix[i][j] = Math.min(distanceMatrix[i][j], distanceMatrix[i][k] + distanceMatrix[k][j]);
        }
      }
    }
    return distanceMatrix;
  }
  getEdgesArray() {
    return this.edges.map((e) => [e.from.index, e.to.index]);
  }
  getReachabilityMatrix(graph = this.getEdgesArray(), apexes_quantity = this.apexes.length) {
    const reachabilityMatrix = [];
    for (let i = 0; i < apexes_quantity; i++) {
      reachabilityMatrix[i] = [];
      for (let j = 0; j < apexes_quantity; j++) {
        reachabilityMatrix[i][j] = 0;
      }
    }
    for (const [u, v] of graph) {
      reachabilityMatrix[u - 1][v - 1] = 1;
      reachabilityMatrix[v - 1][u - 1] = 1;
    }
    for (let k = 0; k < apexes_quantity; k++) {
      for (let i = 0; i < apexes_quantity; i++) {
        for (let j = 0; j < apexes_quantity; j++) {
          reachabilityMatrix[i][j] = reachabilityMatrix[i][j] || reachabilityMatrix[i][k] && reachabilityMatrix[k][j];
        }
      }
    }
    return reachabilityMatrix;
  }
  getDistance() {
    const matrix = this.getDistanceMatrix();
    let maxValue = -1;
    matrix.forEach((row) => {
      row.forEach((n) => {
        maxValue < n ? maxValue = n : [];
      });
    });
    return maxValue;
  }
  findRadius(graph = this.getEdgesArray()) {
    const matrix = this.getDistanceMatrix();
    let maxes = [];
    matrix.forEach((row) => {
      maxes.push(Math.max(...row));
    });
    return Math.min(...maxes);
  }
  findCentres(graph = this.getEdgesArray()) {
    const matrix = this.getDistanceMatrix();
    const radius = this.findRadius();
    let centres = [];
    matrix.forEach((row, index) => {
      Math.max(...row) == radius ? centres.push(index + 1) : [];
    });
    return centres;
  }
  findTiers(graph = this.getEdgesArray()) {
    const matrix = this.getDistanceMatrix();
    const radius = this.findRadius();
    let tiers = [];
    matrix.forEach((row, index) => {
      tiers.push({
        index: index + 1,
        value: Math.max(...row) - radius
      });
    });
    return tiers;
  }
  findSimpleCycles(adjMatrix = this.generateMatrixContiguity(), vertexAmount = this.apexes.length) {
    const simpleCycles = [];
    function dfs(node, visited2, path) {
      path.push(node);
      visited2[node] = true;
      for (let i = 1; i < vertexAmount; i++) {
        if (adjMatrix[node][i] && !visited2[i]) {
          dfs(i, visited2, path);
        } else if (adjMatrix[node][i] && path.includes(i)) {
          if (!simpleCycles.includes(path.slice(path.indexOf(i))) && path.slice(path.indexOf(i)).length > 2) {
            simpleCycles.push(path.slice(path.indexOf(i)));
          }
        }
      }
      path.pop();
    }
    const visited = new Array(vertexAmount).fill(false);
    for (let i = 1; i < vertexAmount; i++) {
      dfs(i, visited, []);
    }
    (0, import_console.log)(simpleCycles.map((cycle) => cycle.map((x) => x + 1)));
    return simpleCycles.map((cycle) => cycle.map((x) => x + 1));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=Graph.model.js.map
