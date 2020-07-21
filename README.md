# Github Contribution Stats

Get your dynamically generated Github Contribution Stats! :chart_with_upwards_trend: :calendar:

[![Build Status](https://img.shields.io/travis/LordDashMe/github-contribution-stats/master.svg?style=flat-square)](https://travis-ci.org/LordDashMe/github-contribution-stats) [![Coverage Status](https://img.shields.io/coveralls/LordDashMe/github-contribution-stats/master.svg?style=flat-square)](https://coveralls.io/github/LordDashMe/github-contribution-stats?branch=master)

## Demo

- See the sample usage with some of our famous open source contributor :trophy:.

  - [Miško Hevery](https://github.com/mhevery)

    [![Contribution Stats](https://github-contribution-stats.vercel.app/api/?username=mhevery)](https://github.com/LordDashMe/github-contribution-stats/)

  - [Taylor Otwell](https://github.com/taylorotwell)

    [![Contribution Stats](https://github-contribution-stats.vercel.app/api/?username=taylorotwell)](https://github.com/LordDashMe/github-contribution-stats/)

  - [Fabien Potencier](https://github.com/fabpot)

    [![Contribution Stats](https://github-contribution-stats.vercel.app/api/?username=fabpot)](https://github.com/LordDashMe/github-contribution-stats/)

- Special metion for those who are currently using it right now for their Github README profile :smile: :tada:

  - [Chie](https://github.com/chiedev)
  
  - [vitordelfino](https://github.com/vitordelfino)

  - [0000marcell](https://github.com/0000marcell)

## Usage

- To use, just copy paste this into your markdown content and replace the value of the ```?username=``` URL parameter based on your Github **username**.

```text
[![Contribution Stats](https://github-contribution-stats.vercel.app/api/?username=lorddashme)](https://github.com/LordDashMe/github-contribution-stats/)
```

## Ratings

- The table for the Rating Range, Letter Sign and Color.

| Rating Range | Letter Sign | Color |
| ---- | ---- | ---- |
| 100 - 98 | S | #b30000 |
| 97 - 75 | A+ | #7d00b3 |
| 74 - 65 | A | #1eb300 |
| 64 - 55 | B+ | #2fa0ed |
| 54 - 40 | B | #2f74ed |
| 39 - 0 | C | #ed962f |

- Using some of the common statistic formula we are able to calculate the final ratings. See the code implementation [ContributionRatings.js](https://github.com/LordDashMe/github-contribution-stats/blob/master/src/ContributionRatings.js)

## Layout Customization

- This features will be release soon. We will unlock the layout customization depending on what you like :heart:.

## License

This package is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
