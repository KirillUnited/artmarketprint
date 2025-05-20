'use client';
import React from 'react';
import { Button } from '@heroui/button';
import { NavbarItem } from '@heroui/navbar';
import { Link } from '@heroui/link';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { ChevronDownIcon } from 'lucide-react';

type MegaDropdownItemType = {
  title: string;
  url?: string;
  description?: string;
  icon?: React.ReactNode;
};

type MegaDropdownCategoryType = {
  title: string;
  url?: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MegaDropdownItemType[];
};

type MegaDropdownMenuProps = {
  triggerLabel: string;
  triggerIcon?: React.ReactNode;
  categories: MegaDropdownCategoryType[];
  columns?: 1 | 2 | 3 | 4;
};

/**
 * A mega dropdown menu component that supports multiple columns and categories.
 * @param {MegaDropdownMenuProps} props - The component props
 * @returns {JSX.Element} - The rendered mega dropdown menu component
 */
export const MegaDropdownMenu = ({ 
  triggerLabel, 
  triggerIcon, 
  categories, 
  columns = 1 
}: MegaDropdownMenuProps): JSX.Element => {
  // Calculate column width based on number of columns
  const getColumnWidth = () => {
    switch(columns) {
      case 1: return 'w-[320px]';
      case 2: return 'w-[640px]';
      case 3: return 'w-[960px]';
      case 4: return 'w-[1200px]';
      default: return 'w-[320px]';
    }
  };

  return (
    <Dropdown
      classNames={{
        content: 'rounded-md',
      }}
    >
      <NavbarItem>
        <DropdownTrigger>
          <Button
            disableRipple
            className="p-0 bg-transparent data-[hover=true]:bg-transparent leading-normal font-semibold hover:underline hover:text-primary transition gap-1"
            endContent={<ChevronDownIcon className="text-primary" size={20} />}
            startContent={triggerIcon}
            radius="sm"
            size="md"
            variant="light"
          >
            {triggerLabel}
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label={triggerLabel}
        className={`${getColumnWidth()} p-4`}
        itemClasses={{
          base: 'gap-4 rounded-md data-[hover=true]:bg-brand-gradient data-[hover=true]:text-fill-transparent',
          title: 'font-semibold truncate max-w-full',
        }}
      >
        <div className={`grid ${columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-3' : 'grid-cols-4'} gap-4`}>
          {categories.map((category, categoryIndex) => (
            <div key={`category-${categoryIndex}`} className="flex flex-col gap-2">
              {/* Category Header */}
              <Link 
                href={category.url || '#'} 
                className="flex items-center gap-2 font-bold text-primary hover:underline p-2"
              >
                {category.icon && <span className="text-primary">{category.icon}</span>}
                <span>{category.title}</span>
              </Link>
              
              {category.description && (
                <p className="text-sm text-gray-500 px-2">{category.description}</p>
              )}
              
              {/* Category Items */}
              <div className="flex flex-col gap-1">
                {category.items?.map((item, itemIndex) => (
                  <DropdownItem
                    key={`item-${categoryIndex}-${itemIndex}`}
                    description={item.description}
                    href={item.url}
                    startContent={item.icon}
                  >
                    {item.title}
                  </DropdownItem>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default MegaDropdownMenu;