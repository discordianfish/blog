import React from 'react'

import { Link } from 'gatsby-link'
import Img from 'gatsby-image'

import get from 'lodash/get'

import typography from '../utils/typography'
let rhythm = typography.rhythm

import * as styles from '../css/blog.module.css';

class List extends React.Component {
  render() {
    const { posts } = this.props
    let index = 0
    return posts.map(( node ) => {
          index++
          const title = get(node, 'frontmatter.title') || node.fields.slug
          const image = get(node, 'frontmatter.image') || null
          const imageWidth = get(node, 'frontmatter.imageWidth') || '50%'
          const style = {
            height: rhythm(13),
            paddingRight: index % 2 == 0 ? '0em' : rhythm(1),
          }
          let content;
          if (image && image.childImageSharp) {
            content = <div>
              <Img style={{
                margin: [ rhythm(1/5), rhythm(1/4), rhythm(1/4-1/5), 0].join(' '),
                float: 'left',
                height: rhythm(4.5),
                width: imageWidth,
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
        }
    )
  }
}

export default List
