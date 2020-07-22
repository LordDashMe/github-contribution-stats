const { StargazersChecker } = require('../../src/StargazersChecker');

const mockStargazerCheckerCollection = {
  "edges": [
    {
      "cursor": "Y3Vyc29yOnYyOpIAzg2vN68="
    },
    {
      "cursor": "Y3Vyc29yOnYyOpIAzg2wzm4="
    },
    {
      "cursor": "Y3Vyc29yOnYyOpIAzg2x_mM="
    },
    {
      "cursor": "Y3Vyc29yOnYyOpIAzg2yEHM="
    },
    {
      "cursor": "Y3Vyc29yOnYyOpIAzg2yF3U="
    },
    {
      "cursor": "Y3Vyc29yOnYyOpIAzg2yd38="
    },
    {
      "cursor": "Y3Vyc29yOnYyOpIAzg2yw_Y="
    },
    {
      "cursor": "Y3Vyc29yOnYyOpIAzg2y6K4="
    },
    {
      "cursor": "Y3Vyc29yOnYyOpIAzg2zC28="
    },
    {
      "cursor": "Y3Vyc29yOnYyOpIAzg2zGJc="
    },
    {
      "cursor": "Y3Vyc29yOnYyOpIAzg2zHBI="
    },
    {
      "cursor": "Y3Vyc29yOnYyOpIAzg2zbjI="
    },
    {
      "cursor": "Y3Vyc29yOnYyOpIAzg21J1Q="
    },
    {
      "cursor": "Y3Vyc29yOnYyOpIAzg21KGY="
    },
    {
      "cursor": "Y3Vyc29yOnYyOpIAzg21LQI="
    },
    {
      "cursor": "Y3Vyc29yOnYyOpIAzg21Ox4="
    },
    {
      "cursor": "Y3Vyc29yOnYyOpIAzg21Uns="
    }
  ],
  "nodes": [
    {
      "login": "gamersforever1695"
    },
    {
      "login": "chiedev"
    },
    {
      "login": "MikeEsp"
    },
    {
      "login": "PiyushSuthar"
    },
    {
      "login": "ronipl"
    },
    {
      "login": "danigavino"
    },
    {
      "login": "abcantuangco"
    },
    {
      "login": "Erreur32"
    },
    {
      "login": "vitordelfino"
    },
    {
      "login": "ervinne13"
    },
    {
      "login": "0000marcell"
    },
    {
      "login": "bernardoduarte"
    },
    {
      "login": "aaronpaultolentino"
    },
    {
      "login": "LordDashMe"
    },
    {
      "login": "aerojr"
    },
    {
      "login": "NimaMX"
    },
    {
      "login": "amirphl"
    }
  ],
  "pageInfo": {
    "hasNextPage": false
  }
};

describe('Tests for Stargazers Checker.', () => {

  it('should check if the user is indeed repository stargazer.', () => {

    const isStargazer = StargazersChecker('lorddashme', mockStargazerCheckerCollection);

    expect(isStargazer).toBe(true);

  });

  it('should check if the user is not repository stargazer.', () => {

    const isStargazer = StargazersChecker('unknownfromjupiter', mockStargazerCheckerCollection);

    expect(isStargazer).toBe(false);

  });

});
