import Color from "color"

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const longHex = /^(?<colour>#[a-f0-9]{6})(?<alpha>[a-f0-9]{2})?$/i
const shortHex = /^(?<colour>#[a-f0-9]{3})(?<alpha>[a-f0-9]{1})?$/i

export default class Colour {
  static lightenOrDarken(hex, amount=0) {
    const extracted = Colour.parseHexColour(hex)
    const colour = Color(extracted.colour)
    const change = clamp(Math.abs(amount/100), 0, 1)

    const modifiedColour = amount >= 0
      ? colour.lighten(change).hex()
      : colour.darken(change).hex()

    const result = `${modifiedColour}${extracted.alpha?.hex??""}`.toLowerCase()

    return result
  }

  static invert(hex) {
    const extracted = Colour.parseHexColour(hex)
    const hsl = Color(extracted.colour).hsl()
    hsl.color[2] = 100 - hsl.color[2]
    const modifiedColour = hsl.hex()

    const result = `${modifiedColour}${extracted.alpha?.hex??""}`.toLowerCase()

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

  static normalizeHex(code) {
    return code.split("").reduce((acc,curr) => acc + curr.repeat(2)).toLowerCase()
  }

  static parseHexColour(hex) {
    const parsed =
      hex.match(longHex)?.groups ||
      hex.match(shortHex)?.groups ||
      null

    if(!parsed)
      throw new Error("Invalid or missing hex value.")

    const result = {}

    result.colour = parsed.colour.length === 3
      ? Colour.normalizeHex(parsed.colour)
      : parsed.colour

    if(parsed.alpha) {
      parsed.alpha = parsed.alpha.length === 1
        ? Colour.normalizeHex(parsed.alpha)
        : parsed.alpha

      result.alpha = {
        hex: parsed.alpha,
        decimal: Colour.hexAlphaToDecimal(parsed.alpha) / 100.0
      }
    }

    return result
  }

  static setAlpha(hex, amount) {
    const work = Colour.parseHexColour(hex)
    const alpha = clamp(amount, 0, 1)
    const result = Color(work.colour).alpha(alpha).hexa().toLowerCase()

    return result
  }

  static addAlpha(hex, amount) {
    const work = Colour.parseHexColour(hex)
    const currentAlpha = (work.alpha?.decimal ?? 1)
    const newAlpha = clamp(currentAlpha * (1 + amount), 0, 1)
    const result = Colour.setAlpha(hex, newAlpha)

    return result
  }

  static solid(hex) {
    return Colour.parseHexColour(hex).colour
  }

  static mix(color1, color2, ratio = 50) {
    const c1 = Colour.parseHexColour(color1)
    const c2 = Colour.parseHexColour(color2)

    // Convert ratio to 0-1 range (50% becomes 0.5)
    const t = clamp(ratio, 0, 100) / 100

    const color1Obj = Color(c1.colour)
    const color2Obj = Color(c2.colour)

    const mixedColor = color1Obj.mix(color2Obj, t).hex()

    // Handle alpha - blend the alphas too if present
    let alpha = ""
    if(c1.alpha || c2.alpha) {
      const alpha1 = c1.alpha?.decimal ?? 100
      const alpha2 = c2.alpha?.decimal ?? 100
      const mixedAlpha = alpha1 * (1 - t) + alpha2 * t
      alpha = Colour.decimalAlphaToHex(mixedAlpha)
    }

    const result = `${mixedColor}${alpha}`.toLowerCase()

    return result
  }

  static toHex(mode, alpha, ...args) {
    const values = args
      .filter(v => v != null)
      .map((v, index) => {
        if(mode === "rgb" || mode === "rgba")
          return clamp(Number(v), 0, 255)

        if(index === 0 && mode.match(/^(hsl|hsv)/))
          return clamp(Number(v), 0, 360)

        return clamp(Number(v), 0, 100)
      })

    if(values.length !== 3)
      throw new Error(`${mode}() requires three number values.`)

    if(alpha != null)
      alpha = clamp(Number(alpha), 0, 1)

    return mode.endsWith("a")
      ? Color[mode.slice(0, -1)](values)
        .alpha(alpha ?? 1)
        .hexa()
        .toLowerCase()
      : Color[mode](values)
        .hex()
        .toLowerCase()
  }
}
