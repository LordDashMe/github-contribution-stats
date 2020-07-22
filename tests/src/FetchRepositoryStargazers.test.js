const axios = require('axios');
const AxiosMockAdapter = require('axios-mock-adapter');
const { FetchRepositoryStargazers } = require('../../src/FetchRepositoryStargazers');

const mockGithubGrapQLResponse = {
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

const mockAxios = new AxiosMockAdapter(axios);

afterEach(() => {
  mockAxios.reset();
});

describe('Tests for Fetch Stats.', () => {

  it('should failed fetching repository stargazers from github.', async () => {

    mockAxios.onPost('https://api.github.com/graphql').reply(401, {});

    await FetchRepositoryStargazers('1');

  });

  it('should fetch repository stargazers from github with different http code.', async () => {

    mockAxios.onPost('https://api.github.com/graphql').reply(201, mockGithubGrapQLResponse);

    await FetchRepositoryStargazers('1');

  });

  it('should fetch repository stargazers from github.', async () => {

    mockAxios.onPost('https://api.github.com/graphql').reply(200, mockGithubGrapQLResponse);

    const repositoryStargazers = await FetchRepositoryStargazers('1');

    expect(repositoryStargazers.data.repository.stargazers.nodes[0].login).toBe('lorddashme');

  });

  it('should fetch repository stargazers from github with cursor.', async () => {

    mockAxios.onPost('https://api.github.com/graphql').reply(200, mockGithubGrapQLResponse);

    const repositoryStargazers = await FetchRepositoryStargazers('1', 'Y3Vyc29yOnYyOpIAzg2vN68=');

    expect(repositoryStargazers.data.repository.stargazers.nodes[0].login).toBe('lorddashme');

  });

});
