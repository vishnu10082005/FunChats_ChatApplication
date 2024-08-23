import { Button } from '@chakra-ui/react'
import './App.css'
import Routes from './Routes'
import Forms from './Forms'
import ProfilePage from "./Profile"
import ParentContext from './Context'
function App() {
 

  return (
    <>
    <Routes></Routes>
    <ParentContext/>
      {/* <Button colorScheme='red'>Button</Button> */}
      {/* <Forms></Forms> */}
      {/* <ProfilePage></ProfilePage> */}
    </>
  )
}

export default App
