import { Link } from 'gatsby'
import React from 'react'
import { Button } from '../../components/Atoms'
import { TradeAds } from '../../components/Market/TradeAds'
import { Page } from '../../components/Page'
import { PageTitle } from '../../components/PageTitle'
import { Seo } from '../../components/SEO'

const TradeAdsPage = ({ pageContext }) => {
    const PAGE_TITLE = "Trade Ads"
    return (
        <Page breadcrumbs={pageContext.breadcrumb} label={PAGE_TITLE}>
            <PageTitle credits="Start your trading life on PokeMMO" className='mb-1 mt-2'>{PAGE_TITLE}</PageTitle>
            <TradeAds />
        </Page>
    )
}

// @TODO: change description
const description = "A place to post your trade ads every 15 minutes."
export const Head = () => <Seo title="Trade Ads" description={description}></Seo>

export default TradeAdsPage