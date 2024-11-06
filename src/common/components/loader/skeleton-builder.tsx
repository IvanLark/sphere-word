import { Skeleton } from '@mui/material';

interface SkeletonBuilderProps {
	loading: boolean;
	variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
	children: JSX.Element | Array<JSX.Element|undefined|''>;
}

export default function SkeletonBuilder({ loading, variant = 'rectangular', children }: SkeletonBuilderProps): JSX.Element {
	return loading ?
		<Skeleton variant={variant} animation="wave">{children}</Skeleton> :
		<>{children}</>;
}