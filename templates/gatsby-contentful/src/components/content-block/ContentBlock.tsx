import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import React, { FunctionComponent } from 'react'

export interface ContentBlockProps {
  header?: string
  image?: any
  fluid?: any
  subHeader?: any
  link?: any
  imgPosition?: 'left'|'right'
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: (props: ContentBlockProps) =>
        props.imgPosition === 'left' ? '#dee0df' : '#9dc4cc',
      height: '25em',
      padding: '2em 0'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginTop: '2em',
      display: 'flex'
    },
    container: {
      padding: '3em 2em'
    },
    item: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginBottom: '2em'
    },
    image: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginTop: '-3em',
      display: 'flex',
    },
    img: {
      boxShadow: '3px 3px 3px'
    }
  }),
);

export const ContentBlock: FunctionComponent<ContentBlockProps> = (props) => {
  const {
    header,
    image,
    subHeader,
    imgPosition,
  } = props
  const classes = useStyles(props)
  const Subheader = () => (
    <Grid item className={classes.paper} xs={12} md={imgPosition === 'left' ? 7 : 8}>
      <Typography variant={'h4'}>{subHeader}</Typography>
    </Grid>
  )
  const Image = () => (
    <Grid item className={classes.image} xs={12} md={3}>
      <img className={classes.img} height="290px" src={image} />
    </Grid>
  )
  return (
    <div className={classes.root}>
      <Grid container className={classes.container} spacing={3}>
        <Grid item className={classes.item} xs={12}>
          <Typography variant={'h3'}>{header}</Typography>
        </Grid>
        {imgPosition === 'left'
          ? <><Image /><Subheader /></>
          : <><Subheader /> <Image /></>
        }
      </Grid>
    </div>
  )
}

export default ContentBlock
