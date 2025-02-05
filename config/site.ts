export type SiteConfig = typeof siteConfig;
import { PurchaseIcon, QualityIcon, SpeedIcon } from '@/components/icons';

export const siteConfig = {
  name: 'Профессиональная печать на любых материалах в Минске',
  description: 'Качественная УФ-печать, DTF-печать, гравировка и шелкография для ваших проектов',
  seo: {
    title: 'Профессиональная УФ, DTF печать и шелкография на текстиле и сувенирах – Качественные услуги в Минске',
    description: 'Предлагаем высококачественные услуги УФ-печати, DTF-печати и шелкографии на различных поверхностях: от текстиля до сувенирной продукции. Индивидуальный подход, современные технологии и доступные цены. Узнайте больше на нашем сайте.',
    keywords: 'УФ-печать, DTF-печать, шелкография, печать на текстиле, печать на сувенирах, персонализация продукции, Минск'
  },
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
          href: '/services/uf-pechat',
          description: 'Технология обеспечивает точную передачу мелких деталей и яркость цветов'
        },
        {
          label: 'DTF-печать',
          href: '/services/dtf-pechat',
          description: 'Идеально для текстиля и сложных дизайнов'
        },
        {
          label: 'Гравировка',
          href: '/',
          description: 'Идеально для текстиля и сложных дизайнов'
        },
        {
          label: 'Шелкография',
          href: '/services/shelkografiya',
          description: 'Долговечность и яркость изображений гарантированы'
        },
      ]
    },
    {
      label: 'Каталог',
      href: '/#catalog',
      menuItems: [
        {
          label: 'Печать на одежде',
          href: '/catalog/pechat-na-odezhde',
          description: 'Идеально для текстиля и сложных дизайнов!'
        },
        {
          label: 'Печать на кружках',
          href: '/catalog/pechat-na-kruzhkakh',
          description: 'Долговечность и яркость изображений гарантированы!'
        },
        // {
        //   label: 'Печать на шопперах',
        //   href: '/catalog/pechat-na-shopperakh',
        //   description: 'Наша услуга печати на шопперах предлагает уникальную возможность персонализировать ваши сумки по своему вкусу!'
        // }
      ]
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
        href: '/services/dtf-pechat',
        slug: 'dtf-pechat',
        seo: {
          title: 'DTF-печать на текстиле – Яркие принты без ограничений',
          description: 'DTF-печать на футболках, толстовках, кепках и другой одежде. Яркие цвета, высокая стойкость к стирке и детальная прорисовка изображений. Печатаем любые тиражи – от 1 штуки!',
          keywords: 'DTF-печать, печать на одежде, печать на футболках, печать на ткани, термоперенос, печать на текстиле, персонализированные принты'
        }
      },
      {
        title: 'Шелкографная печать',
        variant: 'service',
        price: 'от 1 р.',
        description: 'Долговечность и яркость изображений гарантированы',
        image: '/images/service-1.jpg',
        href: '/services/shelkografiya',
        slug: 'shelkografiya',
        seo: {
          title: 'Шелкография – Классическая печать для бизнеса и рекламы',
          description: 'Шелкография на текстиле, бумаге, пластике и металле. Идеальный вариант для нанесения логотипов, рекламной продукции и корпоративного мерча. Надежные краски, долговечность и четкость линий!',
          keywords: 'шелкография, трафаретная печать, печать на футболках, печать на сувенирах, печать на бумаге, корпоративный мерч, печать логотипов  '
        }
      },
      {
        title: 'UV - печать',
        variant: 'service',
        price: 'от 6 р.',
        description: 'Технология обеспечивает точную передачу мелких деталей и яркость цветов',
        image: '/images/service-3.jpg',
        href: '/services/uf-pechat',
        slug: 'uf-pechat',
        seo: {
          title: 'УФ-печать на любых поверхностях – Яркие и стойкие изображения',
          description: 'Профессиональная УФ-печать на стекле, пластике, металле, дереве и других поверхностях. Высокая стойкость к внешним воздействиям, насыщенные цвета и точность деталей. Закажите печать у экспертов!',
          keywords: 'УФ-печать, ультрафиолетовая печать, печать на стекле, печать на пластике, печать на дереве, стойкая печать, персонализация продукции'
        }
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
        href: '/catalog/pechat-na-odezhde',
        slug: 'pechat-na-odezhde',
        seo: {
          title: 'Печать на одежде – Индивидуальные принты на футболках, толстовках, худи',
          description: 'Создайте уникальный стиль с печатью на одежде! Яркие и стойкие принты на футболках, толстовках, худи, кепках и другой одежде. DTF, шелкография и термоперенос – выберите свой метод печати!',
          keywords: 'печать на одежде, печать на футболках, печать на толстовках, DTF печать, шелкография, индивидуальные принты, термоперенос'
        }
      },
      {
        title: 'Печать на кружках',
        variant: 'product',
        price: 'от 7 руб.',
        description: 'Долговечность и яркость изображений гарантированы',
        image: '/images/catalog-2.jpg',
        href: '/catalog/pechat-na-kruzhkakh',
        slug: 'pechat-na-kruzhkakh',
        seo: {
          title: 'Печать на кружках – Персональные и корпоративные кружки на заказ"',
          description: 'Эксклюзивные кружки с печатью для подарков и бизнеса! Яркие принты, стойкость к мытью, индивидуальные дизайны. Идеальный вариант для брендирования и сувенирной продукции',
          keywords: 'печать на кружках, персонализированные кружки, кружки с логотипом, фотопечать на кружках, корпоративные кружки, кружки на заказ'
        }
      },
      // {
      //   title: 'Печать на шопперах',
      //   variant: 'product',
      //   price: 'от 9 руб.',
      //   description: 'Наша услуга печати на шопперах предлагает уникальную возможность персонализировать ваши сумки по своему вкусу',
      //   image: '/images/catalog-3.jpg',
      //   href: '/catalog/pechat-na-shopperakh',
      //   slug: 'pechat-na-shopperakh',
      //   seo: {
      //     title: 'Печать на шопперах – Экосумки с вашим дизайном',
      //     description: 'Закажите печать на шопперах – стильные экосумки с логотипом, рисунками или надписями. Долговечные материалы, экологичный тренд, отличное решение для бизнеса и подарков.',
      //     keywords: 'печать на шопперах, печать на сумках, экосумки с логотипом, персонализированные шопперы, брендированные сумки, печать на ткани'
      //   }
      // },
    ]
  }
};
