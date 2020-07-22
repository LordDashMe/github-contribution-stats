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

});
