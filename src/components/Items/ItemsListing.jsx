import { Link } from 'gatsby';
import React, { useMemo, useState } from 'react';
import { Form, Stack } from 'react-bootstrap';
import { useTranslations } from '../../context/TranslationsContext';
import { InterfaceItems } from '../../interface/items';
import { Button, Card, Pagination } from '../Atoms';
import { FilterSelect } from '../Pokedex/FilterSelect';
import { ItemRow } from './ItemRow';

const DEFAULT_FILTERS = {
    name: '',
    category: false
}

const category = Object.values(InterfaceItems.category)
    .map((value, index) => ({ key: index, label: value }))

export const ItemsListing = ({ items }) => {
    const { language } = useTranslations();
    const { t } = useTranslations()
    const [currentPage, setCurrentPage] = useState(0)
    const [postsPerPage, setPostsPerPage] = useState(25)
    const [filters, setFilters] = useState(DEFAULT_FILTERS)

    const filterItems = ({ name, category }) => {
        if (filters.name || filters.category)
            setCurrentPage(0)

        return items.filter((item) => {
            //added english filter support for all languages just incase (some items arent translated ingame)
            if (name && !item.n[language].toLowerCase().includes(name.toLowerCase()) && !item.n.en.toLowerCase().includes(name.toLowerCase()))
                return false;

            if (category && item.category !== parseInt(category))
                return false;

            return true;
        })
    }

    function translateArrayLabel(array) {
        for (let i = 0; i < array.length; i++) {
            array[i].label = t(array[i].label)
        }
    }

    translateArrayLabel(category)

    const filteredItems = useMemo(() => filterItems(filters), [filters])


    const indexOfFirstItem = currentPage * postsPerPage;
    const indexOfLastItem = indexOfFirstItem + postsPerPage;
    const currentPosts = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <Stack direction="horizontal" className='mb-3' style={{ gap: '1rem' }}>
                <Form.Group controlId='region' className="position-relative">
                    <Form.Control
                        value={filters.name}
                        onChange={
                            ({ target }) => setFilters(prev => ({ ...prev, name: target.value }))
                        }
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
                <Button as={Link} variant="warning" to="/market/investments" className="ms-auto">Investments</Button>
            </Stack>
            {
                currentPosts.map((item, index) => (
                    <div key={item.i}>
                        {
                            index > 0 && (index % 5 === 0 && index % 10 != 0)
                                ? <Card bodyClassName="p-2" className="mb-1"></Card>
                                : false
                        }
                        <Card bodyClassName="p-2" className="mb-1">
                            <ItemRow item={item} />
                        </Card>
                    </div>
                ))
            }
            <Pagination
                count={filteredItems.length}
                page={currentPage}
                setPage={setCurrentPage}
                rowsPerPage={postsPerPage}
                setRowsPerPage={setPostsPerPage}
            />
        </div>
    )
}
