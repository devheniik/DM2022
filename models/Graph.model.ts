import Apex from "./Apex.model"
import Edge from "./Edge.model"
import { Stack } from 'typescript-collections'
import {boolMainDiagonal, bfs} from "../helper"
import { log } from "console"

interface ApexInfo {
  degree: number,
  exit: number,
  input: number,
  apex: Apex
}

export default class {
  public apexes: Apex[] = []
  public edges: Edge[] = []
  public is_oriented: boolean

  constructor(is_oriented: number, quantity_of_apex: number) {
    this.is_oriented = is_oriented == 1
    for (let i = 1; i <= quantity_of_apex; i++) {
      this.apexes.push(new Apex(i));
    }
  }

  public listInfoApexes(): Array<ApexInfo> {
    let response: Array<ApexInfo> = []
    this.apexes.forEach(apex => {
      let input = 0
      let exit = 0
      let degree = 0

      this.edges.forEach(edge => {
        exit += edge.from === apex ? 1 : 0
        input += edge.to === apex ? 1 : 0
      })
      degree = input + exit

      response.push({
        degree: degree,
        input: input,
        exit: exit,
        apex: apex
      })

    })
    return response
  }

  public createEdge(index: number, from: number, to: number): void {
    this.edges.push(new Edge(
      index,
      this.apexes.find(apex => apex.index === from),
      this.apexes.find(apex => apex.index === to)
    ))
  }

  public generateMatrix(heigth: number, width: number): number[][] {
    const matrix: number[][] = [];
    for (let i = 0; i < heigth; i++) {
      matrix.push([])
      for (let j = 0; j < width; j++) {
        matrix[i].push(0)
      }
    }

    // for(let i = 1; i <= heigth; i++){
    //   matrix[i][0] = i 
    // }
    // for(let j = 1; j <= width; j++){
    //   matrix[0][j] = j
    // }


    return matrix
  } 
   

  public generateMatrixIncidents(): number[][] {
    const matrix: number[][] = this.generateMatrix(this.apexes.length, this.edges.length);
    this.edges.forEach(edge => {
      matrix[edge.from.index - 1][edge.index - 1] =
        this.is_oriented ? -1 : 1
      matrix[edge.to.index - 1][edge.index - 1] = 1
    })

    return matrix
  }

  public generateMatrixContiguity(): number[][] {
    const matrix: number[][] = this.generateMatrix(this.apexes.length, this.apexes.length);

    this.edges.forEach(edge => {
      matrix[edge.from.index - 1][edge.to.index - 1] = 1
      !this.is_oriented ?
        matrix[edge.to.index - 1][edge.from.index - 1] = 1 : []

    })

    return matrix
  } 

  public  getDistanceMatrix(graph: number[][] = this.getEdgesArray(), apexes_quantity: number = this.apexes.length): number[][] {
  // Initialize the distance matrix with Infinity values
    // log(graph, graph.length)
  let distanceMatrix: number[][] = [];
  for (let i = 0; i < apexes_quantity; i++) {
    distanceMatrix[i] = [];
    for (let j = 0; j < apexes_quantity; j++) {
      distanceMatrix[i][j] = Infinity;
    }
  }

  // Set the distance between each node to 1
  for (const [u, v] of graph) {
    distanceMatrix[u - 1][v - 1] = 1;
    distanceMatrix[v - 1][u - 1] = 1;
  }

  distanceMatrix = boolMainDiagonal(distanceMatrix, 0);

  // Apply the Floyd-Warshall algorithm to calculate the distances between all pairs of nodes
  for (let k = 0; k < apexes_quantity; k++) {
    for (let i = 0; i < apexes_quantity; i++) {
      for (let j = 0; j < apexes_quantity; j++) {
        distanceMatrix[i][j] = Math.min(distanceMatrix[i][j], distanceMatrix[i][k] + distanceMatrix[k][j]);
      }
    }
  }

  return distanceMatrix;
}

