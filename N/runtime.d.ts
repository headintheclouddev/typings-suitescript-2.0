interface GetParameterOptions {
    /** The name of the script parameter. */
    name: string;
}

interface GetSessionOptions {
    /** Key used to store the session object. */
    name: string;
}

interface GetPermissionOptions {
    /** Internal ID of a permission. See Permission Names and IDs in the NetSuite Help Center. */
    name: string;
}

interface GetPreferenceOptions {
    /** Internal ID of the preference. See Preference Names and IDs in the NetSuite Help Center. */
    name: string;
}

interface SetOptions {
    /** Key used to store the runtime.Session. */
    name: string;
    /** Value to associate with the key in the user session. */
    value: string;
}

/**
 * Encapsulates the runtime settings of the currently executing script. Use runtime.getCurrentScript() to access this object.
 *
 * Supported script types: Client and server scripts.
 * @since 2015.2
 */
interface Script {
    /**
     * Returns the value of a script parameter for the currently executing script.
     * @param options.name The name of the script parameter.
     * @returns The parameter value. Oracle documents number | Date | string | boolean | null | undefined; string[] is kept for backward compatibility.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if the options.name parameter is not specified.
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if the value for the options.name parameter is not a string.
     * @governance none
     * @since 2015.2
     */
    getParameter(options: GetParameterOptions): boolean | number | Date | string | string[] | null | undefined;
    /**
     * Returns the number of units remaining (per governance limitations) for the currently executing script.
     * @governance none
     * @since 2015.2
     */
    getRemainingUsage(): number;
    /**
     * The current script's runtime version (for example, 2.0 or 2.1).
     * @since 2015.2
     */
    readonly apiVersion: string;
    /**
     * The deployment ID for the script deployment on the currently executing script.
     *
     * Supported script types: Server scripts.
     * @since 2015.2
     */
    readonly deploymentId: string;
    /**
     * The script ID for the currently executing script.
     * @since 2015.2
     */
    readonly id: string;
    /**
     * The script logging level for the currently executing script. This property is not supported on client scripts.
     *
     * Supported script types: Server scripts.
     * @since 2015.2
     */
    readonly logLevel: 'DEBUG' | 'AUDIT' | 'ERROR' | 'EMERGENCY';
    /**
     * The percent complete specified for the current scheduled script execution. This value appears in the % Complete column on the Scheduled Script Status page. This value can be set or retrieved.
     * @throws {SuiteScriptError} SSS_OPERATION_UNAVAILABLE if the currently executing script is not a scheduled script.
     * @since 2015.2
     */
    percentComplete: number;
    /**
     * An array of bundle IDs for the bundles that include the currently executing script.
     * @since 2015.2
     */
    readonly bundleIds: string[];
}

/**
 * Encapsulates the user session for the currently executing script.
 *
 * Supported script types: Server scripts. (Oracle's N/runtime members table lists the Session object as client and server scripts.)
 * @since 2015.2
 */
interface Session {
    /**
     * Returns the user-defined session object value associated with a session object key. If the key does not exist, this method returns null.
     *
     * Supported script types: Client and server scripts. (Oracle's N/runtime members table lists this method as server scripts only.)
     * @param options.name Key used to store the session object.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if the options.name parameter is not specified.
     * @governance none
     * @since 2015.2
     */
    get(options: GetSessionOptions): string | null;
    /**
     * Sets a key and value for a user-defined session object. Use Session.get(options) to retrieve the object value after you set it.
     *
     * Supported script types: Server scripts.
     * @param options.name Key used to store the session object.
     * @param options.value Value to associate with the key in the user session.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if the options.name or options.value parameter is not specified.
     * @governance none
     * @since 2015.2
     */
    set(options: SetOptions): void;
}

/**
 * Encapsulates the properties and preferences for the user of the currently executing script.
 *
 * Supported script types: Client and server scripts.
 * @since 2015.2
 */
