import { Link } from 'gatsby'
import React from 'react'
import { Button } from '../../components/Atoms'
import { InvestmentList } from '../../components/Market/InvestmentList'
import { Page } from '../../components/Page'
import { PageTitle } from '../../components/PageTitle'
import { Seo } from '../../components/SEO'

const Investments = ({ pageContext }) => {
    const PAGE_TITLE = "GTL Investments"
    const LINK_TO_ITEMS = <Button as={Link} to="/items" variant='info'>All Items</Button>
    return (
        <Page breadcrumbs={pageContext.breadcrumb} label={PAGE_TITLE}>
            <PageTitle credits="Start your trading life on PokeMMO GTL" className='mb-1 mt-2' >{PAGE_TITLE}</PageTitle>
            <InvestmentList
                showTotals={true}
            />
        </Page>
    )
}

// @TODO: change description
const description = "A tool for keeping track of all your PokeMMO GTL investments."
export const Head = () => <Seo title="GTL investments" description={description}></Seo>

export default Investments