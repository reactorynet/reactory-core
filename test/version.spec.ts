 
import * as assert from 'assert';
import ReactoryStatic from '../src/Reactory';

describe('Version Spec', ()=>{
  it('Assert that version is 1.0.0', () => {    
    assert.ok(ReactoryStatic.REACTORY_VERSION === '1.0.0', "The version does not match 1.0.0")
  })
  
});