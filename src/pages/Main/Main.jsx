import React from 'react';
import LatestNews from '../../components/LatestNews/LatestNews';
import NewsByFilters from '../../components/NewsByFilters/NewsByFilters';
import styles from './styles.module.css';

const Main = () => {
	return (
		<main className={styles.main}>
			{/* список банеров  */}
			<LatestNews />

			{/* секция пагинации */}
			<NewsByFilters />
		</main>
	);
};

export default Main;
