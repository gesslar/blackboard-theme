let pending = this.#evaluateObject(work)
let lastCount = pending.length
let stuckCount = 0

while(pending.length > 0 && ++stuckCount < 10) {
  const stillPending = []

  for(const leaf of pending) {
    if(this.#canResolve(leaf)) {
      this.#resolveLeaf(leaf)
    } else {
      stillPending.push(leaf)
    }
  }

  pending = stillPending

  if(pending.length === lastCount) {
    if(stuckCount > 10) throw new Error("Circular reference detected")
  } else {
    stuckCount = 0
  }

  lastCount = pending.length
}
