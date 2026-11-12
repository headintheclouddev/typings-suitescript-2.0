# Changelog

## 2026.2.8

### Breaking changes (strict mode)

**Record value and text getters can return `undefined`** (#460, @sjbartley)

`getValue()`, `getText()`, `getSublistValue()`, `getSublistText()`, `getCurrentSublistValue()` and `getCurrentSublistText()` now include `undefined` in their return types. NetSuite returns `undefined` when the record doesn't have the field. This happens for a field the form doesn't include, a custom field that isn't applied to every record type, or a field like `createdfrom` that only exists in some states.

Casts and conversions still compile, such as `rec.getValue('amount') as number` or `Number(rec.getValue('total'))`. Passing a result straight into another API now needs a check:

```typescript
// Before: compiled, but could pass undefined at runtime
rec.setValue({ fieldId: 'memo', value: other.getValue('memo') });

// After: decide what a missing field should mean
rec.setValue({ fieldId: 'memo', value: other.getValue('memo') ?? null });

const createdFrom = rec.getValue('createdfrom');
if (createdFrom !== undefined) {
  record.load({ type: record.Type.SALES_ORDER, id: createdFrom as number });
}
```

### New

- **N/task:** task objects have a read-only `id`, status objects have a read-only `taskId`, and `QueryTask` and `DocumentCaptureTask` have read-only `inboundDependencies` (#401, @nemchik).
- **N/search:** `Result.getValue()` and `Result.getText()` accept an options object, such as `getValue({ name: 'amount', join: 'customer' })` (#463, @nemchik).
- **N/email:** `recipients`, `cc` and `bcc` accept arrays that mix internal IDs and email addresses (#462, @nemchik).
- **N/query:** `query.create()` accepts plain column and condition objects, including formula columns and conditions, not just ones made with `createColumn()` and `createCondition()` (#464, @nemchik).
- **N/commerce/recordView:** `viewItems()` and `viewWebsite()` now take their options and have return types based on runtime testing (#385, @nemchik). `viewItems()` returns an object keyed by item ID, and `viewWebsite()` returns a single object of field values. `viewItems()` requires `fields` as an array, because a single string throws `SSS_INVALID_TYPE_ARG`.

### Fixes

- **N/query:** `query.Type.O_AUTH2_CLIENT_CREDENTIALS` now has its runtime value, `'oauth2clientcredentials'` (#465, @sjbartley).

### Documentation

- `@throws`, `@governance` and `@since` tags for N/dataset, N/query and N/runtime (#415, #437, #442, @nemchik).

---

## 2026.2.7

### New

- **Event Subscriber script type:** `EntryPoints.EventSubscriber.handle` and `handleContext`, for the new SuiteScript 2.1 script type in the October 2026 release. The context provides `context.recordType` and `payload.recordId`.
- **N/llm:** `llm.reRank()`, `llm.reRank.promise()`, the `ReRankResponse` and `DocumentRank` objects, and the `ReRankModelFamily` enum.
- **N/runtime:** `isNextActive()`, `Script.apiVersion`, and the `OCRPLUGIN` and `RECORDACTION` context types (#400, @nemchik).
- **N/runtime:** 13 more feature IDs for `isFeatureInEffect()`, including `MULTIBOOK` and `FULLMULTIBOOK` (#461, @xjannavratil). The `feature` option also accepts any string now, because Oracle's feature list is incomplete. Editors still suggest the known IDs.
- **N/query:** 146 missing `query.Type` values (#395), plus `listTables()`, the `metaDataProvider` option for SuiteQL, and the `caseSensitive` and `label` options (#396, @nemchik).
- **N/search:** 30 missing `search.Type` values (#397, @nemchik).
- **N/workbook:** missing create functions, enum values and members (#398, @nemchik).
- **N/dataset:** `createTranslation()`, `describe()`, `listPaged()`, `load.promise()` and `Condition.caseSensitive` (#399, @nemchik).
- **N/task:** `fileId` on search, query and SuiteQL tasks accepts a string ID, such as a loaded file's `id`.

### Fixes

- **N/task:** `TaskType.SUITE_QL` has its runtime value, `'SUITEQL'`. The `DedupeEntityType`, `DedupeMode` and `MasterSelectionMode` enums now have string values, so Oracle's examples compile, such as assigning `task.DedupeEntityType.CUSTOMER` to a dedupe task (#391, @sjbartley). Code that compared these dedupe enums to numbers will need updating.

### Deprecations

- `@deprecated` tags for members Oracle no longer supports or documents (#402, @nemchik). These include N/sso, the `external` option on `https.requestSuitelet()`, and the old N/workbook sort and measure functions.

### Documentation

- `@throws`, `@governance` and `@since` tags across about 50 modules (#403 to #459, @nemchik).

---

## 2026.2.6

### Breaking changes (strict mode)

**Sublist, field and column getters can return `null`** (#393, @sjbartley)

`getSublist()`, `getSublistField()`, `getCurrentSublistField()` and `Sublist.getColumn()` now return `null` when the item doesn't exist, such as a custom column missing from one form. `getField()` already did. Add a check before using the result:

```typescript
const field = rec.getSublistField({ sublistId: 'item', fieldId: 'custcol_example', line: 0 });
if (field) field.isDisabled = true;
```

**Loaded and copied files have a string ID** (#394, @sjbartley)

`file.load()` and `file.copy()` return a `FileCabinetFile`, whose `id` is a string, such as `'16027508'`. That's what NetSuite returns at runtime. A file from `file.create()` has a `null` `id` and `url`, even after `save()`, which returns the new ID without updating the object. `description` can also be `null`, and `fileType` can be a type that `file.Type` doesn't list.

Code that treats a loaded file's `id` as a number needs updating. That includes `loaded.id == 123`. Note that `file.copy()` itself rejects a string ID, so convert it with `Number(loaded.id)`.

**Other signature changes**

- **N/redirect:** the `toSearchResult()` option is `search`, not `Search`, as Oracle documents (#383, @nemchik).
- **N/record:** `getMatrixSublistField()` requires `column`, as Oracle documents (#390, @sjbartley).

### New

- **N/render:** the `inCustLocale` option for `bom()`, `packingSlip()` and `pickingTicket()` (#382, @nemchik).
- **N/record and N/search:** record setters and `search.createFilter()` accept readonly arrays (#392, @sjbartley).

### Fixes

- **N/query:** `query.delete()` can now be called. It takes a string script ID and returns void (#388, @nemchik).
- **N/action:** `executeBulk()`'s `params` is an array. `params`, `condition` and `paramCallback` are optional, and `recordId` accepts a number or string (#384, @nemchik).
- **N/documentCapture:** `documentToText.promise()` takes the same options as `documentToText()` (#386, @nemchik).
- **N/https:** the doc comments on `SecureString.appendString()` and `appendSecureString()` were swapped (#387, @nemchik).
