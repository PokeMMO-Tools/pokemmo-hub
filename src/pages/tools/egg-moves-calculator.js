import { graphql } from 'gatsby'
import React, { useState } from 'react'
import { EggMovesFilters } from '../../components/EggMoves/EggMovesFilters'
import { EggMovesResults } from '../../components/EggMoves/EggMovesResults'
import { Page } from '../../components/Page'
import { PageTitle } from '../../components/PageTitle'
import { Seo } from '../../components/SEO'


const EggMoves = ({ data, pageContext, location }) => {
  console.log(location);
  const sprites = data.allFile.edges
  const [pkmnID, setPkmnID] = useState(location.state?.id || 0);
  console.log(location.state?.id || 0);

  const PAGE_TITLE = "Egg Moves Calculator"

  return (
    <Page breadcrumbs={pageContext.breadcrumb} label={PAGE_TITLE}>
      <PageTitle credits="Thanks to YIBU for releasing the file with every egg moves path.">{PAGE_TITLE}</PageTitle>
      <EggMovesFilters onFilter={setPkmnID} />
      <div className="mt-3" style={{ zIndex: 0 }}>
        <EggMovesResults selectedPokemon={pkmnID} sprites={sprites} />
      </div>
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


const description = "A guide for Egg Moves in PokeMMO. How to pass egg moves in PokeMMO? Select the Pokemon and the Egg move you want to get."
export const Head = () => <Seo title="Egg Moves Helper" description={description}></Seo>

export default EggMoves