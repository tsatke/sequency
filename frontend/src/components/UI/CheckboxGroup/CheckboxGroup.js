import { getUUID } from '../../../utility'
import Checkbox from '../Checkbox/Checkbox'
import './CheckboxGroup.scss'

const CBG = (props) => {
  const { options, values, onChange, itemsPerRow } = props

  const update = (value) => (checked) => {
    onChange(checked ? [...values, value] : values.filter((val) => val !== value))
  }

  return (
    <div className="checkboxGroup">
      {options.map((option) => (
        <Checkbox key={getUUID()} style={{ width: `calc(${100 / itemsPerRow}% - ${itemsPerRow * 3}px)` }} text={option.label} checked={values.includes(option.value)} onChange={update(option.value)} />
      ))}
    </div>
  )
}

export default CBG
