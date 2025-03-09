import { graphql } from 'gatsby';
import React from 'react';
import { Card, Badge } from '../../components/Atoms';
import { Graph } from '../../components/Atoms/Graph';
import { Item } from '../../components/Items/Item';
import { ItemDrop } from '../../components/Items/ItemDrop';
import { ItemHeading } from '../../components/Items/ItemHeading';
import { ItemInvestments } from '../../components/Items/ItemInvestments';
import { Page } from '../../components/Page';
import { PageTitle } from '../../components/PageTitle';
import { Seo } from '../../components/SEO';
import { useTranslations } from '../../context/TranslationsContext';
import cosmeticInfo from '../../data/pokemmo/item-cosmetic';
import { InterfaceItems } from '../../interface/items';

const ItemPage = ({ pageContext, data }) => {
  const item = data.pokemmo;
  const { language } = useTranslations();
  const itemInfo = cosmeticInfo.find(cosmetic => cosmetic.item_id === item._id)

  return (
    <Page breadcrumbs={pageContext.breadcrumb} label={item.n[language]}>
      <PageTitle credits={item.d[language]}>
        <ItemHeading i={item.i} name={item.n[language]} category={item.category} _id={item._id} />
      </PageTitle>
      <div className="d-flex gap-2 mb-2 f2-6">
        {
          itemInfo ?
            <>
              <Badge text="dark" bg="info" className="fs-6 fw-normal">
                {`
                ${InterfaceItems.limitations[itemInfo.limitation]}
              `}
              </Badge>
              <Badge text="dark" bg="info" className="fs-6 fw-normal">
                {`
                ${InterfaceItems.festival[itemInfo.festival]}
                ${itemInfo.year}
              `}
              </Badge>
            </>
            :
            <></>
        }
      </div>
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