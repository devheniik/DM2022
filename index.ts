import { log } from 'console'
import reader from 'readline-sync'

import Graph from './Graph.model'
import { writeTwoDementionalArray } from './helper';

const question = (question: string, validor: Function = () => true) => {
  let repeat = true;
  let invalid_input = false
  let response = ''

  while (repeat) {
    repeat = false

    const full_question = (invalid_input ? 'Invalid input, please ' : '') + question
    const input = reader.question(full_question)

    !validor(input) ? [repeat = true, invalid_input = true] : response = input

  }

  return response
}


const graph = new Graph(
  Number(
    question('Graph is oriented (1 || 0)? \n', (e: string) => {
      return Number(e) === 1 || Number(e) === 0
    })
  ),
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


// log(graph)