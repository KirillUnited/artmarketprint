'use client';
import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Link } from '@heroui/link';
import { BookOpenIcon, BriefcaseIcon, HomeIcon, PhoneIcon, Settings, WrenchIcon } from 'lucide-react';

import BrandLogo from '../../ui/BrandLogo';
import MegaDropdownMenu from '../../ui/dropdown/MegaDropdownMenu';

/**
 * Example navbar component that demonstrates how to integrate MegaDropdownMenu
 * into a real navbar layout.
 */
export const MegaDropdownNavbar = () => {
  // Example data for services dropdown
  const servicesCategories = [
    {
      title: 'Печатные услуги',
      url: '/services/printing',
      icon: <WrenchIcon className="text-primary" size={18} />,
      items: [
        {
          title: 'Широкоформатная печать',
          url: '/services/printing/wide-format',
          description: 'Печать баннеров, плакатов и других крупных форматов'
        },
        {
          title: 'Цифровая печать',
          url: '/services/printing/digital',
          description: 'Высококачественная печать небольших тиражей'
        },
        {
          title: 'Офсетная печать',
          url: '/services/printing/offset',
          description: 'Экономичная печать больших тиражей'
        }
      ]
    },
    {
      title: 'Дизайн и макеты',
      url: '/services/design',
      icon: <Settings className="text-primary" size={18} />,
      items: [
        {
          title: 'Разработка дизайна',
          url: '/services/design/development',
          description: 'Создание уникального дизайна для вашей продукции'
        },
        {
          title: 'Верстка макетов',
          url: '/services/design/layout',
          description: 'Профессиональная верстка для печати'
        }
      ]
    }
  ];

  // Example data for catalog dropdown
  const catalogCategories = [
    {
      title: 'Популярные категории',
      url: '/catalog',
      icon: <BookOpenIcon className="text-primary" size={18} />,
      items: [
        {
          title: 'Визитки',
          url: '/catalog/business-cards',
        },
        {
          title: 'Флаеры и листовки',
          url: '/catalog/flyers',
        },
        {
          title: 'Баннеры',
          url: '/catalog/banners',
        }
      ]
    },
    {
      title: 'Рекламная продукция',
      url: '/catalog/advertising',
      icon: <BriefcaseIcon className="text-primary" size={18} />,
      items: [
        {
          title: 'Буклеты',
          url: '/catalog/booklets',
        },
        {
          title: 'Каталоги',
          url: '/catalog/catalogs',
        }
      ]
    }
  ];

  return (
    <Navbar
      shouldHideOnScroll
      classNames={{
        base: 'shadow-medium',
        wrapper: 'max-w-full p-0 items-center',
      }}
    >
      <div className="container flex flex-row items-center justify-between gap-4">
        <NavbarBrand as={Link} className="grow-0 basis-auto" href={'/'}>
          <BrandLogo alt={'ArtMarketPrint'} />
        </NavbarBrand>
        
        <NavbarContent className="flex gap-8" justify="center">
          <NavbarItem>
            <Link 
              aria-current="page" 
              className="leading-normal font-semibold hover:underline hover:text-primary transition" 
              color={'foreground'} 
              href={'/'} 
              size="sm"
            >
              <HomeIcon size={18} className="mr-1" />
              Главная
            </Link>
          </NavbarItem>
          
          {/* Mega Dropdown for Services */}
          <MegaDropdownMenu 
            triggerLabel="Услуги" 
            triggerIcon={<WrenchIcon size={18} />}
            categories={servicesCategories} 
            columns={2} 
          />
          
          {/* Mega Dropdown for Catalog */}
          <MegaDropdownMenu 
            triggerLabel="Каталог" 
            triggerIcon={<BookOpenIcon size={18} />}
            categories={catalogCategories} 
            columns={2} 
          />
          
          <NavbarItem>
            <Link 
              aria-current="page" 
              className="leading-normal font-semibold hover:underline hover:text-primary transition" 
              color={'foreground'} 
              href={'/contacts'} 
              size="sm"
            >
              <PhoneIcon size={18} className="mr-1" />
              Контакты
            </Link>
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
};

export default MegaDropdownNavbar;