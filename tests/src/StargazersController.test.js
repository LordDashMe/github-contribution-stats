const axios = require('axios');
const AxiosMockAdapter = require('axios-mock-adapter');
const { StargazersController } = require('../../src/StargazersController');

const mockGithubGrapQLResponseFirstPage = {
  "data": {
    "repository": {
      "stargazers": {
        "edges": [
          {
            "cursor": "Y3Vyc29yOnYyOpIAzg2vN68="
          }
        ],
        "nodes": [
          {
            "login": "lorddashme"
          }
        ],
        "pageInfo": {
          "hasNextPage": true
        }
      }
    }
  }
};

const mockGithubGrapQLResponseLastPage = {
  "data": {
    "repository": {
      "stargazers": {
        "edges": [
          {
            "cursor": "Y3Vyc29yOnYyOpIAzg2vN69="
          }
        ],
        "nodes": [
          {
            "login": "chiedev"
          }
        ],
        "pageInfo": {
          "hasNextPage": false
        }
      }
    }
  }
};

const mockAxios = new AxiosMockAdapter(axios);

afterEach(() => {
  mockAxios.reset();
});

describe('Tests for Stargazers Controller.', () => {

  it('should failed request from the graphql request scenario.', async () => {

    mockAxios.onPost('https://api.github.com/graphql').reply(401, {});

    await StargazersController('lorddashme');

  });

  it('should check if the username is a stargazers from the repository.', async () => {

    mockAxios.onPost('https://api.github.com/graphql').reply(200, mockGithubGrapQLResponseFirstPage);

    await StargazersController('lorddashme', '1');

  });

  it('should check if the username is a stargazers from the repository with default items used.', async () => {

    mockAxios.onPost('https://api.github.com/graphql').reply(function (config) {
      return new Promise(function (resolve, reject) {
        if (JSON.parse(config.data).query.indexOf('after:') > -1) {
          resolve([200, mockGithubGrapQLResponseLastPage]);
        } else {
          resolve([200, mockGithubGrapQLResponseFirstPage]);
        }
      });
    });

    await StargazersController('unknowuserfromjupiter');

  });

  it('should not be a stargazer when no username is given.', async () => {

    expect(await StargazersController()).toBe(false);
    expect(await StargazersController('')).toBe(false);

  });

  it('should stop paginating once the maximum allowed pages is reached.', async () => {

    mockAxios.onPost('https://api.github.com/graphql').reply(200, mockGithubGrapQLResponseFirstPage);

    expect(await StargazersController('unknowuserfromjupiter')).toBe(false);

    // The mock always reports a next page, the walk has to be cut short by the
    // page budget instead of following the repository forever.
    expect(mockAxios.history.post.length).toBe(10);

  });

  it('should stop paginating once the time budget is spent.', async () => {

    mockAxios.onPost('https://api.github.com/graphql').reply(200, mockGithubGrapQLResponseFirstPage);

    const realDateNow = Date.now;
    let call = 0;

    // The first call sets the deadline, every call after it reports a clock
    // that has already moved past that deadline.
    Date.now = () => (call++ === 0 ? 0 : Number.MAX_SAFE_INTEGER);

    try {
      expect(await StargazersController('unknowuserfromjupiter')).toBe(false);
      expect(mockAxios.history.post.length).toBe(1);
    } finally {
      Date.now = realDateNow;
    }

  });

  it('should not be a stargazer when the lookup throws.', async () => {

    // A node without a login makes the checker throw, the flag is cosmetic so
    // the failure must not escape to the caller.
    mockAxios.onPost('https://api.github.com/graphql').reply(200, {
      "data": {
        "repository": {
          "stargazers": {
            "edges": [{ "cursor": "Y3Vyc29yOnYyOpIAzg2vN68=" }],
            "nodes": [{}],
            "pageInfo": { "hasNextPage": false }
          }
        }
      }
    });

    expect(await StargazersController('lorddashme')).toBe(false);

  });

});
