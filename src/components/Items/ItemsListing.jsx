import React, { useState, useMemo, useEffect } from 'react';
import { Stack, Form } from 'react-bootstrap';
import { Link } from 'gatsby';
import { useQuery } from 'react-query';
import { Button, Card, Pagination, Typography } from '../Atoms';
import { FilterSelect } from '../Pokedex/FilterSelect';
import { ItemRow } from './ItemRow';
import { useTranslations } from '../../context/TranslationsContext';
import { prices } from '../../utils/prices';
import { InterfaceItems } from '../../interface/items';
import { getItemInfo, getPokemmoID, getCosmeticInfo } from '../../utils/items';
import { slugify } from '../../utils/slugify'
import { Spinner } from 'react-bootstrap'

const DEFAULT_FILTERS = {
    name: '',
    category: false,
};

const category = Object.values(InterfaceItems.category).map((value, index) => ({
    key: index,
    label: value,
}));

export const ItemsListing = () => {
    const { language, t } = useTranslations();
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(100);
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [sortOrder, setSortOrder] = useState('desc');

    const cachedData = JSON.parse(localStorage.getItem('allItemsDescCache') || 'null');
    const isDataCached = cachedData && cachedData.timestamp && Date.now() - cachedData.timestamp < 21600000;  // expiration (6 hous)

    const { isError, isSuccess, isLoading, data: allItemsData, error } = useQuery(
        ["allItemsDesc"],
        prices.getAllItemsDesc,
        {
            staleTime: 180000,
            enabled: !isDataCached,
            onSuccess: (data) => {
                localStorage.setItem('allItemsDescCache', JSON.stringify({
                    data,
                    timestamp: Date.now(),
                }));
            }
        }
    );

    const itemsToUse = isDataCached ? cachedData.data : allItemsData;

    const filterItems = ({ name, category }) => {
        if (!Array.isArray(itemsToUse)) return [];

        return itemsToUse.filter((item) => {
            if (!item.i || !item.i.n) return false;
            const itemName = item.i.n[language] || item.i.n.en;
            if (name && !itemName.toLowerCase().includes(name.toLowerCase())) return false;
            const itemId = getPokemmoID(item.i.i);
            if (!itemId) return false;
            const itemInfo = getItemInfo(itemId);
            const itemCategory = itemInfo ? Number(itemInfo.category) : 0;
            if (category !== false && itemCategory !== Number(category)) return false;
            return true;
        });
    };

    const translateArrayLabel = (array) => {
        for (let i = 0; i < array.length; i++) {
            array[i].label = t(array[i].label);
        }
    };

    translateArrayLabel(category);

    const filteredItems = useMemo(() => {
        let filtered = filterItems(filters);
        return filtered.sort((a, b) => {
            if (sortOrder === 'asc') return a.p - b.p;  // ascending
            return b.p - a.p;  // descending
        });
    }, [filters, itemsToUse, sortOrder]);

    useEffect(() => {
        setCurrentPage(0);
    }, [filters]);

    const indexOfFirstItem = currentPage * postsPerPage;
    const indexOfLastItem = indexOfFirstItem + postsPerPage;
    const currentPosts = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <Stack direction="horizontal" className='mb-3 d-flex flex-wrap align-items-center' style={{ gap: '1rem' }}>
                <Form.Group controlId='region' className="position-relative">
                    <Form.Control
                        value={filters.name}
                        onChange={({ target }) => setFilters(prev => ({ ...prev, name: target.value }))}
                        type="text"
                        placeholder={t('Search item')}
                    />
                </Form.Group>
                <FilterSelect
                    value={filters.category}
                    onChange={({ target }) => setFilters(prev => ({ ...prev, category: target.value === 'false' ? false : target.value }))}
                    data={category}
                    placeholder={"Filter by category"}
                    title={false}
                />
                <div className="ms-auto d-flex gap-2">
                    <Button variant="secondary" onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}>
                        Sort by Price {sortOrder === 'asc' ? '▲' : '▼'}
                    </Button>
                    <Button as={Link} variant="warning" to="/market/investments">Investments</Button>
                </div>
            </Stack>
            <Typography>Warning: Items that are not currently listed on the GTL will not appear</Typography>
            {
                isDataCached ? (
                    filteredItems.length > 0 ? (
                        currentPosts.map((data, index) => {
                            const { i, p, q } = data;

                            if (!i || !i.i || !i.n) return null;

                            const itemId = getPokemmoID(i.i);
                            if (itemId == false) return null;
                            const itemInfo = getItemInfo(itemId);

                            const item = {
                                i: i.i,
                                _id: itemId,
                                n: i.n,
                                d: i.d,
                                p: p,
                                q: q,
                                category: itemInfo ? itemInfo.category : 0,
                                slug: slugify(i.n['en']),
                            };

                            return (
                                <div key={item.i}>
                                    {/*index > 0 && (index % 5 === 0 && index % 10 !== 0) ? <Card bodyClassName="p-2" className="mb-1"></Card> : null*/}
                                    <Card bodyClassName="p-2" className="mb-1">
                                        <ItemRow item={item} />
                                    </Card>
                                </div>
                            );
                        })
                    ) : (
                        <p>No items found</p>
                    )
                ) : isLoading ? (
                    // Only show spinner if data is not cached and is still loading
                    <Spinner className='position-relative' style={{ width: "4rem", height: "4rem", top: "45%", left: "45%" }} animation="border" variant="warning" />
                ) : (
                    <p>No items found</p>
                )
            }

            <Pagination
                count={filteredItems.length}
                page={currentPage}
                setPage={setCurrentPage}
                rowsPerPage={postsPerPage}
                setRowsPerPage={setPostsPerPage}
            />
        </div>
    );
};
