#!/usr/bin/env python3
import json
import csv
from pathlib import Path

# Paths
INPUT_JSON = Path('player_statistic_details.json')
OUTPUT_CSV = Path('player_statistic_details_converted.csv')

# Load the JSON array
with INPUT_JSON.open('r', encoding='utf-8') as f:
    records = json.load(f)

# Define CSV headers: one column for each top-level field, plus a 'value' JSON string
headers = ['id', 'player_statistic_id', 'type_id', 'value']

# Write CSV
with OUTPUT_CSV.open('w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    for rec in records:
        writer.writerow({
            'id': rec['id'],
            'player_statistic_id': rec['player_statistic_id'],
            'type_id': rec['type_id'],
            # dump the nested dict as a JSON string for JSONB import
            'value': json.dumps(rec.get('value', {}), separators=(',', ':'))
        })

print(f'Converted {len(records)} records to {OUTPUT_CSV}')
