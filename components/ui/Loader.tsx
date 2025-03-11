import { Spinner } from '@heroui/spinner';
import clsx from 'clsx';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function Loader({ className }: LoaderProps) {
  return <Spinner className={clsx('absolute top-1/2 left-1/2', className)} />;
}

export default Loader;
