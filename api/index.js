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
const { ComputeCommits } = require('../src/ComputeCommits');
const { ContributionRatings } = require('../src/ContributionRatings');

module.exports = async (req, res) => {

    const { username } = req.query;
    
    res.setHeader('Cache-Control', 'public, max-age=1800');
    res.setHeader('Content-Type', 'image/svg+xml');

    const stats = await FetchStats(username);
    
    const commits = ComputeCommits(stats.data.user.contributionsCollection);

    const thisYear = commits.thisYear;
    const thisMonth = commits.thisMonth;
    const thisWeek = commits.thisWeek;
    
    ContributionRatings.setThisYearCommits(thisYear);
    ContributionRatings.setThisMonthCommits(thisMonth);
    ContributionRatings.setThisWeekCommits(thisWeek);
    ContributionRatings.calculate();

    const template = CardTemplates(
        ContributionRatings.getLetterSign(), ContributionRatings.getColor(), ContributionRatings.getProgress(),
        thisYear, thisMonth, thisWeek
    );

    res.send(template);
};
