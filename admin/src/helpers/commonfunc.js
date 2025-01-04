import { DEFAULT_IMAGE } from "./constant";

export const onErrorImage = ( e ) =>
{
	e.currentTarget.src = DEFAULT_IMAGE;
}

export const buildFilter = ( values ) =>
{

	let params = {};
	if ( values )
	{
		delete values.total;
		delete values.total_pages;
		delete values.count;
		let arrCondition = Object.entries( values );

		params = arrCondition.reduce( ( param, item ) =>
		{
			if ( item[ 1 ] != null )
			{
				param = { ...param, ...buildItemParam( item[ 0 ], item[ 1 ], param ) }
			}
			return param;
		}, {} );
	}
	return params;
}

export const buildItemParam = ( key, value, params ) =>
{
	if ( key == 'page' && !value )
	{
		params[ 'page' ] = value;
	} else if ( value )
	{
		params[ `${ key }` ] = value;
	}
	return params;
}