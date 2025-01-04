import { Pagination } from "react-bootstrap"
import React, { useEffect, useState } from "react";

export const StarPage = ( props ) =>
{
	const [ voteNumber, setVoteNumber ] = useState( 0 );
	const [ number, setNumber ] = useState( 0 );
	useEffect( () =>
	{
		if ( props.vote_number )
		{
			setVoteNumber( props.vote_number )
		}
	}, [ props.vote_number ] );
	return <>
		{ [ ...Array( 5 ) ]?.map( ( item, index ) =>
		{
			if ( index < voteNumber )
			{
				return (<i className="fa fa-star"  key={index} style={{fontSize: props.fontSize ||'30px', color:'#ffa900 ', cursor:'pointer'}} onClick={ () =>
					{
						if ( props.is_form )
						{
							console.log("index == props.vote_number---------> ",index, props.vote_number, index == props.vote_number);
							props.setVoteNumber( (index + 1) == props.vote_number ? (props.vote_number > 0 && props.vote_number -1 || 0) :  index + 1 )
						}

					} }/>)
				
			}
			return (
				<i className="fa fa-star-o cursor-pointer" key={index} style={{fontSize:  props.fontSize ||'30px', color: '#ffa900', cursor:'pointer'}} onClick={ () =>
					{
						if ( props.is_form )
						{
							props.setVoteNumber( index + 1 )
						}

					} }></i>
			);
		} ) }
	</>
}