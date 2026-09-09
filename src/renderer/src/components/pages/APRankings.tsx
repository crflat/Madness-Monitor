import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CTableBody,
  CTableDataCell,
  CTableRow,
  CTableHeaderCell,
  CTableHead,
  CTable
} from '@coreui/react'
import { CContainer } from '@coreui/react/dist/esm/components/grid/CContainer'
import { useState, useMemo } from 'react'
import { useRankings } from '../../hooks/useRankings'

function APRankings(): React.JSX.Element {
  const [selectedSeason, setSelectedSeason] = useState<number>(2026)
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)
  const rankings = useRankings()

  const seasons = Array.from(new Set(rankings.map((ranking) => ranking.season)))

  const weeks = Array.from(
    new Set(
      rankings.filter((ranking) => ranking.season === selectedSeason).map((ranking) => ranking.week)
    )
  )

  const ranks = Array.from(
    new Set(
      rankings
        .filter((ranking) => ranking.season === selectedSeason)
        .map((ranking) => ranking.ranking)
        .filter((rank): rank is number => rank !== null)
    )
  ).sort((a, b) => a - b)

  const viewableRankings = useMemo(() => {
    return selectedWeek === null
      ? rankings.filter((r) => r.season === selectedSeason)
      : rankings.filter((r) => r.season === selectedSeason && r.week === selectedWeek)
  }, [rankings, selectedSeason, selectedWeek])

  const cells = useMemo(() => {
    const map = new Map<string, string[]>()
    for (const r of viewableRankings) {
      if (r.ranking == null) continue

      const key = `${r.week}:${r.ranking}`
      const teams = map.get(key)
      if (teams) teams.push(r.team)
      else map.set(key, [r.team])
    }
    for (const teams of map.values()) teams.sort()

    return map
  }, [viewableRankings])

  return (
    <>
      <CContainer
        className="d-flex flex-column align-items-center justify-content-top"
        style={{ height: '100%' }}
      >
        <h1>AP Rankings</h1>
        <CContainer className="d-flex flex-row justify-content-center gap-5">
          <CDropdown direction="center">
            <CDropdownToggle>Season: {selectedSeason}</CDropdownToggle>
            <CDropdownMenu style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {seasons.map((season) => (
                <CDropdownItem
                  key={season}
                  onClick={() => {
                    setSelectedSeason(season)
                    setSelectedWeek(null)
                  }}
                >
                  {season}
                </CDropdownItem>
              ))}
            </CDropdownMenu>
          </CDropdown>
          <CDropdown direction="center">
            <CDropdownToggle>
              Week: {selectedWeek === null ? 'All Weeks' : selectedWeek}
            </CDropdownToggle>
            <CDropdownMenu style={{ maxHeight: '200px', overflowY: 'auto' }}>
              <CDropdownItem key="All-Weeks" onClick={() => setSelectedWeek(null)}>
                All Weeks
              </CDropdownItem>
              {selectedSeason
                ? weeks.map((week) => (
                    <CDropdownItem key={week} onClick={() => setSelectedWeek(week)}>
                      Week {week}
                    </CDropdownItem>
                  ))
                : null}
            </CDropdownMenu>
          </CDropdown>
        </CContainer>
        <CContainer>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Ranking</CTableHeaderCell>
                {selectedWeek != null ? (
                  <CTableHeaderCell>Week {selectedWeek}</CTableHeaderCell>
                ) : (
                  weeks.map((week) => <CTableHeaderCell key={week}>Week {week}</CTableHeaderCell>)
                )}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {ranks.map((rank) => (
                <CTableRow key={rank}>
                  <CTableDataCell>{rank}</CTableDataCell>
                  {selectedWeek === null ? (
                    weeks.map((week) => {
                      const teams = cells.get(`${week}:${rank}`) ?? []
                      return (
                        <CTableDataCell key={week}>
                          {teams.map((team) => (
                            <div key={team + ' ' + week + selectedSeason}>{team}</div>
                          ))}
                        </CTableDataCell>
                      )
                    })
                  ) : (
                    <CTableDataCell key={selectedWeek}>
                      {(cells.get(`${selectedWeek}:${rank}`) ?? []).map((team) => (
                        <div key={team + ' ' + selectedWeek + selectedSeason}>{team}</div>
                      ))}
                    </CTableDataCell>
                  )}
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CContainer>
      </CContainer>
    </>
  )
}

export default APRankings
