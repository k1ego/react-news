import { forwardRef } from 'react';
import styles from './styles.module.css';

const Categories = forwardRef(
	({ categories, setSelectedCategory, selectedCategory }, ref) => {
		return (
			<div ref={ref} className={styles.categories}>
				<button
					onClick={() => setSelectedCategory(null)}
					className={!selectedCategory ? styles.active : styles.item}
				>
					All
				</button>
				{categories.map(category => {
					return (
						<button
							onClick={() => setSelectedCategory(category)}
							className={
								selectedCategory === category ? styles.active : styles.item
							}
							key={category}
						>
							{category}
						</button>
					);
				})}
			</div>
		);
	}
);

// когда используется forwardRef, что может привести к потере отображаемого имени компонента в DevTools
Categories.displayName = 'Categories';

export default Categories;
