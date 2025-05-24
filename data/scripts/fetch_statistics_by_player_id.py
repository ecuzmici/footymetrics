#!/usr/bin/env python3
import os
import json
import time
import requests
from pathlib import Path

# ——— Configuration ———
INPUT_FILE    = '../player_ids.json'
OUTPUT_STATS  = 'player_statistics.json'
OUTPUT_DETAILS= 'player_statistic_details.json'
API_TOKEN     = os.getenv('SPORTMONKS_TOKEN', '8LNzPxgIELcGIYrJhyADQzqtmFawd55C8LNerDat2o7irMP4KzqSn152pIRy')
SEASON_FILTER = 'playerstatisticSeasons:23614'
BASE_URL      = 'https://api.sportmonks.com/v3/football/statistics/seasons/players'

HEADERS = {
    'Content-Type':  'application/json',
    'Accept':        'application/json',
    'Authorization': API_TOKEN
}

# ——— Load player IDs ———
with open(INPUT_FILE, 'r', encoding='utf-8') as f:
    player_ids = [entry['player_id'] for entry in json.load(f)]

# ——— Prepare output containers ———
all_stats    = []
all_details  = []

# ——— Fetch & split data ———
for idx, pid in enumerate(player_ids, start=1):
    url = f'{BASE_URL}/{pid}'
    params = {'filters': SEASON_FILTER}
    try:
        resp = requests.get(url, headers=HEADERS, params=params)
        resp.raise_for_status()
        payload = resp.json()
    except requests.RequestException as e:
        print(f'[{idx}/{len(player_ids)}] ERROR fetching {pid}: {e}')
        continue

    stats = payload.get('data', [])
    if not stats:
        print(f'[{idx}/{len(player_ids)}] No stats for player {pid}')
        continue

    for stat in stats:
        # Extract the top-level stat row
        stat_row = {
            'id':               stat['id'],
            'player_id':        stat['player_id'],
            'team_id':          stat['team_id'],
            'season_id':        stat['season_id'],
            'has_values':       stat['has_values'],
            'position_id':      stat.get('position_id'),
            'jersey_number':    stat.get('jersey_number')
        }
        all_stats.append(stat_row)

        # Extract each detail row
        for det in stat.get('details', []):
            detail_row = {
                'id':                     det['id'],
                'player_statistic_id':    det['player_statistic_id'],
                'type_id':                det['type_id'],
                'value':                  det['value']       # JSON object
            }
            all_details.append(detail_row)

    print(f'[{idx}/{len(player_ids)}] Processed player {pid} → {len(stats)} stat records')

    # throttle to avoid hitting rate limits
    time.sleep(0.2)

# ——— Write outputs ———
for path, data in [(OUTPUT_STATS, all_stats), (OUTPUT_DETAILS, all_details)]:
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'Wrote {len(data)} records to {path}')
