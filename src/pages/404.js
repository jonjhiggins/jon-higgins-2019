import React from 'react'
import { Link } from 'gatsby'
import SEO from '~/src/components/seo'
import PageWrapper from '~/src/components/page-wrapper'
import HeadingBackground from '~/src/components/heading-background'
import BodyText from '~/src/components/body-text'

const NotFoundPage = () => (
  <PageWrapper>
    <SEO title="404: Not found" />
    <HeadingBackground>Sorry, page not found</HeadingBackground>
    <BodyText>
      Go <Link to={'/'}>Home</Link>.
    </BodyText>
  </PageWrapper>
)

export default NotFoundPage
