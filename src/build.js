import * as fs from "node:fs/promises"

import {globby} from "globby"
import JSON5 from "json5"

import * as File from "./components/File.js"
import Compile from "./components/Compiler.js"

const {resolveFilename,loadDataFile} = File

// Create the themes directory and write all theme files
try {
  const foundFiles = await globby("themes/*.{json5,yaml,yml}")
  const files = await Promise.all(foundFiles.map(f => resolveFilename(f)))
  const themes = await Promise.all(files.map(file => loadDataFile(file)))
  const compiled = await Promise.all(themes.map(theme => new Compile().compile(theme)))

  await fs.mkdir("./build", { recursive: true })
  await Promise.all(compiled.map(theme =>
    fs.writeFile(
      `./build/${theme.name}.color-theme.json`,
      JSON.stringify(Object.assign({},
        {
          "$schema": "vscode://schemas/color-theme"
        },
        theme
      ), null, 2) + "\n"
    )
  ))
} catch (err) {
  console.error("Error writing theme files:", err)
  process.exit(1)
}
