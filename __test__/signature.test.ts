import { makeSign, SignatureComponents } from '../src/core/signature';

const sign = 'd31699238dd308037eca9007f58160e68bd940e29040d8d45da3ab5d38a2e78a'; 
const signComponents: SignatureComponents = {
  body: '',
  secretKey: 'SECRET',
  timestamp: 90000,
  requestUrl: 'http://test.api.com',
}

describe(`makeSign`, () => {
  it(`should return correct signature`, async () => {
    expect(makeSign(signComponents)).toEqual(sign);
  });
});
