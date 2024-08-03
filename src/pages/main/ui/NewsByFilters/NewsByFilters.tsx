import { useAppSelector } from '@/app/appStore';
import { useGetCategoriesQuery } from '@/entities/category/api/categoriesApi';
import { useGetNewsQuery } from '@/entities/news/api/newsApi';
import { useDebounce } from '@/shared/hooks/useDebounce';
import NewsFilters from '../../../../widgets/news/ui/NewsFilters/NewsFilters';
import NewsListWithPagination from "../NewsListWithPagination/NewsListWithPagination";
import styles from './styles.module.css';

const NewsByFilters = () => {
	const filters = useAppSelector(state => state.news.filters);
	const news = useAppSelector(state => state.news.news);

	const debouncedKeywords = useDebounce(filters.keywords, 1500);

	const { isLoading } = useGetNewsQuery({
		...filters,
		keywords: debouncedKeywords,
	});

	const { data } = useGetCategoriesQuery(null);

	return (
		<section className={styles.section}>
			<NewsFilters filters={filters} categories={data?.categories || []} />

			<NewsListWithPagination
				isLoading={isLoading}
				news={news}
				filters={filters}
			/>
		</section>
	);
};

export default NewsByFilters;
