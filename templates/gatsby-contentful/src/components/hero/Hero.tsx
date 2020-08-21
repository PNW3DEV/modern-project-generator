import './Hero.css'

import Container from '@material-ui/core/Container'
import BackgroundImage from 'gatsby-background-image'
import React from 'react'

const bgHeight = { height: '380px' }

export default ({ data }: any) => (
  <BackgroundImage
    className="hero-container"
    fluid={data.heroImage.fluid}
    style={bgHeight}
  >
    <Container>
      {'data.heading' && <h1>{'data.heading'}</h1>}
      {'data.headingLineTwo' && <h1>{'data.headingLineTwo'}</h1>}
      {'data.subheading '&& <h3>{'data.subheading'}</h3>}
      {'data.copy' && <p>{'data.copy'}</p>}
      {'data.ctaText' &&
        <a href={data.ctaLink}>{'data.ctaText'}</a>
      }
    </Container>
  </BackgroundImage>
)
