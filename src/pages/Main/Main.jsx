import React, { useEffect, useState } from 'react';
import { getNews } from '../../api/apiNews';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import NewsList from '../../components/NewsList/NewsList';
import Pagination from '../../components/Pagination/Pagination';
import Skeleton from '../../components/Skeleton/Skeleton';
import styles from './styles.module.css';

const Main = () => {
	const [news, setNews] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = 10;


	const fetchNews = async currentPage => {
		try {
			setIsLoading(true);
			const response = await getNews(currentPage, totalPages);
			setNews(response.news);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchNews(currentPage);
	}, [currentPage]);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePageClick = pageNumber => {
		setCurrentPage(pageNumber);
	};

	const handlePreviosPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<main className={styles.main}>
			{news.length > 0 && !isLoading ? (
				<NewsBanner item={news[0]} />
			) : (
				<Skeleton count={1} type={'banner'} />
			)}
			
			{!isLoading ? (
				<NewsList news={news} />
			) : (
				<Skeleton count={10} type={'item'} />
			)}
      <Pagination
				totalPages={totalPages}
				handleNextPage={handleNextPage}
				handlePreviosPage={handlePreviosPage}
				handlePageClick={handlePageClick}
        currentPage={currentPage}
			/>
		</main>
	);
};

export default Main;
