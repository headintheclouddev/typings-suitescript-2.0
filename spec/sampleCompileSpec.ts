import { exec, rm, cat, ls } from 'shelljs'
import { parseScript } from 'esprima'

describe('samples compilation', () => {

    let cleanup = () => rm('-rf', 'spec/assets/*.js')
    beforeAll(cleanup)
    afterAll(cleanup)

    it('compile basic samples with current local typescript', () => {
        let execOut = exec('node node_modules/typescript/bin/tsc -p spec/assets/specs_samples_tsconfig.json')
        expect(execOut.code).toBe(0, execOut.stdout)
    })

    it('should generate valid samples .js that keeps the jsdoc top comment', () => {
        ls('spec/assets/*Sample.ts').forEach((file) => {
            let js = cat(file.replace('.ts', '.js'))
            expect(js).toContain(' * @NApiVersion 2')
            try {
                parseScript(js)
            } catch (ex) {
                fail('invalid javascript generated')
                console.log(ex, ex.stack)
            }
        })
    })

})
