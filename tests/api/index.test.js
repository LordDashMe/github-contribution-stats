const api = require('../../api/index');

describe('Tests for /api/ route.', () => {

  it('should get response for the api index route.', async () => {

    const request = {
      query: {
        username: 'LordDashMe'
      }
    };

    const response = {
      setHeader: jest.fn(),
      send: jest.fn()
    };

    await api(request, response);

    expect(response.setHeader).toBeCalledWith('Cache-Control', 'public, max-age=120');
    expect(response.setHeader).toBeCalledWith('Content-Type', 'image/svg+xml');

  });

});
