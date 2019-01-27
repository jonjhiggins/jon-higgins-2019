import React from 'react'
import { Link } from 'gatsby'

const links = [
  {
    name: 'Work',
    link: '/work',
  },
  {
    name: 'Words',
    link: '/words',
  },
  {
    name: 'Who',
    link: '/who',
  },
]

class Navigation extends React.Component {
  render() {
    return (
      <ul>
        {links.map(({ name, link }, index) => (
          <li key={index}>
            <Link to={link}>{name}</Link>
          </li>
        ))}
      </ul>
    )
  }
}
export default Navigation