interface User {
    /**
     * Returns a runtime.Permission user permission level for the specified permission.
     * Note: Oracle's Returns row says "string", but the description says it returns a runtime.Permission value; the runtime.Permission enum type is kept.
     * @param options.name Internal ID of a permission. See Permission Names and IDs.
     * @governance none
     * @since 2015.2
     */
    getPermission(options: GetPermissionOptions): Permission;
    /**
     * Returns the value set for a NetSuite preference. Currently only General Preferences and Accounting Preferences are exposed in SuiteScript.
     * @param options.name Internal ID of the preference. See Preference Names and IDs.
     * @governance none
     * @since 2015.2
     */
    getPreference(options: GetPreferenceOptions): string;
    /**
     * The internal ID of the currently logged-in contact. If no logged-in entity or other entity than contact is logged in, then 0 is returned as value.
     * @since 2019.1
     */
    readonly contact: number;
    /**
     * The internal ID of the department for the current user.
     * @since 2015.2
     */
    readonly department: number;
    /**
     * The email address of the current user. To use this property, the email field on the user employee record must contain an email address.
     * @since 2015.2
     */
    readonly email: string;
    /**
     * The internal ID of the current user.
     * @since 2019.2
     */
    readonly id: number;
    /**
     * The internal ID of the location of the current user.
     * @since 2015.2
     */
    readonly location: number;
    /**
     * The name of the current user.
     * @since 2015.2
     */
    readonly name: string;
    /**
     * The internal ID of the role for the current user.
     * @since 2015.2
     */
    readonly role: number;
    /**
     * The string value of the center type, or role center, for the current user.
     * Note: Oracle documents this property as a string (in practice the script ID of the role center); the type is kept as string | number for backward compatibility.
     * @since 2015.2
     */
    readonly roleCenter: string | number;
    /**
     * The custom scriptId of the role for the current user. You can use this value instead of User.role.
     * @since 2015.2
     */
    readonly roleId: string;
    /**
     * The internal ID of the subsidiary for the current user.
     * @since 2015.2
     */
    readonly subsidiary: number;
}

interface FeatureOptions {
    /**
     * The internal ID of the feature to check. See Feature Names and IDs.
     * Oracle types this parameter as string; known IDs are suggested via NetSuiteFeature, but any string is accepted.
     */
    feature: NetSuiteFeature | (string & {});
}

