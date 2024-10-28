import { createContext, useContext, useState } from 'react';

// Context to provide and consume wishlist and card counts
const AppContext = createContext();

export const useAppCountContext = () => useContext(AppContext);

export const AppCountProvider = ({ children }) => {
    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartCount, updateCartCount] = useState(0);

    const fetchWishlistCount = async (userId) => {
        if (!userId) return;
        try {
            const response = await fetch(`http://localhost:3000/wishlists/wish-count/${userId}`);
            const data = await response.json();
            console.log('Wishlist Count:', data);
            setWishlistCount(data.count || 0);
        } catch (error) {
            console.error("Failed to fetch wishlist count", error);
        }
    };

    const fetchCartCount = async (userId) => {
        if (!userId) return;
        try {
            const response = await fetch(`http://localhost:3000/cards/cart-count/${userId}`);
            const data = await response.json();
            setCardCount(data.count || 0);
        } catch (error) {
            console.error("Failed to fetch cart count", error);
        }
    };

    const updateWishlistCount = async (userId) => {
        await fetchWishlistCount(userId);
    };

    const updateCardCount = async (userId) => {
        await fetchCardCount(userId);
    };

    return (
        <AppContext.Provider value={{ wishlistCount, cartCount, updateWishlistCount, updateCartCount }}>
            {children}
        </AppContext.Provider>
    );
};
