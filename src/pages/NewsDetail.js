import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import SyncLoader from 'react-spinners/SyncLoader';
import Link from '../components/Link';
import LinkMeta from '../components/LinkMeta';

import Style from './NewsDetail.module.scss';

const NewsDetail = ( { match, location } ) => {
	const { params: { slug } } = match;

	const [ data, setData ] = useState( [] );
	const [ loading, setLoading ] = useState( true );
	const [ failed, setfailed ] = useState( false );

	useEffect( () => {
		const fetchData = async () => {
			try {
				const response = await axios.get( `/api/articles/${slug}` );

				setData( data => response.data );
				setLoading( false );
			} catch( err ) {
				if ( err.response.status === 404 ) {
					setfailed( true );
				};

				console.log( err );
			};
		};

		fetchData();
	}, [ slug ] );

	return ( 
		<>
			<LinkMeta title={data.title} description={data.description} keywords={data.slug}></LinkMeta>
			<div className={`container ${Style.container}`}>
				<div style={{ 
					'transitionProperty': 'opacity',
					'transitionDuration': '300ms'
				}}
				className={loading ? Style.loading : Style.loadingComplete}>
					{failed
					?	<p>Article not found...</p>
					:	<SyncLoader
							size={10}
							color={'#656565'}
							loading={loading}
						/>
					}
				</div>
				<div className={Style.article}>
					<div className={Style.publisher}>Publisher <span>{data.publisher}</span></div>
					<h1>{data.title}</h1>
					<div className={Style.meta}>
						<div className={Style.metaDate}>
							<span>
								{moment(new Date(data.published_on)).format('LL')}
							</span>
						</div>
						<div className={Style.metaAuthor}>
							Author <span>{data.author}</span>
						</div>
					</div>
					<div className={Style.articleContent}>
						{data.description}
					</div>
					<div style={{
						display: 'flex', 
						justifyContent: 'center', 
						marginTop: '0',
						marginBottom: '8rem',
						position: 'relative',
						zIndex: '9'
					}}>
						<Link url={data.link} value="Read full article" target="_blank" />
					</div>
				</div>
			</div>
		</>
	)
}

export default NewsDetail;

/*Add this to line 46 when Myles has implemented the reading predictions */
 /*
   &nbsp; &bull; &nbsp; 
	<span>
		{data.read_time} {data.read_time > 1 ? 'mins read' : 'min read'}
	</span>
*/