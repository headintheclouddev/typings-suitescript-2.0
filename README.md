# SuiteScript 2.0 Typings

[![Build Status](https://travis-ci.org/headintheclouddev/typings-suitescript-2.0.png?branch=master)](https://travis-ci.org/headintheclouddev/typings-suitescript-2.0)
[![devDependencies Status](https://david-dm.org/headintheclouddev/typings-suitescript-2.0/dev-status.svg)](https://david-dm.org/headintheclouddev/typings-suitescript-2.0?type=dev)
[![Join the chat at https://gitter.im/typings-suitescript-2-0/Lobby](https://badges.gitter.im/typings-suitescript-2-0/Lobby.svg)](https://gitter.im/typings-suitescript-2-0/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Installation Instructions

`npm install --save-dev @hitc/netsuite-types`

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
    "noImplicitUseStrict": true,
    "baseUrl": ".",
    "lib": ["es5", "es2015.promise", "dom"],
    "paths": {
      "N": ["node_modules/@hitc/netsuite-types/N"],
      "N/*": ["node_modules/@hitc/netsuite-types/N/*"]
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

import {EntryPoints} from 'N/types';
```

`N/types` and `EntryPoints` isn't actually in the NetSuite API, but it is something that is included with this library to give you type definitons for your entry point functions. For example:

```typescript
import {EntryPoints} from 'N/types';
export let pageInit: EntryPoints.Client.pageInit = (context: EntryPoints.Client.pageInitContext) => {
  //Your IDE will now autocomplete from the context argument. For instance use this to access context.mode and context.currentRecord in this pageInit example
}
```

Notice that we are exporting the function `pageInit` that will need to be referenced in the NetSuite Client Script record as an entry point. 

Then if you're using a TypeScript-aware text editor you'll get syntax highlighting, error detection, embedded apidocs, type-cheking, and autocomplete for all of the SuiteScript 2.0 modules and types. For instance the free [VSCode](https://code.visualstudio.com/) from Microsoft will work out of the box. 

## User Event Example

Full example for a User Event Script might look something like this:

```typescript
/**
 * @NAPIVersion 2.0
 * @NScriptType UserEventScript
 */

import {EntryPoints} from 'N/types';
import * as log from 'N/log';

export let beforeSubmit: EntryPoints.UserEvent.beforeSubmit = (context: EntryPoints.UserEvent.beforeSubmitContext) => {
    let x = context.newRecord.getValue({fieldId: 'companyname'});
    log.audit('value', `companyname is: ${x}`);
};
```

## Suitelet Example

```typescript
/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

import {EntryPoints} from 'N/types';
import * as record from 'N/record';

export let onRequest: EntryPoints.Suitelet.onRequest = (context: EntryPoints.Suitelet.onRequestContext) => {
    let folder = record.load({type: 'folder', id: 36464});
    let allfields = folder.getFields().join(', ');
    context.response.write(`<br>all fields: ${allfields}`);
};
```

This example exports the function `onRequest` that needs to be referenced in the script record.

## Updates

You can download the latest published typings library at any time by simply running the command:

`npm install --save-dev @hitc/netsuite-types`

