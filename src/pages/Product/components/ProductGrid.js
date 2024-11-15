import React from 'react';
import './ProductGrid.css'
import wheyproduct from "../assets/img/product/whey.png"

const ProductGrid = () => {
    return (
        <div className="product-grid">
            <div className="product-card">
                <div className="product-image">
                    <img src={wheyproduct} alt="Protein" />
                </div>
                <div className="product-title">Hydrolyzed Whey Protein 100%</div>
                <div className="product-price">1,750,000đ</div>
                <div className="product-rating">★★★★★</div>
                <button className="buy-button">MUA</button>
            </div>

            <div className="product-card">
                <div className="product-image">
                    <img src={wheyproduct} alt="Protein" />
                </div>
                <div className="product-title">Hydrolyzed Whey Protein 100%</div>
                <div className="product-price">1,750,000đ</div>
                <div className="product-rating">★★★★★</div>
                <button className="buy-button">MUA</button>
            </div>

            <div className="product-card">
                <div className="product-image">
                    <img src={wheyproduct} alt="Protein" />
                </div>
                <div className="product-title">Hydrolyzed Whey Protein 100%</div>
                <div className="product-price">1,750,000đ</div>
                <div className="product-rating">★★★★★</div>
                <button className="buy-button">MUA</button>
            </div>

            <div className="product-card">
                <div className="product-image">
                    <img src={wheyproduct} alt="Protein" />
                </div>
                <div className="product-title">Hydrolyzed Whey Protein 100%</div>
                <div className="product-price">1,750,000đ</div>
                <div className="product-rating">★★★★★</div>
                <button className="buy-button">MUA</button>
            </div>

            
            <div className="product-card">
                <div className="product-image">
                    <img src={wheyproduct} alt="Protein" />
                </div>
                <div className="product-title">Hydrolyzed Whey Protein 100%</div>
                <div className="product-price">1,750,000đ</div>
                <div className="product-rating">★★★★★</div>
                <button className="buy-button">MUA</button>
            </div>

            <div className="product-card">
                <div className="product-image">
                    <img src={wheyproduct} alt="Protein" />
                </div>
                <div className="product-title">Hydrolyzed Whey Protein 100%</div>
                <div className="product-price">1,750,000đ</div>
                <div className="product-rating">★★★★★</div>
                <button className="buy-button">MUA</button>
            </div>
        </div>
    );
};

export default ProductGrid;