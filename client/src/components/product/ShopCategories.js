import PropTypes from "prop-types";
import React from "react";
import {setActiveSort} from "../../helpers/product";

const ShopCategories = (props) => {
	const {
		categories, getSortParams, title, key_param, classKey
	} = props;
    return (
        <div className="sidebar-widget mb-4">
            <h4 className="pro-sidebar-title">{title || 'Danh mục'} </h4>
            <div className="sidebar-widget-list mt-30">
                {categories ? (
                    <ul>
                        <li>
                            <div className={"sidebar-widget-list-left " + classKey || ''}>
                                <button
                                    onClick={e => {
                                        getSortParams(key_param, "");
                                        setActiveSort(e, classKey);
                                    }}
                                >
                                    <span className="checkmark"/> Toàn bộ {title?.toLowerCase() || 'danh mục'}
                                </button>
                            </div>
                        </li>
                        {categories?.map((category, key) => {
                            return (
                                <li key={key}>
                                    <div className={"sidebar-widget-list-left " + classKey || ''}>
                                        <button
                                            onClick={e => {
                                                getSortParams(key_param, category?.id);
                                                setActiveSort(e, classKey);
                                            }}
                                        >
                                            {" "}
                                            <span className="checkmark"/> {category.name}{" "}
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    "No categories found"
                )}
            </div>
        </div>
    );
};

ShopCategories.propTypes = {
    categories: PropTypes.array,
    getSortParams: PropTypes.func
};

export default ShopCategories;