export type NetSuiteFeature =
    | "ACCOUNTING"
    | "ACCOUNTINGPERIODS"
    | "ACTIVITYCODES"
    | "ADDONS"
    | "ADVANCEDBILLOFMATERIALS"
    | "ADVANCEDEMPLOYEEPERMISSIONS"
    | "ADVANCEDJOBS"
    | "ADVANCEDNUMBERINGSEQUENCES"
    | "ADVANCEDPRINTING"
    | "ADVANCEDPROCUREMENTAPPROVALS"
    | "ADVANCEDPROJECTACCOUNTING"
    | "ADVANCEDPROMOTIONS"
    | "ADVANCEDREVENUERECOGNITION"
    | "ADVANCEDREVENUERECOGNITIONAPP"
    | "ADVANCEDSITECUST"
    | "ADVANCEDSITEMANAGEMENT"
    | "ADVBILLING"
    | "ADVBINSERIALLOTMGMT"
    | "ADVFORECASTING"
    | "ADVINVENTORYMGMT"
    | "ADVPARTNERACCESS"
    | "ADVRECEIVING"
    | "ADVSHIPPING"
    | "ADVSUBSCRIPTIONBILLING"
    | "ADVTAXENGINE"
    | "ADVWEBREPORTS"
    | "ADVWEBSEARCH"
    | "ALTSALESADVFORECAST"
    | "ALTSALESAMOUNT"
    | "AMORTIZATION"
    | "APPROVALROUTING"
    | "ARMINCONFIGMODE"
    | "ARMREVENUEALLOCATION"
    | "ASSEMBLIES"
    | "ASYNCCUSTOMER"
    | "ASYNCSALESORDER"
    | "AUTOAPPLYPROMOTIONS"
    | "AUTOLOCATIONASSIGNMENT"
    | "AVAILABLETOPROMISE"
    | "BALANCING_SEGMENTS"
    | "BARCODES"
    | "BILLCAPTURE"
    | "BILLINGACCOUNTS"
    | "BILLINGCLASSES"
    | "BILLINGRATECARDS"
    | "BILLINGWORKCENTER"
    | "BILLSCOSTS"
    | "BINMANAGEMENT"
    | "BLANKETPURCHASEORDERS"
    | "BOXNET"
    | "CAMPAIGNASSISTANT"
    | "CAMPAIGNSUBSCRIPTIONS"
    | "CCTRACKING"
    | "CENTRALIZEDPURCHASINGBILLING"
    | "CHARGEBASEDBILLING"
    | "CHECKOUTSUBDOMAIN"
    | "CLASSES"
    | "COMMERCECATEGORIES"
    | "COMMERCESEARCHANALYTICS"
    | "COMMISSIONONCUSTOMFIELDS"
    | "COMMISSIONS"
    | "COMMITPLUSOVERAGE"
    | "COMPENSATIONTRACKING"
    | "CONSOLPAYMENTS"
    | "CREATESUITEBUNDLES"
    | "CRM"
    | "CRMTIME"
    | "CRM_TEMPLATE_CATEGORIES"
    | "CROSSSUBSIDIARYFULFILLMENT"
    | "CUSTOMCODE"
    | "CUSTOMERACCESS"
    | "CUSTOMGLLINES"
    | "CUSTOMRECORDS"
    | "CUSTOMSEGMENTS"
    | "CUSTOMTRANSACTIONS"
    | "DEPARTMENTS"
    | "DISTRIBUTIONRESOURCEPLANNING"
    | "DOCUMENTPUBLISHING"
    | "DOCUMENTS"
    | "DOWNLOADITEMS"
    | "DROPSHIPMENTS"
    | "DUPLICATES"
    | "DYNALLOCATION"
    | "EFFECTIVEDATING"
    | "EMAILINTEGRATION"
    | "EMPLOYEECENTERPUBLISHING"
    | "EMPLOYEECHANGEREQUESTS"
    | "EMPPERMS"
    | "ENHANCEDINVENTORYLOCATION"
    | "ENHANCEDPREMIERPAYROLL"
    | "ESCALATIONRULES"
    | "ESTIMATES"
    | "EXPENSEALLOCATION"
    | "EXPREPORTS"
    | "EXTCRM"
    | "EXTREMELIST"
    | "EXTSTORE"
    | "FCADVANCEDSECURITY"
    | "FCEXPENSE"
    | "FCEXPENSEMIGRATECONTROLLER"
    | "FULFILLMENTREQUEST"
    | "FXRATETYPE"
    | "FXRATEUPDATES"
    | "GAINLOSSACCTMAPPING"
    | "GIFTCERTIFICATES"
    | "GLAUDITNUMBERING"
    | "GRIDORDERMANAGEMENT"
    | "GROSSPROFIT"
    | "GROUPAVERAGECOSTING"
    | "HELPDESK"
    | "HISTORICALMETRICS"
    | "HRANALYSIS"
    | "HTML_FORMULAS_IN_SEARCH"
    | "I18NTAXREPORTS"
    | "IC_FRAMEWORK_OR_AIM"
    | "INBOUNDCASEEMAIL"
    | "INBOUNDSHIPMENT"
    | "INSTALLMENTS"
    | "INTELLIGENTRECOMMENDATIONS"
    | "INTERCOMPANYAUTODROPSHIP"
    | "INTERCOMPANYAUTOELIMINATION"
    | "INTERCOMPANYELIMINATIONENGINE"
    | "INTERCOMPANYFRAMEWORK"
    | "INTERCOMPANYTIMEEXPENSE"
    | "INTERNATIONALPHONENUMBERS"
    | "INTRANET"
    | "INTRANSITPAYMENTS"
    | "INVENTORY"
    | "INVENTORYCOUNT"
    | "INVENTORYSTATUS"
    | "INVOICEGROUP"
    | "IPADDRESSRULES"
    | "ISSUEDB"
    | "ITEMDEMANDPLANNING"
    | "ITEMOPTIONS"
    | "JOBCOSTING"
    | "JOBMANAGEMENT"
    | "JOBREQUISITION"
    | "JOBS"
    | "KILLINBOUNDSSO"
    | "KILLSHA1FORTBA"
    | "KNOWLEDGEBASE"
    | "KPIREPORTS"
    | "KUDOS"
    | "LANDEDCOST"
    | "LEADMANAGEMENT"
    | "LOCATIONS"
    | "LOTNUMBEREDINVENTORY"
    | "MAILMERGE"
    | "MARKETING"
    | "MATERIALREQUIREMENTSPLANNING"
    | "MATRIXITEMS"
    | "MERCHANDISEHIERARCHY"
    | "MFGROUTING"
    | "MFGWORKINPROCESS"
    | "MOBILEPUSHNTF"
    | "MOSS"
    | "MULTIBOOKMULTICURR"
    | "MULTICURRENCY"
    | "MULTICURRENCYCUSTOMER"
    | "MULTICURRENCYMERGE"
    | "MULTICURRENCYVENDOR"
    | "MULTILANGUAGE"
    | "MULTILOCINVT"
    | "MULTIPARTNER"
    | "MULTIPLEBUDGETS"
    | "MULTIPLECALENDARS"
    | "MULTISHIPTO"
    | "MULTISUBSIDIARYCUSTOMER"
    | "MULTIVENDOR"
    | "MULTPRICE"
    | "NETSUITEAPPROVALSWORKFLOW"
    | "NOTALTSALESAMOUNT"
    | "NOTMULTIPARTNER"
    | "NOTTEAMSELLING"
    | "NSASOIDCPROVIDER"
    | "NSAW_MULTI_INSTANCE_CONNECTOR"
    | "OAUTH2"
    | "OIDC"
    | "ONLINEORDERING"
    | "OPENIDSSO"
    | "OPPORTUNITIES"
    | "OTHERSUBLISTFIELDS"
    | "OUTSOURCEDMFG"
    | "PARTNERACCESS"
    | "PARTNERCOMMISSIONS"
    | "PAYABLES"
    | "PAYCHECKJOURNAL"
    | "PAYMENTINSTRUMENTS"
    | "PAYMENTLINK"
    | "PAYPALINTEGRATION"
    | "PAYROLL"
    | "PAYROLLSERVICE"
    | "PERFORMANCEMANAGEMENT"
    | "PERIODENDJOURNALENTRIES"
    | "PERSONALIZED_CATALOG_VIEWS"
    | "PICKPACKSHIP"
    | "PI_REMOVAL"
    | "PLANNEDWORK"
    | "PREPAYWITHDRAWDOWN"
    | "PRM"
    | "PROJECTTASKMANAGER"
    | "PROMOCODES"
    | "PURCHASECARDDATA"
    | "PURCHASECONTRACTS"
    | "PURCHASEORDERS"
    | "PURCHASEREQS"
    | "QUANTITYPRICING"
    | "RECEIVABLES"
    | "REQUIREDDEPOSITWORKFLOW"
    | "REQUISITIONS"
    | "RESOURCEALLOCATIONAPPROVAL"
    | "RESOURCEALLOCATIONCHART"
    | "RESOURCEALLOCATIONS"
    | "RESOURCESKILLSETS"
    | "RESTWEBSERVICES"
    | "RETURNAUTHS"
    | "REVENUECOMMITMENTS"
    | "REVENUERECOGNITION"
    | "REVRECSALESORDERFORECASTING"
    | "REVRECVSOE"
    | "RFQ"
    | "RULEBASEDRECOGNITIONTREATMENT"
    | "SALESCAMPAIGNS"
    | "SALESCHANNELALLOCATION"
    | "SALESORDERS"
    | "SAMLSSO"
    | "SDFCOPYTOACCOUNT"
    | "SERIALIZEDINVENTORY"
    | "SERVERSIDESCRIPTING"
    | "SERVICEPRINTEDCHECKS"
    | "SERVICEPRINTEDW2S"
    | "SFA"
    | "SFA_AND_NOTASA"
    | "SHIPPINGLABELS"
    | "SHIPPINGPARTNERS"
    | "SITEBUILDER"
    | "SITEBUILDER_STORE"
    | "SITELOCATIONALIASES"
    | "SOFTDESCRIPTORS"
    | "STACKABLEPROMOTIONS"
    | "STANDARDCOSTING"
    | "STATACCOUNTING"
    | "STOREPICKUP"
    | "SUBSCRIPTIONBILLING"
    | "SUITE_OAX_CONNECTOR"
    | "SUITEANALYTICSCONNECT"
    | "SUITEAPPCONTROLCENTER"
    | "SUITEAPPDEVELOPMENTFRAMEWORK"
    | "SUITECOMMERCE"
    | "SUITECOMMERCE_ADVANCED"
    | "SUITECOMMERCE_IN_STORE"
    | "SUITECOMMERCE_MY_ACCOUNT"
    | "SUITECUBE_ENTERPRISE"
    | "SUITESIGNON"
    | "SUITETAXDATARECORDS"
    | "SUITETAXENGINE"
    | "SUITETAXENGINEINDIA"
    | "SUITETAXREPORTS"
    | "SUITETAXREPORTSINDIA"
    | "SUPPLTAXCALC"
    | "SUPPLYALLOCATION"
    | "SUPPLYCHAINCONTROLTOWER"
    | "SUPPLYCHAINMANAGEMENT"
    | "SUPPLYCHAINPREDICTEDRISKS"
    | "SUPPORT"
    | "SUBSIDIARIES"
    | "TABLEAU"
    | "TAXAUDITFILES"
    | "TAX_OVERHAULING"
    | "TBA"
    | "TEAMSELLING"
    | "TELEPHONY"
    | "TIMEBASEDPRICING"
    | "TIMEBASEDPRICINGSUITEAPP"
    | "TIMETRACKING"
    | "TRANDELETIONREASONCODE"
    | "UNITSOFMEASURE"
    | "UPLIFTPRICING"
    | "UPSELL"
    | "URLCOMPONENTALIASES"
    | "USR"
    | "VENDORACCESS"
    | "VENDOR_PAYMENT_INSTRUMENTS"
    | "VENDORPREPAYMENTS"
    | "VENDORRETURNAUTHS"
    | "WARRANTYANDREPAIRSMANAGEMENT"
    | "WBS"
    | "WEBAPPLICATIONS"
    | "WEBDUPLICATEEMAILMANAGEMENT"
    | "WEBHOSTING"
    | "WEBSERVICESEXTERNAL"
    | "WEBSITE"
    | "WEEKLYTIMESHEETS"
    | "WEEKLYTIMESHEETSNEWUI"
    | "WITHHOLDINGTAX"
    | "WMSSYSTEM"
    | "WORKFLOW"
    | "WORKORDERS";

