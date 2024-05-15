import React, { useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import { Card, Search, Typography, MultiGraph } from '../../components/Atoms'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { MultiGraphItemList } from '../../components/Market/MultiGraphItemList'
import { Page } from '../../components/Page'
import { PageTitle } from '../../components/PageTitle'
import { Seo } from '../../components/SEO'
import { useTranslations } from '../../context/TranslationsContext'
import { useMarket } from '../../context/MarketContext'
import { prices as PricesApi } from '../../utils/prices'


const MultiGraphPage = ({ pageContext }) => {
    const { language, t } = useTranslations();
    const { toggleInvestmentsModal, removeFromInvestments, allItems } = useMarket();
    const [items, setItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState('');

    const updateItemList = (apiId) => {
		if (items.some(item => item.apiId === apiId))
			return; // Item already in array

		let itemInfo = allItems.find(({ i }) => i == apiId);
		PricesApi.getItem(itemInfo.i).then(res => {
			let item = {
				id: itemInfo._id,
				apiId: itemInfo.i,
				name: itemInfo.n[language],
				slug: itemInfo.slug,
				data: res
			}
			setItems([...items, item]);
		});
    }

	const onAddItemClick = (e) => {
		updateItemList(selectedItem);
	}

	const getSeriesData = () => {
		let seriesData = [];
		items.map((item) => {
			seriesData.push({
				name: item.name,
				data: item.data
			});
		});
		return seriesData;
	}

	const removeItem = (apiId) => {
		setItems(items.filter(i => i.apiId !== apiId));
	}

	const PAGE_TITLE = 'Multi Item Graph';

	return (
		<Page breadcrumbs={pageContext.breadcrumb} label={PAGE_TITLE}>
			<PageTitle>
				<Typography as='h1' className='mb-0'>{ PAGE_TITLE }</Typography>
			</PageTitle>
			<Stack gap={2}>
				<Card>
					<Typography as='h2'>Item List</Typography>
					<div className='d-flex flex-wrap align-items-center' style={{ gap: '0.3rem' }}>
						<div style={{ flexGrow: '1' }}>
							<Search
								items={
									allItems.map(({ i, n }) => {
										return (
											{
												value: i,
												label: n[language]
											}
										)
									})
								}
								onChange={({ value }) => setSelectedItem(value)}
							/>
						</div>
						<Button variant='info' onClick={onAddItemClick}>
							Add Item
						</Button>
					</div>
					
					<MultiGraphItemList items={items} removeItem={removeItem} />
				</Card>
				<Card>
					<Typography as='h2'>Market Graph</Typography>
					<MultiGraph seriesData={getSeriesData()} />
				</Card>
			</Stack>
		</Page>
	)
};

export const Head = () => {
  return <Seo title='Multi Graph' description='Compare multiple items on the GTL at the same time.'></Seo>
}

export default MultiGraphPage;