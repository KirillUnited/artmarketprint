'use client';
import { Pagination as BasePagination, PaginationItemType, PaginationProps } from '@heroui/pagination';
import clsx from 'clsx';

export const ChevronIcon = (props: any) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M15.5 19l-7-7 7-7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
        </svg>
    );
};

export default function Pagination({className, total, onChange, ...props}: PaginationProps) {
    const renderItem = ({ ref, key, value, isActive, onNext, onPrevious, setPage, className }: any) => {
        if (value === PaginationItemType.NEXT) {
            return (
                <button
                    key={key}
                    className={clsx(className, 'bg-default-200/50 min-w-8 w-8 h-8')}
                    onClick={onNext}
                >
                    <ChevronIcon className="rotate-180" />
                </button>
            );
        }

        if (value === PaginationItemType.PREV) {
            return (
                <button
                    key={key}
                    className={clsx(className, 'bg-default-200/50 min-w-8 w-8 h-8')}
                    onClick={onPrevious}
                >
                    <ChevronIcon />
                </button>
            );
        }

        if (value === PaginationItemType.DOTS) {
            return (
               <li key={key}>
                    <button className={className}>
                        ...
                    </button>
               </li>
            );
        }

        // cursor is the default item
        return (
            <li
            key={key}>
                <button
                    ref={ref}
                    className={clsx(
                        className,
                    )}
                    onClick={() => setPage(value)}
                >
                    {value}
                </button>
            </li>
        );
    };

    return (
        <BasePagination
            // showControls
            className={clsx(
                'gap-2',
                className
            )}
            initialPage={1}
            radius="full"
            renderItem={renderItem}
            total={total}
            variant="light"
            onChange={onChange}
            page={props.page}
        />
    );
}
