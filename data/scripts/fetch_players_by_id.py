#!/usr/bin/env python3
import os
import json
import time
import requests

# ——— Configuration ———
INPUT_FILE  = '../player_ids.json'
OUTPUT_FILE = 'all_players_data.json'
API_TOKEN   = os.getenv('SPORTMONKS_TOKEN', '8LNzPxgIELcGIYrJhyADQzqtmFawd55C8LNerDat2o7irMP4KzqSn152pIRy')
BASE_URL    = 'https://api.sportmonks.com/v3/football/players'

HEADERS = {
    'Content-Type':  'application/json',
    'Accept':        'application/json',
    'Authorization': API_TOKEN
}

print(os.listdir('..'))

# ——— Load player IDs ———
with open(INPUT_FILE, 'r', encoding='utf-8') as f:
    player_ids = [entry['player_id'] for entry in json.load(f)]

# ——— Fetch and collect player data ———
all_players = []

for idx, pid in enumerate(player_ids, start=1):
    url = f'{BASE_URL}/{pid}'
    try:
        resp = requests.get(url, headers=HEADERS)
        resp.raise_for_status()
        player = resp.json().get('data')
        if player:
            all_players.append(player)
            print(f'[{idx}/{len(player_ids)}] Fetched player {pid}')
        else:
            print(f'[{idx}] No data for player {pid}')
    except requests.RequestException as e:
        print(f'[{idx}] Error fetching {pid}: {e}')

    # Throttle to avoid rate limits
    time.sleep(0.2)

# ——— Write to JSON file ———
with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    json.dump(all_players, f, ensure_ascii=False, indent=2)

print(f'\nSaved {len(all_players)} player records to {OUTPUT_FILE}')
