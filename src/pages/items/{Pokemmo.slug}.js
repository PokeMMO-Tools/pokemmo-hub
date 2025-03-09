import { graphql } from 'gatsby';
import React from 'react';
import { Card } from '../../components/Atoms';
import { Graph } from '../../components/Atoms/Graph';
import { Item } from '../../components/Items/Item';
import { ItemDrop } from '../../components/Items/ItemDrop';
import { ItemHeading } from '../../components/Items/ItemHeading';
import { ItemInvestments } from '../../components/Items/ItemInvestments';
import { Page } from '../../components/Page';
import { PageTitle } from '../../components/PageTitle';
import { Seo } from '../../components/SEO';
import { useTranslations } from '../../context/TranslationsContext';

const ItemPage = ({ pageContext, data }) => {
  const item = data.pokemmo;
  const { language } = useTranslations();

  return (
    <Page breadcrumbs={pageContext.breadcrumb} label={item.n[language]}>
      <PageTitle credits={item.d[language]}>
        <ItemHeading i={item.i} name={item.n[language]} category={item.category} _id={item._id} />
      </PageTitle>
      <ItemDrop itemId={item.i} />
      <Item data={item}></Item>
      <ItemInvestments i={item.i} />
      <Card>
        <Graph name={item.n[language]} id={item.i} />
      </Card>

    </Page>
  )
};

export const Head = ({ data }) => {
  const { language } = useTranslations();
  return <Seo title={data.pokemmo.n[language]} description={data.pokemmo.d[language]}></Seo>
}

export const query = graphql`
  query MyQuery($slug: String!) {
  pokemmo(slug: {eq: $slug}) {
    i
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

`


export default ItemPage;