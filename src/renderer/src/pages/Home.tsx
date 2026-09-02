import Versions from '../components/Versions'
import mmLogo from '../assets/March_Madness_logo.svg'

function Home(): React.JSX.Element {
  return (
    <>
      <img alt="logo" className="logo" style={{ width: '400px', height: 'auto' }} src={mmLogo} />
      <Versions></Versions>
    </>
  )
}

export default Home
