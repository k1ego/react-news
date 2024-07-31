import Skeleton from '../../components/Skeleton/Skeleton';
import { DirectionType, SkeletonType } from '../../Interfaces';

interface Props {
	isLoading: boolean;
}

// функция WithSkeleton принимает параметры props только в том случае, если его тип является объектом
function withSkeleton<P extends object>(
	Component: React.ComponentType<P>,
	type?: SkeletonType,
	count?: number,
	direction?: DirectionType
) {
	return function WithSkeleton(props: Props & P) {
		const { isLoading, ...restProps } = props;
		if (isLoading) {
			return <Skeleton type={type} count={count} direction={direction} />;
		}
		// берем те пропсы, которые прилетели в компоненте (withSkeleton<Props>)
		return <Component {...(restProps as P)} />;
	};
}

export default withSkeleton;
