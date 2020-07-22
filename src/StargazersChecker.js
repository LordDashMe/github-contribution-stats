/*
 * This file is part of the Github Contribution Stats.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * The Stargazers Checker.
 * 
 * This will check if the username used is already starred the repository.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 * 
 * @param {*} stargazers The github current stargazers data.
 * 
 * @return {Boolean}
 */
const StargazersChecker = (username, stargazers) => {
  
  for (let x in stargazers.nodes) {
    
    // This means that the user already star the repository
    // and we should end now the process here.
    if (stargazers.nodes[x].login.toLowerCase() === username.toLowerCase()) {
      return true;
    }
  }

  return false;

};

module.exports = {
  StargazersChecker: StargazersChecker
};
