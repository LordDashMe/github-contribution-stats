/*
 * This file is part of the Github Contribution Stats.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { shortNumberDenomination } = require('./Helper');
const { catIcon, commitIcon, pullRequestIcon, issuesIcon, codeIcon } = require('./IconTemplates');

/**
 * The Card Template Function.
 * 
 * This holds all of the templates used to build the card ratings.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 * 
 * @param {String} ratingsLetterSign The ratings letter sign counter part.
 * @param {String} ratingsColor      The ratings color counter part.
 * @param {String} ratingsProgress   The ratings progress counter part.
 * @param {Number} thisYearCommits   The total this year commits.
 * @param {Number} thisMonthCommits  The total this month commits.
 * @param {Number} thisWeekCommits   The total this week commits.
 * @param {Number} pullRequests      The total pull requests.
 * @param {Number} issues            The total issues filed.
 * @param {Number} codeReviews       The total code reviews.
 * 
 * @return {String}
 */
const CardTemplates = (
  ratingsLetterSign, 
  ratingsColor, 
  ratingsProgress, 
  thisYearCommits, 
  thisMonthCommits, 
  thisWeekCommits,
  pullRequests,
  issues,
  codeReviews
  ) => {

  const dependenciesTemplate = `
    <defs>
      <style type="text/css">
        /* cyrillic-ext */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 300;
          font-display: swap;
          src: local('Montserrat Light'), local('Montserrat-Light'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_cJD3gTD_u50.woff2) format('woff2');
          unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }
        /* cyrillic */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 300;
          font-display: swap;
          src: local('Montserrat Light'), local('Montserrat-Light'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_cJD3g3D_u50.woff2) format('woff2');
          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
        /* vietnamese */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 300;
          font-display: swap;
          src: local('Montserrat Light'), local('Montserrat-Light'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_cJD3gbD_u50.woff2) format('woff2');
          unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
        }
        /* latin-ext */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 300;
          font-display: swap;
          src: local('Montserrat Light'), local('Montserrat-Light'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_cJD3gfD_u50.woff2) format('woff2');
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 300;
          font-display: swap;
          src: local('Montserrat Light'), local('Montserrat-Light'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_cJD3gnD_g.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* cyrillic-ext */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459WRhyzbi.woff2) format('woff2');
          unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }
        /* cyrillic */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459W1hyzbi.woff2) format('woff2');
          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
        /* vietnamese */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459WZhyzbi.woff2) format('woff2');
          unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
        }
        /* latin-ext */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459Wdhyzbi.woff2) format('woff2');
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* cyrillic-ext */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: local('Montserrat Medium'), local('Montserrat-Medium'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_ZpC3gTD_u50.woff2) format('woff2');
          unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }
        /* cyrillic */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: local('Montserrat Medium'), local('Montserrat-Medium'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_ZpC3g3D_u50.woff2) format('woff2');
          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
        /* vietnamese */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: local('Montserrat Medium'), local('Montserrat-Medium'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_ZpC3gbD_u50.woff2) format('woff2');
          unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
        }
        /* latin-ext */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: local('Montserrat Medium'), local('Montserrat-Medium'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_ZpC3gfD_u50.woff2) format('woff2');
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: local('Montserrat Medium'), local('Montserrat-Medium'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_ZpC3gnD_g.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* cyrillic-ext */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: local('Montserrat SemiBold'), local('Montserrat-SemiBold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_bZF3gTD_u50.woff2) format('woff2');
          unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }
        /* cyrillic */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: local('Montserrat SemiBold'), local('Montserrat-SemiBold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_bZF3g3D_u50.woff2) format('woff2');
          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
        /* vietnamese */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: local('Montserrat SemiBold'), local('Montserrat-SemiBold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_bZF3gbD_u50.woff2) format('woff2');
          unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
        }
        /* latin-ext */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: local('Montserrat SemiBold'), local('Montserrat-SemiBold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_bZF3gfD_u50.woff2) format('woff2');
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: local('Montserrat SemiBold'), local('Montserrat-SemiBold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_bZF3gnD_g.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* cyrillic-ext */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: local('Montserrat Bold'), local('Montserrat-Bold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gTD_u50.woff2) format('woff2');
          unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }
        /* cyrillic */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: local('Montserrat Bold'), local('Montserrat-Bold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3g3D_u50.woff2) format('woff2');
          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
        /* vietnamese */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: local('Montserrat Bold'), local('Montserrat-Bold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gbD_u50.woff2) format('woff2');
          unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
        }
        /* latin-ext */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: local('Montserrat Bold'), local('Montserrat-Bold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gfD_u50.woff2) format('woff2');
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: local('Montserrat Bold'), local('Montserrat-Bold'), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gnD_g.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
      </style>
    </defs>
  `;

  const styles = `
    <style>

      .title {
        font-family: 'Montserrat', sans-serif;
        font-size: 20px;
        font-weight: 700; 
        fill: #000; 
        animation: fadeIn 0.8s ease-in-out forwards;
      }

      .item { 
        opacity: 0;
        animation: fadeIn 0.3s ease-in-out forwards;
      }
      
      .contribution-stats { 
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 14px;
        fill: #333;
      }
      
      .rating-letter-sign { 
        font-family: 'Montserrat', sans-serif;
        font-size: 38px;
        font-weight: 700; 
        fill: ${ratingsColor};
        animation: scaleIn 0.3s ease-in-out forwards;
      }

      .rating-circle-stroke {
        stroke: #ababab;
        fill: none;
        stroke-width: 7.5;
        opacity: 0.2;
      }
      
      .rating-circle {
        stroke: ${ratingsColor};
        stroke-dasharray: 250;
        fill: none;
        stroke-width: 7.5;
        stroke-linecap: round;
        opacity: 0.8;
        transform-origin: -10px 8px;
        transform: rotate(-90deg);
        animation: ratingProgressAnimation 1s forwards ease-in-out;
      }
      
      .bold { 
        font-weight: 700;
        font-family: 'Montserrat', sans-serif;
      }

      @keyframes scaleIn {
        from {
          transform: translate(-5px, 5px) scale(0);
        }
        to {
          transform: translate(-5px, 5px) scale(1);
        }
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes ratingProgressAnimation {
        from {
          stroke-dashoffset: 250;
        }
        to {
          stroke-dashoffset: ${ratingsProgress};
        }
      }

    </style>
  `;

  const ratingGraphTemplate = `
    <g id="ratings" transform="translate(265, 115)">
      <circle class="rating-circle-stroke" cx="-10" cy="8" r="40" />
      <circle class="rating-circle" cx="-10" cy="8" r="40" />
      <text class="rating-letter-sign" x="-5" y="2" text-anchor="middle" alignment-baseline="central" dominant-baseline="central">${ratingsLetterSign}</text>
    </g>
  `;

  const titleTemplate = `
    <text class="title" x="54" y="35">Contribution Stats</text>
  `;

  const commitsTemplate = `
    <svg x="30" y="50">
      <g class="item" style="animation-delay: 200ms" transform="translate(3, 2)">
        ${commitIcon}
      </g>
      <g class="stagger" style="animation-delay: 200ms" transform="translate(25, 15)">
        <text class="contribution-stats" x="0" y="0">Commits:</text>
      </g>
    </svg>
    <svg x="35" y="75">
      <g id="this_year_commits" class="item" style="animation-delay: 400ms" transform="translate(25, 15)">
        <text class="contribution-stats" x="0" y="0">This Year:</text>
        <text class="contribution-stats bold" x="101" y="0">${shortNumberDenomination(thisYearCommits, 2)}</text>
      </g>
      <g id="this_month_commits" class="item" style="animation-delay: 600ms" transform="translate(25, 35)">
        <text class="contribution-stats" x="0" y="5">This Month:</text>
        <text class="contribution-stats bold" x="101" y="5">${shortNumberDenomination(thisMonthCommits, 2)}</text>
      </g>
      <g id="this_week_commits" class="item" style="animation-delay: 800ms" transform="translate(25, 55)">
        <text class="contribution-stats" x="0" y="10">This Week:</text>
        <text class="contribution-stats bold" x="101" y="10">${shortNumberDenomination(thisWeekCommits, 2)}</text>
      </g>
    </svg>
  `;
  
  const pullRequestsTemplate = `
    <svg x="30" y="150">
      <g class="item" style="animation-delay: 1000ms" transform="translate(3, 2)">
        ${pullRequestIcon}
      </g>
      <g id="pull_requests" class="item" style="animation-delay: 1000ms" transform="translate(25, 15)">
        <text class="contribution-stats" x="0" y="0">Pull Requests:</text>
        <text class="contribution-stats bold" x="106" y="0">${shortNumberDenomination(pullRequests, 2)}</text>
      </g>
    </svg>
  `;

  const issuesTemplate = `
    <svg x="30" y="175">
      <g class="item" style="animation-delay: 1200ms" transform="translate(3, 2)">
        ${issuesIcon}
      </g>
      <g id="issues" class="item" style="animation-delay: 1200ms" transform="translate(25, 15)">
        <text class="contribution-stats" x="0" y="0">Issues:</text>
        <text class="contribution-stats bold" x="106" y="0">${shortNumberDenomination(issues, 2)}</text>
      </g>
    </svg>
  `;

  const codeReviewTemplate = `
    <svg x="30" y="200">
      <g class="item" style="animation-delay: 1400ms" transform="translate(3, 2)">
        ${codeIcon}
      </g>
      <g id="code_reviews" class="item" style="animation-delay: 1400ms" transform="translate(25, 15)">
        <text class="contribution-stats" x="0" y="0">Code Reviews:</text>
        <text class="contribution-stats bold" x="106" y="0">${shortNumberDenomination(codeReviews, 2)}</text>
      </g>
    </svg>
  `;

  return (`
    <svg width="328" height="240" viewBox="0 0 328 240" xmlns="http://www.w3.org/2000/svg">

      <rect x="0.5" y="0.5" width="327" height="100%" rx="5" fill="#efefef" stroke="#e1e4e8"/>

      ${dependenciesTemplate}
      ${styles}
      
      ${ratingGraphTemplate}
      
      ${catIcon}
      ${titleTemplate}
      ${commitsTemplate}
      ${pullRequestsTemplate}
      ${issuesTemplate}
      ${codeReviewTemplate}

    </svg>
  `);

};

module.exports = {
  CardTemplates: CardTemplates
};
