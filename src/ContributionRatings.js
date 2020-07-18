/*
 * This file is part of the Github Contributioin Stats.
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
      min: 95,
      letterSign: 'S',
      color: '#b30000'
    },
    {
      id: 'A_PLUS_SCORE',
      max: 94.99,
      min: 90,
      letterSign: 'A+',
      color: '#7d00b3'
    },
    {
      id: 'A_SCORE',
      max: 89.99,
      min: 80,
      letterSign: 'A',
      color: '#1eb300'
    },
    {
      id: 'B_PLUS_SCORE',
      max: 79.99,
      min: 75,
      letterSign: 'B+',
      color: '#2fa0ed'
    },
    {
      id: 'B_SCORE',
      max: 74.99,
      min: 65,
      letterSign: 'B',
      color: '#2f74ed'
    },
    {
      id: 'C_SCORE',
      max: 64.99,
      min: 0,
      letterSign: 'C',
      color: '#ed962f'
    }
  ],
  metrics: {
    SIGMA: 1000,
    THIS_YEAR_COMMITS: 0.8,
    THIS_MONTH_COMMITS: 1,
    THIS_WEEK_COMMITS: 1.5
  },
  ratings: {
    letterSign: '',
    color: ''
  },
  thisYearCommits: 0,
  thisMonthCommits: 0,
  thisWeekCommits: 0,
  overallScores: 0,
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
   * The calculate process for the Contribution Ratings.
   * 
   * @return {VoidFunction}
   */
  calculate: () => {

    const self = ContributionRatings;
    const x = self.thisYearCommits + self.thisMonthCommits + self.thisWeekCommits;
    const mu = mean([self.thisYearCommits, self.thisMonthCommits, self.thisWeekCommits]);
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
  }
};

module.exports = {
  ContributionRatings: ContributionRatings
};
