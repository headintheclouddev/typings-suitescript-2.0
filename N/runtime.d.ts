interface GetParameterOptions {
    /** The name of the script parameter. */
    name: string;
}

interface SetOptions {
    /** Key used to store the runtime.Session. */
    name: string;
    /** Value to associate with the key in the user session. */
    value: string;
}

/**
 * Encapsulates the runtime settings of the currently executing script.
 * @since 2015.2
 */
interface Script {
    /**
     * Returns the value of a script parameter for the currently executing script.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if the options.name parameter is not specified.
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if the value for the options.name parameter is not a string.
     * @governance none
     * @since 2015.2
     */
    getParameter(options: GetParameterOptions): boolean | number | Date | string | string[];
    /**
     * Returns a number value for the usage units remaining for the currently executing script.
     * @governance none
     * @since 2015.2
     */
    getRemainingUsage(): number;
    /**
     * The current script's runtime version.
     * @since 2015.2
     */
    apiVersion: string;
    /**
     * The deployment ID for the script deployment on the currently executing script.
     * @since 2015.2
     */
    deploymentId: string;
    /**
     * The script ID for the currently executing script.
     * @since 2015.2
     */
    id: string;
    /**
     * The script logging level for the current script execution. This method is not supported on client scripts.
     * @since 2015.2
     */
    logLevel: string;
    /**
     * The percent complete specified for the current scheduled script execution. The return value will appear in the % Complete column in the Scheduled Script Status page.
     * @throws {SuiteScriptError} SSS_OPERATION_UNAVAILABLE if the currently executing script is not a scheduled script.
     * @since 2015.2
     */
    percentComplete: number;
    /**
     * An Array of bundle IDs for the bundles that include the currently executing script.
     * @since 2015.2
     */
    bundleIds: string[];
}

/**
 * Encapsulates the user session for the currently executing script.
 * @since 2015.2
 */
interface Session {
    /**
     * Returns the user-defined session object value associated with the session object key.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if the options.name parameter is not specified.
     * @governance none
     * @since 2015.2
     */
    get(options: GetParameterOptions): string;
    /**
     * Sets a key and value for a user-defined runtime.Session.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if the options.name or options.value parameter is not specified.
     * @governance none
     * @since 2015.2
     */
    set(options: SetOptions): void;
}

/**
 * Encapsulates the properties and preferences for the user of the currently executing script.
 * @since 2015.2
 */
interface User {
    /**
     * Returns a user permission level for the specified permission as a runtime.Permission enumeration.
     * @governance none
     * @since 2015.2
     */
    getPermission(options: GetParameterOptions): Permission;
    /**
     * Returns the value of a NetSuite preference.
     * @governance none
     * @since 2015.2
     */
    getPreference(options: GetParameterOptions): string;
    /**
     * The internal ID of the currently logged-in contact. If no logged-in entity or other entity than contact is logged in, then 0 is returned as value.
     * @since 2019.1
     */
    readonly contact: number;
    /**
     * The internal ID of the department for the currently logged-in user.
     * @since 2015.2
     */
    department: number;
    /**
     * The email address of the currently logged-in user.
     * @since 2015.2
     */
    email: string;
    /**
     * The internal ID of the currently logged-in user.
     * @since 2019.2
     */
    id: number;
    /**
     * The internal ID of the location of the currently logged-in user.
     * @since 2015.2
     */
    location: number;
    /**
     * The name of the currently logged-in user.
     * @since 2015.2
     */
    name: string;
    /**
     * The internal ID of the role for the currently logged-in user.
     * @since 2015.2
     */
    role: number;
    /**
     *  NOTE: The actual behavior of this strays from the documentation. This in practice returns the script id
     *  of the role center as opposed to its internal id. That is why the return type is string | number instead of
     *  what the documentation claims (just number).
     * @since 2015.2
     */
    roleCenter: string | number;
    /**
     * The custom scriptId of the role for the currently logged-in user.
     * @since 2015.2
     */
    roleId: string;
    /**
     * The internal ID of the subsidiary for the currently logged-in user.
     * @since 2015.2
     */
    subsidiary: number;
}

