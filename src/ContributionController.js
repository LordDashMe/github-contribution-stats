/*
 * This file is part of the Github Contributioin Stats.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { FetchStats } = require('./FetchStats');
const { CardTemplates } = require('./CardTemplates');
const { ContributionRatings } = require('./ContributionRatings');
const { ComputeContributions } = require('./ComputeContributions');

const ContributionController = async (username, isStargazer) => {

  const stats = await FetchStats(username);

  const computedContribution = ComputeContributions(stats.data.user.contributionsCollection);

  const thisYear = computedContribution.thisYear;
  const thisMonth = computedContribution.thisMonth;
  const thisWeek = computedContribution.thisWeek;
  const pullRequests = computedContribution.pullRequests;
  const issues = computedContribution.issues;
  const codeReviews = computedContribution.codeReviews;
  
  ContributionRatings.newInstance();
  ContributionRatings.setThisYearCommits(thisYear);
  ContributionRatings.setThisMonthCommits(thisMonth);
  ContributionRatings.setThisWeekCommits(thisWeek);
  ContributionRatings.setPullRequests(pullRequests);
  ContributionRatings.setIssues(issues);
  ContributionRatings.setCodeReviews(codeReviews);
  ContributionRatings.calculate();

  return CardTemplates(
    isStargazer,
    ContributionRatings.getLetterSign(), 
    ContributionRatings.getColor(), 
    ContributionRatings.getProgress(),
    thisYear, 
    thisMonth, 
    thisWeek, 
    pullRequests, 
    issues, 
    codeReviews
  );

};

module.exports = {
  ContributionController: ContributionController
};
