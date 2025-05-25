export const GENERAL_STATISTICS = {
  "Appearances": 321,
	"Minutes played": 119,
  "Goals": 52,
  "Assists": 79,
  "Yellow cards": 84,
  "Red cards": 83,
  "Rating": 118
}

export const POSITION_STATISTICS = {
  "Goalkeeper": {
    "calculate": {
      "per_90": [ 
        {
          "name": "Saves p90",
          "values": {
            "SAVES": 57
          }
        },
        {
          "name": "Goals conceded p90",
          "values": {
            "GOALS_CONCEDED": 88
          }
        },
        {
          "name": "Aerials won p90",
          "values": {
            "AERIALS_WON": 107
          }
        },
        {
          "name": "Passes p90",
          "values": {
            "PASSES": 80
          }
        }
      ]
    },
    "static": [
      {
        "name": "Cleansheets",
        "value": {
          "CLEANSHEET": 194
        }
      },
      {
        "name": "Accurate passes %",
        "value": {
          "ACCURATE_PASSES_PERCENTAGE": 1584
        }
      }
    ]
  },
  "Defender": {
    "calculate": {
      "per_90": [
        {
          "name": "Aerials won p90",
          "values": {
            "AERIALS_WON": 107,
          }
        },
        {
          "name": "Blocked shots p90",
          "values": {
            "BLOCKED_SHOTS": 97,
          }
        },
        {
          "name": "Fouls p90",
          "values": {
            "FOULS": 56,
          }
        },
        {
          "name": "Tackles p90",
          "values": {
            "TACKLES": 78,
          }
        },
        {
          "name": "Interceptions p90",
          "values": {
            "INTERCEPTIONS": 100,
          }
        }
      ],
      "ratio": [
        {
          "name": "Duels won %",
          "values": {
            "DUELS_WON": 106,
            "TOTAL_DUELS": 105
          }
        }
      ],
    },
    "static": [
      {
        "name": "Duels won",
        "value": {
          "DUELS_WON": 106,
        }
      },
      {
        "name": "Total duels",
        "value": {
          "DUELS_WON": 105,
        }
      }
    ]
  },
  "Midfielder": {
    "calculate": {
      "per_90": [
        {
          "name": "Passes p90",
          "values": {
            "PASSES": 80,
          }
        },
        {
          "name": "Tackles p90",
          "values": {
            "TACKLES": 78,
          }
        },
        {
          "name": "Interceptions p90",
          "values": {
            "FOULS": 100,
          }
        },
        {
          "name": "Key passes p90",
          "values": {
            "KEY_PASSES": 117,
          }
        },
        {
          "name": "Big chances created p90",
          "values": {
            "BIG_CHANCES_CREATED": 580,
          }
        }
      ],
      "ratio": [
        {
          "name": "Shot accuracy %",
          "values": {
            "SHOTS_ON_TARGET": 86,
            "SHOTS_TOTAL": 42
          }
        },
        {
          "name": "Dribble success %",
          "values": {
            "SUCCESSFUL_DRIBBLES": 109,
            "DRIBBLED_ATTEMPTS": 108
          }
        },
      ],
    },
    "static": [
      {
        "name": "Accurate passes %",
        "value": {
          "ACCURATE_PASSES_PERCENTAGE": 1584
        }
      }
    ],
  },
  "Attacker": {
    "calculate": {
      "per_90": [
        {
          "name": "Shots p90",
          "values": {
            "SHOTS_TOTAL": 86,
          }
        },
        {
          "name": "Crosses p90",
          "values": {
            "TOTAL_CROSSES": 98,
          }
        },
        {
          "name": "Dribble attempts p90",
          "values": {
            "DRIBBLED_ATTEMPTS": 108
          }
        },
        {
          "name": "Big chances created p90",
          "values": {
            "BIG_CHANCES_CREATED": 580,
          }
        },
        {
          "name": "Big chances missed p90",
          "values": {
            "BIG_CHANCES_MISSED": 581,
          }
        }
      ],
      "ratio": [
        {
          "name": "Shot accuracy %",
          "values": {
            "SHOTS_ON_TARGET": 86,
            "SHOTS_TOTAL": 42
          }
        },
        {
          "name": "Cross accuracy %",
          "values": {
            "ACCURATE_CROSSES": 99,
            "TOTAL_CROSSES": 98
          }
        },
        {
          "name": "Dribble success %",
          "values": {
            "SUCCESSFUL_DRIBBLES": 109,
            "DRIBBLED_ATTEMPTS": 108
          }
        },
      ],
    },
    "static": [],
  }
}