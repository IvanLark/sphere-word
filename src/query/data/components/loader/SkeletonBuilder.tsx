import { Skeleton } from '@mui/material';

interface SkeletonBuilderProps {
	loading: boolean;
	variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
	children: JSX.Element | JSX.Element[];
}

export default function SkeletonBuilder({ loading, variant = 'rectangular', children }: SkeletonBuilderProps): JSX.Element {
	return loading ?
		<Skeleton variant={variant} animation="wave">{children}</Skeleton> :
		<>{children}</>;
	// !不能直接{children}不然即使是JSX.Element也不被认为是组件……
}