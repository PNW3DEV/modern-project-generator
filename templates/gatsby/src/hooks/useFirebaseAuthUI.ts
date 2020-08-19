import { navigate } from 'gatsby';
import { useEffect, useState } from 'react'
import  { useContext } from 'react'
import firebase from 'src/lib/firebase'
import firebaseui from 'src/lib/firebaseUI'

import { TransitionContext } from '../providers/TransitionProvider'

export default (props: { location: { origin: string, pathname: string } }) => {
  const { setState: updateTransition, state: loadingState } = useContext(TransitionContext)
  const [token, setToken] = useState(typeof window !== 'undefined' && localStorage.token || '')
  const isSignedIn = token && props.location.pathname === "/"

  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard')
    }
  }, [token, setToken])

  if (typeof window !== 'undefined') {
    useEffect(() => {
      const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase?.auth()) as any || {}
      const uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: (_: any, _redirectUrl: string) => true,
          uiShown: () => {
            if (!!loadingState.open) {
              updateTransition({
                open: false,
              })
            }
          }
        },
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: `${props.location.origin}/dashboard`,
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        // tosUrl: '<your-tos-url>',
        privacyPolicyUrl: 'https://www.oregon.gov/pages/terms-and-conditions.aspx'
      }

      if (!isSignedIn) {
        ui.start('#firebaseui-auth-container', uiConfig)
      }

      firebase.auth().getRedirectResult().then((result: any) => {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const accessToken = result.credential.accessToken
          localStorage.accessToken = accessToken
          setToken(accessToken)
        }
      })

      if (ui.isPendingRedirect()) {
        updateTransition({
          open: true
        })
      }

      return () => {}
    }, [loadingState])
  }

  return {
    isSignedIn,
  }
}
