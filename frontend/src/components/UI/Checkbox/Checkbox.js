import { Checkbox } from '@mui/material'
import { FormGroup } from '@mui/material'
import { FormControlLabel } from '@mui/material'
import './Checkbox.scss'

const CB = (props) => {
  const { text, checked, onChange, disabled = false } = props

  const propIsMissing = () => {
    const requiredProps = ['text', 'checked', 'onChange']
    return requiredProps.reduce((acc, prop) => (acc === false ? false : props[prop] === undefined), true)
  }

  if (propIsMissing()) return <></>

  return (
    <div className="custom-MUI-checkbox" style={props.style ? props.style : {}}>
      <FormGroup>
        <FormControlLabel disabled={disabled} control={<Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)} />} label={text} />
      </FormGroup>
    </div>
  )
}

export default CB
