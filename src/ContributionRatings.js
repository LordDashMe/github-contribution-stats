/*
 * This file is part of the Github Contribution Stats.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { mean, zScore, standardNormalDistribution } = require('./Helper');

/**
 * The Contribution Ratings Object Class.
 * 
 * This object class is responsible for calculating and managing
 * the overall contributions based on the hardcoded metrics.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
const ContributionRatings = {
  scores: [
    {
      id: 'S_SCORE',
      max: 100,
      min: 98,
      letterSign: 'S',
      color: '#b30000',
      progress: '0'
    },
    {
      id: 'A_PLUS_SCORE',
      max: 97,
      min: 75,
      letterSign: 'A+',
      color: '#7d00b3',
      progress: '50'
    },
    {
      id: 'A_SCORE',
      max: 74,
      min: 65,
      letterSign: 'A',
      color: '#1eb300',
      progress: '100'
    },
    {
      id: 'B_PLUS_SCORE',
      max: 64,
      min: 55,
      letterSign: 'B+',
      color: '#2fa0ed',
      progress: '120'
    },
    {
      id: 'B_SCORE',
      max: 54,
      min: 40,
      letterSign: 'B',
      color: '#2f74ed',
      progress: '140'
    },
    {
      id: 'C_SCORE',
      max: 39,
      min: 0,
      letterSign: 'C',
      color: '#ed962f',
      progress: '170'
    }
  ],
  metrics: {
    SIGMA: 500,
    THIS_YEAR_COMMITS: 0.6,
    THIS_MONTH_COMMITS: 0.8,
    THIS_WEEK_COMMITS: 1,
    PULL_REQUESTS: 2,
    ISSUES: 2,
    CODE_REVIEWS: 2
  },
  ratings: {
    letterSign: '',
    color: '',
    progress: ''
  },
  thisYearCommits: 0,
  thisMonthCommits: 0,
  thisWeekCommits: 0,
  pullRequests: 0,
  issues: 0,
  codeReviews: 0,
  overallScores: 0,

  /**
   * Re-initialize new instance of the object class.
   * 
   * @return {VoidFunction}
   */
  newInstance: () => {

    const self = ContributionRatings;

    self.ratings = {
      letterSign: '',
      color: '',
      progress: ''
    };

    self.thisYearCommits = 0;
    self.thisMonthCommits = 0;
    self.thisWeekCommits = 0;
    self.pullRequests = 0;
    self.issues = 0;
    self.codeReviews = 0;
    self.overallScores = 0;
  },

  /**
   * The setter method for the this year commits property.
   * 
   * @param {Number} thisYearCommits The total commits for this year.
   * 
   * @return {VoidFunction}
   */
  setThisYearCommits: (thisYearCommits) => {

    const self = ContributionRatings;

    if (typeof thisYearCommits !== 'undefined' && thisYearCommits) {
      self.thisYearCommits = thisYearCommits * self.metrics.THIS_YEAR_COMMITS; 
    }
  },

  /**
   * The setter method for the this month commits property.
   * 
   * @param {Number} thisMonthCommits The total commits for this month.
   * 
   * @return {VoidFunction}
   */
  setThisMonthCommits: (thisMonthCommits) => {

    const self = ContributionRatings;

    if (typeof thisMonthCommits !== 'undefined' && thisMonthCommits) {
      self.thisMonthCommits = thisMonthCommits * self.metrics.THIS_MONTH_COMMITS;
    }
  },

  /**
   * The setter method for the this week commits property.
   * 
   * @param {Number} thisWeekCommits The total commits for this week.
   * 
   * @return {VoidFunction}
   */
  setThisWeekCommits: (thisWeekCommits) => {

    const self = ContributionRatings;

    if (typeof thisWeekCommits !== 'undefined' && thisWeekCommits) {
      self.thisWeekCommits = thisWeekCommits * self.metrics.THIS_WEEK_COMMITS;
    }
  },

  /**
   * The setter method for the pull requests property.
   * 
   * @param {Number} pullRequests The total pull requests.
   * 
   * @return {VoidFunction}
   */
  setPullRequests: (pullRequests) => {

    const self = ContributionRatings;

    if (typeof pullRequests !== 'undefined' && pullRequests) {
      self.pullRequests = pullRequests * self.metrics.PULL_REQUESTS;
    }
  },

  /**
   * The setter method for the issues property.
   * 
   * @param {Number} issues The total issues.
   * 
   * @return {VoidFunction}
   */
  setIssues: (issues) => {

    const self = ContributionRatings;

    if (typeof issues !== 'undefined' && issues) {
      self.issues = issues * self.metrics.ISSUES;
    }
  },

  /**
   * The setter method for the code reviews property.
   * 
   * @param {Number} codeReviews The total code reviews.
   * 
   * @return {VoidFunction}
   */
  setCodeReviews: (codeReviews) => {

    const self = ContributionRatings;

    if (typeof codeReviews !== 'undefined' && codeReviews) {
      self.codeReviews = codeReviews * self.metrics.CODE_REVIEWS;
    }
  },

  /**
   * The calculate process for the Contribution Ratings.
   * 
   * @return {VoidFunction}
   */
  calculate: () => {

    const self = ContributionRatings;
    
    const x = (
      self.thisYearCommits + 
      self.thisMonthCommits + 
      self.thisWeekCommits +
      self.pullRequests +
      self.issues +
      self.codeReviews
    );

    const mu = mean([
      self.thisYearCommits, 
      self.thisMonthCommits, 
      self.thisWeekCommits,
      self.pullRequests,
      self.issues,
      self.codeReviews
    ]);

    const z = zScore(x, mu, self.metrics.SIGMA);

    self.overallScores = standardNormalDistribution(z) * 100;

    self.processOverallScoresCondition();
  },

  /**
   * The process for overall scores condition.
   * 
   * @return {VoidFunction}
   */
  processOverallScoresCondition: () => {

    const self = ContributionRatings;
    const scoresLength = self.scores.length;

    for (let x = 0; x < scoresLength; x++ ) {
      if (self.overallScores <= self.scores[x].max && self.overallScores >= self.scores[x].min) {
        self.ratings = self.scores[x];
        break;
      }
    }
  },

  /**
   * The getter method for the property ratings letter sign.
   * 
   * @return {String}
   */
  getLetterSign: () => {
    return ContributionRatings.ratings.letterSign;
  },

  /**
   * The getter method for the property ratings color.
   * 
   * @return {String}
   */
  getColor: () => {
    return ContributionRatings.ratings.color;
  },

  /**
   * The getter method for the property ratings progress.
   * 
   * @return {String}
   */
  getProgress: () => {
    return ContributionRatings.ratings.progress;
  }
};

module.exports = {
  ContributionRatings: ContributionRatings
};
