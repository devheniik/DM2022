import { log } from "console"

const writeTwoDementionalArray = (array: Array<Array<Number>>, 
                                  name: string = 'Array'): void => {
  log(`-----${name}----- \n \n`)
  array.forEach(arr => {
    let line = ''
    arr.forEach(el => {
      line += `${el}   `
    })
    log(`${line} \n`) 
  })
}



export {
  writeTwoDementionalArray
}