import { Grid, Typography } from "@material-ui/core"
import React from "react"
import { isIE } from "react-device-detect"
import { useTranslation } from "react-i18next"

import Alerts from "../components/alerts/Alerts"
import Hero from "../components/hero/Hero"
import Layout from "../components/layout"
import SEO from "../components/seo"
import useLandingPage from '../hooks/useLandingPage'

const LandingPage = () => {
  const {  pageText, heroData } = useLandingPage()
  const { t } = useTranslation()
  const gridStyle: any = {
    display: "flex",
    marginTop: "2em",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: 100,
  }
  const contentStyle = { margin: '0 2em' }

  return (
    <Layout title={t("landing.title")}>
      <SEO title={t("landing.title")} />
      <Hero data={heroData} />
      <Grid
        container={true}
        direction="row"
        spacing={3}
        style={gridStyle}
      >
        {(isIE) ? <Alerts title={t('landing.warning')} severity={'warning'} isOpen={true}/> : null }
        <Grid item style={contentStyle}>
          <Typography color={"primary"}>{pageText}</Typography>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default LandingPage
