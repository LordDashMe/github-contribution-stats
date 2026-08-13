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

  // A failed request resolves to an empty object, reaching into it blindly
  // throws a TypeError that reads nothing like the actual cause. The common
  // reasons are an expired access token, an exhausted rate limit or a
  // username that does not exist.
  if (!stats || !stats.data || !stats.data.user) {
    throw new Error(`Unable to fetch the Github stats for the username "${username}".`);
  }

  const computedContribution = ComputeContributions(stats.data.user.contributionsCollection);

  ContributionRatings.newInstance();
  ContributionRatings.setThisYearCommits(computedContribution.thisYear);
  ContributionRatings.setThisMonthCommits(computedContribution.thisMonth);
  ContributionRatings.setThisWeekCommits(computedContribution.thisWeek);
  ContributionRatings.setPullRequests(computedContribution.pullRequests);
  ContributionRatings.setIssues(computedContribution.issues);
  ContributionRatings.setCodeReviews(computedContribution.codeReviews);
  ContributionRatings.calculate();

  // Accepts either a plain boolean or the still pending lookup started by the
  // caller, awaiting a non promise value resolves to the value itself.
  const stargazer = await isStargazer;

  return CardTemplates(
    stargazer,
    ContributionRatings.getLetterSign(),
    ContributionRatings.getTranslation(),
    ContributionRatings.getColor(), 
    ContributionRatings.getProgress(),
    computedContribution.thisYear, 
    computedContribution.thisMonth, 
    computedContribution.thisWeek, 
    computedContribution.pullRequests, 
    computedContribution.issues, 
    computedContribution.codeReviews
  );

};

module.exports = {
  ContributionController: ContributionController
};
