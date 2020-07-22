const api = require('../../api/index');

describe('Tests for /api/ route.', () => {

  it('should get response for the api index route for valid username and indeed a stargazer of the repository.', async () => {

    const request = {
      query: {
        username: 'lorddashme'
      }
    };

    const response = {
      setHeader: jest.fn(),
      send: jest.fn()
    };

    await api(request, response);

    expect(response.setHeader).toBeCalledWith('Cache-Control', 'public, max-age=1800');
    expect(response.setHeader).toBeCalledWith('Content-Type', 'image/svg+xml');

  }, 30000);

});
