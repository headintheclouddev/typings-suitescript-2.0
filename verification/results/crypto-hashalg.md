# crypto.HashAlg members and createHash

- **NetSuite version:** 2026.2
- **Account type:** sandbox
- **Date:** 2026-11-14, rerun 2026-11-19 under suitescript-verify 2.0.0
- **Method:** deployed RESTlet (the suitescript-verify runner)
- **Probe:** [crypto-hashalg](../probes/crypto-hashalg.js)

## Test

```js
/**
 * Which `crypto.HashAlg` members exist, and does `createHash` accept them? Oracle's
 * help lists only `SHA256` and `SHA512`; a member that exists but throws is not a
 * useful typing.
 *
 * Supports issue #389 (MD5 and SHA1 are left out of HashAlg); history in
 * issue #292.
 *
 * @NApiVersion 2.1
 * @scriptType Restlet
 */
define(["N/crypto"], (crypto) => ({
  run() {
    const result = {};
    const t = (key, fn) => {
      try {
        result[key] = fn();
      } catch (e) {
        result[key] = `THROWS: ${e.name}: ${e.message}`;
      }
    };
    const digest = (algorithm) => () => {
      const hash = crypto.createHash({ algorithm });
      hash.update({ input: "probe", inputEncoding: "UTF_8" });
      return typeof hash.digest({ outputEncoding: "HEX" });
    };
    t("typeof crypto.HashAlg", () => typeof crypto.HashAlg);
    t("Object.keys(crypto.HashAlg)", () => Object.keys(crypto.HashAlg).sort());
    for (const name of ["MD5", "SHA1", "SHA256", "SHA512"]) {
      t(`HashAlg.${name}`, () => String(crypto.HashAlg[name]));
      t(`createHash with HashAlg.${name}`, digest(crypto.HashAlg[name]));
    }
    t("createHash with the string 'MD5'", digest("MD5"));
    t("createHash with the string 'SHA1'", digest("SHA1"));
    t("createHash with the string 'SHA256'", digest("SHA256"));
    return result;
  },
}));
```

## Results

```json
{
  "typeof crypto.HashAlg": "object",
  "Object.keys(crypto.HashAlg)": [
    "MD5",
    "SHA1",
    "SHA256",
    "SHA512"
  ],
  "HashAlg.MD5": "MD5",
  "createHash with HashAlg.MD5": "THROWS: HASHING_ALGORITHM_IS_NO_LONGER_VALID: MD5 hashing algorithm is no longer valid",
  "HashAlg.SHA1": "SHA1",
  "createHash with HashAlg.SHA1": "THROWS: HASHING_ALGORITHM_IS_NO_LONGER_VALID: SHA1 hashing algorithm is no longer valid",
  "HashAlg.SHA256": "SHA256",
  "createHash with HashAlg.SHA256": "string",
  "HashAlg.SHA512": "SHA512",
  "createHash with HashAlg.SHA512": "string",
  "createHash with the string 'MD5'": "THROWS: HASHING_ALGORITHM_IS_NO_LONGER_VALID: MD5 hashing algorithm is no longer valid",
  "createHash with the string 'SHA1'": "THROWS: HASHING_ALGORITHM_IS_NO_LONGER_VALID: SHA1 hashing algorithm is no longer valid",
  "createHash with the string 'SHA256'": "string"
}
```

## Explanation

`crypto.HashAlg` has four members at runtime: `MD5`, `SHA1`, `SHA256` and `SHA512`, each with its own name as its value. `createHash` with `MD5` or `SHA1` (the enum member or the plain string) throws `HASHING_ALGORITHM_IS_NO_LONGER_VALID`. `SHA256` and `SHA512` hash and digest to a string.

Oracle's `crypto.HashAlg` page lists only `SHA256` and `SHA512`. That matches what works: `MD5` and `SHA1` exist on the enum but cannot be used with `createHash`. This also confirms commit 013c165 (2024, "Confirmed that SHA1 and MD5 are actually no longer supported"), which removed them after [issue 292](https://github.com/headintheclouddev/typings-suitescript-2.1/issues/292) asked for them back. `createHmac` was not tested.

## Decision

No typing change. The typings already list only `SHA256` and `SHA512` in `HashAlg`, matching this result. This page backs that decision in [issue 389](https://github.com/headintheclouddev/typings-suitescript-2.1/issues/389) ("`crypto.HashAlg` MD5/SHA1 are not included") and answers any future request to add `MD5` or `SHA1` back.
