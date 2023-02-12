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

module.exports = async (req, res) => {

  const { username, theme } = req.query;
  
  res.setHeader('Cache-Control', 'public, max-age=1800');
  res.setHeader('Content-Type', 'image/svg+xml');

  const isStargazer = await StargazersController(username);
  const template = await ContributionController(username, isStargazer, theme);

  res.send(template);
};
