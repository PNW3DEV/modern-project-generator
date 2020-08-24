import "react-toastify/dist/ReactToastify.css"

import CssBaseline from "@material-ui/core/CssBaseline"
import ThemeProvider from "@material-ui/styles/ThemeProvider"
import React, { ReactNode } from "react"
import { Helmet } from "react-helmet"
import { I18nextProvider } from "react-i18next"

import Toast from "../components/toast"
import i18next from "../i18n"
import AuthProvider from "../providers/AuthProvider"
import { TransitionProvider } from "../providers/TransitionProvider"
import theme from "../themes/theme-light"

const WrapRootElement: React.FC<{ element: ReactNode }> = ({ element }) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
          rel="preconnect"
        />
        <body style="overflow:auto" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TransitionProvider>
          <I18nextProvider i18n={i18next}>
            <AuthProvider>
              {element}
            </AuthProvider>
          </I18nextProvider>
        </TransitionProvider>
        <Toast />
      </ThemeProvider>
    </React.Fragment>
  )
}

export default WrapRootElement
