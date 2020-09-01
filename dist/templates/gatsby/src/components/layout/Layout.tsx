import CssBaseline from '@material-ui/core/CssBaseline'
import clsx from 'clsx'
import React from 'react'
import { isIE } from 'react-device-detect'
import { useTranslation } from 'react-i18next'

import useLayout from '../../hooks/useLayout'
import useNavigation from '../../hooks/useNavigation'
import Alerts from '../alerts/Alerts'
import AppBar from './app-bar/AppBar'
import useStyles from './Layout.styles'
import NavDrawer from './nav-drawer/NavDrawer'

export const Layout = (props: { children: JSX.Element|React.ReactNode, title?: string }) => {
  const { menus, file, signInButtonLabel, signOutButtonLabel } = useLayout()
  const classes = useStyles()
  const { handleDrawerClose, open, handleDrawerOpen } = useNavigation()
  const { t } = useTranslation()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        title={props.title}
        {...{
          file,
          signInButtonLabel,
          signOutButtonLabel,
          handleDrawerOpen,
          handleDrawerClose,
          menus,
          open
        }}
      />
      <NavDrawer {...{ open, handleDrawerClose, menus } as any} />
      <main className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {(isIE) ? <Alerts title={t('landing.warning')} severity={'warning'} isOpen={true}/> : null }
        {props.children}
      </main>
    </div>
  )
}

export default Layout
