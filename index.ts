import { question } from './helper'

import practice from "./scenes/practice1.scene"
import practice2 from "./scenes/practice2.scene"

question("What practice you want to run (1, 2, 3, 4, 5)?\n", (e: string) => {
  if (e === "1") {
    practice()
  }
  
  if (e === "2") {
    practice2()
  }

  return false
}, false)
