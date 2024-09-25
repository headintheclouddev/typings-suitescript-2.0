/**
 * @NApiVersion 2.1
 * @NScriptType customglplugin
 */

/* This example is taken from https://suiteanswers.custhelp.com/app/answers/detail/a_id/1016997 */

import { EntryPoints } from "N/types";
import * as log from "N/log";

export const customizeGlImpact: EntryPoints.Plugins.GlPlugin.customizeGlImpact =
  (context: EntryPoints.Plugins.GlPlugin.glPluginContext) => {
    const customLines = context.customLines;
    const amount = "100.00";

    const memo = context.transactionRecord.getValue({ fieldId: "memo" });
    const firstAccount = context.standardLines.getLine({ index: 0 }).accountId;
    const secondAccount = context.standardLines.getLine({ index: 1 }).accountId;
    const bookId = context.book.id;

    const firstLine = customLines.addNewLine();
    firstLine.accountId = firstAccount;
    firstLine.creditAmount = amount;
    firstLine.memo = memo + " for book " + bookId;
    firstLine.isBookSpecific = false;

    const secondLine = customLines.addNewLine();
    secondLine.accountId = secondAccount;
    secondLine.debitAmount = amount;
    secondLine.memo = memo + " for book " + bookId;
    secondLine.isBookSpecific = false;

    log.audit("Added GL Entries", { customLines });
  };
