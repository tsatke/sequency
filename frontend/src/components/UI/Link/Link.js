import { useNavigate } from 'react-router-dom'
import './Link.scss'

const CustomLink = (props) => {
  const navigate = useNavigate()

  const { href, text, children, newTab = false, isButton } = props
  const propIsMissing = () => {
    const requiredProps = ['href']
    const status = requiredProps.reduce((acc, prop) => (acc === true ? true : props[prop] === undefined), false)
    return status && (text !== undefined || children !== undefined)
  }

  const trigger = (e) => {
    e.preventDefault()
    if (newTab) {
      window.open(href, '_blank').focus()
    } else {
      navigate(href)
    }
  }

  if (propIsMissing()) return <></>

  return (
    <a className={isButton ? 'buttonLink' : 'custom-link'} href={href} onClick={trigger}>
      {text || children}
    </a>
  )
}

export default CustomLink
