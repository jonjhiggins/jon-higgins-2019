import React from 'react'
import PageWrapper from '~/src/components/page-wrapper'
import SEO from '~/src/components/seo'
import HomeAnimation from '~/src/components/home-animation'

const ThisPage = () => {
  return (
    <PageWrapper>
      <SEO title="Home" />
      <HomeAnimation />
    </PageWrapper>
  )
}

export default ThisPage
