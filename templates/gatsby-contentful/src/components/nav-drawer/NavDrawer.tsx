import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { useTheme } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MailIcon from '@material-ui/icons/Mail'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import { navigate } from 'gatsby'
import React, { FunctionComponent } from 'react'

import useStyles from '../layout/Layout.styles'

export interface MenuItem {
  label: string
  slug?: string
  url?: string
  menuItems: this
}

export interface NavDrawerProps {
  open: boolean
  handleDrawerClose: () => void
  menus: MenuItem[]
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
  const handleMenuClick = async (menu: MenuItem) => {
    if (menu.slug) return navigate(menu.slug)
    if (menu.url) window.open(menu.url)
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
      <List>
        {props.menus.map((menu, index) => (
          <ListItem button key={`${menu.label}-${index}`} onClick={() => handleMenuClick(menu)}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={menu.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default NavDrawer
