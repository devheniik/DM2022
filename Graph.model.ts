import { log } from "console"
import Apex from "./Apex.model"
import Edge from "./Edge.model"

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

  public generateMatrix(heigth: number, width: number): Array<Array<Number>> {
    const matrix: Array<Array<Number>> = [];
    for (let i = 0; i <= heigth; i++) {
      matrix.push([])
      for (let j = 0; j <= width; j++) {
        matrix[i].push(0)
      }
    }

    for(let i = 1; i <= heigth; i++){
      matrix[i][0] = i 
    }
    for(let j = 1; j <= width; j++){
      matrix[0][j] = j
    }


    return matrix
  } 
   

  public generateMatrixIncidents(): Array<Array<Number>> {
    const matrix: Array<Array<Number>> = this.generateMatrix(this.apexes.length, this.edges.length);
    this.edges.forEach(edge => {
      matrix[edge.from.index][edge.index] =
        this.is_oriented ? -1 : 1
      matrix[edge.to.index][edge.index] = 1
    })

    return matrix
  }

  public generateMatrixContiguity(): Array<Array<Number>> {
    const matrix: Array<Array<Number>> = this.generateMatrix(this.apexes.length, this.apexes.length);

    this.edges.forEach(edge => {
      matrix[edge.from.index][edge.to.index] = 1
      this.is_oriented ?
        matrix[edge.to.index][edge.from.index] = 1 : []

    })

    return matrix
  }


}