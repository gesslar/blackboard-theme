import {globby} from "globby"

import * as fd from "./components/File.js"
import Compiler from "./components/Compiler.js"

try {
  // Create the themes directory and write all theme files
  const foundFiles = await globby("themes/src/*.{json5,yaml,yml}")
  const files = await Promise.all(foundFiles.map(f => fd.resolveFilename(f)))
  const sources = await Promise.all(files.map(file => fd.loadDataFile(file)))

  const c = new Compiler()
  const compiled = await Promise.all(sources.map(source => c.compile(source)))

  // Now write them out!
  const distDirectory = "./dist"
  const directory = await fd.assureDirectory(distDirectory, {recursive: true})
  await Promise.all(compiled.map(theme => {
    const fileName = `${theme.name}.color-theme.json`
    const file = fd.composeFilename(directory, fileName)
    const output = `${JSON.stringify(theme,null,2)}\n`
    fd.writeFile(file, output)
  }))
} catch (err) {
  console.error("Error writing theme files:", err)
  process.exit(1)
}
