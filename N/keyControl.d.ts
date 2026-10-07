/**
 * The N/keyControl module can access key storage, which is also available in the UI at Setup > Company > Preferences > Keys.
 * By using the SSH keys, you can manage files and directories by using the SSH file transfer (SFTP) protocol.
 * Supported script types: Server scripts.
 */

import type {File} from './file';

/**
 * Creates a key record on the Keys page using a file from the File Cabinet. Save it with Key.save().
 * Oracle's Syntax and samples call createKey() with no arguments and then set Key.file and Key.name before calling Key.save(),
 * so options is typed as optional even though the parameter table lists options.file and options.name as required.
 * @governance 10 units
 * @since 2019.2
 */
export function createKey(options?: CreateKeyOptions): Key;
/**
 * Returns a list of keys that are available to the user.
 * If no options are set for criteria, the full list of keys stored in NetSuite is returned.
 * Oracle documents the return value only as "Metadata about the keys" (Object), without describing its shape.
 * @returns Metadata about the keys.
 * @governance 10 units
 * @since 2019.2
 */
export function findKeys(options?: FindKeysOptions): Record<string, any>;
/**
 * Deletes a key.
 * Oracle's method page lists the return type as Object, but its Syntax sample assigns the result to `keyId`; typed as string here.
 * @returns The ID of the deleted key.
 * @governance 10 units
 * @since 2019.2
 */
export function deleteKey(options: KeyScriptIdOptions): string;
/**
 * Loads a key.
 * @returns The keyControl.Key object.
 * @governance 10 units
 * @since 2019.2
 */
export function loadKey(options: KeyScriptIdOptions): Key;
/**
 * Locks a key so that it cannot be edited in the UI until it is unlocked with keyControl.unlock(options).
 * @throws {SuiteScriptError} KEY_NOT_FOUND if the key with the ID provided does not exist in this account.
 * @throws {SuiteScriptError} ACCESS_TO_KEY_RESTRICTED if the current employee or script does not have permission to access or edit the key.
 * @throws {SuiteScriptError} KEY_ALREADY_LOCKED if the key has already been locked.
 * @governance 10 units
 * @since 2021.1
 */
export function lock(options: LockOptions): void;
/**
 * Unlocks a key that has been locked by keyControl.lock(options).
 * @throws {SuiteScriptError} KEY_NOT_FOUND if the key with the ID provided does not exist in this account.
 * @throws {SuiteScriptError} ACCESS_TO_KEY_RESTRICTED if the current employee or script does not have permission to access or edit the key.
 * @throws {SuiteScriptError} KEY_NOT_LOCKED if the key is not locked and cannot be unlocked.
 * @governance 10 units
 * @since 2021.1
 */
export function unlock(options: LockOptions): void;

/**
 * Holds the values for the key operators of keyControl.findKeys(options).
 * @since 2019.2
 */
export enum Operator {
  STARTS_WITH = "startswith",
  CONTAINS = "contains",
  ENDS_WITH = "endswith",
  EQUALS = "equals"
}

/**
 * Represents a key.
 * @since 2019.2
 */
export interface Key {
  /**
   * The file object of the key.
   * @since 2019.2
   */
  file: File;
  /**
   * The password of the key (write-only).
   * Either a GUID (see Form.addCredentialField(options)) or the script ID of an API secret is accepted.
   * @since 2019.2
   */
  password: string;
  /**
   * The script ID of the key. NetSuite prepends this ID with 'custkey'. Using Key.save() and keyControl.findKeys(options) returns the script ID.
   * @since 2019.2
   */
  scriptId: string;
  /**
   * The name of the key.
   * @since 2019.2
   */
  name: string;
  /**
   * The description of the key.
   * @since 2019.2
   */
  description: string;
  /**
   * An array of employee IDs. Only these employees can access the key.
   * @since 2019.2
   */
  restrictions: string[];
  /**
   * Saves the key.
   * Oracle lists the return type only as Object; the Key.scriptId page says Key.save() returns the script ID.
   * @governance 10 units
   * @since 2019.2
   */
  save: () => unknown;
}

interface CreateKeyOptions {
  /**
   * The internal ID of the File Cabinet file with the key. The key must be in PEM format.
   * Oracle documents this as a number; a file.File object is also accepted here because Oracle's samples assign a File to Key.file.
   */
  file?: File | number;
  /** The password that is associated with the key. The script ID of an API secret is accepted for this value. */
  password?: string;
  /** The script ID for the newly-created key. NetSuite prepends this ID with 'custkey'. If you do not provide an ID, one is auto-generated. */
  scriptId?: string;
  /** The name of the key. */
  name?: string;
  /** The description of the key. */
  description?: string;
  /** An array of employee internal IDs. Only these employees can use this key. */
  restrictions?: string[] | number[];
}

/** A search criterion for keyControl.findKeys(options). */
interface FindKeysCriterion {
  /** The value to search for. Required when the object form is used. */
  value: string;
  /** -optional- One of the keyControl.Operator enum values. Defaults to EQUALS. */
  operator?: Operator | `${Operator}`;
  /** -optional- Whether to ignore case. Defaults to true. */
  ignoreCase?: boolean;
}

interface FindKeysOptions {
  /** The name of the key, as a string or a search criterion object. */
  name?: string | FindKeysCriterion;
  /** The description of the key, as a string or a search criterion object. */
  description?: string | FindKeysCriterion;
  /** The internal ID of an employee selected in the Restrict to Employees field. */
  restriction?: number;
}

interface KeyScriptIdOptions {
  /** The script ID of the key. Using Key.save() and keyControl.findKeys(options) returns the script ID. */
  scriptId: string;
}

interface LockOptions {
  /** The script ID or internal ID for the key. You can view the ID of a key from the Private Keys list at Setup > Company > Keys. */
  id: string;
}
