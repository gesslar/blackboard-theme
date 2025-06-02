import Colour from "./Colour.js"

/**
 * Evaluator class for resolving variables and color tokens in theme objects.
 * Handles recursive substitution of token references in arrays of objects.
 */
export default class Evaluator {
  #maxIterations = 10
  #sub = /\$\(([^()]+)\)/g
  #func = /(\w+)\(([^()]+)\)/g

  evaluate({vars: against, theme: evaluating}) {
    // Phase 1: Resolve variables in their own scope
    this.#processScope(
      against,
      this.#createLookup(against)
    )

    // Phase 2: Resolve theme with access to both scopes
    this.#processScope(
      evaluating,
      this.#createLookup(
        [...against, ...evaluating]
      )
    )

    return evaluating
  }

  #processScope(target, variables) {
    let it = 0

    do {
      target.forEach(item => {
        if(typeof item.value === "string") {
          item.value = this.#processTokens(item.value, variables)
        }
      })
    } while(++it < this.#maxIterations && !this.#hasUnresolvedTokens(target))
  }

  #createLookup(variables) {
    const result =
      variables.reduce((lookup, item) => {
        lookup[item.flatPath] = item.value
        return lookup
      }, {})

    return result
  }

  #processTokens(text, variables) {
    const next = text
      .replace(this.#sub, (...arg) => {
        const [match,varName] = arg

        const result = variables[varName.trim()] || match

        return result
      })
      .replace(this.#func, (_, func, args) => {
        const argList = args.split(",").map(s => s.trim())
        const result = this.#applyTransform(func, argList)
        return result
      })

    return next === text ? text : this.#processTokens(next, variables)
  }

  #applyTransform(func, args) {
    const result = (() => {
      switch(func) {
        case "lighten":
          return Colour.lightenOrDarken(args[0], parseInt(args[1]))
        case "darken":
          return Colour.lightenOrDarken(args[0], -parseInt(args[1]))
        case "alpha":
          return Colour.addAlpha(args[0], parseInt(args[1]))
        case "invert":
          return Colour.invert(args[0])
        default:
          return `+(${func}, ${args.join(", ")})`
      }
    })()

    return result
  }

  #hasUnresolvedTokens(arr) {
    const tokenCheck = item =>
      typeof item?.value === "string" &&
      (item?.value?.match(this.#sub) || item?.value?.match(this.#func))

    return arr.some(item => tokenCheck(item))
  }
}
