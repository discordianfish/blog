import React from 'react'

import Link from 'gatsby-link'
import Img from 'gatsby-image'

import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import typography from '../utils/typography'
let rhythm = typography.rhythm

import styles from '../css/blog.module.css';
console.log("styles", styles);

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
      <div style={{textAlign: 'justify'}}>
        <Helmet title={siteTitle} />
        <h1>Case Studies</h1>
        {cs.map(( node ) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          const image = get(node, 'frontmatter.image')
          index++
          return (
            <div key={node.fields.slug} style={{
              display: 'inline-block',
              width: '50%',
              height: rhythm(10),
              position: 'relative',
              verticalAlign: 'top',
              paddingRight: index % 2 == 0 ? '0em' : rhythm(1),
            }}>
              <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  {title}
                </h3>
                <p className={styles.excerpt} dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </Link>
            </div>
          )
        })}

        <h1>Blog</h1>
        {bp.map(( node ) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          index++
          return (
            <div key={node.fields.slug} style={{
              display: 'inline-block',
              width: '50%',
              height: rhythm(10),
              position: 'relative',
              verticalAlign: 'top',
              overflow: 'hidden',
              paddingRight: index % 2 == 0 ? rhythm(1) : '0em',
            }}>
              <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  {title}
                </h3>
                <small>{node.frontmatter.date}</small>
                <p className={styles.excerpt} dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                <p className={styles.readMore}>…</p>
              </Link>
            </div>
          )
        })}
        <Bio />
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
          excerpt(pruneLength: 280)
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
