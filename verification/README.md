# Verification

Oracle's help pages, its samples and these typings sometimes disagree with each other and with NetSuite itself. This folder keeps the runtime evidence behind typing decisions, so a pull request can link to it instead of citing only the documentation.

- **Probe** (`probes/<module>-<member>.js`): a small read-only script that runs in a NetSuite sandbox and returns what NetSuite actually does.
- **Results page** (`results/<name>.md`): the record of one verification: the exact test, the raw output, the NetSuite version, what it means and what was decided.
- **Runner**: the script the tooling deploys to a sandbox to run probes.

## Contributing

Contributing to this repository does not require a verification in this folder. If you have runtime evidence for a change, please put as much of it as you can in your pull request description: the script you ran, its output, the script type and the NetSuite version.

If you want to contribute a verification without the tooling, add a results page to `results/` (and the probe or script you ran, if you have one) with GitHub's web editor or any editor. Follow the structure of an existing page: the NetSuite version, account type, date and method at the top, then Test, Results, Explanation and Decision.

Conventions:

- One question per probe, named `probes/<module>-<member>.js`. Its header names the issue or pull request it supports (for example `Supports issue #238.`).
- Probes only read. A test that writes to the account is run by hand, and its code goes in its results page (see `results/email-send-recipients.md`).
- No account numbers, URLs, users, tokens or real record ids in a probe or a results page. A probe that needs a real record takes its id as a parameter.

## Running probes yourself (optional)

The probes run with [suitescript-verify](https://github.com/nemchik/suitescript-verify), a separate open-source tool. Nothing from it is committed to this repository: `.gitignore` in this folder keeps out everything it installs or generates here (`package.json`, `package-lock.json`, `node_modules/`, your credentials in `.env.local`, and the generated `sdf/`). Only `.env` (settings, no credentials), the probes, the results pages and this README are committed.

You need a NetSuite sandbox you can administer, Node.js 24 or later, and Java 17 or 21.

### Install

From this folder (`verification/`):

1. `npm init -y`
2. `npm install --save-dev suitescript-verify@2 @oracle/suitecloud-cli` (the SuiteCloud CLI asks you to accept Oracle's license)
3. `npx suitescript-verify setup --dir .` walks you through the sandbox credentials and saves them in `.env.local`
4. `npx suitescript-verify doctor --dir .` checks the setup

If your sandbox already has another project's suitescript-verify runner, give this one its own id in `.env.local` first (see `.env`).

### Use

- `npx suitescript-verify deploy --dir .` previews the deploy.
- `npx suitescript-verify deploy --dir . --approved` deploys, which writes to the sandbox.
- `npx suitescript-verify run <probe> --dir .` runs a probe.
- `npx suitescript-verify run <probe> --dir . --draft` runs a probe and writes the first version of its results page.

The full guide (permissions, probe parameters, troubleshooting) is installed with the tool: `node_modules/suitescript-verify/README.md`.
