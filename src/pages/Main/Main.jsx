import React, { useEffect, useState } from 'react';
import { getCategories, getNews } from '../../api/apiNews';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import NewsList from '../../components/NewsList/NewsList';
import Pagination from '../../components/Pagination/Pagination';
import Skeleton from '../../components/Skeleton/Skeleton';
import styles from './styles.module.css';
import Categories from '../../components/Categories/Categories';

const Main = () => {
	const [news, setNews] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
	const totalPages = 10;
  const pageSize = 10;


	const fetchNews = async currentPage => {
		try {
			setIsLoading(true);
			const response = await getNews({
        page_number: currentPage,
        page_size: pageSize,
        category: selectedCategory === "All" ? null : selectedCategory.toLowerCase(),
      });
			setNews(response.news);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchCategories = async () => {
		try {
			const response = await getCategories();
			setCategories(["All", ...response.categories.map(capitalizeFirstLetter)]);
		} catch (error) {
			console.log(error);
		}
	};


  useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		fetchNews(currentPage);
	}, [currentPage, selectedCategory]);

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
      <Categories categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
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
