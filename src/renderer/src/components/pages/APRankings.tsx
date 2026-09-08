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
import { useState } from 'react'
import { useRankings } from '../../hooks/useRankings'

function APRankings(): React.JSX.Element {
  const [selectedSeason, setSelectedSeason] = useState<number>(2026)
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)
  const rankings = useRankings()

  const ranks = Array.from(
    new Set(
      rankings.map((ranking) => ranking.ranking).filter((rank): rank is number => rank !== null)
    )
  ).sort((a, b) => a - b)

  const seasons = Array.from(new Set(rankings.map((ranking) => ranking.season)))

  const weeks = Array.from(
    new Set(
      rankings.filter((ranking) => ranking.season === selectedSeason).map((ranking) => ranking.week)
    )
  )

  return (
    <>
      <CContainer
        className="d-flex flex-column align-items-center justify-content-top"
        style={{ height: '100%' }}
      >
        <h1>AP Rankings</h1>
        <CContainer className="d-flex flex-row justify-content-center gap-5">
          <CDropdown direction="center">
            <CDropdownToggle>Season</CDropdownToggle>
            <CDropdownMenu style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {seasons.map((season) => (
                <CDropdownItem key={season} onClick={() => setSelectedSeason(season)}>
                  {season}
                </CDropdownItem>
              ))}
            </CDropdownMenu>
          </CDropdown>
          <CDropdown direction="center">
            <CDropdownToggle>Week</CDropdownToggle>
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
                  {rankings
                    .filter((ranking) =>
                      selectedSeason ? ranking.season === selectedSeason : true
                    )
                    .filter((ranking) => (selectedWeek ? ranking.week === selectedWeek : true))
                    .filter((ranking) => ranking.ranking === rank)
                    .map((ranking) => (
                      <CTableDataCell
                        key={ranking.season + ' ' + ranking.ranking + ' ' + ranking.week}
                      >
                        {ranking.team}
                      </CTableDataCell>
                    ))}
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
