import { TextField } from '@mui/material'
import './Textarea.scss'

const Input = (props) => {
  const { type, value, onChange, placeholder, variant, disabled } = props

  const propIsMissing = () => {
    const requiredProps = ['value']
    return requiredProps.reduce((acc, prop) => (acc === true ? true : props[prop] === undefined), false)
  }

  if (propIsMissing()) return <></>
  return (
    <TextField
      className={`custom-MUI-textarea ${props.className}`}
      type={type || 'text'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      label={placeholder}
      multiline
      rows={props.rows || 4}
      variant={variant ? variant : 'filled'}
      fullWidth={true}
      disabled={typeof disabled === 'boolean' ? disabled : false}
    />
  )
}

export default Input
