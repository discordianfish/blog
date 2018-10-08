import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'

import typography from '../utils/typography'
let rhythm = typography.rhythm
let scale = typography.scale

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    const siteTitle = get(this, 'props.data.site.siteMetadata.title') || ''
    let header
    let maxWidth

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    if (location.pathname === rootPath) {
      maxWidth = 36
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
          {siteTitle}
          </Link>
        </h1>
      )
    } else {
      maxWidth = 24
      header = (
        <h1
          style={{
            marginTop: 0,
            marginBottom: rhythm(-1),
            fontSize: '400%',
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
          {siteTitle}
          </Link>
        </h1>
      )
    }
    return (
      <div>
        <div
          style={{
            margin: '0 auto',
            maxWidth: rhythm(maxWidth),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          {header}
          {children}
        </div>
      </div>
    )
  }
}

export default Template

export const metadataQuery = graphql`
  query MetadataQuery {
    site {
      siteMetadata {
        title
      }
    }
}
`
