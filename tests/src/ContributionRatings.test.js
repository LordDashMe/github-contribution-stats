const { ContributionRatings } = require('../../src/ContributionRatings');

describe('Tests for Contribution Ratings.', () => {

  it('should calculate default contribution ratings.', () => {
    ContributionRatings.setThisYearCommits(0);
    ContributionRatings.setThisMonthCommits(0);
    ContributionRatings.setThisWeekCommits(0);
    ContributionRatings.calculate();
    
    expect(ContributionRatings.getLetterSign()).toBe('C');
    expect(ContributionRatings.getColor()).toBe('#ed962f');
  });

  it('should calculate given contribution ratings.', () => {
    ContributionRatings.setThisYearCommits(1415);
    ContributionRatings.setThisMonthCommits(1);
    ContributionRatings.setThisWeekCommits(1);
    ContributionRatings.calculate();
    
    expect(ContributionRatings.getLetterSign()).toBe('B+');
    expect(ContributionRatings.getColor()).toBe('#2fa0ed');
  });

});
