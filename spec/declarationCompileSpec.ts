import { exec } from 'shelljs'

describe('declaration files compilation', () => {
	it('should compile all declaration files without error', () => {
		let execOut = exec('node node_modules/typescript/bin/tsc -p spec/assets/specs_declarations_tsconfig.json')
		expect(execOut.code).toBe(0, execOut.stdout)
	})
})
