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
    <>
      <Grid item>
        {cards?.map((card: any, idx: number) => (
          <Grid key={idx.toString()} item className={classes.content}>
            <LandingCard post={card} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default LandingCardList
