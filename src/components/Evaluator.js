import console from "node:console"
import Colour from "./Colour.js"
/**
 * Evaluator class for resolving variables and color tokens in theme objects.
 * Handles recursive substitution of token references in arrays of objects.
 */
export default class Evaluator {
  /**
   * Maximum number of iterations for resolving tokens to prevent infinite
   * loops.
   *
   * @type {number}
   */
  maxIterations = 10

  /**
   * Regex to extract token patterns like ((token.path)).
   *
   * @type {RegExp}
   */
  #token = new RegExp(
    "(\\(\\("+
        "("+
          "(?<transform>~)"+                              // inverse
          "|"+
          "(?<transform>[+-])(?<token>[\\w\\.]+)"+        // lighten/darken+value
          "|"+
          "(?<transform>[\\^])(?<token>[+-]?[\\w\\.]+)"+  // increase transparency
          "|"+
          "(?<token>[\\w\\.]+)"+                          // ordinary token
        ")"+
      "\\)\\))",
    "g")

  /**
   * Evaluates the theme by resolving variables and color tokens.
   *
   * @param {object} params - The source object to evaluate.
   * @param {Array<object>} params.vars - Array of variable objects to resolve.
   * @param {Array<object>} params.theme - Array of theme objects to resolve.
   * @returns {Array<object>} The resolved theme array.
   */
  evaluate({vars: against,theme: evaluating}) {
    this.#resolveVariables(against)
    this.#applyTransformations(against)

    // console.debug("vars", JSON.stringify(vars, null, 2))

    console.debug("theme", JSON.stringify(evaluating))
    this.#resolveColors({theme: evaluating,vars: against})
    this.#applyTransformations(evaluating)

    // console.debug("vars", vars, "theme", theme)

    return evaluating
  }

  /**
   * Recursively resolves variable tokens in the provided array.
   *
   * @param {Array<object>} vars - Array of variable objects to resolve.
   * @private
   */
  #resolveVariables(vars) {
    let it = 0

    do this.#substitute(vars, this.#findAssoc(vars), [])
    while(it++ < this.maxIterations && this.#hasUnresolvedTokens(vars))

    if(it === this.maxIterations)
      console.warn("Too deep recursion looking for", JSON.stringify(this.#unresolvedTokens(vars)))

  }

  /**
   * Recursively resolves color tokens in the theme array using variables.
   *
   * @param {object} params - The parameters object to resolve.
   * @param {Array<object>} params.theme - Array of theme objects to resolve.
   * @param {Array<object>} params.vars - Array of variable objects for substitution.
   * @private
   */
  #resolveColors({theme,vars}) {
    let it = 0

    do this.#substitute(theme, this.#findAssoc(theme), vars)
    while(it++ < this.maxIterations && this.#hasUnresolvedTokens(theme))

    if(it === this.maxIterations)
      console.warn("Too deep recursion looking for", JSON.stringify(this.#unresolvedTokens(theme)))
  }

  /**
   * Substitutes token references in the source array with their resolved
   * values.
   *
   * @param {Array<object>} source - Array of objects to perform substitution on.
   * @param {Array<Array>} assoc - Array of [item, matches] pairs from #findAssoc.
   * @param {Array<object>} vars - Array of variable objects for lookup.
   * @private
   */
  #substitute(source, assoc, vars) {
    assoc.forEach(([_, matches], index) => {
      matches.forEach(match => {
        const {fullMatch,token,transform} = match
        if(token && !transform) {
          const target =
            source.find(element => element.flatPath === token) ||
            vars.find(element => element.flatPath === token)

          if(target) {
            source[index].value =
              source[index].value.replace(fullMatch, target.value)
          } else {
            throw new Error(`Unable to find resolution for '${token}'`)
          }
        }
      })
    })
  }

  /**
   * Returns an array of unresolved token objects from the input array.
   *
   * @param {Array<object>} arr - Array to search for unresolved tokens.
   * @returns {Array<object>} Array of unresolved token objects.
   * @private
   */
  #unresolvedTokens(arr) {
    const unresolved = arr.filter(item => {
      return typeof item?.value === "string" &&
             item?.value?.match(this.#token)
    })

    return unresolved
  }

  /**
   * Checks if there are any unresolved tokens in the array.
   *
   * @param {Array<object>} arr - Array to check for unresolved tokens.
   * @returns {boolean} True if unresolved tokens exist, false otherwise.
   * @private
   */
  #hasUnresolvedTokens(arr) {
    return this.#unresolvedTokens(arr).length > 0
  }

  /**
   * Finds all items in the array with token references and their matches.
   *
   * @param {Array<object>} arr - Array to search for token references.
   * @returns {Array<Array>} Array of [item, matches] pairs.
   * @private
   */
  #findAssoc(arr) {
    const result = []

    // Array<Object<{path: Array<string>, key: string, value: string}>>
    arr.forEach(item => {
      if(typeof item.value === "string") {
        const matches = this.#extractMatches(item.value)
        // console.debug("matches", matches)
        if(matches) {
          result.push([item, matches])
        } else {
          result.push([item,[]])
        }
      } else {
        result.push([item,[]])
      }
    })

    return result
  }

  #extractMatches(value) {
    const matches = [...value.matchAll(this.#token)]

    return matches.map(match => ({
      transform: match.groups?.transform || "",
      token: match.groups?.token || "",
      fullMatch: match[0],
      innerContent: match[1]
    }))
  }

  #collectTransformations(...arrs) {
    arrs.forEach(arr => {
      const assoc = this.#findAssoc(arr)

      // console.debug("arr", arr)
      assoc.forEach(([curr, matches]) => {
        matches.forEach(match => {
          if(match.transform) {
            if(!curr.transform) {
              curr.transform = [match]
            } else {
              curr.transform.push(match)
            }
          }
        })
      })
    })
  }

  #applyTransformations(...assocs) {
    this.#collectTransformations(...assocs)

    assocs.forEach(assoc => {
      // console.debug(Array.isArray(assoc))
      // console.debug("assoc", assoc)
      // console.debug(assoc.length)

      assoc.forEach((currAssoc, index, arr) => {
        // console.debug("currAssoc", JSON.stringify(currAssoc))
        // console.debug("transform", JSON.stringify(currAssoc.transform))
        // console.debug(Array.isArray(currAssoc.transform))

        if(!currAssoc.transform)
          return

        // Remove all traces from the value, first before we perform
        // the transform.
        arr[index].value = currAssoc.transform.reduce(
          (_, {fullMatch,transform}) => {
            if(!(typeof currAssoc.value === "string" && transform))
              return currAssoc.value

            // console.debug("Working on", JSON.stringify(currAssoc))

            return currAssoc.value = currAssoc.value.replace(fullMatch, "").trim()
          },
          "")

        // Perform the transform! YIPPEE KI YAY MFER!
        arr[index].value = currAssoc.transform.reduce(
          (_, {token,transform}) => {
            if(!(typeof currAssoc.value === "string" && transform))
              return currAssoc.value

            // console.debug("current transform", JSON.stringify(currAssoc.value))
            switch(transform) {
              case "+": case "-": {
                currAssoc.value = Colour.lightenOrDarken(
                  currAssoc.value,
                  parseInt(`${transform}${token}`)
                )
                break
              }

              case "^": {
                currAssoc.value = Colour.addAlpha(
                  currAssoc.value,
                  parseInt(token)
                )
                break
              }

              case "~": {
                currAssoc.value = Colour.invert(currAssoc.value)
                break
              }
            }

            return currAssoc.value
          },
          "")
      })
      // console.debug("done transform", assoc)
    })
  }
}
// transform {
//   transform: '+',
//   token: '25',
//   fullMatch: '((+25))',
//   innerContent: '((+25))'
// }
