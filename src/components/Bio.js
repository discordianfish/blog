import React from 'react'

import profilePic from './profile-pic.jpg'

import typography from '../utils/typography'

let rhythm = typography.rhythm

import { Link } from 'gatsby-link'

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
          <strong><Link to="/hire-me">Hire me</Link></strong>.<br />
        </p>
        <span style={{marginLeft: 'auto'}}>
          <a href="https://twitter.com/discordianfish">
            <i className="icon-twitter" />
          </a><br />
          <a href="https://github.com/discordianfish">
            <i className="icon-github-circled" />
          </a><br />
          <Link to="/impressum">Impressum</Link>
        </span>
      </div>
    )
  }
}

export default Bio
