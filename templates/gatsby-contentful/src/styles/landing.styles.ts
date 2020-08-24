import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      marginTop: "2em",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      marginBottom: 100,
    },
    content: { margin: '0 2em' }
  })
)

export default useStyles
