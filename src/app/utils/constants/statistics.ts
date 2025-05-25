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
          "name": "Saves",
          "values": {
            "SAVES": 57
          }
        },
        {
          "name": "Goals conceded",
          "values": {
            "GOALS_CONCEDED": 88
          }
        },
        {
          "name": "Aerials won",
          "values": {
            "AERIALS_WON": 107
          }
        },
        {
          "name": "Passes",
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
          "name": "Aerials won",
          "values": {
            "AERIALS_WON": 107,
          }
        },
        {
          "name": "Blocked shots",
          "values": {
            "BLOCKED_SHOTS": 97,
          }
        },
        {
          "name": "Fouls",
          "values": {
            "FOULS": 56,
          }
        },
        {
          "name": "Tackles",
          "values": {
            "TACKLES": 78,
          }
        },
        {
          "name": "Interceptions",
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
          "name": "Passes",
          "values": {
            "PASSES": 80,
          }
        },
        {
          "name": "Tackles",
          "values": {
            "TACKLES": 78,
          }
        },
        {
          "name": "Interceptions",
          "values": {
            "FOULS": 100,
          }
        },
        {
          "name": "Key passes",
          "values": {
            "KEY_PASSES": 117,
          }
        },
        {
          "name": "Big chances created",
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
          "name": "Shots",
          "values": {
            "SHOTS_TOTAL": 86,
          }
        },
        {
          "name": "Crosses",
          "values": {
            "TOTAL_CROSSES": 98,
          }
        },
        {
          "name": "Dribble attempts",
          "values": {
            "DRIBBLED_ATTEMPTS": 108
          }
        },
        {
          "name": "Big chances created",
          "values": {
            "BIG_CHANCES_CREATED": 580,
          }
        },
        {
          "name": "Big chances missed",
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