import Apex from "./Apex.model"
export default class {
  public index: number
  public from: Apex
  public to: Apex

  constructor(index: number, from: Apex, to: Apex) {
    this.index = index
    this.from = from
    this.to = to
  }
}