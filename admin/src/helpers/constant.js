import emptyImg from '../assets/images/logo-empty.png';
import defaultImg from '../assets/images/image_faildoad.png';

export const EMPTY_IMG = emptyImg;
export const DEFAULT_IMAGE = defaultImg;

export const DEFAULT_IMG = "https://via.placeholder.com/150";

export const INIT_PAGING = {
	total: 0,
	total_page: 1, page: 1,
	page_size: 10,
};

export const STATUS_COMMON = [
	{
		value: "pending",
		name: "Chờ duyệt",
		label: "Chờ duyệt",
	},
	{
		value: "published",
		name: "Hoạt động",
		label: "Hoạt động",
	},
	{
		value: "draft",
		name: "Không hoạt động",
		label: "Không hoạt động",
	},

];

export const PAYMENT_STATUS = [
	{ value: 'pending', label: 'Pending' },
	{ value: 'completed', label: 'Completed' },
	{ value: 'refunding', label: 'Refunding' },
	{ value: 'refunded', label: 'Refunded' },
	{ value: 'fraud', label: 'Fraud' },
	{ value: 'failed', label: 'Failed' },
];

export const ORDER_STATUS = [
	{ value: 'pending', label: 'Pending' },
	{ value: 'processing', label: 'Processing' },
	{ value: 'completed', label: 'Completed' },
	{ value: 'canceled', label: 'Canceled' },
	{ value: 'returned', label: 'Returned' },
];



