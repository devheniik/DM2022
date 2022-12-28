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
var import_console = __toModule(require("console"));
var import_readline_sync = __toModule(require("readline-sync"));
var import_Graph = __toModule(require("./Graph.model"));
var import_helper = __toModule(require("./helper"));
const question = (question2, validor = () => true) => {
  let repeat = true;
  let invalid_input = false;
  let response = "";
  while (repeat) {
    repeat = false;
    const full_question = (invalid_input ? "Invalid input, please " : "") + question2;
    const input = import_readline_sync.default.question(full_question);
    !validor(input) ? [repeat = true, invalid_input = true] : response = input;
  }
  return response;
};
const graph = new import_Graph.default(Number(question("Graph is oriented (1 || 0)? \n", (e) => {
  return Number(e) === 1 || Number(e) === 0;
})), Number(question("Enter quantity of apexes (n > 0)? \n", (e) => Number(e) > 0)));
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
(0, import_helper.writeTwoDementionalArray)(graph.generateMatrixIncidents(), "Matrix Incidents");
(0, import_console.log)("\n");
(0, import_helper.writeTwoDementionalArray)(graph.generateMatrixContiguity(), "Matrix Contiguity");
graph.listInfoApexes().forEach((info) => {
  (0, import_console.log)(`Apex - ${info.apex.index},

    degree - ${info.degree},

    input - ${info.input},

    exit - ${info.exit},

    isolated - ${info.degree === 0},

    hanging - ${info.degree === 1},

    `);
});
//# sourceMappingURL=index.js.map
