import React, { useContext } from 'react'
import Logo from "../Assests/Logo.png"
import { Messages1, Video, ProfileTick } from "iconsax-react"
import "./Navbar.css"
import { AppContext } from '../ParentContext'
// const 
const Navbar = () => {
    const { login,user, setUser } = useContext(AppContext)
//   const {setlogin,user, setUser}=useContext(AppContext);

    // console.log(login)
    return (
        <div className='NavBody'>
            <div className="Navbar">
                <img src={Logo} width={"100px"} alt="" />
                {/* <p>{user}</p> */}
                <div className="Profile">
                    <Messages1 size="32" color="#FFD400" />
                    <Video size="32" color="#9BD12F" />
                    <ProfileTick size="32" color="#9BD12F" />
                    <div style={{ textAlign: 'center'}}>
                        <button
                            style={{
                                backgroundColor: login ? 'white' : 'black',
                                color: login ? 'black' : 'white',
                                padding: '10px 20px',
                                border: 'none',
                                cursor: 'pointer',
                                marginRight: '10px'
                            }}
                        >
                            {login ? 'Logout' : 'Login'}
                        </button>
                        {login ? " " : (<button
                            style={{
                                backgroundColor: login ? 'black' : 'white',
                                color: login ? 'white' : 'black',
                                padding: '10px 20px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Signup
                        </button>)}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
