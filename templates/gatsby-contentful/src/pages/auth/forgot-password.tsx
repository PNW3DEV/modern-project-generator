import { Grid } from "@material-ui/core"
import React from "react"
import { isIE } from "react-device-detect"
import { useTranslation } from "react-i18next"

import Alerts from "../../components/alerts/Alerts"
import ForgotPassword from "../../components/forgot-password-form/ForgotPasswordForm"
import Layout from "../../components/layout/Layout"
import SEO from "../../components/seo/SEO"
import useStyles from '../../styles/forgot-password.styles'

const ForgotPasswordPage = (): JSX.Element => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Layout title={"Contentful CMS Demo - Forgot Password"}>
      <SEO title={'Contentful CMS Demo - Forgot Password'} />
      <Grid container={true} direction="row" className={classes.container}>
        <ForgotPassword />
        {isIE ? (
          <Alerts
            title={t("landing.warning")}
            severity={"warning"}
            isOpen
          />
        ) : null}
      </Grid>
    </Layout>
  )
}

export default ForgotPasswordPage
