import { Grid } from "@material-ui/core"
// import useMediaQuery from "@material-ui/core/useMediaQuery"
import React from "react"
import { isIE } from "react-device-detect"
// import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"

import Alerts from "../../components/alerts/Alerts"
import Layout from "../../components/layout/Layout"
import SEO from "../../components/seo/SEO"
import SignInSide from "../../components/sign-in-side/SignInSide"
import useSignInPage from "../../hooks/useSignInPage"
import useStyles from '../../styles/sign-in.styles'

// import theme from "../../themes/theme-light"

const SignInPage = (props: {
  location: { origin: string; pathname: string }
}): JSX.Element => {
  const classes = useStyles()
  const { appBarTitle, siteTitle, data } = useSignInPage()
  const { t } = useTranslation()
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const childProps = { ...props, data, redirectUrl: "/dashboard" }

  return (
    <Layout title={appBarTitle || siteTitle}>
      <SEO title={siteTitle} />
      <Grid container direction="row" className={classes.container}>
        <SignInSide {...childProps} />
        {isIE ? (
          <Alerts
            title={t("landing.warning")}
            severity={"warning"}
            isOpen={true}
          />
        ) : null}
      </Grid>
    </Layout>
  )
}

export default SignInPage
