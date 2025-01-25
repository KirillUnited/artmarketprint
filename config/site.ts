export type SiteConfig = typeof siteConfig;
import { PurchaseIcon, QualityIcon, SpeedIcon } from "@/components/icons";

export const siteConfig = {
  name: "Профессиональная печать на любых материалах в Минске",
  description: "Качественная УФ-печать, DTF-печать, гравировка и шелкография для ваших проектов",
  navItems: [
    {
      label: "Главная",
      href: "/",
    },
    {
      label: "Услуги",
      href: "/#services",
      menuItems: [
        {
          label: "УФ-печать",
          href: "/",
        },
        {
          label: "DTF-печать",
          href: "/",
        },
        {
          label: "Гравировка",
          href: "/",
        },
        {
          label: "Шелкография",
          href: "/",
        },
      ]
    },
    {
      label: "Каталог/Цены",
      href: "/#catalog",
    },
    {
      label: "Проекты",
      href: "/#projects",
    },
    {
      label: "Отзывы",
      href: "/#testimonials",
    },
    {
      label: "Контакты",
      href: "/#contacts",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  benefitItems: [
    {
      icon: PurchaseIcon,
      title: "Цена",
      description: "Мы предлагаем качественные услуги по доступным ценам",
    },
    {
      icon: QualityIcon,
      title: "Гарантия качества",
      description: "Наша команда использует передовые технологии и материалы"
    },
    {
      icon: SpeedIcon,
      title: "Оперативность",
      description: "Мы стремимся выполнять заказы в кратчайшие сроки, не жертвуя качеством",
    }
  ]
};
