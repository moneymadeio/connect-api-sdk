import { sdk } from './env';

describe('Providers API', () => {
  beforeAll(async () => {
    await sdk.init();
  });

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
    expect(await sdk.providers.getOne(1)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        slug: expect.any(String),
        strategy: expect.any(String),
        description: expect.any(String),
        website: expect.any(String),
        logo: expect.any(String),
      }),
    );
  });
});
