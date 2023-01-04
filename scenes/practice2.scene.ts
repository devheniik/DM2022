import { log } from 'console' 

import Graph from '../models/Graph.model'
import { writeTwoDementionalArray, question, readGraph } from '../helper'


// const graph = [ // 5
//     [1, 2],
//     [2, 3],
//     [2, 4],
//     [3, 4],
//     [4, 5],
// ]

export default function() {  
  const graph = readGraph(0) 

  writeTwoDementionalArray(graph.generateMatrixContiguity(), 'Matrix Contiguity')
  writeTwoDementionalArray(graph.getDistanceMatrix(), 'Matrix Distance')
  writeTwoDementionalArray(graph.getReachabilityMatrix(), 'Matrix Reachability')

  log(`Distance: ${graph.getDistance()} \n`)
  log(`Radius: ${graph.findRadius()} \n`)
  log(`Radius: ${graph.findCentres().toString()} \n`)
  log(`tiers: \n`)
  graph.findTiers().forEach(e => {
    log(`Tier${e.index}: ${e.value} \n`)
  })

  const SimpleCyclesAnswer = graph.findSimpleCycles().length > 0 ? graph.findSimpleCycles()[0].join(' -> ') : ":("

  log(`Simple Loop: ${SimpleCyclesAnswer} \n`) 
  
  log(graph)
}