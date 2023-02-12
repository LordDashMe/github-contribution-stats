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
 * @param {Boolean} isStargazer       Flag if the username is a stargazer of the repository.
 * @param {String} ratingsLetterSign  The ratings letter sign counter part.
 * @param {String} ratingsTranslation The ratings translation counter part.
 * @param {String} ratingsColor       The ratings color counter part.
 * @param {String} ratingsProgress    The ratings progress counter part.
 * @param {Number} thisYearCommits    The total this year commits.
 * @param {Number} thisMonthCommits   The total this month commits.
 * @param {Number} thisWeekCommits    The total this week commits.
 * @param {Number} pullRequests       The total pull requests.
 * @param {Number} issues             The total issues filed.
 * @param {Number} codeReviews        The total code reviews.
 * @param {String} theme              Theme to render template.
 *
 * @return {String}
 */
const CardTemplates = (
  isStargazer,
  ratingsLetterSign,
  ratingsTranslation,
  ratingsColor, 
  ratingsProgress, 
  thisYearCommits, 
  thisMonthCommits, 
  thisWeekCommits,
  pullRequests,
  issues,
  codeReviews,
  theme = 'light',
  ) => {

  const colorSets = {
      light: {
        background: {
            fill: '#efefef',
            stroke: '#e1e4e8',
        },
        title: '#000',
        stats: '#333',
        rating: '#ababab',
        icons: '#000',
    },
    dark: {
        background: {
            fill: '#343846',
            stroke: '#171616',
        },
        title: '#deeeec',
        stats: 'white',
        rating: '#ababab',
        icons: '#deeeec',
    },
  }

  const colors = colorSets.hasOwnProperty(theme) ? colorSets[theme] : colorSets.light;

  const styles = `
    <style>
       .icon {
         fill: ${colors.icons};
       }

      .title {
        font-family: "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
        font-size: 20px;
        font-weight: 700; 
        fill: ${colors.title}; 
        animation: fadeIn 0.8s ease-in-out forwards;
      }

      .item { 
        opacity: 0;
        animation: fadeIn 0.3s ease-in-out forwards;
      }
      
      .contribution-stats { 
        font-family: "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
        font-weight: 400;
        font-size: 14px;
        fill: ${colors.stats};
      }

      .remarks {
        font-size: 11px;
      }

      ${(!isStargazer ? '.repo-origin {font-size: 10px;}' : '')}
      
      .rating-letter-sign { 
        font-family: "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
        font-size: 38px;
        font-weight: 700; 
        fill: ${ratingsColor};
        animation: scaleIn 0.3s ease-in-out forwards;
      }

      .rating-circle-stroke {
        stroke: ${colors.rating};
        stroke-width: 7.5;
        fill: none;
        opacity: 0.2;
      }
      
      .rating-circle {
        stroke: ${ratingsColor};
        stroke-dasharray: 250;
        stroke-width: 7.5;
        stroke-linecap: round;
        fill: none;
        opacity: 0.8;
        transform-origin: -10px 8px;
        transform: rotate(-90deg);
        animation: ratingProgressAnimation 1s forwards ease-in-out;
      }
      
      .bolder { 
        font-weight: 700;
        font-family: "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
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

  const cardBackgroundTemplate = `
    <rect x="0.5" y="0.5" rx="5" width="327" height="100%" fill="${colors.background.fill}" stroke="${colors.background.stroke}" />
  `;

  const ratingGraphTemplate = `
    <g id="ratings" transform="translate(265, 115)">
      <circle class="rating-circle-stroke" cx="-10" cy="8" r="38" />
      <circle class="rating-circle" cx="-10" cy="8" r="38" />
      <text class="rating-letter-sign" x="-5" y="1.5" text-anchor="middle" alignment-baseline="central" dominant-baseline="central">${ratingsLetterSign}</text>
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
        <text class="contribution-stats bolder" x="101" y="0">${shortNumberDenomination(thisYearCommits, 2)}</text>
      </g>
      <g id="this_month_commits" class="item" style="animation-delay: 600ms" transform="translate(25, 35)">
        <text class="contribution-stats" x="0" y="5">This Month:</text>
        <text class="contribution-stats bolder" x="101" y="5">${shortNumberDenomination(thisMonthCommits, 2)}</text>
      </g>
      <g id="this_week_commits" class="item" style="animation-delay: 800ms" transform="translate(25, 55)">
        <text class="contribution-stats" x="0" y="10">This Week:</text>
        <text class="contribution-stats bolder" x="101" y="10">${shortNumberDenomination(thisWeekCommits, 2)}</text>
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
        <text class="contribution-stats bolder" x="106" y="0">${shortNumberDenomination(pullRequests, 2)}</text>
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
        <text class="contribution-stats bolder" x="106" y="0">${shortNumberDenomination(issues, 2)}</text>
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
        <text class="contribution-stats bolder" x="106" y="0">${shortNumberDenomination(codeReviews, 2)}</text>
      </g>
    </svg>
  `;
  
  const remarksTemplate = `
    <svg x="-6" y="224">
      <g class="item" style="animation-delay: 1600ms" transform="translate(25, 15)">
        <text class="contribution-stats remarks" x="0" y="0">Remarks: The contributor stats score rating is ${ratingsTranslation}</text>
      </g>
    </svg>
  `;

  const originTemplate = `
    <svg x="-6" y="240">
      <g class="item" style="animation-delay: 1600ms" transform="translate(25, 15)">
        <text class="contribution-stats repo-origin" x="0" y="0">Visit: https://github.com/lorddashme/github-contribution-stats</text>
        <text class="contribution-stats repo-origin" x="0" y="15">To support the project and remove this message,</text>
        <text class="contribution-stats repo-origin" x="0" y="25">simply add a star to the repository. Once done, it may take a few</text>
        <text class="contribution-stats repo-origin" x="0" y="35">minutes or hours to remove this message from the template</text>
        <text class="contribution-stats repo-origin" x="0" y="45">because of the caching implemented to optimize the service.</text>
      </g>
    </svg> 
  `;

  const cardHeightTemplate = (!isStargazer ? '320' : '260');

  return (`
    <svg width="328" height="${cardHeightTemplate}" viewBox="0 0 328 ${cardHeightTemplate}" ${theme ? `style="background-color: ${colors.background.fill}"` : ''} xmlns="http://www.w3.org/2000/svg">
      ${styles}
      ${cardBackgroundTemplate}
      
      ${ratingGraphTemplate}
      
      ${catIcon}
      ${titleTemplate}

      ${commitsTemplate}
      ${pullRequestsTemplate}
      ${issuesTemplate}
      ${codeReviewTemplate}
      
      ${remarksTemplate}
    
      ${(!isStargazer ? originTemplate : '')}
    </svg>
  `);

};

module.exports = {
  CardTemplates: CardTemplates
};