  private getEdgesArray(): number[][]{
    
    return this.edges.map(e => [ e.from.index, e.to.index ])
  }

  public getReachabilityMatrix(graph: number[][] = this.getEdgesArray(), apexes_quantity: number = this.apexes.length): number[][] {
  // Initialize the reachability matrix with 0 values
  const reachabilityMatrix: number[][] = [];
  for (let i = 0; i < apexes_quantity; i++) {
    reachabilityMatrix[i] = [];
    for (let j = 0; j < apexes_quantity; j++) {
      reachabilityMatrix[i][j] = 0;
    }
  }

  // Set the reachability between each node to 1
  for (const [u, v] of graph) {
    reachabilityMatrix[u - 1][v - 1] = 1;
    reachabilityMatrix[v - 1][u - 1] = 1;
  }

  // Apply the Floyd-Warshall algorithm to calculate the reachability between all pairs of nodes
  for (let k = 0; k < apexes_quantity; k++) {
    for (let i = 0; i < apexes_quantity; i++) {
      for (let j = 0; j < apexes_quantity; j++) {
        reachabilityMatrix[i][j] = reachabilityMatrix[i][j] || (reachabilityMatrix[i][k] && reachabilityMatrix[k][j]);
      }
    }
  }

  return reachabilityMatrix;
}

  public getDistance(): number{
    const matrix: number [][] = this.getDistanceMatrix()
    let maxValue = -1;
    matrix.forEach(row => {
      row.forEach(n => {
        maxValue < n ? maxValue = n : []
      })
    })  

  

    return maxValue
  }

  public findRadius(graph: number[][] = this.getEdgesArray()): number {
  // Find the maximum distance from any node to all other nodes
    const matrix: number [][] = this.getDistanceMatrix()
    let maxes: number[] = [];
    matrix.forEach(row => { 
      maxes.push(Math.max(...row))
    })  

    return Math.min(...maxes)
  }
  
  
  public findCentres(graph: number[][] = this.getEdgesArray()): number[] {
  // Find the maximum distance from any node to all other nodes
    const matrix: number [][] = this.getDistanceMatrix()
    const radius: number = this.findRadius()
    let centres: number[] = [];
    matrix.forEach((row, index) => { 
      Math.max(...row) == radius ? centres.push(index + 1) : []
    })  

    return centres
  }

  
  
  public findTiers(graph: number[][] = this.getEdgesArray()): Tier[] {
  // Find the maximum distance from any node to all other nodes
    const matrix: number [][] = this.getDistanceMatrix()
    const radius: number = this.findRadius()
    let tiers: Tier[] = []
    matrix.forEach((row, index) => { 
      tiers.push({
        index: index + 1,
        value: Math.max(...row) - radius
      }) 
    })  

    return tiers
  }

   public findSimpleCycles(adjMatrix: number[][] = this.generateMatrixContiguity(), vertexAmount: number = this.apexes.length): number[][] {
    const simpleCycles: number[][] = [];
  
    function dfs(node: number, visited: boolean[], path: number[]): void {
      path.push(node);
      visited[node] = true;
  
      for (let i = 1; i < vertexAmount; i++) {
        if (adjMatrix[node][i] && !visited[i]) {
          dfs(i, visited, path);
        } else if (adjMatrix[node][i] && path.includes(i)) {
          if (!simpleCycles.includes(path.slice(path.indexOf(i))) && path.slice(path.indexOf(i)).length > 2) {
            simpleCycles.push(path.slice(path.indexOf(i)));
          }
        }
      }
      
      path.pop();
    }
  
    const visited: boolean[] = new Array(vertexAmount).fill(false);
    for (let i = 1; i < vertexAmount; i++) {
      dfs(i, visited, []);
    }

    log(simpleCycles.map(cycle => cycle.map(x => x + 1)))
    return simpleCycles.map(cycle => cycle.map(x => x + 1));
  }
  
}

interface Tier {
  index: number,
  value: number
}