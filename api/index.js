const { FetchStats } = require('../src/FetchStats');
const { ContributionRatings } = require('../src/ContributionRatings');
const { ComputeCommits } = require('../src/ComputeCommits');
const { CardTemplates } = require('../src/CardTemplates');

module.exports = async (request, response) => {

    const { username } = request.query;
    
    response.setHeader('Cache-Control', 'public, max-age=120');
    response.setHeader('Content-Type', 'image/svg+xml');

    const stats = await FetchStats(username);
    
    const commits = ComputeCommits(stats.data.user.contributionsCollection);

    const thisYear = commits.thisYear;
    const thisMonth = commits.thisMonth;
    const thisWeek = commits.thisWeek;
    
    ContributionRatings.setThisYearCommits(thisYear);
    ContributionRatings.setThisMonthCommits(thisMonth);
    ContributionRatings.setThisWeekCommits(thisWeek);
    ContributionRatings.calculate();

    console.log('stats', ContributionRatings.getLetterSign());

    response.send(CardTemplates(
        ContributionRatings.getLetterSign(), 
        ContributionRatings.getColor(), 
        ContributionRatings.getProgress(),
        thisYear, thisMonth, thisWeek
    ));
};
