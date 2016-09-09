# SuiteScript 2.0 Typings

## Installation Instructions


    npm install --save-dev github:headintheclouddev/typings-suitescript-2.0/N

 
## Usage
Once installed, you need to configure TypeScript to find the library declarations and `import` the libraries as needed
into your scripts.

### TSC (TypeScript Compiler) Configuration

You can import the modules and use them like normal using standard TypeScript syntax. Just make sure your compiler is configured to use the amd module format and the es5 target. Create a file called `tsconfig.json` in your project root and have these options configured:

```json
{
  "compilerOptions": {
    "module": "amd",
    "target": "es5",
    "moduleResolution":"node",
    "sourceMap": false,
    "newLine": "LF",
    "experimentalDecorators": true,
    "baseUrl": ".",
    "lib":["es5","es2015.promise"],
    "paths": {
      "N/*": [
        "node_modules/@hitc/netsuite-types/N/*"
      ]
    }
  },
  "exclude": ["node_modules"]
}

```
The key components are __baseUrl__ and __paths__.


Then simply import your modules and go.

### Writing SuiteScript

At the top of every script you will want to have the following lines added:

```typescript
/**
 * @NAPIVersion 2.0
 * @NScriptType ClientScript
 */

import {EntryPoints} from 'N/index';
```

EntryPoints isn't actually in the NetSuite API, but it is something that is included with this library to give you type definitons for your entry point functions. For example:

```typescript
import {EntryPoints} from 'N/index';
export var pageInit: EntryPoints.Client.pageInit = (ctx) => {
  //Your IDE will now autocomplete from the ctx argument. For instance use this to access ctx.mode and ctx.currentRecord in this pageInit example
}
```

A full example might look something like this:

```typescript
/**
 * @NAPIVersion 2.0
 * @NScriptType ClientScript
 */

import {EntryPoints} from 'N/index'
import * as search from 'N/search'

export var pageInit: EntryPoints.Client.pageInit = (ctx) => {
    if (ctx.mode != 'edit') return;

    search.create.promise({
        type: 'customer',
        filters: [
            search.createFilter({
                name: 'companyname',
                operator: search.Operator.ISNOTEMPTY,
            }),
        ],
        columns: [
            search.createColumn({
                name: 'companyname',
                sort: search.Sort.ASC,
            }),
        ],
    }).then(search => {
        return search.run().getRange.promise({
            start: 0,
            end: 1,
        });
    }).then(results => {
        if(results.length == 0) return alert("No companies");
        alert(`First company alphabetically: ${results[0].getValue('companyname')}`);
    });
}
```

Then if you're using a TypeScript-aware text editor (for instance the free [VSCode](https://code.visualstudio.com/) from Microsoft) you'll get syntax highlighting, error detection, and autocomplete for all of the SuiteScript 2.0 modules and types.

## Updates

You can download the latest published typings library at any time by simply running the command:

`npm update @hitc/netsuite-typings`