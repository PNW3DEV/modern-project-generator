import './css/pages.css'

import Container from '@material-ui/core/Container'
import React from 'react'
import Helmet from 'react-helmet'

import { LandingHeroImage } from '../components/contentful-blocks/LandingHeroImage'
import ContetnfulRichText from '../components/contentful-rich-text'
import LeftNavBlock from '../components/utility/left-nav-block'
import { useTranslation } from '../hooks/useTranslation'
import { getFromStorage } from '../util/storage-utils'

export const DefaultTemplate = ({ pageContext }: any) => {
  const locale = getFromStorage('locale')
  const page = pageContext[locale || 'en']
  const entries = page?.entries || []
  const menu = page?.menu
  const [heroContent] = entries.filter((p: any) => p.image)
  const [markup] = entries.filter((p: any) => p.content)
  const { t } = useTranslation()
  return (
    <>
      <Helmet>
        <title>{page.browserTitle}</title>
      </Helmet>
      {heroContent &&
        <LandingHeroImage
          image={heroContent.image.file.url}
          heading={heroContent.heading}
          subheading={heroContent.subheading}
        />
      }
      <Container className="page-container">
        {menu &&
          <div className="menu-container">
            <LeftNavBlock
              label={menu.label || t('SHORTCUTS')}
              menuItems={
                menu.links.map((link: any) => ({
                label: link.title,
                url: link.slug
              }))}
            />
          </div>
        }
        <div className="content-container">
          {markup && <ContetnfulRichText markup={markup.content.json} />}
          {!markup && <h4>No Contentful entries have been created for this dynamic page yet.</h4>}
          <div style={{ margin: '20px 0', padding: 30, backgroundColor: 'white', borderRadius: 5 }}>
            <p>You can <a href={`https://app.contentful.com/spaces/416ywc1laqmd/entries/${page.contentful_id}`}>
              edit this page in Contentful
              </a>
              {' '}if you have permissions.</p>
          </div>
        </div>
      </Container>
    </>
  )
}

export default DefaultTemplate
