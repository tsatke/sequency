import './RadioGroup.scss'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { getUUID } from '../../../utility'
import { useSelector } from 'react-redux'

const RG = (props) => {
  const translation = useSelector((state) => state.translation)
  const id = getUUID()
  const { name, options, value, onChange, showEmptyOption = false, inline = false } = props
  const propIsMissing = () => {
    const requiredProps = ['name', 'options', 'onChange', 'value']
    return requiredProps.reduce((acc, prop) => (acc === false ? false : props[prop] === undefined), true)
  }

  if (propIsMissing()) return <></>

  return (
    <FormControl className={`custom-MUI-radiogroup ${inline && 'inline'}`} variant="filled" fullWidth={true}>
      <div className="name">{name}</div>
      <RadioGroup className="content" row name={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <FormControlLabel key={getUUID()} value={option.key} control={<Radio />} label={option.value} />
        ))}
        {showEmptyOption && <FormControlLabel key={getUUID()} value="" control={<Radio />} label={translation['radiogroup.empty.option']} />}
      </RadioGroup>
    </FormControl>
  )
}

export default RG
