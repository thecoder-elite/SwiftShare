import '../Css/NavBar.css'
import React from 'react'
import { Navbar, Nav, NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    // const [isOpen, setIsOpen] = useState(false);
    // const [isOpen] = useState(false);

    // const toggle = () => setIsOpen(!isOpen);
    return (
        <div className="Navbar">
            <Navbar color="transparent" light expand="md">
                {/*onClick={toggle} */}
                <Link to="/">
                    <img
                        src={require('./image/logo.png')}
                        className="Brand"
                        width="60px"
                        alt="logo of SwiftShare website"
                    />
                </Link>
                {/* <Collapse isOpen={isOpen} navbar> */}
                <Nav className="me-auto" navbar>
                    <NavItem className="Nav-item">
                        <Link to="/send" style={{ textDecoration: 'none' }}>
                            <p className="Nav-elements">Send</p>
                        </Link>
                    </NavItem>
                    <NavItem className="Nav-item">
                        <Link to="/download" style={{ textDecoration: 'none' }}>
                            <p className="Nav-elements">Download</p>
                        </Link>
                    </NavItem>
                </Nav>
                {/* </Collapse> */}
            </Navbar>
        </div>
    )
}

export default NavBar
