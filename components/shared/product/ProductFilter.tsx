import clsx from "clsx";
import { ColorFilter, SortSelect, MaterialFilter } from "./ui";
import styles from '@/components/shared/product/ui/styles.module.css';
import ActiveFilterTags from './ui/ActiveFilterTags';

export interface ProductFilter {
    allProductMaterials: string[];
    allProductColors: string[];
    className?: string
}

/**
 * Renders a product filter component with the given materials and colors.
 *
 * @param {ProductFilter} props - The properties for the ProductFilter component.
 * @param {string[]} props.allProductMaterials - An array of all product materials.
 * @param {string[]} props.allProductColors - An array of all product colors.
 * @param {string} [props.className] - An optional CSS class name.
 * @return {JSX.Element} The rendered ProductFilter component.
 */
export const ProductFilter = ({ allProductMaterials, allProductColors, className }: ProductFilter): JSX.Element => (
    <div className="flex flex-col gap-4">
        <div className={clsx(styles.ProductFilter, className)}>
            {/* <ProductSearchForm /> */}
            <SortSelect />
            <MaterialFilter materials={allProductMaterials} />
            <ColorFilter colors={allProductColors} />
        </div>
        <ActiveFilterTags />
    </div>
);
