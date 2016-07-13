# SuiteScript 2.0 Typings

## Installation Instructions

First, make sure you have typings installed with the command:

`npm install -g typings`

You can now install the global definitions and the module definitions with the following commands:

`typings install --global --save github:headintheclouddev/typings-suitescript-2.0/SuiteScript2.0-Globals/dist`

`typings install --save github:headintheclouddev/typings-suitescript-2.0/SuiteScript2.0`

## Usage

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
- typings.json

Then myClientScripts.ts would look something like this:

```typescript
/// <reference path="../typings/index.d.ts" />

import mod_search = require('N/search');

//For entry functions, explicitly specify the param type. They all start with NS2_
export function pageInit(ctx: NS2_Client_PageInitContext) {
    if(ctx.mode != 'edit') return;

    mod_search.create.promise({
        type: 'customer',
        filters: [],
        columns: []
    }).then(search => {
        ...
    });
}
```

Then if you're using a TypeScript-aware text editor (for instance the free [VSCode](https://code.visualstudio.com/) from Microsoft) you'll get syntax highlighting, error detection, and autocomplete for all NetSuite modules and global functions.

## Updates

You can download the latest published typings library at any time by simply running the command:

`typings install`