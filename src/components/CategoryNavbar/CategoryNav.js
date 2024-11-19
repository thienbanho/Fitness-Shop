import React from 'react';
import './CategoryNav.css';

const CategoryNav = ({ 
    nav1, nameNav1, linkNav1, 
    nav2, nameNav2, linkNav2, 
    nav3, nameNav3, linkNav3, 
    nav4, nameNav4, linkNav4, 
    nav5, nameNav5, linkNav5, 
    nav6, nameNav6, linkNav6 
}) => {
    const handleNavigation = (url) => {
        window.location.href = url; // Điều hướng tới URL
    };

    return (
        <div className='category'>
            <div className="nav-name">
                DANH MỤC NỔI BẬT
            </div>

            <div className="category-nav">
                <button onClick={() => handleNavigation(linkNav1)} className="category-item">
                    <div className="category-icon">
                        <img src={nav1} width="75" height="75" alt={nameNav1} />
                    </div>
                    <div className="category-name">{nameNav1}</div>
                </button>

                <button onClick={() => handleNavigation(linkNav2)} className="category-item">
                    <div className="category-icon">
                        <img src={nav2} width="75" height="75" alt={nameNav2} />
                    </div>
                    <div className="category-name">{nameNav2}</div>
                </button>

                <button onClick={() => handleNavigation(linkNav3)} className="category-item">
                    <div className="category-icon">
                        <img src={nav3} width="75" height="75" alt={nameNav3} />
                    </div>
                    <div className="category-name">{nameNav3}</div>
                </button>

                <button onClick={() => handleNavigation(linkNav4)} className="category-item">
                    <div className="category-icon">
                        <img src={nav4} width="75" height="75" alt={nameNav4} />
                    </div>
                    <div className="category-name">{nameNav4}</div>
                </button>

                <button onClick={() => handleNavigation(linkNav5)} className="category-item">
                    <div className="category-icon">
                        <img src={nav5} width="75" height="75" alt={nameNav5} />
                    </div>
                    <div className="category-name">{nameNav5}</div>
                </button>

                <button onClick={() => handleNavigation(linkNav6)} className="category-item">
                    <div className="category-icon">
                        <img src={nav6} width="75" height="75" alt={nameNav6} />
                    </div>
                    <div className="category-name">{nameNav6}</div>
                </button>
            </div>
        </div>
    );
};

export default CategoryNav;