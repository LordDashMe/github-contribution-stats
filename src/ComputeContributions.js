/*
 * This file is part of the Github Contributioin Stats.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * The Compute This Year Commits Function.
 * 
 * All logic related to the computation of the current year commits.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 * 
 * @param {*} contributions The github current contribution data.
 * 
 * @return {Number}
 */
const computeThisYearCommits = (contributions) => {
  return contributions.contributionCalendar.totalContributions;
};

/**
 * The Compute This Month Commits Function.
 * 
 * All logic related to the computation of the current month commits.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 * 
 * @param {*} contributions The github current contribution data.
 * 
 * @return {Number}
 */
const computeThisMonthCommits = (contributions) => {

  const monthLength = contributions.contributionCalendar.months.length - 1;
  
  let monthWeeks = contributions.contributionCalendar.months[monthLength].totalWeeks;
  let weeksLength = contributions.contributionCalendar.weeks.length - 1;
  let collectTotalCommits = 0;

  do {

    const weekDays = contributions.contributionCalendar.weeks[weeksLength].contributionDays;
    const weekDaysLength = weekDays.length - 1;

    for (let x = 0; x <= weekDaysLength; x++) {
      collectTotalCommits += weekDays[x].contributionCount;
    }

    weeksLength--;
    monthWeeks--;

  } while (monthWeeks <= 0);

  return collectTotalCommits;

};

/**
 * The Compute This Week Commits Function.
 * 
 * All logic related to the computation of the current Week commits.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 * 
 * @param {*} contributions The github current contribution data.
 * 
 * @return {Number}
 */
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

/**
 * Consolidated Computation of the Commits Contribution.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 * 
 * @param {*} contributions The github current contribution data.
 * 
 * @return {Number}
 */
const ComputeCommitsContribution = (contributions) => {
  return {
    thisYear: computeThisYearCommits(contributions),
    thisMonth: computeThisMonthCommits(contributions),
    thisWeek: computeThisWeekCommits(contributions),
  };
};

/**
 * Consolidated Computation of the Pull Requests Contribution.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 * 
 * @param {*} contributions The github current contribution data.
 * 
 * @return {Number}
 */
const ComputePullRequestsContribution = (contributions) => {
  return contributions.totalPullRequestContributions;
};

/**
 * Consolidated Computation of the Issues Contribution.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 * 
 * @param {*} contributions The github current contribution data.
 * 
 * @return {Number}
 */
const ComputeIssuesContribution = (contributions) => {
  return contributions.totalIssueContributions;
};

/**
 * Consolidated Computation of the Code Reviews Contribution.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 * 
 * @param {*} contributions The github current contribution data.
 * 
 * @return {Number}
 */
const ComputeCodeReviewsContribution = (contributions) => {
  return contributions.totalPullRequestReviewContributions;
};

module.exports = {
  ComputeCommitsContribution: ComputeCommitsContribution,
  ComputePullRequestsContribution: ComputePullRequestsContribution,
  ComputeIssuesContribution: ComputeIssuesContribution,
  ComputeCodeReviewsContribution: ComputeCodeReviewsContribution
};
