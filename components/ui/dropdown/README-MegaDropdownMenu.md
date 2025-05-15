# Mega Dropdown Menu Component

A reusable mega dropdown menu component for the ArtMarketPrint application that supports multiple columns and categories.

## Features

- Support for multiple columns (1-4)
- Category headers with icons
- Item descriptions
- Consistent styling with the application's design system
- Fully responsive

## Usage

```tsx
import MegaDropdownMenu from '@/components/ui/MegaDropdownMenu';
import { Settings, TagsIcon } from 'lucide-react';

// Example usage with two columns
const MyNavbar = () => {
  const servicesCategories = [
    {
      title: 'Печатные услуги',
      url: '/services/printing',
      icon: <Settings className="text-primary" size={18} />,
      items: [
        {
          title: 'Широкоформатная печать',
          url: '/services/printing/wide-format',
          description: 'Печать баннеров, плакатов и других крупных форматов'
        },
        // More items...
      ]
    },
    {
      title: 'Дизайн и макеты',
      url: '/services/design',
      icon: <TagsIcon className="text-primary" size={18} />,
      items: [
        {
          title: 'Разработка дизайна',
          url: '/services/design/development',
          description: 'Создание уникального дизайна для вашей продукции'
        },
        // More items...
      ]
    }
  ];

  return (
    <MegaDropdownMenu 
      triggerLabel="Услуги" 
      triggerIcon={<Settings size={18} />}
      categories={servicesCategories} 
      columns={2} 
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `triggerLabel` | string | required | The text displayed on the dropdown trigger button |
| `triggerIcon` | React.ReactNode | undefined | Optional icon to display before the trigger label |
| `categories` | MegaDropdownCategoryType[] | required | Array of category objects |
| `columns` | 1 \| 2 \| 3 \| 4 | 1 | Number of columns to display in the dropdown |

## Types

```typescript
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
```

## Example

See `components/examples/MegaDropdownExample.tsx` for a complete example of how to use this component with multiple columns and categories.