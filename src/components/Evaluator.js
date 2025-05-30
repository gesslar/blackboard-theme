/**
 * Evaluator class for resolving variables and color tokens in theme objects.
 * Handles recursive substitution of token references in arrays of objects.
 */
export default class Evaluator {
  /**
   * Maximum number of iterations for resolving tokens to prevent infinite loops.
   * @type {number}
   */
  maxIterations = 10

  /**
   * Regex to match token patterns like ((token.path)).
   * @type {RegExp}
   */
  #match = /(\(\(.*?\)\))/g

  /**
   * Regex to extract the token path from a token string.
   * @type {RegExp}
   */
  #extract = /\(\((.*)\)\)/

  /**
   * Evaluates the theme by resolving variables and color tokens.
   * @param {Object} params
   * @param {Array<Object>} params.vars - Array of variable objects to resolve.
   * @param {Array<Object>} params.theme - Array of theme objects to resolve.
   * @returns {Array<Object>} The resolved theme array.
   */
  evaluate({vars,theme}) {
    // console.debug("vars", vars)
    this.#resolveVariables(vars)
    // console.debug("theme", theme)
    this.resolveColors({theme,vars})

    return theme
  }

  /**
   * Recursively resolves variable tokens in the provided array.
   * @param {Array<Object>} vars - Array of variable objects to resolve.
   * @private
   */
  #resolveVariables(vars) {
    let it = 0, unresolved = true

    do {
      const assoc = this.#findAssoc(vars)

      this.#substitute(vars, assoc, [])

      unresolved = this.#hasUnresolvedTokens(vars)
      // console.debug("unresolved variables", this.#unresolvedTokens(vars))

    } while(it++ < this.maxIterations && unresolved)
  }

  /**
   * Recursively resolves color tokens in the theme array using variables.
   * @param {Object} params
   * @param {Array<Object>} params.theme - Array of theme objects to resolve.
   * @param {Array<Object>} params.vars - Array of variable objects for substitution.
   */
  resolveColors({theme,vars}) {
    let it = 0, unresolved

    do {
      const assoc = this.#findAssoc(theme)

      this.#substitute(theme, assoc, vars)

      unresolved = this.#hasUnresolvedTokens(theme)
      // console.debug("unresolved colors", this.#unresolvedTokens(theme))

    } while(it++ < this.maxIterations && unresolved)
  }

  /**
   * Substitutes token references in the source array with their resolved values.
   * @param {Array<Object>} source - Array of objects to perform substitution on.
   * @param {Array<Array>} assoc - Array of [item, matches] pairs from #findAssoc.
   * @param {Array<Object>} vars - Array of variable objects for lookup.
   * @private
   */
  #substitute(source, assoc, vars) {
    assoc.forEach(([, matches], index) => {
      matches.forEach(match => {
        const flatPath = match.match(this.#extract)
        // console.debug("Trying to find", flatPath, "in", [source,vars])

        if(flatPath) {
          const target =
            source.find(element => element.flatPath === flatPath[1]) ||
            vars.find(element => element.flatPath === flatPath[1])

          if(target) {
            source[index].value = source[index].value.replace(match, target.value)
          } else {
            throw new Error(`Could not find resolution for '${flatPath[1]}'`)
          }
        }
      })
    })
  }

  /**
   * Returns an array of unresolved token objects from the input array.
   * @param {Array<Object>} arr - Array to search for unresolved tokens.
   * @returns {Array<Object>} Array of unresolved token objects.
   * @private
   */
  #unresolvedTokens(arr) {
    const unresolved = arr.filter(item => {
      return typeof item?.value === "string" &&
             item?.value?.match(this.#match)
    })

    return unresolved
  }

  /**
   * Checks if there are any unresolved tokens in the array.
   * @param {Array<Object>} arr - Array to check for unresolved tokens.
   * @returns {boolean} True if unresolved tokens exist, false otherwise.
   * @private
   */
  #hasUnresolvedTokens(arr) {
    return this.#unresolvedTokens(arr) > 0
  }

  /**
   * Finds all items in the array with token references and their matches.
   * @param {Array<Object>} arr - Array to search for token references.
   * @returns {Array<Array>} Array of [item, matches] pairs.
   * @private
   */
  #findAssoc(arr) {
    const result = []

    // console.debug("arr", arr)

    // Array<Object<{path: Array<string>, key: string, value: string}>>
    arr.forEach(item => {
      if(typeof item.value !== "string") {
        result.push([item,[]])
      } else {
        const matches = item?.value?.match(this.#match)

        if(matches) {
          result.push([item, matches])
        } else {
          result.push([item,[]])
        }
      }
    })

    return result
  }
}
