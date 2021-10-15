import { sdk } from './env';

describe('Providers API', () => {
  it(`getList should return providers`, async () => {
    const { data } = await sdk.providers.getList();

    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          slug: expect.any(String),
          strategy: expect.any(String),
          description: expect.any(String),
          website: expect.any(String),
        }),
      ]),
    );
  });

  it(`getOne should return provider by id`, async () => {
    expect(await sdk.providers.getOne('binance')).toEqual(
      expect.objectContaining({
        id: 16,
        name: 'Binance',
        slug: 'binance',
        strategy: 'keys',
        description: expect.any(String),
        website: 'https://www.binance.com',
        logo: expect.any(String),
      }),
    );
  });
});
