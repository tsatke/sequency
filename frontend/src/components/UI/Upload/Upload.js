import { useState } from 'react'
import './Upload.scss'
import { getUUID } from '../../../utility'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import { useSelector } from 'react-redux'
import { fileUploadS3Public, fileUploadS3Private } from '../../../fetch'
import CloseIcon from '@mui/icons-material/Close'

const Upload = (props) => {
  const { title, uploadType, uploadedCallback, isPublicUpload, accept, files } = props

  const [processing, setProcessing] = useState(false)
  const token = useSelector((state) => state.token)
  const uuid = getUUID()
  const fileUploadS3 = isPublicUpload === true ? fileUploadS3Public : fileUploadS3Private

  const propIsMissing = () => {
    const requiredProps = ['uploadType', 'uploadedCallback', 'files']
    return requiredProps.reduce((acc, prop) => (acc === true ? true : props[prop] === undefined), false)
  }

  const startUpload = async (newFiles) => {
    if (newFiles.length >= 1) {
      setProcessing(true)
      const processedNewFiles = []
      for (const file of newFiles) {
        const url = await fileUploadS3(token, file, uploadType)
        if (url) {
          processedNewFiles.push({
            name: file.name,
            size: file.size,
            type: file.type,
            url,
          })
        }
      }
      uploadedCallback([...files, ...processedNewFiles])
    }
  }

  const remove = (index) => () => {
    uploadedCallback([...files].filter((f, i) => i !== index))
  }

  if (propIsMissing()) return <></>
  return (
    <div className="custom-upload-handler">
      <input type="file" id={uuid} className="upload-input" accept={accept ? accept : '*/*'} multiple={true} onChange={(e) => startUpload(e.target.files)} />
      <div className="upload-display">
        <label htmlFor={uuid} className="upload-input-label">
          {title}
        </label>
        {processing && (
          <div className="processing">
            <AutorenewIcon />
          </div>
        )}
        {files.length > 0 && (
          <div className="file-list">
            {files.map((file, i) => (
              <div className="file" key={getUUID()}>
                <div className="name">{file.name}</div>
                <div className="remove-wrapper">
                  <CloseIcon fontSize="medium" onClick={remove(i)} className="remove" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Upload
