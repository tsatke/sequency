import './Dropdown.scss'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { getUUID } from '../../../utility'
import { useSelector } from 'react-redux'

const Dropdown = (props) => {
  const translation = useSelector((state) => state.translation)
  const id = getUUID()
  const { name, options, value, onChange, showEmptyOption = true } = props
  const propIsMissing = () => {
    const requiredProps = ['name', 'options', 'onChange', 'value']
    return requiredProps.reduce((acc, prop) => (acc === false ? false : props[prop] === undefined), true)
  }
  if (propIsMissing()) return <></>
  return (
    <FormControl className="custom-MUI-dropdown" variant="filled" fullWidth={true}>
      <InputLabel id={`${id}-label`}>{name}</InputLabel>
      <Select labelId={`${id}-label`} id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {showEmptyOption && (
          <MenuItem value="">
            <em>{translation['dropdown.empty-selection']}</em>
          </MenuItem>
        )}

        {options.map((option) => (
          <MenuItem key={getUUID()} value={option.key}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default Dropdown
