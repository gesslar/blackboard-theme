# TODO

## Compilation Schema Validation

Validate with vscode-json-languageservice

## VS Code's Built-in Configuration System

```bash
npm install vscode-json-languageservice
```

Set up a validator:

```js
const { getLanguageService } = require("vscode-json-languageservice");
const fs = require("fs");

const service = getLanguageService({
  schemaRequestService: uri => {
    if (uri.startsWith("vscode://schemas/color-theme")) {
      return fs.promises.readFile("./color-theme.schema.json", "utf8");
    }
    return Promise.reject("Unknown schema");
  },
});

const jsonText = fs.readFileSync("./build/your-theme.color-theme.json", "utf8");

const document = service.parseJSONDocument(service.parseJSONDocument(jsonText));
const diagnostics = await service.doValidation(document, document);

// show diagnostics
console.log(diagnostics);
```

This gives you live, contextual diagnostics exactly like VS Code — missing
properties, deprecated values, wrong types, etc.

VS Code automatically:

- Watches ALL settings files (user, workspace, folder)
- Merges settings in the right priority order
- Emits workspace.onDidChangeConfiguration events when ANY setting changes
- Immediately applies theme changes when color theme files are modified

Your Extension Would Just:

```js
// Listen for your specific setting changes
vscode.workspace.onDidChangeConfiguration(event => {
  if (event.affectsConfiguration('blackboard.accentColor')) {
    // Get the new value
    const newAccent = vscode.workspace.getConfiguration('blackboard').get('accentColor');

    // Recompile your theme with new accent
    const newTheme = compileTheme({ accent: newAccent });

    // Write to your theme file
    fs.writeFileSync(themePath, JSON.stringify(newTheme));

    // VS Code automatically detects the file change and reloads!
  }
});
```

No file watchers needed - VS Code tells you exactly when YOUR settings change,
regardless of which settings file the user modified. Then you just recompile
and write the file, and VS Code's existing theme hot-reload does the rest.
