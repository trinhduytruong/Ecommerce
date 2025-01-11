import defaultUser from '../assets/img/default-avatar.png';
import emptyImg from '../assets/img/logo-empty.png';
import defaultImg from '../assets/img/image_faildoad.png';
import errorImg from '../assets/img/cancel.png';
import success from '../assets/img/success-v2.png';

export const DEFAULT_IMG = defaultUser;
export const EMPTY_IMG = emptyImg;
export const DEFAULT_IMAGE = defaultImg;

export const ERROR_PAYMENT = errorImg;
export const SUCCESS_PAYMENT = success;


export const ERROR_MESSAGE = ( field ) =>
{
	return {
		required: `${ field } không được để trống.`,
		minLength: ( minLength ) => `${ field } tối thiểu ${ minLength } ký tự.`,
		maxLength: ( maxLength ) => `${ field } tối đa ${ maxLength } ký tự.`,
		pattern: () => `${ field } không đúng định dạng.`,
	}
}

export const INIT_PAGING = {
	page: 1,
	page_size: 9,
	total: 0,
	total_page: 0
}

export const INIT_PAGING_BLOG = {
	page: 1,
	page_size: 4,
	total: 0,
	total_page: 0
}

export const ORDER_STATUS = [
	{
		value: 'pending',
		name: 'Chờ duyệt',
		className: 'text-warning'
	},
	{
		value: 'processing',
		name: 'Đang xử lý',
		className: 'text-primary'
	},
	{
		value: 'completed',
		name: 'Hoàn thành',
		className: 'text-success'
	},
	{
		value: 'canceled',
		name: 'Hủy',
		className: 'text-danger'
	}
];

export const PAYMENT_STATUS = [
	{
		value: 'pending',
		name: 'Chờ thành toán',
		className: 'text-warning'
	},
	{
		value: 'refunding',
		name: 'Đang xử lý',
		className: 'text-primary'
	},
	{
		value: 'completed',
		name: 'Hoàn thành',
		className: 'text-success'
	},
	{
		value: 'refunded',
		name: 'Hoàn tiền',
		className: 'text-danger'
	}
]

