import { TOTAL_PAGES } from '../../constants/constants';
import NewsFilters from '../NewsFilters/NewsFilters';
import NewsListWithSkeleton from '../NewsList/NewsList';
import Pagination from '../Pagination/Pagination';
import styles from './styles.module.css';

const NewsByFilters = ({ filters, changeFilter, isLoading, news }) => {
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
		<section className={styles.section}>

		<NewsFilters changeFilter={changeFilter} filters={filters}/>

		<Pagination
				totalPages={TOTAL_PAGES}
				handleNextPage={handleNextPage}
				handlePreviosPage={handlePreviosPage}
				handlePageClick={handlePageClick}
				currentPage={filters.page_number}
			/>

			<NewsListWithSkeleton isLoading={isLoading} news={news} />

			<Pagination
				totalPages={TOTAL_PAGES}
				handleNextPage={handleNextPage}
				handlePreviosPage={handlePreviosPage}
				handlePageClick={handlePageClick}
				currentPage={filters.page_number}
			/>
		</section>
	);
};

export default NewsByFilters;
