/*
 * This file is part of the Github Contributioin Stats.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { FetchStats } = require('../src/FetchStats');
const { CardTemplates } = require('../src/CardTemplates');
const { ContributionRatings } = require('../src/ContributionRatings');
const { 
    ComputeCommitsContribution, 
    ComputePullRequestsContribution, 
    ComputeIssuesContribution, 
    ComputeCodeReviewsContribution 
} = require('../src/ComputeContributions');

module.exports = async (req, res) => {

    const { username } = req.query;
    
    res.setHeader('Cache-Control', 'public, max-age=1800');
    res.setHeader('Content-Type', 'image/svg+xml');

    const stats = await FetchStats(username);
    
    const commits = ComputeCommitsContribution(stats.data.user.contributionsCollection);

    const thisYear = commits.thisYear;
    const thisMonth = commits.thisMonth;
    const thisWeek = commits.thisWeek;

    const pullRequests = ComputePullRequestsContribution(stats.data.user.contributionsCollection);
    const issues = ComputeIssuesContribution(stats.data.user.contributionsCollection);
    const codeReviews = ComputeCodeReviewsContribution(stats.data.user.contributionsCollection);
    
    ContributionRatings.setThisYearCommits(thisYear);
    ContributionRatings.setThisMonthCommits(thisMonth);
    ContributionRatings.setThisWeekCommits(thisWeek);
    ContributionRatings.setPullRequests(pullRequests);
    ContributionRatings.setIssues(issues);
    ContributionRatings.setCodeReviews(codeReviews);
    ContributionRatings.calculate();

    const template = CardTemplates(
        ContributionRatings.getLetterSign(), ContributionRatings.getColor(), ContributionRatings.getProgress(),
        thisYear, thisMonth, thisWeek, pullRequests, issues, codeReviews
    );

    res.send(template);
};
