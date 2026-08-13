/*
 * This file is part of the Github Contributioin Stats.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { StargazersController } = require('../src/StargazersController');
const { ContributionController } = require('../src/ContributionController');
const { ErrorTemplate } = require('../src/ErrorTemplate');

module.exports = async (req, res) => {

  const { username } = req.query;

  res.setHeader('Cache-Control', 'public, max-age=1800');
  res.setHeader('Content-Type', 'image/svg+xml');

  try {

    if (!username) {
      throw new Error('The "username" query parameter is required.');
    }

    // The stargazer flag is only needed at the point the card is rendered, so
    // the lookup is started here without awaiting. That lets it run alongside
    // the contribution stats request instead of running before it, which
    // halves the round trips sitting in front of the response.
    const isStargazer = StargazersController(username);
    const template = await ContributionController(username, isStargazer);

    res.send(template);

  } catch (error) {

    console.error(error);

    // A response has to be sent on every path. An unhandled rejection here
    // means the request is never answered and the platform eventually kills
    // it with a timeout, which is reported as a 504 rather than the real
    // error. The failure is not cacheable, so the header set above is
    // replaced before the fallback card is returned.
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.send(ErrorTemplate(error.message));
  }
};
