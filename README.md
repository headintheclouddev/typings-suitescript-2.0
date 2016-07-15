# SuiteScript 2.0 Typings

## Installation Instructions

First, make sure you have typings installed with the command:

`npm install -g typings`

You can now install the global definition for Promises and the SuiteScript module definitions with the following commands:

```shell
typings install --global --save dt~es6-promise
typings install --save github:headintheclouddev/typings-suitescript-2.0/N
```

## Usage

### Include the libraries

Now that you have the typings libraries installed, reference them by adding the following line towards the top of your .ts files:

```typescript
/// <reference path="typings/index.d.ts" />
```

The path attribute is a relative path, so make sure you specify an accurate path based on that. For instance say your project looks like this:

- ssv2/
  - myClientScripts.ts
- typings/
  - index.d.ts
  - global/
  - module/
- tsconfig.json
- typings.json

Then myClientScripts.ts should have this line in it:

```typescript
/// <reference path="../typings/index.d.ts" />
```

### TSC (TypeScript Compiler) Configuration

You can import the modules and use them like normal using standard TypeScript syntax. Just make sure your compiler is configured to use the amd module format and the es5 target. Create a file called `tsconfig.json` in your project root and have these options configured:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "amd"
  }
}
```

Then simply import your modules and go.

### Writing SuiteScript

At the top of every script you will want to have the following lines added:

```typescript
/**
 * @NAPIVersion 2.0
 * @NScriptType ClientScript
 */

import {log, util, EntryPoints} from 'N';
```

EntryPoints isn't actually in the NetSuite API, but it is something that is included with this library to give you type definitons for your entry point functions. For example:

```typescript
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

/// <reference path="../typings/index.d.ts" />

import {log, util, EntryPoints} from './N/index';
import N_search = require('./N/search');

export var pageInit: EntryPoints.Client.pageInit = (ctx) => {
    if (ctx.mode != 'edit') return;

    N_search.create.promise({
        type: 'customer',
        filters: [
            N_search.createFilter({
                name: 'companyname',
                operator: N_search.Operator.ISNOTEMPTY,
            }),
        ],
        columns: [
            N_search.createColumn({
                name: 'companyname',
                sort: N_search.Sort.ASC,
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

`typings install`