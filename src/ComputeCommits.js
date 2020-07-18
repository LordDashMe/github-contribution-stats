/*
 * This file is part of the Github Contributioin Stats.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const computeThisYearCommits = (contributions) => {
  return contributions.contributionCalendar.totalContributions;
};

const computeThisMonthCommits = (contributions) => {

  const monthLength = contributions.contributionCalendar.months.length - 1;
  const monthWeeks = contributions.contributionCalendar.months[monthLength].totalWeeks;

  let weeksLength = contributions.contributionCalendar.weeks.length - 1;
  let collectTotalCommits = 0;

  for (let x = 0; x < monthWeeks; x++) {

    const weekDays = contributions.contributionCalendar.weeks[weeksLength].contributionDays;
    const weekDaysLength = weekDays.length - 1;

    for (let y = 0; y <= weekDaysLength; y++) {
      collectTotalCommits += weekDays[y].contributionCount;
    }

    weeksLength--;
  }

  return collectTotalCommits;

};

const computeThisWeekCommits = (contributions) => {

  const weeksLength = contributions.contributionCalendar.weeks.length - 1;
  const weekDays = contributions.contributionCalendar.weeks[weeksLength].contributionDays;
  const weekDaysLength = weekDays.length - 1;

  let collectTotalCommits = 0;

  for (let x = 0; x <= weekDaysLength; x++) {
    collectTotalCommits += weekDays[x].contributionCount;
  }

  return collectTotalCommits;

};

const ComputeCommits = (contributionsCollection) => {
  return {
    thisYear: computeThisYearCommits(contributionsCollection),
    thisMonth: computeThisMonthCommits(contributionsCollection),
    thisWeek: computeThisWeekCommits(contributionsCollection),
  };
};

module.exports = {
  ComputeCommits: ComputeCommits
};
