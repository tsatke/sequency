import './Header.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { projectName } from '../../../utility'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/esm/Container'
import Navbar from 'react-bootstrap/esm/Navbar'
import Nav from 'react-bootstrap/esm/Nav'

const Header = () => {
  const translation = useSelector((state) => state.translation)
  const navigate = useNavigate()
  const [expandNavBar, setExpandNavBar] = useState(false)

  const toggle = () => {
    setExpandNavBar(!expandNavBar)
  }

  const navItemClicked = (e) => {
    if (e.target.attributes && e.target.attributes.href) {
      navigate(e.target.attributes.href.value)
      window.scrollTo(0, 0)
      if (e.target.attributes.href !== '/') {
        this.toggle()
      }
    } else if (e.target.parentElement.attributes.href && e.target.parentElement.attributes.href.value) {
      navigate(e.target.parentElement.attributes.href.value)
      window.scrollTo(0, 0)
      if (e.target.parentElement.attributes.href.value !== '/') {
        this.toggle()
      }
    }
  }

  return (
    <Container id="header" fluid>
      <Navbar expand="lg" expanded={expandNavBar} variant="dark">
        <Navbar.Brand href="/" onClick={navItemClicked}>
          <div className="logo">{projectName}</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggle} />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/projects" onClick={navItemClicked}>
              {translation.header.nav.projects}
            </Nav.Link>
            <Nav.Link href="/editor" onClick={navItemClicked}>
              {translation.header.nav.editor}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  )
}

export default Header
