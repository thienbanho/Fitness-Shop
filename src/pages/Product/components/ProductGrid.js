import React, { useEffect, useState } from 'react';
import './ProductGrid.css';
import supabase from '../../../config/supabaseClient'; // Ensure supabaseClient is configured properly

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase
                    .from('product')
                    .select('*'); // Adjust fields as needed

                if (error) {
                    console.error('Error fetching products:', error);
                } else {
                    setProducts(data);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (products.length === 0) {
        return <div>No products available.</div>;
    }

    return (
        <div className="product-grid">
            {products.map((product) => (
                <div key={product.product_id} className="product-card">
                    <div className="product-image">
                        {product.image_url ? (
                            <img src={product.image_url} alt={product.name} />
                        ) : (
                            <div className="image-placeholder">
                                No Image Available
                            </div>
                        )}
                    </div>
                    <div className="product-title">{product.name}</div>
                    <div className="product-price">
                        {product.price.toLocaleString('vi-VN')}đ
                    </div>
                    <div className="product-rating">★★★★★</div>
                    <button
                        className="buy-button"
                        disabled={product.stock <= 0}
                    >
                        {product.stock > 0 ? 'MUA' : 'Out of Stock'}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
