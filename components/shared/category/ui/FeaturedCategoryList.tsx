import { FeaturedCategoryThumb } from "@/components/shared/category/ui";

interface FeaturedCategoryListProps {
    items?: any[];
}

export const FeaturedCategoryList = ({items}: FeaturedCategoryListProps) => {
    return (
        <ul className="grid grid-cols-[var(--grid-template-columns)] gap-8">
            {items?.map((item: any) => (
                <li key={item.title}>
                    <FeaturedCategoryThumb item={item} />
                </li>
            ))}
        </ul>
    );
};