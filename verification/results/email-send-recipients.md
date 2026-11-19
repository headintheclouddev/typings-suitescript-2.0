# email.send recipients, cc and bcc: mixed arrays and single values

- **NetSuite version:** 2026.2
- **Account type:** sandbox
- **Date:** 2026-11-10
- **Method:** deployed RESTlet (this repository's earlier hand-rolled runner, before the move to suitescript-verify). To run it again, use the script debugger: the suitescript-verify runner only runs probes that do not write
- **Probe:** none. It was `probes/email-send-recipients.js`; the probe was removed because the runner only runs probes that do not write

Does `email.send` accept a mixed array of internal ids and email addresses for `recipients`, `cc` and `bcc`, and a single value (id or address) for `cc` and `bcc`? Oracle's text says mixed arrays are valid; the typings only allow `number[]` or `string[]`.

**Status: verified** on 2026.2. The results were first published in [pull request 462](https://github.com/headintheclouddev/typings-suitescript-2.1/pull/462); this page records them next to the test.

## Test

This is the probe's code, adapted for the script debugger (the original returned `result` from a RESTlet's `run()`; this one logs it). Each accepted call creates a Message record and sends one email to the user running it (the author, by id, and that user's own address). To run it again, use a **sandbox** only, in Customization > Scripting > Script Debugger (API version 2.1).

```js
require(["N/email", "N/runtime", "N/log"], (email, runtime, log) => {
  const result = {};
  const t = (key, fn) => {
    try {
      fn();
      result[key] = "OK";
    } catch (e) {
      result[key] = `THROWS: ${e.name}: ${e.message}`;
    }
  };
  const user = runtime.getCurrentUser();
  const id = user.id;
  const address = user.email;
  result["user has email"] = typeof address === "string" && address.length > 0;
  const send = (extra) => () =>
    email.send({
      author: id,
      recipients: id,
      subject: "typings probe",
      body: "typings probe: safe to delete",
      ...extra,
    });
  t("recipients: [id, address]", send({ recipients: [id, address] }));
  t("recipients: [address, id]", send({ recipients: [address, id] }));
  t("cc: [id, address]", send({ cc: [id, address] }));
  t("bcc: [id, address]", send({ bcc: [id, address] }));
  t("cc: id (single)", send({ cc: id }));
  t("cc: address (single)", send({ cc: address }));
  t("bcc: id (single)", send({ bcc: id }));
  t("bcc: address (single)", send({ bcc: address }));
  // Over the documented maximum of 10; should throw before sending.
  t(
    "11 recipients (expected to throw)",
    send({ recipients: Array.from({ length: 11 }, () => address) }),
  );
  log.debug("result", JSON.stringify(result));
});
```

The script debugger can behave differently from a deployed script; confirm a surprising result with a deployed script.

## Results

As recorded in pull request 462 (the RESTlet's per-key output, summarized there as a table):

| Call | Result |
| --- | --- |
| `recipients: [id, address]` and `[address, id]` | accepted |
| `cc: [id, address]` | accepted |
| `bcc: [id, address]` | accepted |
| `cc` or `bcc` as a single id or address | throws `WRONG_PARAMETER_TYPE`: "options.cc is expected as Array" |
| 11 recipients | throws `SSS_MAXIMUM_NUMBER_RECIPIENTS_EXCEEDED` |

## Explanation

`email.send` accepts an array that mixes internal ids and email addresses for `recipients`, `cc` and `bcc`, as Oracle's text says. `cc` and `bcc` must be arrays: a single id or address throws `WRONG_PARAMETER_TYPE`, although `recipients` accepts a single value. More than 10 recipients throws before sending, matching the documented maximum.

## Decision

[Pull request 462](https://github.com/headintheclouddev/typings-suitescript-2.1/pull/462) (merged, fixes issue 316) widened the typings: `recipients` is `number | string | (number | string)[]` (and the `readonly` form), and `cc` and `bcc` are `(number | string)[]` (and the `readonly` form), staying array-only.
