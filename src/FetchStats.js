/*
 * This file is part of the Github Contributioin Stats.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

require('dotenv').config();

const axios = require('axios');

const FetchStats = async (username) => {
  
  try {

    const response = await axios({
      url: 'https://api.github.com/graphql',
      method: 'POST',
      headers: {
        Authorization: `bearer ${process.env.GITHUB_USER_TOKEN}`
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
    
    return {};
  }
};

module.exports = {
  FetchStats: FetchStats
};
