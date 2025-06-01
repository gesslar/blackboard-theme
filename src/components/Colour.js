import Color from "color"

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

export default class Colour {
  static lightenOrDarken(hex, amount) {
    const extracted = /#(?<color>.*)/.exec(hex)
    const alpha = extracted && extracted.groups.color?.length === 8

    if(amount > 0)
      return alpha
        ? Color(hex).lighten(clamp(amount/100, 0, 100)).hexa().toLowerCase()
        : Color(hex).lighten(clamp(amount/100, 0, 100)).hex().toLowerCase()
    else if(amount < 0)
      return alpha
        ? Color(hex).darken(clamp(-amount/100, 0, 100)).hexa().toLowerCase()
        : Color(hex).darken(clamp(-amount/100, 0, 100)).hex().toLowerCase()

    return hex
  }

  static invert(hex) {
    const hsl = Color(hex).hsl()

    hsl.color[2] = 100 - hsl.color[2] // flip the lightness

    return Color(hsl).hexa().toLowerCase()
  }

  static addAlpha(hex, amount) {
    return Color(hex).alpha(clamp(amount/100, 0, 100)).hexa().toLowerCase()
  }
}
