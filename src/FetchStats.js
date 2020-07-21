/*
 * This file is part of the Github Contribution Stats.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

require('dotenv').config();

const axios = require('axios');

/**
 * The Fetch Stats Function.
 * 
 * This function holds the request for the github graphql APIs.
 * 
 * @param {String} username The target github username for contribution stats.
 * 
 * @return {*}
 */
const FetchStats = async (username) => {
  
  try {

    const response = await axios({
      url: 'https://api.github.com/graphql',
      method: 'POST',
      headers: {
        Authorization: `bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
      },
      data: {
        query: `query {
          user(login: "${username}") {
            login
            name
            followers {
              totalCount
            }
            contributionsCollection {
              totalCommitContributions
              totalIssueContributions
              totalPullRequestContributions
              totalPullRequestReviewContributions
              contributionCalendar {
                totalContributions
                months {
                  totalWeeks
                }
                weeks {
                  firstDay
                  contributionDays {
                    contributionCount
                  }
                }
              }
            }
          }
        }` 
      }
    });

    if (response.status === 200) {
      return response.data;
    }

    return {};
    
  } catch (error) {

    console.error(error);
    return {};
    
  }

};

module.exports = {
  FetchStats: FetchStats
};
