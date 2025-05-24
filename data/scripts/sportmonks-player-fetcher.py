#!/usr/bin/env python3
import os
import requests

def fetch_all_players(api_token: str, season_id: int, per_page: int = 50):
    """
    Fetch every player for a given season by paging through Sportmonks API.
    Returns a list of player dicts.
    """
    base_url = 'https://api.sportmonks.com/v3/football/players'
    headers = {
        'Authorization': api_token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    players = []
    page = 1

    while True:
        params = {
            'filters': f'playerstatisticSeasons:{season_id}',
            'per_page': per_page,
            'page': page,
        }
        resp = requests.get(base_url, headers=headers, params=params)
        resp.raise_for_status()
        payload = resp.json()

        # accumulate this page’s players
        players.extend(payload.get('data', []))

        # check pagination to decide whether to continue
        pagination = payload.get('pagination', {})
        if not pagination.get('has_more', False):
            break

        page += 1

    return players

if __name__ == '__main__':
    # Read your token and season ID from environment or hardcode for testing
    TOKEN = "8LNzPxgIELcGIYrJhyADQzqtmFawd55C8LNerDat2o7irMP4KzqSn152pIRy"
    SEASON_ID = 23614

    all_players = fetch_all_players(TOKEN, SEASON_ID)
    print(f"Fetched {len(all_players)} players")
    # Optionally: save to JSON file
    import json
    with open('players.json', 'w') as f:
        json.dump(all_players, f, indent=2)
