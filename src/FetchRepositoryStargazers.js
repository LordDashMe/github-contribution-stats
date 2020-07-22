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
 * The Fetch Repository Stargazers Function.
 * 
 * @param {String} items       The total items to be fetch from the start.
 * @param {String} afterCursor (Optional) This will be the offset for the last fetch item 
 *                             if ever there's still a next page needs to be load.
 * 
 * @return {*}
 */
const FetchRepositoryStargazers = async (items, afterCursor) => {
  
  try {

    let stargazersArguments = `first: ${items}`;

    if (typeof afterCursor !== 'undefined' && afterCursor) {
      stargazersArguments += `, after: "${afterCursor}"`
    }

    const response = await axios({
      url: 'https://api.github.com/graphql',
      method: 'POST',
      headers: {
        Authorization: `bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
      },
      data: {
        query: `query {
          repository (owner: "lorddashme", name: "github-contribution-stats") {
            stargazers(${stargazersArguments}) {
              edges {
                cursor
              }
              nodes {
                login
              }
              pageInfo {
                hasNextPage
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

    // console.error(error);
    return {};
    
  }

};

module.exports = {
  FetchRepositoryStargazers: FetchRepositoryStargazers
};
