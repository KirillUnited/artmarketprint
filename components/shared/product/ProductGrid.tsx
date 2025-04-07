import { AnimatePresence, motion } from "framer-motion";
import ProductThumb from "./ProductThumb";
import { Product } from "@/types/product.types";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import { Card, CardBody } from "@heroui/card";

/**
 * A React component that renders a grid of products which can be animated.
 * @param {ProductGridProps} props - The component props
 * @returns {React.ReactElement} The rendered component
 */
export interface ProductGridProps {
    products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps): React.ReactElement {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    return (
        <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-40 relative">
            <AnimatePresence>
                {
                    !isMounted ? <><ProductCardSkeleton /><Loader /></> : products.map((item: Product) => (
                        <motion.li
                            key={`${item._id}`}
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
            <div className="bg-gray-200 aspect-square w-full rounded-lg mb-4"></div>
            <CardBody className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </CardBody>
        </Card>
    );
}

