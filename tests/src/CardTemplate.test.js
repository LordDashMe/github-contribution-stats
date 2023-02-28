const { CardTemplates } = require('../../src/CardTemplates');

const stats = {
  ratingsLetterSign: 'A+',
  ratingsTranslation: 'Very Good!',
  ratingsColor: '#7d00b3',
  ratingsProgress: '30',
  thisYearCommits: 1415,
  thisMonthCommits: 500,
  thisWeekCommits: 5,
  pullRequests: 1,
  issues: 0,
  codeReviews: 1
};

describe('Tests for Card Templates.', () => {

  it('should prepare card templates.', () => {

    document.body.innerHTML = CardTemplates(
      true,
      stats.ratingsLetterSign,
      stats.ratingsTranslation,
      stats.ratingsColor,
      stats.ratingsProgress,
      stats.thisYearCommits,
      stats.thisMonthCommits,
      stats.thisWeekCommits,
      stats.pullRequests,
      stats.issues,
      stats.codeReviews
    );
    
    expect(document.body.getElementsByTagName('svg')[0].getAttribute('height')).toBe('260');
    expect(document.getElementById('this_year_commits').getElementsByClassName('bolder')[0].textContent).toBe('1.42k');
    expect(document.getElementById('this_month_commits').getElementsByClassName('bolder')[0].textContent).toBe('500');
    expect(document.getElementById('this_week_commits').getElementsByClassName('bolder')[0].textContent).toBe('5');
    expect(document.getElementById('pull_requests').getElementsByClassName('bolder')[0].textContent).toBe('1');
    expect(document.getElementById('issues').getElementsByClassName('bolder')[0].textContent).toBe('0');
    expect(document.getElementById('code_reviews').getElementsByClassName('bolder')[0].textContent).toBe('1');

  });

  it('should prepare card templates for non-stargazer.', () => {

    document.body.innerHTML = CardTemplates(
      false,
      stats.ratingsLetterSign,
      stats.ratingsTranslation,
      stats.ratingsColor,
      stats.ratingsProgress,
      stats.thisYearCommits,
      stats.thisMonthCommits,
      stats.thisWeekCommits,
      stats.pullRequests,
      stats.issues,
      stats.codeReviews
    );
    
    expect(document.body.getElementsByTagName('svg')[0].getAttribute('height')).toBe('320');
    expect(document.getElementById('this_year_commits').getElementsByClassName('bolder')[0].textContent).toBe('1.42k');
    expect(document.getElementById('this_month_commits').getElementsByClassName('bolder')[0].textContent).toBe('500');
    expect(document.getElementById('this_week_commits').getElementsByClassName('bolder')[0].textContent).toBe('5');
    expect(document.getElementById('pull_requests').getElementsByClassName('bolder')[0].textContent).toBe('1');
    expect(document.getElementById('issues').getElementsByClassName('bolder')[0].textContent).toBe('0');
    expect(document.getElementById('code_reviews').getElementsByClassName('bolder')[0].textContent).toBe('1');

  });

  it('should prepare card templates for dark theme.', () => {
    document.body.innerHTML = CardTemplates(
      false,
      stats.ratingsLetterSign,
      stats.ratingsTranslation,
      stats.ratingsColor,
      stats.ratingsProgress,
      stats.thisYearCommits,
      stats.thisMonthCommits,
      stats.thisWeekCommits,
      stats.pullRequests,
      stats.issues,
      stats.codeReviews,
      'dark'
    );

    expect(document.body.getElementsByTagName('svg')[0].getAttribute('style')).not.toBeNull();
    expect(document.getElementsByTagName('rect')[0].getAttribute('fill')).toBe('#343846');
    expect(document.getElementsByTagName('rect')[0].getAttribute('stroke')).toBe('#171616');
  });

  it('should prepare card templates with overrides.', () => {
    const backgroundFill = '#dfdfdf';
    const backgroundStroke = '#fafafaf';
    const titleColor = '#efefef';
    const statsColor = '#afafafaf';
    const ratingsColor = '#cdcdcc';
    const iconColor = '#dddddd';

    document.body.innerHTML = CardTemplates(
      false,
      stats.ratingsLetterSign,
      stats.ratingsTranslation,
      stats.ratingsColor,
      stats.ratingsProgress,
      stats.thisYearCommits,
      stats.thisMonthCommits,
      stats.thisWeekCommits,
      stats.pullRequests,
      stats.issues,
      stats.codeReviews,
      'dark',
      {
        background: {
          fill: backgroundFill,
          stroke: backgroundStroke
        },
        title: titleColor,
        stats: statsColor,
        rating: ratingsColor,
        icons: iconColor,
      }
    );

    expect(document.body.innerHTML).toContain(backgroundFill);
    expect(document.body.innerHTML).toContain(backgroundStroke);
    expect(document.body.innerHTML).toContain(titleColor);
    expect(document.body.innerHTML).toContain(statsColor);
    expect(document.body.innerHTML).toContain(ratingsColor);
    expect(document.body.innerHTML).toContain(iconColor);
  });
});
