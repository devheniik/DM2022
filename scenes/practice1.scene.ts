import { log } from 'console' 

import Graph from '../models/Graph.model'
import { writeTwoDementionalArray, question, readGraph } from '../helper'

export default function() {  
  const graph = readGraph()
  
  
  
  writeTwoDementionalArray(graph.generateMatrixIncidents(), 'Matrix Incidents')
  log('\n')
  writeTwoDementionalArray(graph.generateMatrixContiguity(), 'Matrix Contiguity')
  
  graph.listInfoApexes().forEach(info => {
    log(
      `Apex - ${info.apex.index},\n
      degree - ${info.degree},\n
      input - ${info.input},\n
      exit - ${info.exit},\n
      isolated - ${info.degree === 0},\n
      hanging - ${info.degree === 1},\n
      `
    )
  })
}