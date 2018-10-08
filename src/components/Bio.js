import React from 'react'

import profilePic from './profile-pic.jpg'

import typography from '../utils/typography'

let rhythm = typography.rhythm

import Link from 'gatsby-link'

import '../fonts/fontello/css/fontello.css'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Johannes Ziemke`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          By <strong>Johannes Ziemke</strong>.{' '}<br />
          You can <strong><Link to="/hire-me">hire me</Link></strong>.
        </p>
        <span style={{marginLeft: 'auto'}}>
          <a href="https://twitter.com/discordianfish">
            <i className="icon-twitter" />
          </a>
          <a href="https://github.com/discordianfish">
            <i className="icon-github-circled" />
          </a>
        </span>
      </div>
    )
  }
}

export default Bio
