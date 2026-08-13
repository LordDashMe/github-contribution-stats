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

// The stargazers list is walked one page at a time and a username that never
// starred the repository only settles on the very last page. Both limits below
// stop that walk from growing with the repository and taking the whole request
// down with it, the flag only controls a footer on the card so falling back to
// "not a stargazer" is far better than failing to answer at all.
const MAX_PAGES = 10;
const DEADLINE_IN_MILLISECONDS = 4000;

const StargazersController = async (username, items) => {

  // The default value or the max allowed items from the github
  // to be fetch for each page.
  if (typeof items === 'undefined') {
    items = '100';
  }

  if (!username) {
    return false;
  }

  const deadline = Date.now() + DEADLINE_IN_MILLISECONDS;

  let isStargazer = false;
  let nextPage = true;
  let stargazerCheckingEnd = false;
  let cursor = '';
  let pages = 0;

  try {

    do {

      let repositoryStargazers = {};

      if (cursor) {
        repositoryStargazers = await FetchRepositoryStargazers(items, cursor);
      } else {
        repositoryStargazers = await FetchRepositoryStargazers(items);
      }

      pages++;

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

        // Give up the search once either budget is spent, the remaining pages
        // are not worth the risk of timing out the request.
        if (pages >= MAX_PAGES || Date.now() >= deadline) {
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

  } catch (error) {

    // Never let a cosmetic lookup take down the card.
    console.error(error);
    return false;
  }

  return isStargazer;

};

module.exports = {
  StargazersController: StargazersController
};
