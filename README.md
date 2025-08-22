# Blackboard - A Theme for People Who Code in the Dark

![blackboard preview](https://raw.githubusercontent.com/gesslar/blackboard-theme/main/media/blackboard.png)

**Blackboard** is a dark, muted VS Code theme inspired by chalk on slate - crisp electric highlights on a grounded matte foundation. Designed for clarity, comfort, and elegance during long hours of code immersion.

Built with the theme compiler engine [@gesslar/aunty](https://www.npmjs.com/package/@gesslar/aunty).

## Philosophy

Not just another dark theme. Blackboard is built on principles of:

- **Visual hierarchy** - Emphasis where it matters, calm where it doesn’t.
- **Tactile restraint** - Minimalist, not minimalist™.
- **Contextual cues** - Colour is used intentionally: structure, status, focus.

No retina burn. No clown parade. Just code, elegantly lit.

## Aesthetic Features

- Classic "chalkboard" vibe - dark matte backgrounds, soft edges.
- Electric blue accents for focused highlights, selections, and guides.
- Built for long sessions - understated, legible, low fatigue.
- Covers full UI: widgets, panels, terminals, SCM, testing, debugging.
- Subtle contrast shifts and alpha-layered depth - not just flat colours.

## Technical Features

- Has colours
- Colours are different from other colours
- Text is visible against background
- Supports the concept of hue
- Works with human eyeballs

## Included Themes

This extension currently ships with:

- Blackboard – original dark slate base
- Bubblegum Goth – playful high-contrast alt
- Corporate – restrained neutral palette
- ~~Whiteboard – light variant~~

### Notice

Due to DEI requirements being lifted by the incontrovertible decree of Lord
Scurvy, we no longer suffer the obligation of being inclusive and have
consequently deported Whiteboard back to Whiteland where it belongs.

You're welcome.

## Installation

1. Launch the Command Palette (`Ctrl+P`), run:
   `ext install blackboard-theme`
2. Or search **Blackboard Theme** in the Extensions sidebar.
3. Activate via the Colour Theme picker (`Ctrl+K Ctrl+T`).

## Preview

### Blackboard

This, but with blue highlights and seams with black background. Which will
look like black to you now if you're viewing this on a black background.
Otherwise, just look at it for 5 seconds and then close your eyes quick and
then look at it against the inside of your eyelids.

#### Caveat

That might not actually work

```text
┌────────────────────────────────────────────────────────────────────────┐
│ ○ ○ ○                        VS Code                                   │
├────────────────────────────────────────────────────────────────────────┤
│ File  Edit  Selection  View  Go  Run  Terminal  Help                   │
├──┬─────────────────────────────────────────────────────────────────────┤
│🗂️│  📄 theme.yaml   🔍 Search   🐛 Debug    🧩 Extensions  ⚙️ Settings │
│  │                                                                     │
│📁│  ┌─ src/                                                            │
│📄│  ├─ 📄 blackboard.yaml     ───────────────────────────────────────┐ │
│📄│  ├─ 📄 bubblegum-goth.yaml │ config:                              │ │
│📄│  └─ 📄 corporate.yaml      │   name: "Blackboard Theme"           │ │
│  │  ┌─ examples/              │   type: dark                         │ │
│📄│  └─ 📄 minimal.yaml        │                                      │ │
│📦│  ┌─ node_modules/          │ vars:                                │ │
│  │  └─ package.json           │   colors:                            │ │
│  │                            │     blue: "#2d5a87"                  │ │
│  │                            │     white: "#e6e6e6"                 │ │
│  │                            │                                      │ │
│  │                            │   std:                               │ │
│  │                            │     fg: $(colors.white)              │ │
│  │                            │     bg: "#1a1a1a"                    │ │
│  │                            │     accent: fade($(colors.blue), 80) │ │
│  │                            │                                      │ │
│  │                            │ theme:                               │ │
│  │                            │   colors:                            │ │
│  │                            │     editor.background: $(std.bg)     │ │
│  │                            │     editor.foreground: $(std.fg)     │ │
│  │                            └──────────────────────────────────────┘ │
├──┴─────────────────────────────────────────────────────────────────────┤
│ ⚡ Watching themes...  🔄 Compiled in 127ms  ✅ 4 themes built         │
│ > npx @gesslar/aunty --watch ./src/*.yaml -o ./dist                    │
│ [     5.2ms] blackboard loaded [775 bytes]                             │
│ [   127.4ms] blackboard compiled                                       │
│ [    84.3ms] blackboard.color-theme.json <written> [120,233 bytes]     │
│                                                                        │
│ F5=recompile, q=quit                                                   │
└────────────────────────────────────────────────────────────────────────┘
```

### Corporate

Almost identical to Blackboard, but has teal/cyan-y highlights. It's also on
an imaginary but also actually real black background.

```text
┌────────────────────────────────────────────────────────────────────────┐
│ ○ ○ ○                        VS Code                                   │
├────────────────────────────────────────────────────────────────────────┤
│ File  Edit  Selection  View  Go  Run  Terminal  Help                   │
├──┬─────────────────────────────────────────────────────────────────────┤
│🗂️│  📄 theme.yaml   🔍 Search   🐛 Debug    🧩 Extensions  ⚙️ Settings │
│  │                                                                     │
│📁│  ┌─ src/                                                            │
│📄│  ├─ 📄 blackboard.yaml     ───────────────────────────────────────┐ │
│📄│  ├─ 📄 bubblegum-goth.yaml │ config:                              │ │
│📄│  └─ 📄 corporate.yaml      │   name: "Blackboard Theme"           │ │
│  │  ┌─ examples/              │   type: dark                         │ │
│📄│  └─ 📄 minimal.yaml        │                                      │ │
│📦│  ┌─ node_modules/          │ vars:                                │ │
│  │  └─ package.json           │   colors:                            │ │
│  │                            │     blue: "#2d5a87"                  │ │
│  │                            │     white: "#e6e6e6"                 │ │
│  │                            │                                      │ │
│  │                            │   std:                               │ │
│  │                            │     fg: $(colors.white)              │ │
│  │                            │     bg: "#1a1a1a"                    │ │
│  │                            │     accent: fade($(colors.blue), 80) │ │
│  │                            │                                      │ │
│  │                            │ theme:                               │ │
│  │                            │   colors:                            │ │
│  │                            │     editor.background: $(std.bg)     │ │
│  │                            │     editor.foreground: $(std.fg)     │ │
│  │                            └──────────────────────────────────────┘ │
├──┴─────────────────────────────────────────────────────────────────────┤
│ ⚡ Watching themes...  🔄 Compiled in 127ms  ✅ 4 themes built         │
│ > npx @gesslar/aunty --watch ./src/*.yaml -o ./dist                    │
│ [     5.2ms] blackboard loaded [775 bytes]                             │
│ [   127.4ms] blackboard compiled                                       │
│ [    84.3ms] blackboard.color-theme.json <written> [120,233 bytes]     │
│                                                                        │
│ F5=recompile, q=quit                                                   │
└────────────────────────────────────────────────────────────────────────┘
```

### Bubblegum Goth

Also nearly identical to Blackboard (because all three themes use the same
base, duh; there's a theme... hehehehehehehe) but with a vibrant pink. This
pink, in fact `hsv(320,40,100)`. It also secretly got a tattoo of a walrus
eating a banana beneath a parasol. Don't tell mom.

```text
┌────────────────────────────────────────────────────────────────────────┐
│ ○ ○ ○                        VS Code                                   │
├────────────────────────────────────────────────────────────────────────┤
│ File  Edit  Selection  View  Go  Run  Terminal  Help                   │
├──┬─────────────────────────────────────────────────────────────────────┤
│🗂️│  📄 theme.yaml   🔍 Search   🐛 Debug    🧩 Extensions  ⚙️ Settings │
│  │                                                                     │
│📁│  ┌─ src/                                                            │
│📄│  ├─ 📄 blackboard.yaml     ───────────────────────────────────────┐ │
│📄│  ├─ 📄 bubblegum-goth.yaml │ config:                              │ │
│📄│  └─ 📄 corporate.yaml      │   name: "Blackboard Theme"           │ │
│  │  ┌─ examples/              │   type: dark                         │ │
│📄│  └─ 📄 minimal.yaml        │                                      │ │
│📦│  ┌─ node_modules/          │ vars:                                │ │
│  │  └─ package.json           │   colors:                            │ │
│  │                            │     blue: "#2d5a87"                  │ │
│  │                            │     white: "#e6e6e6"                 │ │
│  │                            │                                      │ │
│  │                            │   std:                               │ │
│  │                            │     fg: $(colors.white)              │ │
│  │                            │     bg: "#1a1a1a"                    │ │
│  │                            │     accent: fade($(colors.blue), 80) │ │
│  │                            │                                      │ │
│  │                            │ theme:                               │ │
│  │                            │   colors:                            │ │
│  │                            │     editor.background: $(std.bg)     │ │
│  │                            │     editor.foreground: $(std.fg)     │ │
│  │                            └──────────────────────────────────────┘ │
├──┴─────────────────────────────────────────────────────────────────────┤
│ ⚡ Watching themes...  🔄 Compiled in 127ms  ✅ 4 themes built         │
│ > npx @gesslar/aunty --watch ./src/*.yaml -o ./dist                    │
│ [     5.2ms] blackboard loaded [775 bytes]                             │
│ [   127.4ms] blackboard compiled                                       │
│ [    84.3ms] blackboard.color-theme.json <written> [120,233 bytes]     │
│                                                                        │
│ F5=recompile, q=quit                                                   │
└────────────────────────────────────────────────────────────────────────┘
```

## License

The license for the VS Code interface (anything contained within the `colors`
object) is licensed under the [Unlicense](https://unlicense.org) - Because the
idea of copyrighting the arrangement of colours is absurd. If you think
otherwise, gg `¯\_(ツ)_/¯`.

The license for the syntax highlighting (anything contained with the
`tokenColors` object) is subject to the [GPL3 license](https://www.gnu.org/licenses/gpl-3.0.en.html).

## Caveat 2

For topical use only; consult Lauren Boebert if your eyerection endures longer
than four (4) hours.
