import { Spinner, SpinnerProps } from '@heroui/spinner';
import clsx from 'clsx';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function Loader({ className, ...props }: LoaderProps & SpinnerProps) {
  return <Spinner {...props} className={clsx('absolute top-1/2 left-1/2', className)} />;
}

export default Loader;
