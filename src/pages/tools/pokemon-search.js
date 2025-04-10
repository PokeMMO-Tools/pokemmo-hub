import { graphql } from 'gatsby'
import React from 'react'
import PokemonSearch from '../../components/Search/PokemonSearch'
import { Page } from '../../components/Page'
import { PageTitle } from '../../components/PageTitle'
import { Seo } from '../../components/SEO'



const PokemonSearchPage = ({ data, pageContext }) => {
    const PAGE_TITLE = "Pokemon Search"
    const sprites = data.allFile.edges
    return (
        <Page breadcrumbs={pageContext.breadcrumb} label={PAGE_TITLE}>
            <PageTitle credits="Search pokemon based on specific filters and requirements, such as moves and ability combinations." className='mb-1 mt-2' >{PAGE_TITLE}</PageTitle>
            <PokemonSearch
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
const description = "Search pokemon based on specific filters and requirements, such as moves and ability combinations."
export const Head = () => <Seo title="Pokemon Search" description={description}></Seo>

export default PokemonSearchPage