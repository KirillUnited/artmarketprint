import { AnimatePresence, motion } from "framer-motion";
import ProductThumb from "./ProductThumb";
import { ProductData } from "@/components/shared/product/product.types";
import {JSX, useEffect, useState} from "react";
import Loader from "@/components/ui/Loader";
import { Card, CardBody } from "@heroui/card";

/**
 * A React component that renders a grid of products which can be animated.
 * @param {ProductGridProps} props - The component props
 * @returns {React.ReactElement} The rendered component
 */
export interface ProductGridProps {
    products: ProductData[]
}

export default function ProductGrid({ products }: ProductGridProps): JSX.Element {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    return (
        <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 min-h-40 relative">
            <AnimatePresence>
                {
                    !isMounted
                        ? <>
                            <ProductCardSkeleton />
                            <Loader />
                        </>
                        : products.map((item: ProductData) => (
                            <motion.li
                                key={`${item.id}`}
                                layout
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                initial={{ opacity: 0 }}
                                transition={{
                                    duration: 0.5,
                                }}
                            >
                                <ProductThumb item={item} />
                            </motion.li>
                        ))
                }
            </AnimatePresence>
        </ul>
    )
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

