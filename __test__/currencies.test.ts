import { sdk } from './env';

describe(`currencies API`, () => {
  beforeAll(async () => {
    await sdk.init();
  });

  it(`should return data with currencies array`, async () => {
    const data = await sdk.currencies.getList();

    expect(data).toEqual(expect.objectContaining({
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          currency: expect.any(String),
          type: expect.any(String),
        }),
      ]),
    }));
  });
});
