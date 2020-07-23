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

  - [chiedev](https://github.com/chiedev)
  
  - [vitordelfino](https://github.com/vitordelfino)

  - [0000marcell](https://github.com/0000marcell)
  
  - [mzaini30](https://github.com/mzaini30)
  
  - [matrixjnr](https://github.com/matrixjnr)
  
  - [molleer](https://github.com/molleer)

## Usage

To use, just copy paste this into your markdown content and replace the value of the **?username=** URL parameter based on your Github username.

```text
[![Contribution Stats](https://github-contribution-stats.vercel.app/api/?username=lorddashme)](https://github.com/LordDashMe/github-contribution-stats/)
```

## Purpose

Actually if you don't know Github released a feature Github README profile (they say a Secret Repository :smile:). And I think this project will help you to give additional content for your Github README Profile.

## Ratings

The table for the Rating Range, Letter Sign and Color.

| Rating Range | Letter Sign | Color |
| ---- | ---- | ---- |
| 100 - 98 | S | #7d00b3 |
| 97 - 81 | A+ | #1eb300 |
| 80 - 41 | A | #2fa0ed |
| 40 - 31 | B+ | #2f74ed |
| 30 - 21 | B | #ed962f |
| 20 - 0 | C | #b30000 |

The ratings scale are based on this [Academic Grading In Japan](https://en.wikipedia.org/wiki/Academic_grading_in_Japan) I was fascinated with that ("S" rarely given :joy:) and also we used some of the common formula in Statistic like (Mean, SD, Z-Score, etc.) to get the final scores based on the 4 data sets (Commits, Pull Requests, Issues and Code Reviews). If you want check the technical details of it you can visit this file [ContributionRatings.js](https://github.com/LordDashMe/github-contribution-stats/blob/master/src/ContributionRatings.js).

## Layout Customization

This features will be add soon. We will unlock the layout customization depending on what you like :heart:.

## Support

Probably you notice that the generated template has a message below the stats, we added this feature in order to preserve the origin of the project. If you want to remove this just make sure you star the project and after a couple of minutes this will be disappear, we need this minutes because we implemented a caching for each generated template so the delay is expected but no so much :blush:. If ever you encounter an issue we'll be glad if you file it here [Github Contribution Stats Issues](https://github.com/LordDashMe/github-contribution-stats/issues).

This project only need a **star** :star: from you! :heart:

## License

This package is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
