/**
 * Load the N/suiteAppInfo module when you want to access information related to SuiteApps and Bundles.
 * This module is available for all script types.
 *
 * Supported script types: Client and server scripts.
 * @since 2021.1
 */

/**
 * Determines if a specified bundle is installed.
 * @returns true if the specified bundle is installed; false otherwise.
 * @governance 5 units
 * @since 2021.1
 */
export function isBundleInstalled(options: {
  /** The ID of the bundle. */
  bundleId: number|string;
}): boolean;

/**
 * Determines if a specified SDF SuiteApp is installed.
 * @returns true if the specified SuiteApp is installed; false otherwise.
 * @governance 5 units
 * @since 2021.1
 */
export function isSuiteAppInstalled(options: {
  /** The ID of the SuiteApp. */
  suiteAppId: string;
}): boolean;

/**
 * Returns the IDs for bundles that contain the specified script, for each script specified.
 * @returns A {scriptId: arrayOfBundleIds} mapping. Scripts not contained in any bundle map to an empty array.
 * @governance 10 units
 * @since 2021.1
 */
export function listBundlesContainingScripts(options: {
  /** The list of script IDs. */
  scriptIds: string[];
}): Record<string, number[]>;

/**
 * Returns a list of successfully installed bundles, as an array of objects.
 * @returns The installed bundles.
 * @governance 10 units
 * @since 2021.1
 */
export function listInstalledBundles(): IBundle[];

/**
 * Returns a list of successfully installed SDF SuiteApps, as an array of objects.
 * @returns The installed SDF SuiteApps.
 * @governance 10 units
 * @since 2021.1
 */
export function listInstalledSuiteApps(): ISuiteApp[];

/**
 * Returns the ID for the SDF SuiteApp that contains the specified script, for each individual script specified.
 * Only one ID will be returned for each specified script.
 * @returns A {scriptId: suiteAppId|null} mapping. Scripts not contained in any SuiteApp map to null.
 * @governance 10 units
 * @since 2021.1
 */
export function listSuiteAppsContainingScripts(options: {
  /** The list of script IDs. */
  scriptIds: string[];
}): Record<string, string | null>;

/** An installed bundle, as returned by suiteAppInfo.listInstalledBundles(). */
interface IBundle {
  id: number;
  name: string;
  version: string;
  description: string;
  installedFrom: string;
  isManaged: boolean;
  dateInstalled: Date;
  dateLastUpdated: Date;
  /** The publisher (Publisher object, which includes an integer id and a string name). */
  publisher:   { id: number; name: string };
  /** The installer (Installer object). */
  installedBy: { id: number; name: string };
}

/** An installed SDF SuiteApp, as returned by suiteAppInfo.listInstalledSuiteApps(). */
interface ISuiteApp {
  appId: string;
  name: string;
  version: string;
  description: string;
  dateInstalled: Date;
  dateLastUpdated: Date;
  publisherId: string;
  /** The installer (Installer object). */
  installedBy: { id: number; name: string };
}
