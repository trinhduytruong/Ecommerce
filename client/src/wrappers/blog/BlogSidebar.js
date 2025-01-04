import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {get} from "../../helpers/apiHelper";
import ImageWithFallback from "../../components/ImageWithFallback";
import { INIT_PAGING } from "../../helpers/constant";
const INIT_FORM_PARAMS = {
	name: "",
	menu_id: null,
	tag_ids: null
}
const BlogSidebar = (props) => {
	const {menus, tags, params} = props
    const [articles, setArticles] = useState([]);
    const [formParams, setFormParams] = useState({
		...INIT_FORM_PARAMS
	});
    const [tagData, setTagData] = useState(null);
    const [menuData, setMenus] = useState(null);

    const location = useLocation();
    useEffect(() => {
        setTagData(tags);
        setMenus(menus);
        setFormParams(params || INIT_FORM_PARAMS);
    }, [props]);

    useEffect(() => {
        get('articles?page_size=5')
            .then((res) => {
                console.log('API response:', res); // Log toàn bộ response
                setArticles(res?.data?.data); // Gán dữ liệu vào state
            })
            .catch((err) => console.error('Failed to fetch data:', err));

    }, []);

    // useEffect(() => {
    //     get('tags')
    //         .then((res) => {
    //             setTags(res?.data?.data); // Gán dữ liệu vào state
    //         })
    //         .catch((err) => console.error('Failed to fetch data:', err));

    // }, []);\

	const searchData = (params) => {
		let filters = {...formParams};
		if(params) {
			setFormParams(params);
			filters = {...params};
		}
		props.getListData({
			...props.params,
			...filters,
			page:1,
		});
	}
    return (
        <div className="sidebar-style">
            <div className="sidebar-widget">
                <h4 className="pro-sidebar-title">Tìm kiếm</h4>
                <div className="pro-sidebar-search mb-55 mt-25">
                    <div className="pro-sidebar-search-form">
                        <input type="text" value={formParams?.name} onChange={(e) => setFormParams({...formParams, name: e?.target?.value})} placeholder="Tìm kiếm tại đây..."/>
                        <button onClick={e => searchData()}>
                            <i className="pe-7s-search"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="sidebar-widget">
                <h4 className="pro-sidebar-title">Bài viết nổi bật</h4>
                <div className="sidebar-project-wrap mt-30">
                    {articles && articles.length > 0 && articles?.map((article, index) => (
                        <div className="single-sidebar-blog" key={index}>
                            <div className="sidebar-blog-img">
                                <Link to={process.env.PUBLIC_URL + `/tin-tuc/${article?.slug  || article?.id}`}>
                                    <ImageWithFallback
                                        src={article?.avatar}
                                        alt={article?.name}

                                        defaultSrc="/assets/img/blog/blog-details-2.jpg"
                                    />
                                </Link>
                            </div>
                            <div className="sidebar-blog-content">
                                <span>{article?.menu?.name}</span>
                                <h4>
                                    <Link to={process.env.PUBLIC_URL + `/tin-tuc/${article?.slug  || article?.id}`}>
                                        {article?.name}
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="sidebar-widget mt-35">
                <h4 className="pro-sidebar-title">Chuyên mục</h4>
                <div className="sidebar-widget-list sidebar-widget-list--blog mt-20">
                    <ul>
                        {menuData && menuData.length > 0 && menuData?.map((item, i) => (
                            <li key={i} className="">
                                <div className="sidebar-widget-list-left">
                                    <input type="checkbox"
									checked={formParams.menu_id === item.id}  onChange={(e => {
										searchData({...formParams, menu_id: formParams.menu_id !== item.id ? item.id : null})
									})}/>{" "}
                                    <a href="javascript:void(0)"
									onClick={(e => {
										searchData({...formParams, menu_id: formParams.menu_id !== item.id ? item.id : null})
									})}
									// to={process.env.PUBLIC_URL + `/m/${item?.slug}`}
									>
                                        {item.name}
                                        {/*<span>4</span>{" "}*/}
                                    </a>
                                    <span className="checkmark"/>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="sidebar-widget mt-50">
                <h4 className="pro-sidebar-title">Tag </h4>
                <div className="sidebar-widget-tag mt-25">
                    <ul>
                        {tagData && tagData.length > 0 && tagData?.map((item, i) => (
                            <li key={i} className={formParams.tag_ids?.length > 0 && formParams.tag_ids?.includes(item.id) ? 'active'  : ''}>
                                <a href="javascript:void(0)" onClick={(e => {
										let tag_ids = formParams?.tag_ids?.split(',') || [];
										let check = tag_ids?.some((et) => et == item.id);
										if(check) {
											tag_ids = tag_ids.filter(et => et != item.id)
										} else {
											tag_ids.push(item.id)
										}
										searchData({...formParams, tag_ids: tag_ids?.join(',')})
									})}>
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BlogSidebar;
