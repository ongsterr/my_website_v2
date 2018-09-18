const requests = require('../../utility/api');

describe('Testing all /tags endpoints', () => {
  describe('Fetching all tags from api', () => {
    const url = '/tags';

    it('should return an array of tags', async () => {
      const response = await requests.get(url);
      const { data } = response;

      expect(Array.isArray(data.tags)).toBeTruthy();
    });
  });
});
