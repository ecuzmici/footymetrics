#!/usr/bin/env python3
import os
import json
import requests

# Configuration
API_TOKEN = os.getenv('SPORTMONKS_TOKEN', '8LNzPxgIELcGIYrJhyADQzqtmFawd55C8LNerDat2o7irMP4KzqSn152pIRy')
SEASON_ID = 23614
TEAM_IDS = [1, 6, 8, 9, 11, 13, 14, 15, 18, 19, 20, 29, 42, 51, 52, 63, 65, 78, 116, 236]
BASE_URL = f'https://api.sportmonks.com/v3/football/squads/seasons/{SEASON_ID}/teams'

headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': API_TOKEN
}

def fetch_squad(team_id: int, per_page: int = 50) -> list:
    url = f'{BASE_URL}/{team_id}'
    params = {'per_page': per_page}
    resp = requests.get(url, headers=headers, params=params)
    resp.raise_for_status()
    return resp.json().get('data', [])

def main():
    all_players = []

    for team_id in TEAM_IDS:
        try:
            squad = fetch_squad(team_id)
            all_players.extend(squad)
            print(f'Fetched {len(squad)} players for team {team_id}')
        except requests.HTTPError as e:
            print(f'Error fetching team {team_id}: {e}')

    with open('all_players.json', 'w', encoding='utf-8') as f:
        json.dump(all_players, f, ensure_ascii=False, indent=2)

    print(f'\nSaved total {len(all_players)} players to all_players.json')

if __name__ == '__main__':
    main()
