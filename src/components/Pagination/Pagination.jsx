import styles from './styles.module.css';

const Pagination = ({
	totalPages,
	handleNextPage,
	handlePreviosPage,
	handlePageClick,
	currentPage,
}) => {
	return (
		<div className={styles.pagination}>
			<button disabled={currentPage === 1} className={styles.arrow} onClick={handlePreviosPage}>
				{'<'}
			</button>
			<div className={styles.list}>
				{[...Array(totalPages)].map((_, index) => {
					return (
						<button
							onClick={() => handlePageClick(index + 1)}
							className={styles.pageNumber}
              disabled={index + 1 === currentPage}
							key={index}
						>
							{index + 1}
						</button>
					);
				})}
			</div>
			<button disabled={currentPage === totalPages} className={styles.arrow} onClick={handleNextPage}>
				{'>'}
			</button>
		</div>
	);
};

export default Pagination;
