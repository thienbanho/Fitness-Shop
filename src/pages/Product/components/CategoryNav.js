import React from 'react';
import './CategoryNav.css'
import wheyProtein from '../assets/img/type/whey-protein.png';
import massGainer from '../assets/img/type/mass-gainer.png';
import bcaa from '../assets/img/type/bcaa.png';
import preWorkout from '../assets/img/type/pre-workout.png';
import omega3 from '../assets/img/type/omega3.png';
import supplements from '../assets/img/type/supplements.png';


const CategoryNav = () => {
    return (
        <div className='category'>
            <div className="nav-name">
                DANH MỤC NỔI BẬT
            </div>

            <div className="category-nav">
                <div className="category-item">
                    <div className="category-icon">
                        <img src={wheyProtein} width="75" height="75" alt="Whey Protein" />
                    </div>
                    <div className="category-name">Whey Protein</div>
                </div>
                <div className="category-item">
                    <div className="category-icon">
                        <img src={massGainer} width="75" height="75" alt="Mass Gainer" />
                    </div>
                    <div className="category-name">Mass Gainer</div>
                </div>
                <div className="category-item">
                    <div className="category-icon">
                        <img src={bcaa} width="75" height="75" alt="BCAA" />
                    </div>
                    <div className="category-name">BCAA - EAA</div>
                </div>
                <div className="category-item">
                    <div className="category-icon">
                        <img src={preWorkout} width="75" height="75" alt="Pre Workout" />
                    </div>
                    <div className="category-name">Tăng sức mạnh</div>
                </div>
                <div className="category-item">
                    <div className="category-icon">
                        <img src={omega3} width="75" height="75" alt="Vitamin - D3&K2" />
                    </div>
                    <div className="category-name">Vitamin - D3&K2</div>
                </div>
                <div className="category-item">
                    <div className="category-icon">
                        <img src={supplements} width="75" height="75" alt="Supplements" />
                    </div>
                    <div className="category-name">Thực phẩm chức năng</div>
                </div>
            </div>
        </div>
    );
};

export default CategoryNav;