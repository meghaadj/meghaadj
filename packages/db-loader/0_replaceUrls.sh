#!/bin/bash

# Script that replaces all instances of RUNNER_URL in db-loader with value of REAL_RUNNER_URL when database is spun up
# Name of this file must come first alphabetically before any other file in db-loader to ensure it runs first.

replace_url() {
  local file=$1

  # replaces all instances of RUNNER_URL with value of REAL_RUNNER_URL defined in docker-compose.yml and
  # ensures all slashses in REAL_RUNNER_URL are esacped
  # REAL_RUNNER_URL takes default value of http://localhost:4001/iws if not defined

  local runnerUrl="${REAL_RUNNER_URL:-http://localhost:4001/iws}"
  sed -i "s/RUNNER_URL/${runnerUrl//\//\\/}/g" "$file"
}

# Recursively processes all sub directories and runs replace_url on all .js files.
process_directory() {
  local dir=$1
  for file in "$dir"/*; do
    if [ -d "$file" ]; then
      process_directory "$file"
    elif [ -f "$file" ] && [[ "$file" == *.js ]]; then
      replace_url "$file"
    fi
  done
}

process_directory "/docker-entrypoint-initdb.d"
