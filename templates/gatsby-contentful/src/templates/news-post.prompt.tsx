import '../components/hero/Hero.css'

import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import { Helmet } from 'react-helmet'

import Layout from '../components/layout'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

const NewsPostTemplate = (props: any) => {
  const { title: siteTitle } = useSiteMetadata()
  const post = props.data.contentfulBlogPost
  const page = props.pageContext
  const markdown = { __html: post.body.childMarkdownRemark.html }
  const badInlineStyle = { margin: '20px 0', padding: 30, backgroundColor: 'white', borderRadius: 5 }

  return (
    <Layout title={`${siteTitle} - ${post.title}`}>
      <div style={{ margin: '8px 3em' }}>
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <div className="hero">
          <Img
            className="heroImage"
            alt={post.title}
            fluid={post.heroImage.fluid}
          />
        </div>
        <div className="wrapper">
          <h1 className="section-headline">{post.title}</h1>
          <p style={{ display: 'block' }}>
            {post.publishDate}
          </p>
          <div dangerouslySetInnerHTML={markdown} />
          <div className="content-container">
            {!post && <h4>No Contentful entries have been created for this dynamic page yet.</h4>}
            {
              process.env.GATSBY_ACTIVE_ENV !== 'production' && <div style={badInlineStyle}>
              <p>You can <a href={`https://app.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries/${page.contentful_id}`}>
                edit this page in Contentful
                </a>
                {' '}if you have permissions.</p>
            </div>
            }
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default NewsPostTemplate

export const pageQuery = graphql`
  query NewsPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
