import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import React from 'react'
import { Helmet } from 'react-helmet'

import Layout from '../components/layout/Layout'
import PostCard from '../components/post-card/PostCard'
import useNewsPage from '../hooks/useNewsPage'
import useStyles from '../styles/news.styles'

const NewPage = () => {
  const { siteTitle, posts } = useNewsPage()
  const classes = useStyles()

  return (
    <Layout>
      <div className={classes.wrapper}>
        <Helmet title={siteTitle || 'Contentful Demo'} />
        <div className={classes.blogHeader}>Blog</div>
        <Grid item className={classes.heading} xs={12}>
          <Typography variant="h5">Recent Posts</Typography>
        </Grid>
        <Grid container className={classes.container}>
          {posts.map(({ node }: any) => (
            <Grid item className={classes.item} key={node.slug}>
              <PostCard post={node} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  )
}

export default NewPage
