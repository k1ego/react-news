import { IPaginationProps } from '../../Interfaces';
import Pagination from '../Pagination/Pagination';

interface Props {
	children: React.ReactNode;
	top?: boolean;
	bottom?: boolean;
}

const PaginationWrapper = ({
	top,
	bottom,
	children,
	...PaginationProps
}: Props & IPaginationProps) => {
	return (
		<>
			{top && <Pagination {...PaginationProps} />}
			{children}
			{bottom && <Pagination {...PaginationProps} />}
		</>
	);
};

export default PaginationWrapper;
