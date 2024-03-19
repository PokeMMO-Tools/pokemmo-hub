import React from 'react'
import { AccountBerry } from '../../components/Berries/AccountBerry'
import { BerryList } from '../../components/Berries/BerryList'
import { Page } from '../../components/Page'
import { PageTitle } from '../../components/PageTitle'
import { Seo } from '../../components/SEO'

const Berries = ({ pageContext }) => {
    const PAGE_TITLE = "Berries Helper"
    return (
        <Page breadcrumbs={pageContext.breadcrumb} label={PAGE_TITLE}>
            <PageTitle credits="Choose your berry and see when you've to water it and harvest it.">{PAGE_TITLE}</PageTitle>
            <AccountBerry className="mb-3" />
            <BerryList />
        </Page>
    )
}

// @TODO: change description
const description = "The ultimate berry helper for PokeMMO. Keep track of your berries, water and harvest it."
export const Head = () => <Seo title="Berries Helper" description={description}></Seo>

export default Berries