/**
 * The account ID for the current user.
 * @since 2015.2
 */
export const accountId: string;
/**
 * The country for the current company. Returns the two-letter abbreviation. For example, US
 * @since 2020.2
 */
export const country: string;
/**
 * The current environment in which the script is executing. This property uses values from the runtime.EnvType enum.
 * @since 2015.2
 */
export const envType: EnvType;
/**
 * The execution context trigger of the current script. This property uses values from the runtime.ContextType enum.
 * @since 2015.2
 */
export const executionContext: ContextType;
/**
 * The number of processors available to the current account.
 * SuiteCloud Processors is the current system used to execute (process) scheduled scripts and map/reduce scripts. This property is helpful if you are a SuiteApp developer and your script needs to know the total number of processors available to a deployment.
 * For scheduled script deployments that continue to use queues, use runtime.queueCount.
 * Be aware that the number of processors available may not be the same as the number of queues available. For more information, see SuiteCloud Plus Settings.
 * @since 2018.1
 */
export const processorCount: number;
/**
 * The number of scheduled script queues available to the current account.
 * @since 2015.2
 */
export const queueCount: number;
/**
 * The version of NetSuite that the method is called in. For example, the runtime.version property in an account running NetSuite 2023.2 is 2023.2.
 * @since 2015.2
 */
