import { useTheme } from '@/app/providers/ThemeProvider';
import ThemeButton from '@/features/theme/ui/ThemeButton/ThemeButton';
import { formatDate } from '@/shared/helpers/formatDate';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Header = () => {
	const { isDark } = useTheme();
	return (
		<header
			className={`${styles.header} ${isDark ? styles.dark : styles.light}`}
		>
			<div className={styles.info}>
				<Link to={'/'}>
					<h1 className={styles.title}>K1EGO NEWS</h1>
				</Link>
				<p className={styles.date}>{formatDate(new Date())}</p>
			</div>

			<ThemeButton />
		</header>
	);
};

export default Header;
