import { getCategories } from "../../api/apiNews";
import { TOTAL_PAGES } from "../../constants/constants";
import { useFetch } from "../../helpers/hooks/useFetch";
import Categories from "../Categories/Categories";
import NewsListWithSkeleton from "../NewsList/NewsList";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import styles from "./styles.module.css";

const NewsByFilters = ({filters, changeFilter, isLoading, news}) => {
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
    <section className={styles.section}>
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
