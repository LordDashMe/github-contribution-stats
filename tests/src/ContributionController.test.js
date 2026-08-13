const axios = require('axios');
const AxiosMockAdapter = require('axios-mock-adapter');
const { ContributionController } = require('../../src/ContributionController');

const mockGithubGrapQLResponse = {
  "data": {
    "user": {
      "login": "LordDashMe",
      "name": "Joshua Clifford Reyes",
      "followers": {
        "totalCount": 332
      },
      "contributionsCollection": {
        "totalCommitContributions": 1405,
        "contributionCalendar": {
          "totalContributions": 1418,
          "months": [
            {
              "totalWeeks": 3
            },
            {
              "totalWeeks": 4
            },
            {
              "totalWeeks": 5
            },
            {
              "totalWeeks": 4
            },
            {
              "totalWeeks": 4
            },
            {
              "totalWeeks": 5
            },
            {
              "totalWeeks": 4
            },
            {
              "totalWeeks": 4
            },
            {
              "totalWeeks": 5
            },
            {
              "totalWeeks": 4
            },
            {
              "totalWeeks": 5
            },
            {
              "totalWeeks": 4
            },
            {
              "totalWeeks": 2
            }
          ],
          "weeks": [
            {
              "firstDay": "2019-07-14",
              "contributionDays": [
                {
                  "contributionCount": 5
                },
                {
                  "contributionCount": 2
                },
                {
                  "contributionCount": 4
                },
                {
                  "contributionCount": 6
                },
                {
                  "contributionCount": 5
                },
                {
                  "contributionCount": 2
                },
                {
                  "contributionCount": 1
                }
              ]
            },
            {
              "firstDay": "2019-07-15",
              "contributionDays": [
                {
                  "contributionCount": 5
                },
                {
                  "contributionCount": 2
                },
                {
                  "contributionCount": 4
                },
                {
                  "contributionCount": 6
                },
                {
                  "contributionCount": 5
                },
                {
                  "contributionCount": 2
                },
                {
                  "contributionCount": 1
                }
              ]
            }
          ]
        }
      }
    }
  }
};

const mockAxios = new AxiosMockAdapter(axios);

afterEach(() => {
  mockAxios.reset();
});

describe('Tests for Contribution Controller.', () => {

  it('should generate contribution template.', async () => {

    mockAxios.onPost('https://api.github.com/graphql').reply(200, mockGithubGrapQLResponse);

    const stats = await ContributionController('LordDashMe');

  });

  it('should throw a readable error when the stats request fails.', async () => {

    // An expired token or an exhausted rate limit resolves to an empty object,
    // the controller has to name the cause instead of dereferencing into it.
    mockAxios.onPost('https://api.github.com/graphql').reply(401, {});

    await expect(ContributionController('LordDashMe')).rejects.toThrow(
      'Unable to fetch the Github stats for the username "LordDashMe".'
    );

  });

  it('should accept a pending stargazer lookup as well as a plain boolean.', async () => {

    mockAxios.onPost('https://api.github.com/graphql').reply(200, mockGithubGrapQLResponse);

    const fromPromise = await ContributionController('LordDashMe', Promise.resolve(true));
    const fromBoolean = await ContributionController('LordDashMe', true);

    expect(fromPromise).toBe(fromBoolean);

  });

});
