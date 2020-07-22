const {
  mean, 
  zScore, 
  standardNormalDistribution, 
  objectLength, 
  shortNumberDenomination 
} = require('../../src/Helper');

describe('Tests for Helper.', () => {

  it('should compute Mean.', () => {

    expect(mean([150, 1, 1])).toBe(50.666666666666664);

  });

  it('should compute Z-Score.', () => {

    expect(zScore(150, 500, 150)).toBe(-2.3333333333333335);

  });

  it('should compute Standard Normal Distribution.', () => {

    expect(standardNormalDistribution(7)).toBe(1);
    expect(standardNormalDistribution(-7)).toBe(0);
    expect(standardNormalDistribution(1.5)).toBe(0.9331927987311419);

  });

  it('should compute Object Length.', () => {

    expect(objectLength({})).toBe(0);
    expect(objectLength({T: 0})).toBe(1);

  });

  it('should shorten the Number Denomination.', () => {

    expect(shortNumberDenomination(1670, 1)).toBe('1.7k');
    expect(shortNumberDenomination(999950, 0)).toBe('1m');
    
  });

});
