import { useState } from 'react'

export default () => {
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return {
    handleDrawerOpen,
    handleDrawerClose,
    open,
    setOpen
  }
}
