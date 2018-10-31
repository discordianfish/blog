import React from 'react'

import Link from 'gatsby-link'
import Img from 'gatsby-image'

import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
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
      } else {
        bp.push(node)
      }
    })
    let index = 0
    return (
      <div className={styles.index}>
        <Helmet title={siteTitle}><html lang="en" /></Helmet>
        <Bio />
        <h1>Blog</h1>
        {bp.map(( node ) => {
          index++
          const title = get(node, 'frontmatter.title') || node.fields.slug
          const image = get(node, 'frontmatter.image') || null
          const style = {
            height: rhythm(12),
            paddingRight: index % 2 == 0 ? '0em' : rhythm(1),
          }
          let content;
          if (image && image.childImageSharp) {
            content = <div>
              <Img style={{
                margin: [ rhythm(1/5), rhythm(1/4), rhythm(1/4-1/5), 0].join(' '),
                float: 'left',
                height: rhythm(5.5),
                minWidth: '50%',
              }} fluid={image.childImageSharp.fluid} />
              <span dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          } else {
            content = <span dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          }

          return (
            <div key={node.fields.slug} className={styles.preview} style={style}>
              <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  {title}
                </h3>
                <small>{node.frontmatter.date}</small>
                <div className={styles.excerpt}>{content}</div>
                <p className={styles.readMore}>…</p>
              </Link>
            </div>
          )
        })}
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
      sort: { fields: [frontmatter___date], order: DESC }
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
