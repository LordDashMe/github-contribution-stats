/*
 * This file is part of the Github Contributioin Stats.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { StargazersChecker } = require('./StargazersChecker');
const { FetchRepositoryStargazers } = require('./FetchRepositoryStargazers');

const StargazersController = async (username, items) => {

  // The default value or the max allowed items from the github
  // to be fetch for each page.
  if (typeof items === 'undefined') {
    items = '100'; 
  }

  let isStargazer = false;
  let nextPage = true;
  let stargazerCheckingEnd = false;
  let cursor = '';

  do {

    let repositoryStargazers = {};

    if (cursor) {
      repositoryStargazers = await FetchRepositoryStargazers(items, cursor); 
    } else {
      repositoryStargazers = await FetchRepositoryStargazers(items); 
    }

    if (typeof repositoryStargazers.data !== 'undefined' && typeof repositoryStargazers.data.repository.stargazers !== 'undefined') {
      
      isStargazer = StargazersChecker(username, repositoryStargazers.data.repository.stargazers);

      // Is a legit user who starred the repository :-)
      if (isStargazer) {
        stargazerCheckingEnd = true;
        break;
      }
      
      nextPage = repositoryStargazers.data.repository.stargazers.pageInfo.hasNextPage;

      // At this point we are now sure that the user 
      // is not a stargazer of the repository.
      if (!nextPage) {
        break;
      }

      // Continue the searching if the user is a stargazer for the repository.
      // Maybe we can find it on the next page.
      const edges = repositoryStargazers.data.repository.stargazers.edges;
      cursor = edges[edges.length - 1].cursor;
      continue;
    }

    stargazerCheckingEnd = true;

  } while (!stargazerCheckingEnd && nextPage);

  return isStargazer;

};

module.exports = {
  StargazersController: StargazersController
};
