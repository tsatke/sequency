import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { getUUID } from '../../../utility'
import './TabView.scss'

const TabView = ({ items }) => {
  const [index, setIndex] = useState(0)

  return (
    <div className="custom-MUI-tabview">
      <div className="tab-header">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={index} onChange={(e, newIndex) => setIndex(newIndex)}>
            {items.map((item) => (
              <Tab key={getUUID()} label={item.name} />
            ))}
          </Tabs>
        </Box>
      </div>
      <div key={getUUID()} className="tab-content">
        {items[index].component}
      </div>
    </div>
  )
}

export default TabView
