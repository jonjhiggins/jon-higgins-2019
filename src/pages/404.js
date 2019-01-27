import React from 'react'
import { Link } from 'gatsby'
import SEO from '../components/seo'

const NotFoundPage = () => (
  <div>
    <SEO title="404: Not found" />
    <h1>Sorry, page not found</h1>
    <p>
      <Link to={'/'}>Home</Link>
    </p>
  </div>
)

export default NotFoundPage
