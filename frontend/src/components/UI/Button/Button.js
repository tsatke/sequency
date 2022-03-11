import { Button } from '@mui/material'
import './Button.scss'

const B = (props) => {
  const { onClick, text, type, fullWidth, disabled } = props
  const propIsMissing = () => {
    const requiredProps = ['text']
    const propsCheck = requiredProps.reduce((acc, prop) => (acc === true ? true : props[prop] === undefined), false)
    return propsCheck && (typeof onClick === 'function' || type === 'submit')
  }
  if (propIsMissing()) return <></>
  return (
    <Button disabled={disabled} className={`custom-MUI-button ${props.className}`} type={type} onClick={onClick} variant="contained" fullWidth={fullWidth !== undefined ? fullWidth : true}>
      {text}
    </Button>
  )
}

export default B
