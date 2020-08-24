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
      width: '100%',
      padding: '2em'
    },
    content: {
      margin: '1em 2em',
      width: '100%',
      // justifyContent: 'center',
      // alignItems: 'center',
      // display: 'flex',
      // flexDirection: 'row'
    }
  })
)

export default useStyles
