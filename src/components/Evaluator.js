export default class Evaluator {
  evaluate({vars,theme}) {
    // console.debug(`Theme :: %o`, theme)

    this.#resolveVariables(vars)
    this.#resolveTheme({theme, vars})

    return theme
  }

  #resolveVariables(vars) {
    const assoc = this.#findAssoc(vars)

    this.#substitute(vars, assoc, [])

    // console.debug(`Vars %o`, vars)
  }

  #resolveTheme({theme,vars}) {
    // console.debug(`Vars %o`, vars)

    const assoc = this.#findAssoc(theme)

    // console.debug(`Theme Assoc %o`, assoc)

    this.#substitute(theme, assoc, vars)

    // console.debug(`Theme %o`, theme)
  }

  #substitute(source, assoc, vars) {
    assoc.forEach(([, matches], index) => {
      matches.forEach(match => {
        // console.debug(`Looking for %s`, match)
        const flatPath = match.match(/\(\((.*)\)\)/)

        if(flatPath) {
          const target =
            source.find(element => element.flatPath === flatPath[1]) ||
            vars.find(element => element.flatPath === flatPath[1])

          if(target) {
            // console.debug(`source[index]: %o`, source[index])
            source[index].value = source[index].value.replace(match, target.value)
          }
        }
      })
    })
  }

  #findAssoc(arr) {
    const result = []
    const pattern = /(\(\(.*?\)\))/g

    // console.debug("#findAssoc: %o", arr)

    // Array<Object<{path: Array<string>, key: string, value: string}>>
    arr.forEach(item => {
      const matches = item.value.match(pattern)

      if(matches) {
        result.push([item, matches])
      } else {
        result.push([item,[]])
      }
    })

    return result
  }
}