export const version: string;
/**
 * Returns a runtime.Script that represents the currently executing script.
 *
 * Supported script types: Client and server scripts.
 * @governance none
 * @since 2015.2
 */
export function getCurrentScript(): Script;
/**
 * Returns a runtime.Session that represents the user session for the currently executing script.
 *
 * Supported script types: Client and server scripts.
 * @governance none
 * @since 2015.2
 */
export function getCurrentSession(): Session;
/**
 * Returns a runtime.User that represents the properties and preferences for the user of the currently executing script.
 *
 * Supported script types: Client and server scripts.
 * @governance none
 * @since 2015.2
 */
export function getCurrentUser(): User;
/**
 * Use this method to determine if a particular feature is enabled in a NetSuite account. These are the features that appear on the Enable Features page at Setup > Company > Enable Features.
 *
 * Supported script types: Client and server scripts.
 * @param options.feature The internal ID of the feature to check.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if the options.feature parameter is not specified.
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if the value for the options.feature parameter is not a string.
 * @governance none
 * @since 2015.2
 */
export function isFeatureInEffect(options: FeatureOptions): boolean;
/**
 * Returns whether NetSuite Next is active for the user running the script.
 * For scheduled and map/reduce scripts, the return value depends on the user running the script; if NetSuite runs the script as the System user, this method returns false.
 *
 * Supported script types: Client and server scripts.
 * @governance none
 * @since 2026.1
 */
