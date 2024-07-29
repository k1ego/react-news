import Pagination from '../Pagination/Pagination';

const PaginationWrapper = ({ top, bottom, children, ...PaginationProps }) => {
	return (
		<>
			{top && <Pagination {...PaginationProps} />}
			{children}
			{bottom && <Pagination {...PaginationProps} />}
		</>
	);
};

export default PaginationWrapper;
