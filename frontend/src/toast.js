import { toast } from 'react-toastify'

export const TYPE = {
  ERROR: 'error',
  WARNING: 'warn',
  INFO: 'info',
  SUCCESS: 'success',
}

const customToast = (type, text) => {
  if (!type || !text) return false
  toast[type](text, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

export default customToast
