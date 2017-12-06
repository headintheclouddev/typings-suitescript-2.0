import { exec, rm, cat, ls } from 'shelljs'
import {parseScript} from 'esprima'

describe('examples compilation', () => {

    it('compile basic examples with current local typescript', () => {
        rm('-rf', 'spec/assets/*.js')
        expect(exec('node node_modules/typescript/bin/tsc -p spec/assets/specs_samples_tsconfig.json').code).toBe(0)
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