import React from 'react';
import { getNews } from '../../api/apiNews';
import LatestNews from '../../components/LatestNews/LatestNews';
import NewsByFilters from '../../components/NewsByFilters/NewsByFilters';
import { PAGE_SIZE } from '../../constants/constants';
import { useDebounce } from '../../helpers/hooks/useDebounce';
import { useFetch } from '../../helpers/hooks/useFetch';
import { useFilters } from '../../helpers/hooks/useFilters';
import styles from './styles.module.css';

const Main = () => {
	const { filters, changeFilter } = useFilters({
		page_number: 1,
		page_size: PAGE_SIZE,
		category: null,
		keywords: '',
	});

	const debounceKeywords = useDebounce(filters.keywords, 1500);

	const { data, isLoading } = useFetch(getNews, {
		...filters,
		keywords: debounceKeywords,
	});

	return (
		<main className={styles.main}>

			{/* список банеров  */}
			<LatestNews isLoading={isLoading} banners={data && data.news} />

			{/* секция пагинации */}
			<NewsByFilters
				news={data?.news}
				isLoading={isLoading}
				filters={filters}
				changeFilter={changeFilter}
			/>
		</main>
	);
};

export default Main;
