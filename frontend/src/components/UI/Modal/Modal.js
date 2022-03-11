import Modal from 'react-bootstrap/Modal'
import CloseIcon from '@mui/icons-material/Close'
import './Modal.scss'

const ModalPattern = (props) => {
  const { open, close, children, title } = props
  const propIsMissing = () => {
    const requiredProps = ['open', 'close', 'children']
    const propsCheck = requiredProps.reduce((acc, prop) => (acc === true ? true : props[prop] === undefined), false)
    return propsCheck
  }

  if (propIsMissing()) return <></>

  return (
    <Modal show={open} onHide={close} id="modal">
      <div className="header">
        <div className="headerContentWrapper">
          <div className="title">{title}</div>
          <div onClick={close} className="closeWrapper">
            <CloseIcon fontSize="medium" />
          </div>
        </div>
        <div className="borderBottom"></div>
      </div>
      <div className="body">{children}</div>
    </Modal>
  )
}

export default ModalPattern
