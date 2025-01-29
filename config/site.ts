export type SiteConfig = typeof siteConfig;
import { PurchaseIcon, QualityIcon, SpeedIcon } from '@/components/icons';

export const siteConfig = {
  name: 'Профессиональная печать на любых материалах в Минске',
  description: 'Качественная УФ-печать, DTF-печать, гравировка и шелкография для ваших проектов',
  contacts: [
    {
      title: 'Телефон',
      name: 'phone',
      text: 'Мы работаем по всей Беларуси',
      list: [
        {
          label: '+375 (29) 752-02-04',
          href: '+375297520204',
        },
        {
          label: '+375 (33) 352-46-63',
          href: '+375333524663',
        },
        {
          label: '+375 (33) 679-12-22',
          href: '+375336791222',
        },
      ],
    },
    {
      title: 'Почта',
      text: 'info@artmarketprint.by',
      href: 'mailto:info@artmarketprint.by',
    },
    {
      title: 'Адрес',
      text: 'Минск, ул. Ольшевского, 16Б, корп. 2',
    },
    {
      title: 'Время работы',
      text: 'Пн-Пт: 9:00 - 18:00',
    },
    {
      title: '@artmarketprint_by',
      href: 'https://www.instagram.com/artmarketprint.by/',
      icon: 'instagram',
      items: [
        {
          href: 'https://www.instagram.com/artmarketprint_by/',
          thumbnail: '/images/social-1.jpg',
          title: 'ArtMarketPrint'
        },
        {
          href: 'https://www.instagram.com/artmarketprint_by/',
          thumbnail: '/images/social-2.jpg',
          title: 'ArtMarketPrint'
        },
        {
          href: 'https://www.instagram.com/artmarketprint_by/',
          thumbnail: '/images/social-3.jpg',
          title: 'ArtMarketPrint'
        },
      ]
    }
  ],
  navItems: [
    {
      label: 'Главная',
      href: '/',
    },
    {
      label: 'Услуги',
      href: '/#services',
      menuItems: [
        {
          label: 'УФ-печать',
          href: '/',
        },
        {
          label: 'DTF-печать',
          href: '/',
        },
        {
          label: 'Гравировка',
          href: '/',
        },
        {
          label: 'Шелкография',
          href: '/',
        },
      ]
    },
    {
      label: 'Каталог/Цены',
      href: '/#catalog',
    },
    // {
    //   label: 'Проекты',
    //   href: '/#projects',
    // },
    // {
    //   label: 'Отзывы',
    //   href: '/#testimonials',
    // },
    {
      label: 'Контакты',
      href: '/#contacts',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Team',
      href: '/team',
    },
    {
      label: 'Calendar',
      href: '/calendar',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  benefitItems: [
    {
      icon: PurchaseIcon,
      title: 'Цена',
      description: 'Мы предлагаем качественные услуги по доступным ценам',
    },
    {
      icon: QualityIcon,
      title: 'Гарантия качества',
      description: 'Наша команда использует передовые технологии и материалы'
    },
    {
      icon: SpeedIcon,
      title: 'Оперативность',
      description: 'Мы стремимся выполнять заказы в кратчайшие сроки, не жертвуя качеством',
    }
  ],
  serviceSection: {
    title: 'Услуги',
    description: 'Услуги наших специалистов гарантируют качество и кратчайшие сроки работы',
    href: '/services',
    items: [
      {
        title: 'DTF - печать',
        variant: 'service',
        price: '1 погонный метр от 30 руб.',
        description: 'Идеально для текстиля и сложных дизайнов',
        image: '/images/service-2.jpg',
        href: '/'
      },
      {
        title: 'Шелкографная печать ',
        variant: 'service',
        price: 'от 1 р.',
        description: 'Долговечность и яркость изображений гарантированы',
        image: '/images/service-1.jpg',
        href: '/'
      },
      {
        title: 'UV - печать',
        variant: 'service',
        price: 'от 6 р.',
        description: 'Технология обеспечивает точную передачу мелких деталей и яркость цветов',
        image: '/images/service-3.jpg',
        href: '/'
      }
    ]
  },
  catalogSection: {
    title: 'Каталог',
    description: 'Мы предлагаем печатные услуги на различных материалах, что позволяет вам реализовать самые разнообразные проекты',
    href: '/catalog',
    items: [
      {
        title: 'Печать на одежде',
        variant: 'product',
        price: 'от 10 BYN',
        description: 'Идеально для текстиля и сложных дизайнов',
        image: '/images/catalog-1.jpeg',
        href: '/'
      },
      {
        title: 'Печать на кружках',
        variant: 'product',
        price: 'от 7 руб.',
        description: 'Долговечность и яркость изображений гарантированы',
        image: '/images/catalog-2.jpg',
        href: '/'
      },
      {
        title: 'Печать на шопперах',
        variant: 'product',
        price: 'от 9 руб.',
        description: 'Наша услуга печати на шопперах предлагает уникальную возможность персонализировать ваши сумки по своему вкусу',
        image: '/images/catalog-3.jpg',
        href: '/'
      },
    ]
  }
};
