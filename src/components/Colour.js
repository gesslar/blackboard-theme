import Color from "color"

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const longHex = /^(?<colour>#[a-f0-9]{6})(?<alpha>[a-f0-9]{2})?$/i
const shortHex = /^(?<colour>#[a-f0-9]{3})(?<alpha>[a-f0-9]{1})?$/i

export default class Colour {
  static parseColour(colour) {
    return  colour.match(longHex)?.groups ||
            colour.match(shortHex)?.groups ||
            null
  }

  static lightenOrDarken(hex, amount=0) {
    const extracted = Colour.parseHexColour(hex)

    if(!extracted)
      throw new Error("Invalid or missing hex value.")

    const colour = Color(extracted.colour)
    const change = Math.abs(clamp(amount/100, 0, 1))

    const modifiedColour = amount >= 0
      ? colour.lighten(change).hex()
      : colour.darken(change).hex()

    const result = `${modifiedColour}${extracted.alpha??""}`.toLowerCase()

    return result
  }

  static invert(hex) {
    const extracted = Colour.parseColour(hex)

    if(!extracted)
      throw new Error("Invalid or missing hex value.")

    const hsl = Color(extracted.colour).hsl()
    hsl.color[2] = 100 - hsl.color[2]
    const modifiedColour = hsl.hex()

    const result = `${modifiedColour}${extracted.alpha??""}`.toLowerCase()

    return result
  }

  static hexAlphaToDecimal(hex) {
    // Parse the hex value to a decimal number
    const decimalValue = parseInt(hex, 16)

    // Convert to a percentage out of 100
    const percentage = (decimalValue / 255) * 100

    // Return the result rounded to two decimal places
    return Math.round(percentage * 100) / 100
  }

  static decimalAlphaToHex(dec) {
    // Ensure the input is between 0 and 100
    const percentage = clamp(dec, 0, 100)

    // Convert percentage to decimal (0-255)
    const decimalValue = Math.round((percentage * 255) / 100)

    // Convert to hex and ensure it's two digits
    return decimalValue.toString(16).padStart(2, "0")
  }

  static parseHexColour(hex) {
    const extracted = Colour.parseColour(hex)

    if(!extracted)
      throw new Error("Invalid or missing hex value.")

    if(extracted.colour.length === 3) {
      const reducer = (acc, curr) => acc + curr.repeat(2)
      extracted.colour = extracted.colour.split("").reduce(reducer, "")
      if(extracted.alpha) {
        const alpha = extracted.alpha.split("").reduce(reducer, "")
        extracted.alpha = {
          hex: alpha,
          decimal: Colour.hexAlphaToDecimal(alpha)
        }
      }

    }

    return extracted
  }

  static setAlpha(hex, amount) {
    const work = Colour.parseHexColour(hex)
    const alpha = clamp(amount/100.0, 0, 1)
    const result = Color(work.colour).alpha(alpha).hexa().toLowerCase()

    return result
  }

  static addAlpha(hex, amount) {
    const work = Colour.parseHexColour(hex)
    const newAlpha = clamp(amount + ((work.alpha?.decimal ?? 0.0)*100), 0, 100)
    const result = Colour.setAlpha(hex, newAlpha)

    return result
  }

  static solid(hex) {
    return Colour.parseHexColour(hex).colour
  }
}