interface FeatureOptions {
    /**
     * The internal ID of the feature to check.
     * Known IDs are suggested, but any string is accepted, because Oracle's Feature Names and IDs list doesn't include every feature
     * (for example, SUBSIDIARIES is missing). `string & {}` keeps editor suggestions for the known IDs.
     */
    feature: NetSuiteFeature | (string & {});
}

export type NetSuiteFeature =
    | "ACCOUNTING"
    | "ACCOUNTINGPERIODS"
    | "ACHVEND"
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
    | "ANYPAYROLL"
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
    | "EFT"
    | "EMAILINTEGRATION"
    | "EMPLOYEECENTERPUBLISHING"
    | "EMPLOYEECHANGEREQUESTS"
    | "EMPPERMS"
    | "ENFORCE_INTEGRATION_ASD"
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
    | "FOREIGNCURRENCYMANAGEMENT"
    | "FULFILLMENTREQUEST"
    | "FULLMULTIBOOK"
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
    | "MFGROUTINGORSTANDARDCOSTING"
    | "MFGWORKINPROCESS"
    | "MOBILEPUSHNTF"
    | "MOSS"
    | "MULTIBOOK"
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
    | "OLDORNEWREVREC"
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
    | "SCSE_FRENCH_FINANCIALS"
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
    | "SUBSIDIARIES"
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
    | "SUITESOCIAL"
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
    | "VARIABLE_PAY_TBRBCT"
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
 * The NetSuite account ID for the currently logged-in user.
 * @since 2015.2
 */
export const accountId: string;
/**
 * The country for the current company. Returns the two-letter abbreviation.  For example, US
 * @since 2020.2
 */
export const country: string;
/**
 * The current environment in which the script is executing. This property returns one of the values from the runtime.EnvType enumeration.
 * @since 2015.2
 */
export const envType: EnvType;
/**
 * Returns a runtime.ContextType enumeration that represents what triggered the current script.
 * @since 2015.2
 */
export const executionContext: ContextType;
/**
 *  SuiteCloud Processors is the current system used to execute (process) scheduled scripts and map/reduce scripts. This property is helpful if you are a SuiteApp developer and your script needs to know the total number of processors available to a deployment.
 *  For scheduled script deployments that continue to use queues, use runtime.queueCount. With the introduction of SuiteCloud Processors, map/reduce script deployments and new scheduled script deployments no longer use queues, but pre-existing scheduled script deployments continue to use queues until the queues are removed (see SuiteCloud Processors – Supported Task Types).
 *  Be aware that the number of processors available may not be the same as the number of queues available. For more information, see SuiteCloud Plus Settings.
 * @since 2018.1
 */
export const processorCount: number;
/**
 * Returns the number of scheduled script queues in a given account.
 * @since 2015.2
 */
export const queueCount: number;
/**
 * Returns the version of NetSuite that the method is called in. For example, the  runtime.version property in an account running NetSuite 2015.2 is 2015.2.
 * @since 2015.2
 */
export const version: string;
/**
 * Returns a runtime.Script that represents the currently executing script.
 * @governance none
 * @since 2015.2
 */
export function getCurrentScript(): Script;
/**
 * Returns a runtime.Session that represents the user session for the currently executing script.
 * @governance none
 * @since 2015.2
 */
export function getCurrentSession(): Session;
/**
 * Returns a runtime.User that represents the properties and preferences for the user of the currently executing script.
 * @governance none
 * @since 2015.2
 */
export function getCurrentUser(): User;
/**
 * Use this method to determine if a particular feature is enabled in a NetSuite account. These are the features that appear on the Enable Features page at Setup > Company > Setup Tasks > Enable Features.
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
 * Enumeration that holds the context information about what triggered the current script. Returned by the runtime.executionContext property of the N/runtime Module.
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
 * Enumeration that holds all possible environment types that the current script can execute in.
 * @since 2015.2
 */
export enum EnvType {
    SANDBOX,
    PRODUCTION,
    BETA,
    INTERNAL,
}
/**
 * Enumeration that holds the user permission level for a specific permission ID. Returned by the User.getPermission(options) method.
 * @since 2015.2
 */
export enum Permission {
    FULL = 4,
    EDIT = 3,
    CREATE = 2,
    VIEW = 1,
    NONE = 0,
}
