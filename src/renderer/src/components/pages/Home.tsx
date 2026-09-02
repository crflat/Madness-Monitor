import Versions from '../Versions'
import mmLogo from '../../assets/March_Madness_logo.svg'
import { CContainer } from '@coreui/react'

function Home(): React.JSX.Element {
  return (
    <>
      <CContainer
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ height: '100%' }}
      >
        <img alt="logo" className="logo" style={{ width: '400px', height: 'auto' }} src={mmLogo} />
        <Versions></Versions>
      </CContainer>
    </>
  )
}

export default Home
