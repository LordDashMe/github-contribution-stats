const { ContributionRatings } = require('../../src/ContributionRatings');

describe('Tests for Contribution Ratings.', () => {

  it('should calculate default contribution ratings.', () => {

    ContributionRatings.newInstance();
    ContributionRatings.setThisYearCommits(0);
    ContributionRatings.setThisMonthCommits(0);
    ContributionRatings.setThisWeekCommits(0);
    ContributionRatings.setPullRequests(0);
    ContributionRatings.setIssues(0);
    ContributionRatings.setCodeReviews(0);
    ContributionRatings.calculate();
    
    expect(ContributionRatings.getLetterSign()).toBe('C');
    
  });

  it('should calculate given high contribution ratings.', () => {

    ContributionRatings.newInstance();
    ContributionRatings.setThisYearCommits(1453);
    ContributionRatings.setThisMonthCommits(53);
    ContributionRatings.setThisWeekCommits(53);
    ContributionRatings.setPullRequests(2);
    ContributionRatings.setIssues(1);
    ContributionRatings.setCodeReviews(0);
    ContributionRatings.calculate();
    
    expect(ContributionRatings.getLetterSign()).toBe('A+');

  });

  it('should calculate given lower contribution ratings.', () => {

    ContributionRatings.newInstance();
    ContributionRatings.setThisYearCommits(123);
    ContributionRatings.setThisMonthCommits(7);
    ContributionRatings.setThisWeekCommits(7);
    ContributionRatings.setPullRequests(0);
    ContributionRatings.setIssues(0);
    ContributionRatings.setCodeReviews(1);
    ContributionRatings.calculate();
    
    expect(ContributionRatings.getLetterSign()).toBe('A');

  });

  it('should calculate given middle contribution ratings.', () => {

    ContributionRatings.newInstance();
    ContributionRatings.setThisYearCommits(158);
    ContributionRatings.setThisMonthCommits(5);
    ContributionRatings.setThisWeekCommits(5);
    ContributionRatings.setPullRequests(6);
    ContributionRatings.setIssues(1);
    ContributionRatings.setCodeReviews(0);
    ContributionRatings.calculate();
    
    expect(ContributionRatings.getLetterSign()).toBe('A');

  });

});
