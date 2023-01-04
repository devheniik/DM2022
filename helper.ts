import { log } from "console" 
import reader from 'readline-sync'
import Graph from "./models/Graph.model"
const writeTwoDementionalArray = (array: number[][], 
                                  name: string = 'Array', 
                                  addHeader: boolean = true): void => {

  
                                    
  log(`\n \n`)
  log(`-----------${name}---------- \n \n`)
  if(addHeader){
    array.length > 1 ? array[0].length : array.length 
    let line = ''
    for(let i = 0; i <= (array.length > 1 ? array[0].length : array.length) ; i++){
      line += `${i}   `
    }
    log(`${line} \n`) 
  }
  array.forEach((arr, index) => {
    let line = addHeader ? `${index + 1}   ` : ''
    arr.forEach(el => {
      line += `${el}   `
    })
    log(`${line} \n`) 
  })

       log(`-------------${'end'}-------------- \n`)                             
}


const question = (question: string, validor: Function = () => true, show_invalid: boolean = true) => {
  let repeat = true;
  let invalid_input = false
  let response = ''

  while (repeat) {
    repeat = false

    const full_question = (invalid_input && show_invalid ? 'Invalid input, please ' : '') + question
    const input = reader.question(full_question)

    !validor(input) ? [repeat = true, invalid_input = true] : response = input

  }

  return response
}

const readGraph = (defaultOriented: any = null) => {
  const graph = new Graph(
    defaultOriented === null ? Number(
      question('Graph is oriented (1 || 0)? \n', (e: string) => {
        return Number(e) === 1 || Number(e) === 0
      })
    ) : defaultOriented,
    Number(
      question('Enter quantity of apexes (n > 0)? \n', (e: string) => Number(e) > 0)
    )
  )
  
  const graph_max_apex = graph.apexes.length
  // log(graph)
  
  log('Now input edge\'s apexes, to stop write "end" \n')
  
  let index = 1
  while (true) {
    const input = question
      (`New edge\'s start from ~ to, example: (1 2),
        n (${'1' + ' ~ ' + String(graph_max_apex)}) apex: ? \n`,
        (e: string) => {
          if (e === 'end') {
            return true
          }
          e.includes(' ') ? [] : false
          const from = e.split(' ')[0]
          const to = e.split(' ')[1]
          return Number(from) > 0 && Number(from) <= graph_max_apex &&
            Number(to) > 0 && Number(to) <= graph_max_apex
  
        })
  
    if (input === 'end') {
      break
    }
  
    const from = Number(input.split(' ')[0])
    const to = Number(input.split(' ')[1])
  
    graph.createEdge(index, from, to)
  
    index += 1
  
  }

  return graph
}


function boolMainDiagonal(matrix: number[][], bool: boolean): number[][] {
    // Get number of rows and columns in matrix
    const n = matrix.length;

    // Set main diagonal elements to 0
    for (let i = 0; i < n; i++) {
        matrix[i][i] = Number(bool);
    }
    
    return matrix
}

function bfs(start: number, graph: number[][]): number[] {
  // Initialize a queue and a distances array
  const queue = [start];
  const distances = new Array(graph.length).fill(Infinity);
  // Mark the start node as being at distance 0
  distances[start] = 0;

  // While there are nodes in the queue
  while (queue.length > 0) {
    // Dequeue the first node in the queue
    const current = queue.shift();
    // For each of its neighbors
    for (const neighbor of graph[current]) {
      // If we haven't visited the neighbor yet
      if (distances[neighbor] === Infinity) {
        // Mark the neighbor as visited and enqueue it
        distances[neighbor] = distances[current] + 1;
        queue.push(neighbor);
      }
    }
  }

  return distances;
}

function dfs(currentVertex: number, startVertex: number, visited: boolean[], stack: Stack<number>, adjacencyMatrix: number[][]): boolean {
  // Mark the current vertex as visited
  visited[currentVertex] = true;
  stack.push(currentVertex);

  // Iterate through all the neighbors of the current vertex
  for (let neighbor = 0; neighbor < adjacencyMatrix[currentVertex].length; neighbor++) {
    // Check if the neighbor is connected to the current vertex
    if (adjacencyMatrix[currentVertex][neighbor] === 1) {
      // Check if the neighbor is the start vertex (forming a cycle)
      if (neighbor === startVertex) {
        // A cycle was found, so return true
        return true;
      }
      // Check if the neighbor has not been visited
      if (!visited[neighbor]) {
        // Perform a depth-first search from the neighbor
        if (dfs(neighbor, startVertex, visited, stack, adjacencyMatrix)) {
          // A cycle was found, so return true
          return true;
        }
      }
    }
  }

  // No cycle was found, so remove the current vertex from the stack and return false
  stack.pop();
  return false;
}

export {
  writeTwoDementionalArray, question, readGraph, boolMainDiagonal, bfs, dfs
}