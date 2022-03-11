import { TextField, InputAdornment } from '@mui/material'
import { addMissingZero } from '../../../utility'
import './Input.scss'
import NumberFormat from 'react-number-format'
import { forwardRef } from 'react'

const PreAndSuffixInput = forwardRef((props, ref) => {
  const { onChange, symbol, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => onChange({ target: { value: values.floatValue } })}
      thousandSeparator={'.'}
      decimalSeparator={','}
      isNumericString
      suffix={symbol}
    />
  )
})

const Input = (props) => {
  const { type, value, onChange, placeholder, variant, suffix, prefix, disabled = false, symbol, required = false } = props

  const propIsMissing = () => {
    const requiredProps = ['value', 'onChange']
    return requiredProps.reduce((acc, prop) => (acc === true ? true : props[prop] === undefined), false)
  }

  const processValue = (value) => {
    if (type === 'customNumber') {
      onChange(isNaN(value) ? '' : parseFloat(value))
    } else {
      onChange(value)
    }
  }

  const getValue = () => {
    // this means the date is provided by the database and has to be transformed into yyyy-MM-dd
    if (type === 'date' && value && value.endsWith('Z')) {
      const date = new Date(value)
      return `${date.getFullYear()}-${addMissingZero(date.getMonth() + 1)}-${addMissingZero(date.getDate())}`
    }
    return value || ''
  }

  if (propIsMissing()) return <></>

  let additionalProps = {}

  if (type === 'customNumber') {
    additionalProps.inputComponent = PreAndSuffixInput
    const plainrange = {}
    if (!isNaN(props.min)) {
      plainrange.min = props.min
    }
    if (!isNaN(props.max)) {
      plainrange.max = props.max
    }
    additionalProps.inputProps = { ...additionalProps.inputProps, plainrange }
  }

  additionalProps.inputProps = { ...additionalProps.inputProps, symbol }
  if (suffix) additionalProps.endAdornment = <InputAdornment position="end">{suffix}</InputAdornment>
  if (prefix) additionalProps.startAdornment = <InputAdornment position="start">{prefix}</InputAdornment>

  return (
    <TextField
      disabled={disabled}
      className={`custom-MUI-input ${props.className}`}
      type={type || 'text'}
      value={getValue()}
      onChange={(e) => processValue(e.target.value)}
      label={placeholder}
      InputProps={additionalProps}
      variant={variant ? variant : 'filled'}
      fullWidth={true}
      required={required}
    />
  )
}

export default Input
