import React from 'react';
import './Sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <input type="text" className="search-box" placeholder="Search" />
            
            <div className="filter-section">
                <div className="filter-title">Price</div>
                <div className="filter-options">
                    <input type="checkbox" /> Option 1
                    <input type="checkbox" /> Option 2
                    <input type="checkbox" /> Option 3
                    <input type="checkbox" /> Option 4
                </div>
            </div>

            <div className="filter-section">
                <div className="filter-title">Brand</div>
                <div className="filter-options">
                    <input type="checkbox" /> Option 1
                    <input type="checkbox" /> Option 2
                    <input type="checkbox" /> Option 3
                    <input type="checkbox" /> Option 4
                </div>
            </div>

            <div className="filter-section">
                <div className="filter-title">Kind</div>
                <div className="filter-options">
                    <input type="checkbox" /> Option 1
                    <input type="checkbox" /> Option 2
                    <input type="checkbox" /> Option 3
                </div>
            </div>
        </div>
    );
};

export default Sidebar;