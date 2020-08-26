import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from "@material-ui/core/Grid"
import Hidden from "@material-ui/core/Hidden"
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from "@material-ui/core/useMediaQuery"
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'
import Img from "gatsby-image"
import React from 'react'

import theme from "../../themes/theme-light"
import NavDrawer from '../nav-drawer/NavDrawer'
import NavMenu from '../nav-menu'
import SignOutButton from '../sign-out-button'
import useStyles from './Layout.styles'

export default function PersistentDrawerLeft(props: { children: any, title?: string }) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const { menus, file, signInButtonLabel, signOutButtonLabel } = useLayout()
  const classes = useStyles()
  const { handleDrawerClose, open, handleDrawerOpen } = useNavigation()
  const style = {
    containerStyle: { display: "flex" },
    placeholderStyle: { visibility: "hidden" },
    h6Style: { textTransform: 'capitalize' },
    divStyle: { flex: "1 1 auto" },
    personIconStyle: { fontSize: 68 },
    drawerClasses: {
      paper: classes.drawerPaper,
    },
    alert: {
      display: "flex",
      justifyContent: "center",
      marginTop: "1em"
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden smDown={true}>
            <div className={classes.image}>
              <Img
                loading="eager"
                fixed={file?.childImageSharp?.fixed}
                placeholderStyle={style.placeholderStyle}
              />
            </div>
          </Hidden>
          <Typography variant="h6" noWrap>
            {props.title}
          </Typography>
          <Grid item className={classes.menu}>
            {!isMobile && menus?.map((menu: any, index: number) => (
              <NavMenu key={`${menu.label}-${index}`} {...menu} />
            ))}
            <SignOutButton {...{ signInButtonLabel, signOutButtonLabel }} />
          </Grid>
        </Toolbar>
      </AppBar>
      <NavDrawer {...{ open, handleDrawerClose, menus }} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  )
}
