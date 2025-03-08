import { Link } from 'gatsby'
import React from 'react'
import { Button } from '../../components/Atoms'
import { Wishlist } from '../../components/Market/Wishlist'
import { Page } from '../../components/Page'
import { PageTitle } from '../../components/PageTitle'
import { Seo } from '../../components/SEO'

const WishlistPage = ({ pageContext }) => {
    const PAGE_TITLE = "Wishlist"
    const LINK_TO_ITEMS = <Button as={Link} to="/items" variant='info'>All Items</Button>
    return (
        <Page breadcrumbs={pageContext.breadcrumb} label={PAGE_TITLE}>
            <PageTitle credits="Keep track of items you're interested in" className='mb-1 mt-2' >{PAGE_TITLE}</PageTitle>
            <Wishlist
                showTotals={true}
            />
        </Page>
    )
}

// @TODO: change description
const description = "A tool for keeping track of all your PokeMMO items that you are interested in."
export const Head = () => <Seo title="Wishlist" description={description}></Seo>

export default WishlistPage