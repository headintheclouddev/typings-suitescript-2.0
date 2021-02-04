/**
 * Load the N/suiteAppInfo module when you want to access information related to SuiteApps and Bundles.
 * This module is available for all script types.
 */

export function isBundleInstalled(options: { bundleId: number|string }): boolean;
export function isSuiteAppInstalled(options: { suiteAppId: string }): boolean;

/** This method returns the IDs for bundles that contain the specified script, for each individual script specified. */
export function listBundlesContainingScripts(options: { scriptIds: string[] }): { [scriptId: string]: number[] };

/** This method returns a list of successfully installed bundles, as an array of objects. */
export function listInstalledBundles(): IBundle[];

export function listInstalledSuiteApps(): ISuiteApp[];

/**
 * Returns the ID for the SDF SuiteApp that contains the specified script, for each individual script specified.
 * Only one ID will be returned for each specified script.
 */
export function listSuiteAppsContainingScripts(options: { scriptIds: string[] }): { [scriptId: string]: string };

interface IBundle {
  id: number;
  name: string;
  version: string;
  description: string;
  installedFrom: string;
  isManaged: boolean;
  dateInstalled: Date;
  dateLastUpdated: Date;
  publisher: string; // TODO: Verify what this looks like.  Help says "Publisher, which includes an integer id and a string name"
  installedBy: string; // TODO: Verify
}

interface ISuiteApp {
  appId: string;
  name: string;
  version: string;
  description: string;
  dateInstalled: Date;
  dateLastUpdated: Date;
  publisherId: string;
  installedBy: string; // TODO: Verify
}
