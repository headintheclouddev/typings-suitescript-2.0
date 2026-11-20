/**
 * Does `query.DateId` exist at runtime, with the values the typings give? The
 * typings declare it as the only `const enum`, so tsc inlines its values and
 * never reads the object. A plain `enum` (which works with isolatedModules)
 * would read `query.DateId.<KEY>` at runtime instead.
 * Read-only. Returns plain data only (enum keys and values).
 *
 * Supports issue #474.
 *
 * @NApiVersion 2.1
 * @scriptType Restlet
 */
define(["N/query"], (query) => ({
  run() {
    const result = {};
    const t = (key, fn) => {
      try {
        result[key] = fn();
      } catch (e) {
        result[key] = `THROWS: ${e.name}: ${e.message}`;
      }
    };
    // The values in N/query.d.ts.
    const typed = {
      DAYS_AGO: "dago",
      DAYS_FROM_NOW: "dfn",
      HOURS_AGO: "hago",
      HOURS_FROM_NOW: "hfn",
      MINUTES_AGO: "nago",
      MINUTES_FROM_NOW: "nfn",
      MONTHS_AGO: "mago",
      MONTHS_FROM_NOW: "mfn",
      QUARTERS_AGO: "qago",
      QUARTERS_FROM_NOW: "qfn",
      SECONDS_AGO: "sago",
      SECONDS_FROM_NOW: "sfn",
      WEEKS_AGO: "wago",
      WEEKS_FROM_NOW: "wfn",
      YEARS_AGO: "yago",
      YEARS_FROM_NOW: "yfn",
    };
    t("typeof query.DateId", () => typeof query.DateId);
    t("query.DateId", () => Object.fromEntries(Object.keys(query.DateId).map((k) => [k, query.DateId[k]])));
    t("keys missing at runtime", () => Object.keys(typed).filter((k) => !(k in query.DateId)));
    t("keys only at runtime", () => Object.keys(query.DateId).filter((k) => !(k in typed)));
    t("values that differ", () =>
      Object.keys(typed)
        .filter((k) => k in query.DateId && query.DateId[k] !== typed[k])
        .map((k) => `${k}: typed ${typed[k]}, runtime ${query.DateId[k]}`),
    );
    // Both forms a script could pass: the enum member (plain enum) and the
    // inlined string (const enum today).
    t("createRelativeDate with query.DateId.DAYS_AGO", () =>
      typeof query.createRelativeDate({ dateId: query.DateId.DAYS_AGO, value: 1 }),
    );
    t('createRelativeDate with "dago"', () => typeof query.createRelativeDate({ dateId: "dago", value: 1 }));
    return result;
  },
}));
