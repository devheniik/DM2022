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
  bfs: () => bfs,
  boolMainDiagonal: () => boolMainDiagonal,
  dfs: () => dfs,
  question: () => question,
  readGraph: () => readGraph,
  writeTwoDementionalArray: () => writeTwoDementionalArray
});
var import_console = __toModule(require("console"));
var import_readline_sync = __toModule(require("readline-sync"));
var import_Graph = __toModule(require("./models/Graph.model"));
const writeTwoDementionalArray = (array, name = "Array", addHeader = true) => {
  (0, import_console.log)(`
 
`);
  (0, import_console.log)(`-----------${name}---------- 
 
`);
  if (addHeader) {
    array.length > 1 ? array[0].length : array.length;
    let line = "";
    for (let i = 0; i <= (array.length > 1 ? array[0].length : array.length); i++) {
      line += `${i}   `;
    }
    (0, import_console.log)(`${line} 
`);
  }
  array.forEach((arr, index) => {
    let line = addHeader ? `${index + 1}   ` : "";
    arr.forEach((el) => {
      line += `${el}   `;
    });
    (0, import_console.log)(`${line} 
`);
  });
  (0, import_console.log)(`-------------${"end"}-------------- 
`);
};
const question = (question2, validor = () => true, show_invalid = true) => {
  let repeat = true;
  let invalid_input = false;
  let response = "";
  while (repeat) {
    repeat = false;
    const full_question = (invalid_input && show_invalid ? "Invalid input, please " : "") + question2;
    const input = import_readline_sync.default.question(full_question);
    !validor(input) ? [repeat = true, invalid_input = true] : response = input;
  }
  return response;
};
const readGraph = (defaultOriented = null) => {
  const graph = new import_Graph.default(defaultOriented === null ? Number(question("Graph is oriented (1 || 0)? \n", (e) => {
    return Number(e) === 1 || Number(e) === 0;
  })) : defaultOriented, Number(question("Enter quantity of apexes (n > 0)? \n", (e) => Number(e) > 0)));
  const graph_max_apex = graph.apexes.length;
  (0, import_console.log)(`Now input edge's apexes, to stop write "end" 
`);
  let index = 1;
  while (true) {
    const input = question(`New edge's start from ~ to, example: (1 2),
        n (${"1 ~ " + String(graph_max_apex)}) apex: ? 
`, (e) => {
      if (e === "end") {
        return true;
      }
      e.includes(" ") ? [] : false;
      const from2 = e.split(" ")[0];
      const to2 = e.split(" ")[1];
      return Number(from2) > 0 && Number(from2) <= graph_max_apex && Number(to2) > 0 && Number(to2) <= graph_max_apex;
    });
    if (input === "end") {
      break;
    }
    const from = Number(input.split(" ")[0]);
    const to = Number(input.split(" ")[1]);
    graph.createEdge(index, from, to);
    index += 1;
  }
  return graph;
};
function boolMainDiagonal(matrix, bool) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    matrix[i][i] = Number(bool);
  }
  return matrix;
}
function bfs(start, graph) {
  const queue = [start];
  const distances = new Array(graph.length).fill(Infinity);
  distances[start] = 0;
  while (queue.length > 0) {
    const current = queue.shift();
    for (const neighbor of graph[current]) {
      if (distances[neighbor] === Infinity) {
        distances[neighbor] = distances[current] + 1;
        queue.push(neighbor);
      }
    }
  }
  return distances;
}
function dfs(currentVertex, startVertex, visited, stack, adjacencyMatrix) {
  visited[currentVertex] = true;
  stack.push(currentVertex);
  for (let neighbor = 0; neighbor < adjacencyMatrix[currentVertex].length; neighbor++) {
    if (adjacencyMatrix[currentVertex][neighbor] === 1) {
      if (neighbor === startVertex) {
        return true;
      }
      if (!visited[neighbor]) {
        if (dfs(neighbor, startVertex, visited, stack, adjacencyMatrix)) {
          return true;
        }
      }
    }
  }
  stack.pop();
  return false;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bfs,
  boolMainDiagonal,
  dfs,
  question,
  readGraph,
  writeTwoDementionalArray
});
//# sourceMappingURL=helper.js.map
