import ReactoryStatic from '../src/Reactory';

describe('Version Spec', ()=>{
  it('Checks that the version is 1.0.0', () => {    
    expect(ReactoryStatic.REACTORY_VERSION).toBe("1.0.0")    
  })
});