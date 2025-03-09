import React, { useMemo } from 'react';
import { useMarket } from '../../context/MarketContext';
import { Button } from '../Atoms';
import { TbHeart } from "react-icons/tb";

export const MarketItemActions = ({ id, i, ...props }) => {
    const { wishlist, toggleInvestmentsModal, toggleWishlist } = useMarket();
    const isInWishlist = useMemo(() => wishlist.includes(id), [wishlist])
    return (
        <div {...props}>
            <Button size="sm" variant="warning" onClick={() => toggleInvestmentsModal(id)}>Create investment</Button>
            <Button variant='link' size="sm" onClick={() => toggleWishlist(id)}>
                <TbHeart size={20} color={wishlist.includes(id) ? 'var(--bs-danger)' : 'var(--bs-gray)'} fill={wishlist.includes(id) ? 'var(--bs-danger)' : 'var(--bs-gray)'} />
            </Button>
        </div>
    )
}

/*
            <Button variant={isInWishlist ? "danger" : "primary"} size="sm" onClick={() => toggleWishlist(id)}>
                {
                    isInWishlist
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                }
            </Button>
*/