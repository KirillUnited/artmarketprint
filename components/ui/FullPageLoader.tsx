import Loader from '@/components/ui/Loader';

type FullPageLoaderProps = {
	label?: string;
};

export default function FullPageLoader({ label = 'Загрузка...' }: FullPageLoaderProps) {
	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-[16px]">
			<Loader className="static" label={label} size="lg" variant="spinner" />
		</div>
	);
}
