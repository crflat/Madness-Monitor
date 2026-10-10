CREATE TABLE seasons (
  season_id INTEGER PRIMARY KEY,
  label     TEXT    NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 0 CHECK (is_active IN (0,1))
) STRICT;

CREATE TABLE teams (
  team_id     INTEGER PRIMARY KEY,
  team_name   TEXT    NOT NULL UNIQUE,
  conference  TEXT,
  is_power    INTEGER NOT NULL DEFAULT 0 CHECK (is_power IN (0,1))
) STRICT;

CREATE TABLE team_seasons (
  season_id           INTEGER NOT NULL REFERENCES seasons(season_id),
  team_id             INTEGER NOT NULL REFERENCES teams(team_id),
  neutral_wins        INTEGER NOT NULL DEFAULT 0,
  neutral_losses      INTEGER NOT NULL DEFAULT 0,
  ist_winner          TEXT    NOT NULL DEFAULT 'unknown' CHECK (ist_winner IN ('yes', 'no', 'unknown')),
  won_first_conf_game TEXT    NOT NULL DEFAULT 'unknown' CHECK (won_first_conf_game IN ('yes', 'no', 'unknown')),
  healthy             TEXT    NOT NULL DEFAULT 'unknown' CHECK (healthy IN ('yes', 'no', 'unknown')),
  PRIMARY KEY (season_id, team_id)
) STRICT;

CREATE TABLE ap_ranks (
  season_id     INTEGER NOT NULL REFERENCES seasons(season_id),
  season_type   TEXT    NOT NULL DEFAULT 'regular' CHECK (season_type IN ('postseason', 'regular', 'preseason')),
  week          INTEGER NOT NULL,
  release_date  TEXT,
  poll_type     TEXT    NOT NULL DEFAULT 'ap' CHECK (poll_type IN ('ap', 'coaches')),
  team_id       INTEGER NOT NULL REFERENCES teams(team_id),
  ranking       INTEGER NOT NULL CHECK (ranking BETWEEN 1 AND 25),
  PRIMARY KEY (season_id, team_id, poll_type, week, ranking)
) STRICT;