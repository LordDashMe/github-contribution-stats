/*
 * This file is part of the Github Contributioin Stats.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * The Common Helper.
 * 
 * All common functions used by the app are grouped here.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */

/**
 * The MEAN Formula.
 * 
 * Reference: https://simple.wikipedia.org/wiki/Mean
 * 
 * @param {Array} dataSet 
 * 
 * @return {Number}
 */
const mean = (dataSet) => {

  let total = 0;

  dataSet.forEach(x => {
    total += x;  
  });

  return total / dataSet.length;
};

/**
 * Z-Score Formula.
 * 
 * Reference: https://www.simplypsychology.org/z-score.html
 * 
 * @param {Number} x The random variable of X.
 * @param {Number} mu The "MEAN" value.
 * @param {Number} sigma The Standard Deviation value.
 * 
 * @return {Number}
 */
const zScore = (x, mu, sigma) => {
  return (x - mu) / sigma;
};

/**
 * Standard Normal Distribution.
 * 
 * Knowledge Reference: https://en.wikipedia.org/wiki/Normal_distribution
 * Source Code Reference: https://stackoverflow.com/a/41635947
 * 
 * @param {Number} z For the Z-score to be use for standard normal distribution.
 * 
 * @return {Number}
 */
const standardNormalDistribution = (z) => {

  let k, m, values, total, item, z2, z4, a, b;

  // Power series is not stable at these extreme tail scenarios
  if (z < -6) { return 0; }
  if (z > 6) { return 1; }

  m = 1; // m(k) == (2**k)/factorial(k)
  b = z; // b(k) == z ** (2*k + 1)
  z2 = z * z; // cache of z squared
  z4 = z2 * z2; // cache of z to the 4th

  values = [];

  // Compute the power series in groups of two terms.
  // This reduces floating point errors because the series
  // alternates between positive and negative.
  for (k = 0; k < 100; k += 2) {
    a = 2 * k + 1;
    item = b / (a * m);
    item *= (1 - (a * z2) / ((a + 1) * (a + 2)));
    values.push(item);
    m *= (4 * (k + 1) * (k + 2));
    b *= z4;
  }

  // Add the smallest terms to the total first that
  // way we minimize the floating point errors.
  total = 0;
  for (k = 49; k >= 0; k--) {
    total += values[k];
  }

  // Multiply total by 1/sqrt(2*PI)
  // Then add 0.5 so that stdNormal(0) === 0.5
  return 0.5 + 0.3989422804014327 * total;

};

/**
 * Object Length.
 * 
 * @param {Object} obj The object to be calculate to get the total length.
 * 
 * @return {Number} 
 */
const objectLength = (obj) => {

  let size = 0, key;

  for (key in obj) { size++; }

  return size;
};

/**
 * Short Number Denomination.
 * 
 * @param {Number} n The number to be convert to short version.
 * @param {Number} d The number of decimal point to be show.
 * 
 * @return {String} 
 */
const shortNumberDenomination = (n, d) => {

  // 2 decimal places => 100, 3 => 1000, etc.
  d = Math.pow(10, d);

  // Enumerate number abbreviations.
  let abbrev = ['k', 'm', 'b', 't'];

  // Go through the array backwards, so we do the largest first.
  for (let i = abbrev.length - 1; i >= 0; i--) {

    // Convert array index to '1000', '1000000', etc.
    let size = Math.pow(10,(i+1)*3);

    // If the number is bigger or equal do the abbreviation.
    if (size <= n) {
      
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      n = Math.round(n * d / size) / d;

      // Handle special case where we round up to the next abbreviation.
      if ((n == 1000) && (i < abbrev.length - 1)) {
        n = 1;
        i++;
      }

      // Add the letter for the abbreviation.
      n += abbrev[i];

      // We are done... stop.
      break;
    }
  }

  return n;
};

module.exports = {
  mean: mean,
  zScore: zScore,
  standardNormalDistribution: standardNormalDistribution,
  objectLength: objectLength,
  shortNumberDenomination: shortNumberDenomination
};
