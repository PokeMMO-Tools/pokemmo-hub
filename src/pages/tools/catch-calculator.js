import { graphql } from 'gatsby'
import React from 'react'
import CatchCalculator from '../../components/Catch/CatchCalculator'
import { Page } from '../../components/Page'
import { PageTitle } from '../../components/PageTitle'
import { Seo } from '../../components/SEO'



const CatchCalculatorPage = ({ data, pageContext }) => {
    const PAGE_TITLE = "Catch Calculator"
    const sprites = data.allFile.edges
    return (
        <Page breadcrumbs={pageContext.breadcrumb} label={PAGE_TITLE}>
            <PageTitle credits="Calculate the catch chance of pokemon, depending on the pokeball, status condition, and health." className='mb-1 mt-2' >{PAGE_TITLE}</PageTitle>
            <CatchCalculator
                sprites={sprites}
            />
        </Page>
    )
}

export const query = graphql`
  query {
    allFile(
      filter: {relativePath: {regex: "/sprites/"}, extension: {regex: "/(jpg)|(jpeg)|(png)/"}, childImageSharp: {gatsbyImageData: {}}}
    ) {
      edges {
        node {
          id
          name
          childImageSharp {
            gatsbyImageData(width: 100, placeholder: DOMINANT_COLOR, formats: [AUTO, WEBP])
          }
        }
      }
    }
  }
`

// @TODO: change description
const description = "Calculate the catch chance of pokemon, depending on the pokeball, status condition, and health. PokeMMO."
export const Head = () => <Seo title="Catch Calculator" description={description}></Seo>

export default CatchCalculatorPage