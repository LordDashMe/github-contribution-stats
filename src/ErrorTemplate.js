/*
 * This file is part of the Github Contribution Stats.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * The Error Template Function.
 *
 * The endpoint is consumed as an image, so a failure still needs to render as
 * a valid SVG. Returning nothing leaves the request hanging until the platform
 * timeout is reached, which surfaces to the user as a broken image.
 *
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * @param {String} message The reason why the card cannot be generated.
 *
 * @return {String}
 */
const ErrorTemplate = (message) => {

  // The message is injected into markup, the five XML predefined
  // entities are escaped so a malformed value cannot break the document.
  const safeMessage = String(message)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

  return `
    <svg width="328" height="120" viewBox="0 0 328 120" xmlns="http://www.w3.org/2000/svg">
      <style>
        .error-title {
          font-family: "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
          font-size: 16px;
          font-weight: 700;
          fill: #bf3838;
        }
        .error-message {
          font-family: "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
          font-size: 11px;
          fill: #666;
        }
      </style>
      <rect x="0.5" y="0.5" rx="6" height="119" stroke="#e4e2e2" width="327" fill="#fffefe" stroke-opacity="1" />
      <text x="25" y="40" class="error-title">Github Contribution Stats</text>
      <text x="25" y="65" class="error-message">Unable to generate the card right now.</text>
      <text x="25" y="85" class="error-message">${safeMessage}</text>
    </svg>
  `;
};

module.exports = {
  ErrorTemplate: ErrorTemplate
};
