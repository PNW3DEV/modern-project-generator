import { graphql, useStaticQuery } from 'gatsby'
import React, { FunctionComponent as FC } from 'react'
import Helmet from 'react-helmet'

import { HeroMessaging } from '../components/contentful-blocks/HeroMessaging'
import { HomepageCards } from '../components/contentful-blocks/HomepageCards'
import { HomepageHeroRightText } from '../components/contentful-blocks/HomepageHeroRightText'
import { HomepageNewsFeed } from '../components/contentful-blocks/HomepageNewsFeed'
import { LandingHeroImage } from '../components/contentful-blocks/LandingHeroImage'
import { ShortcutsBar } from '../components/contentful-blocks/ShortcutsBar'
import { getFromStorage } from '../util/storage-utils'

const Home: FC = () => {
  const { page } = useStaticQuery(graphql`
    query homepageContent {
      page: allContentfulPage(filter: {contentful_id: {eq: "2PwPTe52NGvjN5Ys0fdzhU"}}) {
        nodes {
          node_locale
          contentful_id
          slug
          title
          browserTitle
          entries {
            ... on ContentfulLandingHeroHeader {
              heading
              headingLineTwo
              subheading
              ctaLink
              ctaText
              image {
                file {
                  url
                }
              }
            }
            ... on ContentfulHeroMessaging {
              largeHeadline
              paragraphHeadline
              useColorBackground
              alignImage
              copy: paragraphCopy {
                text: paragraphCopy
              }
              image {
                file {
                  url
                }
              }
            }
          }
        }
      }
    }
  `)
  // grab the current locale.
  const [content] = page.nodes.filter(
    (pg: any) => pg.node_locale === (getFromStorage('locale') || 'en')
  )
  // filter for content sections
  const [hero] = content.entries.filter((entry: any) => entry.__typename === 'ContentfulLandingHeroHeader')
  const messaging = content.entries.filter((entry: any) => entry.__typename === 'ContentfulHeroMessaging')
  console.log(messaging)
  return (
    <>
      <Helmet>
        <title>{content.browserTitle}</title>
      </Helmet>

      <LandingHeroImage
        image={hero.image.file.url}
        heading={hero.heading}
        headingLineTwo={hero.headingLineTwo}
        copy={hero.subheading}
        ctaLink={hero.ctaLink}
        ctaText={hero.ctaText}
      />

      <ShortcutsBar />

      {messaging.map((message: any) => (
        <HeroMessaging
          image={message.image.file.url}
          largeHeadline={message.largeHeadline}
          paragraphHeadline={message.paragraphHeadline}
          copy={message.copy.text}
          useColorBackground={message.useColorBackground}
          alignImage={message.alignImage}
        />
      ))}

      <HomepageNewsFeed />
      <HomepageHeroRightText
        img="https://images.unsplash.com/photo-1517502567600-72422bdb7130?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4608&q=80"
        headline={'"Purus faucibus ornare suspendisse sed nisi. Amet dictum sit amet justo. Eu nisl nunc mi ipsum"'}
        copy="- Pretium Fuscee."
      />
      <HomepageCards />
    </>
  )
}

export default Home
