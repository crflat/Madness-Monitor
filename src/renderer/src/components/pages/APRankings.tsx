import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CTableBody,
  CTableDataCell,
  CTableRow
} from '@coreui/react'
import { CContainer } from '@coreui/react/dist/esm/components/grid/CContainer'
import { getRankings } from '../../../../main/importers/rankingsImport'
import { useState } from 'react'

const rankings = await getRankings()

function APRankings(): React.JSX.Element {
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null)
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)

  const seasons = Array.from(new Set(rankings.map((ranking) => ranking.season)))

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
              {selectedSeason && (
                <CDropdownItem key="all" onClick={() => setSelectedWeek(null)}>
                  All Weeks
                </CDropdownItem>
              )}
            </CDropdownMenu>
          </CDropdown>
        </CContainer>
        <CTableBody>
          {rankings
            .filter((ranking) => (selectedSeason ? ranking.season === selectedSeason : true))
            .filter((ranking) => (selectedWeek ? ranking.week === selectedWeek : true))
            .map((ranking) => (
              <CTableRow key={ranking.teamId}>
                <CTableDataCell>{ranking.ranking}</CTableDataCell>
                <CTableDataCell>{ranking.team}</CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CContainer>
    </>
  )
}

export default APRankings
