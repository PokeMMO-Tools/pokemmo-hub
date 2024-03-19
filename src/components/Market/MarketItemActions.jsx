import React, { useMemo } from 'react';
import { useMarket } from '../../context/MarketContext';
import { Button } from '../Atoms';

export const MarketItemActions = ({ id, i, ...props }) => {
    const { wishlist, toggleInvestmentsModal, toggleWishlist } = useMarket();
    const isInWishlist = useMemo(() => wishlist.includes(id), [wishlist])
    return (
        <div {...props}>
            <Button variant={isInWishlist ? "danger" : "primary"} size="sm" onClick={() => toggleWishlist(id)}>
                {
                    isInWishlist
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                }
            </Button>
            <Button size="sm" onClick={() => toggleInvestmentsModal(id)}>Create investment</Button>
        </div>
    )
}
