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
  const {
    username,
    theme,
    backgroundFill = null,
    backgroundStroke = null,
    titleColor = null,
    statsColor = null,
    ratingColor = null,
    iconsColor = null,
  } = req.query;

  if (!username) {
    res.status(400).send('Please provide a username');
    return;
  }

  const colors = [
    backgroundFill,
    backgroundStroke,
    titleColor,
    statsColor,
    ratingColor,
    iconsColor,
  ];

  for (const color of colors) {
    if (color && !isHexColor(color)) {
      res.status(400).send('Please provide a valid hex color');
      return;
    }
  }

  const themeOverrides = {
    background: {
      fill: backgroundFill,
      stroke: backgroundStroke,
    },
    title: titleColor,
    stats: statsColor,
    rating: ratingColor,
    icons: iconsColor,
  }


  res.setHeader('Cache-Control', 'public, max-age=1800');
  res.setHeader('Content-Type', 'image/svg+xml');

  const isStargazer = await StargazersController(username);
  const template = await ContributionController(username, isStargazer, theme, themeOverrides);

  res.send(template);
};

function isHexColor(color) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(color);
}
