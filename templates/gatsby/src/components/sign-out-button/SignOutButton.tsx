import React, { FunctionComponent, useContext } from 'react'
import Button from '@material-ui/core/Button'
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../providers/AuthProvider'

interface SignOutButtonProps {
  // TODO: INSERT PROP TYPES
}

const SignOutButton: FunctionComponent<SignOutButtonProps> = () => {
  const { t } = useTranslation()
  const { signOut } = useContext(AuthContext)

  return (
    <Button
      color="inherit"
      onClick={signOut}
      endIcon={<ExitToAppIcon />}
    >
      {t("userMenu.signOut")}
    </Button>
  )
}

export default SignOutButton
