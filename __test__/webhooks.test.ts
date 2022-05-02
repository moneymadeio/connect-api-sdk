import { sdk, testUrl, testWebhookId } from './env';

describe(`webhooks API`, () => {
  beforeAll(async () => {
    await sdk.init();
  });

  describe('create webhook', () => {
    describe('should',  () => {
      it('return new webhook',  async () => {
        const data = await sdk.webhooks.create(testUrl);

        expect(data).toEqual({
          id: expect.any(String),
          url: expect.any(String),
        });
      });
    });
  });

  describe('should return webhooks', () => {
    it('should return users webhooks', async () => {
      const data = await sdk.webhooks.getWebhooks();
      
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            url: expect.any(String),
          }),
        ])
      );
    });
  });
  
  describe('should return webhook by its id', () => {
    it('should return webhook', async () => {
      const data = await sdk.webhooks.getWebhook(testWebhookId);

      expect(data).toEqual({
        id: expect.any(String),
        url: expect.any(String),
      });
    });
  });
 
  describe('remove webhook by its id', () => {
    it('should delete webhook', async () => {
        await sdk.webhooks.deleteWebhook(testWebhookId);
    });
  });
});
