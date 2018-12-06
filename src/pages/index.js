import React from 'react'

import Link from 'gatsby-link'
import Img from 'gatsby-image'

import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import List from '../components/List'
import typography from '../utils/typography'
let rhythm = typography.rhythm

import styles from '../css/blog.module.css';

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    let cs = [];
    let bp = [];
    posts.map(({ node }) => {
      const tags = get(node, 'frontmatter.tags')
      if (tags && tags.includes("case-study")) {
        cs.push(node)
      } else if (!tags || !tags.includes("hidden")) {
        bp.push(node)
      }
    })
    let index = 0
    return (
      <div className={styles.index}>
        <Helmet title={siteTitle}><html lang="en" /></Helmet>
        <Bio />
        <h1>Case Studies</h1>
        <List posts={cs} />
        <h1>Blog</h1>
        <List posts={bp} />
      </div>
    )
  }
}

export default BlogIndex


export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date, frontmatter___index], order: DESC }
      filter: { frontmatter: { tags: { ne: "page" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 350)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            index
            image {
              childImageSharp {
                fluid(maxWidth: 400, maxHeight: 250) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
