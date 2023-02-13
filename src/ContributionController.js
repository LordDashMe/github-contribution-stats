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

const ContributionController = async (username, isStargazer, theme, themeOverrides) => {

  const stats = await FetchStats(username);

  const computedContribution = ComputeContributions(stats.data.user.contributionsCollection);
  
  ContributionRatings.newInstance();
  ContributionRatings.setThisYearCommits(computedContribution.thisYear);
  ContributionRatings.setThisMonthCommits(computedContribution.thisMonth);
  ContributionRatings.setThisWeekCommits(computedContribution.thisWeek);
  ContributionRatings.setPullRequests(computedContribution.pullRequests);
  ContributionRatings.setIssues(computedContribution.issues);
  ContributionRatings.setCodeReviews(computedContribution.codeReviews);
  ContributionRatings.calculate();

  return CardTemplates(
    isStargazer,
    ContributionRatings.getLetterSign(),
    ContributionRatings.getTranslation(),
    ContributionRatings.getColor(), 
    ContributionRatings.getProgress(),
    computedContribution.thisYear, 
    computedContribution.thisMonth, 
    computedContribution.thisWeek, 
    computedContribution.pullRequests, 
    computedContribution.issues, 
    computedContribution.codeReviews,
    theme,
    themeOverrides,
  );

};

module.exports = {
  ContributionController: ContributionController
};
