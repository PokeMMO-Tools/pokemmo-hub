import React, { useState } from 'react';
import { CardGroup } from 'react-bootstrap';
import { Post } from '../components/Post';
import { useNavigationMenu } from '../context/NavigationMenuContext';
import { useTranslations } from '../context/TranslationsContext';
import { Button, Modal, Typography } from './Atoms';

const DEFAULT_PER_PAGE = 4;

const GuideModalContent = () => {
    return (
        <div>
            <Typography>
                Hi! Now PokeMMO Guide will let you writes guides directly over it. You can write complex guide with images, titles and subtitles. There's a small boilerplate made with Google Docs which you can just clone and edit. Guides written by people will be shown as featured, it will have your credits, a link to your social (if you want) and your avatar.
            </Typography>
            <Button target="_blank" href="https://bit.ly/3iPj1I3">Start a guide</Button>
        </div>
    )
}

export default function PostsListing() {
    const { POSTS } = useNavigationMenu();
    const [selectedCategory, setSelectedCategory] = useState(false);
    const [writeGuideModal, setWriteGuideModal] = useState(false);
    const [maxPerPage, setMaxPerPage] = useState(DEFAULT_PER_PAGE);
    const categories = [...new Set(POSTS.map(post => post.category))];
    const { t } = useTranslations();

    return (
        <>
            <div className="d-flex mb-3" style={{ gap: '.75rem' }}>
                <Button
                    active={!selectedCategory}
                    onClick={() => setSelectedCategory(false)}>{t('All')}</Button>
                {
                    categories.map(cat => <Button
                        key={cat}
                        active={cat === selectedCategory}
                        className="text-capitalize"
                        onClick={() => setSelectedCategory(cat)}>{t(cat)}</Button>)
                }
                <Button
                    onClick={() => setWriteGuideModal(true)}
                    variant="info"
                    className='ms-auto'
                >
                    Write a guide
                </Button>
                <Button
                    onClick={() => setMaxPerPage(prev => prev === DEFAULT_PER_PAGE ? 100 : DEFAULT_PER_PAGE)}
                    variant="warning"
                >Load more</Button>
            </div>
            <CardGroup style={{ gap: '1rem', flexWrap: 'wrap' }}>
                {
                    POSTS
                        .filter(item => selectedCategory ? item.category.includes(selectedCategory) : true)
                        .slice(0, maxPerPage)
                        .map((post, index) => <Post key={index} {...post} />)
                }
            </CardGroup>
            <Modal
                title="Do you want to write a guide?"
                body={<GuideModalContent />}
                show={writeGuideModal}
                onHide={() => setWriteGuideModal(false)}
            />
        </>
    )
}