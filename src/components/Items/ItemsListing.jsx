import React, { useState, useMemo, useEffect } from 'react';
import { Stack, Form, Spinner } from 'react-bootstrap';
import { Link } from 'gatsby';
import { useQuery } from 'react-query';
import { Button, Card, Pagination, Typography } from '../Atoms';
import { FilterSelect } from '../Pokedex/FilterSelect';
import { ItemRow } from './ItemRow';
import { useTranslations } from '../../context/TranslationsContext';
import { prices } from '../../utils/prices';
import { getItemInfo, getPokemmoID, getItemName } from '../../utils/items';
import { slugify } from '../../utils/slugify';

const DEFAULT_FILTERS = {
    name: '',
    category: false,
};

export const ItemsListing = () => {
    const { language, t } = useTranslations();
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(50);
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [sortOrder, setSortOrder] = useState('desc');
    const [sortBy, setSortBy] = useState('quantity');

    const cachedData = JSON.parse(localStorage.getItem('allItemsDescCache') || 'null');
    const isDataCached = cachedData && cachedData.timestamp && Date.now() - cachedData.timestamp < 21600000;

    const { isLoading, data: allItemsData } = useQuery(
        ["allItemsDesc"],
        prices.getAllItemsDesc,
        {
            staleTime: 180000,
            enabled: true,
            onSuccess: (data) => {
                localStorage.setItem('allItemsDescCache', JSON.stringify({
                    data,
                    timestamp: Date.now(),
                }));
            }
        }
    );

    const itemsToUse = useMemo(() => {
        if (isDataCached) return cachedData?.data ?? [];
        return allItemsData ?? [];
    }, [isDataCached, cachedData, allItemsData]);

    const category = [
        { key: "items", label: t("Game Items"), values: [0, 1, 2, 3] },
        { key: "cosmetics", label: t("Cosmetics"), values: [6] },
        { key: "event_bags", label: t("Event Bags"), values: [4] },
        { key: "particles", label: t("Particles"), values: [5] },
    ];

    const filterItems = ({ name, category }) => {
        if (!Array.isArray(itemsToUse)) return [];

        return itemsToUse.filter((item) => {
            if (!item.item_id || !item.n) return false;
            const normalize = (str) => str.normalize("NFKD").toLowerCase();
            const searchTerm = normalize(name.trim());
            if (searchTerm) {
                const matched = Object.values(item.n || {}).some((n) =>
                    normalize(n).includes(searchTerm)
                );
                if (!matched) return false;
            }

            const itemId = getPokemmoID(item.item_id);
            if (!itemId) return false;
            const itemInfo = getItemInfo(itemId);
            const itemCategory = itemInfo ? Number(itemInfo.category) : 0;
            if (category === false) return true;
            if (category && Array.isArray(category.values)) {
                return category.values.some((v) => v === itemCategory);
            }

            return false;
        });
    };

    const translateArrayLabel = (array) => {
        for (let i = 0; i < array.length; i++) {
            array[i].label = t(array[i].label);
        }
    };

    translateArrayLabel(category);

    const filteredItems = useMemo(() => {
        if (!itemsToUse) return [];
        let filtered = filterItems(filters);
        return filtered.sort((a, b) => {
            if (sortBy === 'price') {
                return sortOrder === 'asc' ? a.p - b.p : b.p - a.p;
            } else if (sortBy === 'quantity') {
                return sortOrder === 'asc' ? a.q - b.q : b.q - a.q;
            }
            return 0;
        });
    }, [filters, itemsToUse, sortOrder, sortBy]);

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
                    value={filters.category ? filters.category.key : "all"}
                    onChange={({ target }) =>
                        setFilters(prev => ({
                            ...prev,
                            category: target.value === "all" ? false : category.find(c => c.key === target.value),
                        }))
                    }
                    data={[
                        { key: "all", label: "All Items" },
                        ...category
                    ]}
                    noPlaceholder={true}
                />
                <div className="ms-auto d-flex flex-wrap align-items-center gap-2 flex-nowrap">
                    <Button as={Link} variant="warning" to="/market/investments">Investments</Button>
                </div>
            </Stack>

            <Stack direction="horizontal" className='mb-3 d-flex flex-wrap align-items-center'>
                <Typography>Warning: Items that are not currently listed on the GTL will not appear</Typography>
                <div className="ms-auto d-flex flex-wrap align-items-center gap-2 flex-nowrap">
                    <Button variant="secondary" onClick={() => {
                        setSortBy('price');
                        setSortOrder(prev => (sortBy === 'price' ? (prev === 'asc' ? 'desc' : 'asc') : 'desc'));
                    }} active={sortBy === 'price'}>
                        Sort by Price {sortBy === 'price' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                    </Button>
                    <Button variant="secondary" onClick={() => {
                        setSortBy('quantity');
                        setSortOrder(prev => (sortBy === 'quantity' ? (prev === 'asc' ? 'desc' : 'asc') : 'desc'));
                    }} active={sortBy === 'quantity'}>
                        Sort by Quantity {sortBy === 'quantity' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                    </Button>
                </div>
            </Stack>

            {
                (!itemsToUse || isLoading) ? (
                    <Spinner
                        className="position-relative"
                        style={{ width: "4rem", height: "4rem", top: "45%", left: "45%" }}
                        animation="border"
                        variant="warning"
                    />
                ) : (
                    filteredItems.length > 0 ? (
                        currentPosts.map((item) => {
                            const itemId = getPokemmoID(item.item_id);
                            if (!itemId) return null;
                            const itemInfo = getItemInfo(itemId);
                            const name = item.n?.[language] || item.n?.en || "Unknown Item";

                            const preparedItem = {
                                i: item.item_id,
                                _id: itemId,
                                n: name,
                                d: item.d?.[language] || item.d?.en || null,
                                p: item.p,
                                q: item.q,
                                category: itemInfo ? itemInfo.category : 0,
                                slug: slugify(item.n['en']),
                            };

                            return (
                                <div key={item.item_id} className={`item-wrapper fade-in-${filters.name}-${filters.category?.key || 'all'}`}>
                                    <Card bodyClassName="p-2" className="mb-1">
                                        <ItemRow item={preparedItem} />
                                    </Card>
                                </div>
                            );
                        })
                    ) : (
                        <p>No items found</p>
                    )
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
