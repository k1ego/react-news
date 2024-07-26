import React, { useState } from 'react';
import { getCategories, getNews } from '../../api/apiNews';
import Categories from '../../components/Categories/Categories';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import NewsList from '../../components/NewsList/NewsList';
import Pagination from '../../components/Pagination/Pagination';
import Search from '../../components/Search/Search';
import { PAGE_SIZE, TOTAL_PAGES } from '../../constants/constants';
import { useDebounce } from '../../helpers/hooks/useDebounce';
import { useFetch } from '../../helpers/hooks/useFetch';
import styles from './styles.module.css';
import { useFilters } from '../../helpers/hooks/useFilters';

const Main = () => {
	
  const {filters, changeFilter} = useFilters({
		page_number: 1,
		page_size: PAGE_SIZE,
		category: null,
		keywords: '',
	})

	const debounceKeywords = useDebounce(filters.keywords, 1500);

	const { data, isLoading } = useFetch(getNews, {
		...filters,
		keywords: debounceKeywords,
	});

	const { data: dataCategories } = useFetch(getCategories);


	const handleNextPage = () => {
		if (filters.page_number < TOTAL_PAGES) {
			changeFilter('page_number', filters.page_number + 1);
		}
	};

	const handlePageClick = pageNumber => {
		changeFilter('page_number', pageNumber);
	};

	const handlePreviosPage = () => {
		if (filters.page_number > 1) {
			changeFilter('page_number', filters.page_number - 1);
		}
	};

	return (
		<main className={styles.main}>
			{dataCategories ? (
				<Categories
					categories={dataCategories.categories}
					selectedCategory={filters.category}
					setSelectedCategory={category => changeFilter('category', category)}
				/>
			) : null}

			<Search
				keywords={filters.keywords}
				setKeywords={keywords => changeFilter('keywords', keywords)}
			/>

			<NewsBanner
				isLoading={isLoading}
				item={data && data.news && data.news[0]}
			/>

			<NewsList isLoading={isLoading} news={data?.news} />

			<Pagination
				totalPages={TOTAL_PAGES}
				handleNextPage={handleNextPage}
				handlePreviosPage={handlePreviosPage}
				handlePageClick={handlePageClick}
				currentPage={filters.page_number}
			/>
		</main>
	);
};

export default Main;
