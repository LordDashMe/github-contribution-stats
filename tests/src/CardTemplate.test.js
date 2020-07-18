const { CardTemplates } = require('../../src/CardTemplates');

const stats = {
  ratingsLetterSign: 'A+',
  ratingsColor: '#7d00b3',
  ratingsProgress: '30',
  thisYearCommits: 1415,
  thisMonthCommits: 500,
  thisWeekCommits: 5
};

describe('Tests for Card Templates.', () => {

  it('should prepare card templates.', () => {
    document.body.innerHTML = CardTemplates(
      stats.ratingsLetterSign,
      stats.ratingsColor,
      stats.ratingsProgress,
      stats.thisYearCommits,
      stats.thisMonthCommits,
      stats.thisWeekCommits
    );
    
    expect(document.body.getElementsByTagName('svg')[0].getAttribute('width')).toBe('310');
    expect(document.getElementById('this_year_commits').getElementsByClassName('bold')[0].textContent).toBe('1.42k');
    expect(document.getElementById('this_month_commits').getElementsByClassName('bold')[0].textContent).toBe('500');
    expect(document.getElementById('this_week_commits').getElementsByClassName('bold')[0].textContent).toBe('5');
  });

});
