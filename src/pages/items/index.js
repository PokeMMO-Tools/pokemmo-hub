import { Link, graphql } from 'gatsby';
import React from 'react';
import { Stack } from 'react-bootstrap';
import { Button, Typography } from '../../components/Atoms';
import { ItemsListing } from '../../components/Items/ItemsListing';
import { Page } from '../../components/Page';
import { PageTitle } from '../../components/PageTitle';
import { Seo } from '../../components/SEO'

const Items = ({ pageContext, data }) => {
    const PAGE_TITLE = "All Items"

    return (
        <Page breadcrumbs={pageContext.breadcrumb} label="Items">
            <PageTitle>
                <Stack direction="horizontal" className="justify-content-between">
                    <Typography as="h1" className='mb-0'>{PAGE_TITLE}</Typography>

                </Stack>
            </PageTitle>
            <ItemsListing items={data.allPokemmo.nodes} />
        </Page>
    )
}

const description = "A list of all PokeMMO items on the GTL."
export const Head = () => <Seo title="All Items" description={description}></Seo>

export const query = graphql`
query AllPokemmoQuery {
    allPokemmo {
        nodes {
            item_id
            _id
            slug
            n {
                en
                cn
                tw
                de
                fr
                it
                es
            }
            d {
                en
                cn
                tw
                de
                fr
                it
                es
            }
            category
        }
    }
}

`

export default Items;