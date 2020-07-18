const { ComputeCommits } = require('../../src/ComputeCommits');

const mockContributionCollection = {
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

describe('Tests for Compute Commits.', () => {

  it('should compute commits.', () => {
    expect(ComputeCommits(mockContributionCollection).thisYear).toBe(1418);
  });

});
