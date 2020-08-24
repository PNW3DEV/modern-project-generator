import { Grid, Typography } from "@material-ui/core"
import React from "react"
import { isIE } from "react-device-detect"
import { useTranslation } from "react-i18next"

import Alerts from "../components/alerts/Alerts"
import Hero from "../components/hero/Hero"
import Layout from "../components/layout"
import SEO from "../components/seo"
import useLandingPage from '../hooks/useLandingPage'
import useStyles from '../styles/landing.styles'

const LandingPage = () => {
  const classes = useStyles()
  const { pageText, heroData, data } = useLandingPage()
  const { t } = useTranslation()

  return (
    <Layout title={data.appBarTitle || t("landing.title")}>
      <SEO title={data.title || t("landing.title")} />
      <Hero data={heroData} />
      <Grid
        container
        direction="row"
        spacing={3}
        className={classes.container}
      >
        {(isIE) ? <Alerts title={t('landing.warning')} severity={'warning'} isOpen={true}/> : null }
        <Grid item className={classes.content}>
          <Typography color={"primary"}>{pageText}</Typography>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default LandingPage
