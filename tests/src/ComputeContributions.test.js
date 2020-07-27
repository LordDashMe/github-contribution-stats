const { ComputeContributions } = require('../../src/ComputeContributions');

const mockContributionCollection = {
  "totalCommitContributions": 1405,
  "totalIssueContributions": 0,
  "totalPullRequestContributions": 2,
  "totalPullRequestReviewContributions": 0,
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
        "totalWeeks": 3
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
      },
      {
        "firstDay": "2019-07-16",
        "contributionDays": [
          {
            "contributionCount": 0
          }
        ]
      }
    ]
  }
}

describe('Tests for Compute Commits.', () => {

  it('should compute contributions.', () => {

    const computedContribution = ComputeContributions(mockContributionCollection);

    expect(computedContribution.thisYear).toBe(1418);
    expect(computedContribution.thisMonth).toBe(50);
    expect(computedContribution.pullRequests).toBe(2);
    expect(computedContribution.issues).toBe(0);
    expect(computedContribution.codeReviews).toBe(0);

  });

});
