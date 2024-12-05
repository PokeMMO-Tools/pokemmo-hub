import React, { useEffect, useState } from 'react'
import { Button, Spinner, Stack } from 'react-bootstrap'
import { Card, Search, Typography, MultiGraph } from '../../components/Atoms'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { MultiGraphItemList } from '../../components/Market/MultiGraphItemList'
import { Page } from '../../components/Page'
import { PageTitle } from '../../components/PageTitle'
import { Seo } from '../../components/SEO'
import { useTranslations } from '../../context/TranslationsContext'
import { useMarket } from '../../context/MarketContext'
import { prices as PricesApi } from '../../utils/prices'
import { useLocalStorage } from '../../hooks/useLocalStorage';


const MultiGraphPage = ({ pageContext }) => {
    const { language } = useTranslations();
    const { toggleInvestmentsModal, removeFromInvestments, allItems } = useMarket();
	const [selectedItem, setSelectedItem] = useState('');
	const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useLocalStorage('multiGraphItems', []);

	useEffect(() => {
		if (items.length > 0) {
			updatePriceData();
		}
     }, []);

    const addItemToList = (apiId) => {
		if (items.some(item => item.apiId === apiId))
			return; // Item already in array

		setIsLoading(true);
		let itemInfo = allItems.find(({ i }) => i === apiId);
		PricesApi.getItem(itemInfo.i).then(res => {
			let item = {
				id: itemInfo._id,
				apiId: itemInfo.i,
				name: itemInfo.n[language],
				slug: itemInfo.slug,
				category: itemInfo.category,
				data: res,
				hidden: false,
			}
			setIsLoading(false);
			setItems([...items, item]);
		});
    }

	const updatePriceData = () => {
		items.map(item => {
			PricesApi.getItem(item.apiId).then(res => {
				editItem(item.apiId, { data: res });
			});
		});
	}

	const onAddItemClick = (e) => {
		addItemToList(selectedItem);
	}

	const getSeriesData = () => {
		let seriesData = [];
		items.filter(item => item.hidden === false).map(item => {
			seriesData.push({
				name: item.name,
				data: item.data,
				showInNavigator: true,
			});
		});
		return seriesData;
	}

	const removeItem = (apiId) => {
		setItems(items.filter(i => i.apiId !== apiId));
	}

	const editItem = (apiId, updates) => {
		let foundIndex = items.findIndex(i => i.apiId === apiId);
		let updatedItem = {
			...items[foundIndex],
			...updates
		};
		setItems([...items.slice(0, foundIndex), updatedItem, ...items.slice(foundIndex + 1)]);
	}

	const getSearchableItems = () => {
		return allItems.filter(item => !items.some(removedItem => removedItem.apiId === item.i))
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
									getSearchableItems().map(({ i, n }) => {
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
					<MultiGraphItemList items={items} removeItem={removeItem} editItem={editItem} />
					{
						isLoading
						? <Spinner animation="border" variant="warning" />
						: <span></span>
					}
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