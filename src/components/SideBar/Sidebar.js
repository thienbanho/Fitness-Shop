import React from 'react';
import './Sidebar.css'

const Sidebar = ({type1, op11, op12, op13, op14, type2, op21, op22, op23, op24,  type3, op31, op32, op33, op34, }) => {
    return (
        <div className="sidebar">
            <input type="text" className="search-box" placeholder="Search" />
            
            <div className="filter-section">
                <div className="filter-title">{type1}</div>
                <div className="filter-options">
                    <input type="checkbox" />{op11}
                    <input type="checkbox" />{op12}
                    <input type="checkbox" />{op13}
                    <input type="checkbox" />{op14}
                </div>
            </div>

            <div className="filter-section">
            <div className="filter-title">{type2}</div>
                <div className="filter-options">
                    <input type="checkbox" />{op21}
                    <input type="checkbox" />{op22}
                    <input type="checkbox" />{op23}
                    <input type="checkbox" />{op24}
                </div>
            </div>

            <div className="filter-section">
            <div className="filter-title">{type3}</div>
                <div className="filter-options">
                    <input type="checkbox" />{op31}
                    <input type="checkbox" />{op32}
                    <input type="checkbox" />{op33}
                    <input type="checkbox" />{op34}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;