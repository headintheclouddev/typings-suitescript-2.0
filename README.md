# SuiteScript 2.0 Typings

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

EntryPoints isn't actually in the NetSuite API, but it is something that is included with this library to give you type definitons for your entry point functions. For example:

```typescript
import {EntryPoints} from 'N/types';
export var pageInit: EntryPoints.Client.pageInit = (ctx) => {
  //Your IDE will now autocomplete from the ctx argument. For instance use this to access ctx.mode and ctx.currentRecord in this pageInit example
}
```

A full example might look something like this:

```typescript
/**
 * @NAPIVersion 2.0
 * @NScriptType UserEventScript
 */

import {EntryPoints} from 'N/types'
import * as log from 'N/log'

export function beforeSubmit(ctx: EntryPoints.UserEvent.beforeSubmitContext) {

    let x = ctx.newRecord.getValue({fieldId: 'companyname'})

    log.audit('value', `companyname is: ${x}`)

}
```

Then if you're using a TypeScript-aware text editor (for instance the free [VSCode](https://code.visualstudio.com/) from Microsoft) you'll get syntax highlighting, error detection, and autocomplete for all of the SuiteScript 2.0 modules and types.

### Map/Reduce Example

Map/Reduce examples can be somewhat more complex. A potential skeleton structure could be something like the following:

```typescript
/**
 * @NAPIVersion 2.x
 * @NScriptType MapReduceScript
 */

import * as log from 'N/log';

import { EntryPoints } from 'N/types'

import MapContext = EntryPoints.MapReduce.mapContext;
import ReduceContext = EntryPoints.MapReduce.reduceContext;
import SummarizeContext = EntryPoints.MapReduce.summarizeContext;

class GetInputData {

  run(): object {
    return [];
  }
}

class Map {

  value: any;

  constructor(private context: MapContext) {
    this.value = JSON.parse(context.value);
    log.debug('MAP VALUE', this.value);
  }

  run() {
    this.context.write('true', 'true');
  }
}

class Reduce {

  values: any[];

  constructor(private context: ReduceContext) {
    this.values = context.values;
    log.debug('REDUCE VALUES', this.values);
  }

  run() {
    this.context.write('true', 'true');
  }

}

class Summarize {

  constructor(private summary: SummarizeContext) { }

  run() {
    let contents = '';
    const type = this.summary.toString();
    log.debug(type + ' Usage Consumed', this.summary.usage);
    log.debug(type + ' Number of Queues', this.summary.concurrency);
    log.debug(type + ' Number of Yields', this.summary.yields);
    this.summary.output.iterator().each(function (key, value) {
      contents += (key + ' ' + value + '\n');
      return true;
    });
    log.debug('Contents', contents);
  }

}

/***********************************************************************************/
/* This shouldn't need to be modified below here unless you want to remove a stage */
/***********************************************************************************/

export const getInputData: EntryPoints.MapReduce.getInputData = () => {
  const getInput = new GetInputData();
  return getInput.run();
};

export const map: EntryPoints.MapReduce.map = (context: MapContext) => {
  const map = new Map(context);
  return map.run();
};

export const reduce: EntryPoints.MapReduce.reduce = (context: ReduceContext) => {
  const reduce = new Reduce(context);
  return reduce.run();
};

export const summarize: EntryPoints.MapReduce.summarize = (summary: SummarizeContext) => {
  const summarize = new Summarize(summary);
  return summarize.run();
};
```

## Updates

You can download the latest published typings library at any time by simply running the command:

`npm install --save-dev @hitc/netsuite-types`
