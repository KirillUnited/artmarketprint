export type SiteConfig = typeof siteConfig;

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
      href: "/",
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
      href: "/",
    },
    {
      label: "Проекты",
      href: "/",
    },
    {
      label: "Отзывы",
      href: "/",
    },
    {
      label: "Контакты",
      href: "/",
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
};
