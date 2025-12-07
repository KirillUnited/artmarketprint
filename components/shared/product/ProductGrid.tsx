import {AnimatePresence, motion} from 'framer-motion';
import ProductThumb from './ui/ProductThumb';
import {ProductData} from '@/components/shared/product/product.types';
import {JSX, useEffect, useState, useRef} from 'react';
import Loader from '@/components/ui/Loader';
import {Card, CardBody} from '@heroui/card';
// import { FixedSizeGrid } from 'react-window';
import useResizeObserver from 'use-resize-observer';

/**
 * A React component that renders a grid of products which can be animated.
 * @param {ProductGridProps} props - The component props
 * @returns {React.ReactElement} The rendered component
 */
export interface ProductGridProps {
	products: ProductData[];
}

export default function ProductGrid({products}: ProductGridProps): JSX.Element {
	const [isMounted, setIsMounted] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const {width = 1200, height = 800} = useResizeObserver<HTMLDivElement>({
		ref: containerRef as React.RefObject<HTMLDivElement>,
	});

	// Calculate grid dimensions based on screen size
	const getColumnCount = () => {
		if (width < 640) return 2; // Mobile: 2 columns
		if (width < 1024) return 3; // Tablet: 3 columns
		return 4; // Desktop: 4 columns
	};

	const columnCount = getColumnCount();
	const columnWidth = width / columnCount;
	const rowHeight = columnWidth * 1.5; // Aspect ratio for product cards
	const rowCount = Math.ceil(products.length / columnCount);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Cell renderer for virtualized grid
	const Cell = ({columnIndex, rowIndex, style}: any) => {
		const index = rowIndex * columnCount + columnIndex;
		if (index >= products.length) return null;

		const item = products[index];
		return (
			<div style={{...style, padding: '8px'}}>
				<motion.div
					key={`${item.id}`}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
					initial={{opacity: 0}}
					transition={{duration: 0.5, delay: 0.05 * (Number(item.id) % 10)}}
					whileHover={{y: -5, transition: {duration: 0.2}}}
					className="h-full"
				>
					<ProductThumb item={item} />
				</motion.div>
			</div>
		);
	};

	// Show skeleton loader when not mounted
	if (!isMounted) {
		return (
			<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 min-h-40 relative animate-pulse">
				{Array.from({length: 8}).map((_, index) => (
					<ProductCardSkeleton key={index} />
				))}
			</div>
		);
	}

	// For small lists, use regular grid without virtualization
	if (products.length <= 20) {
		return (
			<ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 min-h-40 relative">
				<AnimatePresence>
					{products.map((item: ProductData) => (
						<motion.li
							key={`${item.id}`}
							layout
							animate={{opacity: 1}}
							exit={{opacity: 0}}
							initial={{opacity: 0}}
							transition={{duration: 0.5, delay: 0.05 * (Number(item.id) % 10)}}
							whileHover={{y: -5, transition: {duration: 0.2}}}
							className="h-full"
						>
							<ProductThumb item={item} />
						</motion.li>
					))}
				</AnimatePresence>
			</ul>
		);
	}

	// For large lists, use virtualized grid
	return (
		<div ref={containerRef} className="min-h-40 relative" style={{height: Math.min(rowCount * rowHeight, 800)}}>
			<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 min-h-40 relative">
				{products.map((item: ProductData) => (
					<motion.li
						key={`${item.id}`}
						layout
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						initial={{opacity: 0}}
						transition={{duration: 0.5, delay: 0.05 * (Number(item.id) % 10)}}
						whileHover={{y: -5, transition: {duration: 0.2}}}
						className="h-full"
					>
						<ProductThumb item={item} />
					</motion.li>
				))}
			</div>
			{/*<FixedSizeGrid*/}
			{/*    columnCount={columnCount}*/}
			{/*    columnWidth={columnWidth}*/}
			{/*    height={Math.min(rowCount * rowHeight, 800)}*/}
			{/*    rowCount={rowCount}*/}
			{/*    rowHeight={rowHeight}*/}
			{/*    width={width}*/}
			{/*    className="!overflow-visible"*/}
			{/*>*/}
			{/*    {Cell}*/}
			{/*</FixedSizeGrid>*/}
		</div>
	);
}

export function ProductCardSkeleton() {
	return (
		<Card className="animate-pulse">
			<div className="bg-gray-200 aspect-square w-full rounded-lg mb-4" />
			<CardBody className="space-y-3">
				<div className="h-4 bg-gray-200 rounded w-3/4" />
				<div className="h-4 bg-gray-200 rounded w-1/2" />
				<div className="h-4 bg-gray-200 rounded w-1/4" />
			</CardBody>
		</Card>
	);
}