export function isNextActive(): boolean;

/**
 * Holds the execution context values for script triggers. This is the type for the runtime.executionContext property.
 * @since 2015.2
 */
export enum ContextType {
    ACTION = "ACTION",
    ADVANCEDREVREC = "ADVANCEDREVREC",
    BANKCONNECTIVITY = "BANKCONNECTIVITY",
    BANKSTATEMENTPARSER = "BANKSTATEMENTPARSER",
    BUNDLE_INSTALLATION = "BUNDLEINSTALLATION",
    CLIENT = "CLIENT",
    CONSOLRATEADJUSTOR = "CONSOLRATEADJUSTOR",
    CSV_IMPORT = "CSVIMPORT",
    CUSTOMGLLINES = "CUSTOMGLLINES",
    CUSTOM_MASSUPDATE = "CUSTOMMASSUPDATE",
    DATASETBUILDER = "DATASETBUILDER",
    DEBUGGER = "DEBUGGER",
    EMAIL_CAPTURE = "EMAILCAPTURE",
    FICONNECTIVITY = "FICONNECTIVITY",
    FIPARSER = "FIPARSER",
    MAP_REDUCE = "MAPREDUCE",
    NONE = "NONE",
    OCRPLUGIN = "OCRPLUGIN",
    PAYMENTGATEWAY = "PAYMENTGATEWAY",
    PAYMENTPOSTBACK = "PAYMENTPOSTBACK",
    PLATFORMEXTENSION = "PLATFORMEXTENSION",
    PORTLET = "PORTLET",
    PROMOTIONS = "PROMOTIONS",
    RECORDACTION = "RECORDACTION",
    RESTLET = "RESTLET",
    REST_WEBSERVICES = "RESTWEBSERVICES",
    SCHEDULED = "SCHEDULED",
    SDF_INSTALLATION = "SDFINSTALLATION",
    SHIPPING_PARTNERS = "SHIPPINGPARTNERS",
    SUITELET = "SUITELET",
    TAX_CALCULATION = "TAXCALCULATION",
    USEREVENT = "USEREVENT",
    USER_INTERFACE = "USERINTERFACE",
    WEBAPPLICATION = "WEBAPPLICATION",
    WEBSERVICES = "WEBSERVICES",
    WEBSTORE = "WEBSTORE",
    WORKBOOKBUILDER = "WORKBOOKBUILDER",
    WORKFLOW = "WORKFLOW"
}

/**
 * Holds all possible environment types that the current script can execute in. This is the type for the runtime.envType property.
 * @since 2015.2
 */
export enum EnvType {
    SANDBOX,
    PRODUCTION,
    BETA,
    INTERNAL,
}
/**
 * Holds the user permission level for a specific permission ID. This is the type returned by the User.getPermission(options) method.
 * @since 2015.2
 */
export enum Permission {
    FULL = 4,
    EDIT = 3,
    CREATE = 2,
    VIEW = 1,
    NONE = 0,
}
