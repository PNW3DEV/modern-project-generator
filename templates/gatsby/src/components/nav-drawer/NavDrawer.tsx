import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import { useTheme } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { navigate } from 'gatsby'
import React, { FunctionComponent } from 'react'

import DrawerMenu from '../drawer-menu';
import useStyles from '../layout/Layout.styles'

export interface MenuItem {
  label: string
  slug?: string
  url?: string
  icon?: any
  isExternal?: boolean
  menuItems: this
}

export interface NavDrawerProps {
  open: boolean
  handleDrawerClose: () => void
  menus: MenuItem[]
}

export const handleMenuClick = async (menu: MenuItem) => {
  if (!menu?.isExternal && menu?.url) return navigate(menu.url)
  if (menu?.isExternal && menu?.url) window.open(menu.url, '_blank')
}

const NavDrawer: FunctionComponent<NavDrawerProps> = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const { open, handleDrawerClose } = props
  const style = {
    drawerClasses: {
      paper: classes.drawerPaper,
    },
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={style.drawerClasses}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <DrawerMenu menus={props.menus} onClick={handleMenuClick} />
    </Drawer>
  )
}

export default NavDrawer
