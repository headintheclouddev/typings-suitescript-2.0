/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

interface ErrorModule {
    /**
     * Encapsulates a SuiteScript error thrown by any script type that is not a user event script.
     */
    SuiteScriptError: SuiteScriptError;
    /**
     * Encapsulates a SuiteScript error thrown by a user event script.
     */
    UserEventError: UserEventError;
    /**
     * Creates a new error.SuiteScriptError or error.UserEventError object.
     */
    create(options: CreateOptions): SuiteScriptError | UserEventError;
}

declare var _: ErrorModule;
export = _;
