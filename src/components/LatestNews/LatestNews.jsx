import BannerListWithSkeleton from '../BannersList/BannersList';
import styles from './styles.module.css';

const LatestNews = ({ banners, isLoading }) => {
	return (
		<section className={styles.section}>
			<BannerListWithSkeleton banners={banners} isLoading={isLoading} />
		</section>
	);
};

export default LatestNews;
