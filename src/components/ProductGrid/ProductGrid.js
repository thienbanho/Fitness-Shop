import React from 'react';
import './ProductGrid.css'

const ProductGrid = ({product1, name1, price1, 
                    product2, name2, price2, 
                    product3, name3, price3, 
                    product4, name4, price4, 
                    product5, name5, price5, 
                    product6, name6, price6}) => {
    return (
        <div className="product-grid">
            <div className="product-card">
                <div className="product-image">
                    <img src={product1} alt={name1} />
                </div>
                <div className="product-title">{name1}</div>
                <div className="product-price">{price1}</div>
                <div className="product-rating">★★★★★</div>
                <button className="buy-button">CHỌN</button>
            </div>

            <div className="product-card">
                <div className="product-image">
                    <img src={product2} alt={name2} />
                </div>
                <div className="product-title">{name2}</div> 
                <div className="product-price">{price2}</div>
                <div className="product-rating">★★★★★</div>
                <button className="buy-button">CHỌN</button>
            </div>

            <div className="product-card">
                <div className="product-image">
                    <img src={product3} alt={name3} />
                </div>
                <div className="product-title">{name3}</div>
                <div className="product-price">{price3}</div>
                <div className="product-rating">★★★★★</div>
                <button className="buy-button">CHỌN</button>
            </div>

            <div className="product-card">
                <div className="product-image">
                    <img src={product4} alt={name4} />
                </div>
                <div className="product-title">{name4}</div>
                <div className="product-price">{price4}</div>
                <div className="product-rating">★★★★★</div>
                <button className="buy-button">CHỌN</button>
            </div>

            
            <div className="product-card">
                <div className="product-image">
                    <img src={product5} alt={name5} />
                </div>
                <div className="product-title">{name5}</div>
                <div className="product-price">{price5}</div>
                <div className="product-rating">★★★★★</div>
                <button className="buy-button">CHỌN</button>
            </div>

            <div className="product-card">
                <div className="product-image">
                    <img src={product6} alt={name6} />
                </div>
                <div className="product-title">{name6}</div>
                <div className="product-price">{price6}</div>
                <div className="product-rating">★★★★★</div>
                <button className="buy-button">CHỌN</button>
            </div>
        </div>
    );
};

export default ProductGrid;