import { getNews } from '../../api/apiNews';
import { PAGE_SIZE, TOTAL_PAGES } from '../../constants/constants';
import { useDebounce } from '../../helpers/hooks/useDebounce';
import { useFetch } from '../../helpers/hooks/useFetch';
import { useFilters } from '../../helpers/hooks/useFilters';
import { NewsApiResponse, ParamsType } from '../../Interfaces';
import NewsFilters from '../NewsFilters/NewsFilters';
import NewsListWithSkeleton from '../NewsList/NewsList';
import PaginationWrapper from '../PaginationWrapper/PaginationWrapper';
import styles from './styles.module.css';

const NewsByFilters = () => {
	const { filters, changeFilter } = useFilters({
		page_number: 1,
		page_size: PAGE_SIZE,
		category: null,
		keywords: '',
	});

	const debounceKeywords = useDebounce(filters.keywords, 1500);

	const { data, isLoading } = useFetch<NewsApiResponse, ParamsType>(getNews, {
		...filters,
		keywords: debounceKeywords,
	});

	const handleNextPage = () => {
		if (filters.page_number < TOTAL_PAGES) {
			changeFilter('page_number', filters.page_number + 1);
		}
	};

	const handlePageClick = (pageNumber: number) => {
		changeFilter('page_number', pageNumber);
	};

	const handlePreviousPage = () => {
		if (filters.page_number > 1) {
			changeFilter('page_number', filters.page_number - 1);
		}
	};
	return (
		<section className={styles.section}>
			<NewsFilters changeFilter={changeFilter} filters={filters} />

			<PaginationWrapper
				top
				bottom
				totalPages={TOTAL_PAGES}
				handleNextPage={handleNextPage}
				handlePreviousPage={handlePreviousPage}
				handlePageClick={handlePageClick}
				currentPage={filters.page_number}
			>
				<NewsListWithSkeleton isLoading={isLoading} news={data?.news} />
			</PaginationWrapper>
		</section>
	);
};

export default NewsByFilters;
