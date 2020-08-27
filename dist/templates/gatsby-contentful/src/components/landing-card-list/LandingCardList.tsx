import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import React, { FunctionComponent } from 'react'

import LandingCard from '../landing-card'
import { LandingCardProps } from '../landing-card/LandingCard'
import useStyles from './LandingCardList.styles'

export interface LandingCardListProps {
  cards: Partial<LandingCardProps>[]
}

const LandingCardList: FunctionComponent<LandingCardListProps> = ({ cards = [] }) => {
  const classes = useStyles()
  return (
    <Container className={classes.container}>
      {cards?.map((card: any, idx: number) => (
        <Grid key={idx.toString()} item className={classes.content} xs={12}>
          <LandingCard post={card} />
        </Grid>
      ))}
    </Container>
  )
}

export default LandingCardList
