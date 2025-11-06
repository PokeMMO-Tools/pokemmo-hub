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
import { getItemName, getItemDescription, getItemInfo } from '../../utils/items';

const ItemPage = ({ pageContext, data }) => {
  const item = data.pokemmo;
  const { language } = useTranslations();
  const itemInfo = cosmeticInfo.find(cosmetic => cosmetic.item_id === item._id)

  return (
    <Page breadcrumbs={pageContext.breadcrumb} label={item.n[language]}>
      <PageTitle credits={getItemDescription(item.item_id)[language]}>
        <ItemHeading i={item.item_id} name={item.n[language]} category={item.category} _id={item._id} />
      </PageTitle>
      <div className="d-flex gap-2 mb-2 f2-6">
        {itemInfo && (
          <>
            {itemInfo.limitation !== 0 && (
              <Badge text="dark" bg="info" className="fs-6 fw-normal">
                {InterfaceItems.limitations[itemInfo.limitation]}
              </Badge>
            )}
            {itemInfo.festival !== 0 && itemInfo.year !== 0 && (
              <Badge text="dark" bg="info" className="fs-6 fw-normal">
                {InterfaceItems.festival[itemInfo.festival]} {itemInfo.year}
              </Badge>
            )}
          </>
        )}
        <>
          {
            getItemInfo(item._id).buy_bp && getItemInfo(item._id).buy_bp > 0
              ? <Badge>{getItemInfo(item._id).buy_bp} BP</Badge>
              : <></>
          }
        </>

      </div>
      <ItemDrop itemId={item.item_id} />
      <Item data={item}></Item>
      <ItemInvestments i={item.item_id} />
      <Card>
        <Graph name={item.n[language]} id={item.item_id} />
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

`


export default ItemPage;