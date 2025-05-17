export function fetchNavigation(items: any[]) {
    const navMap: any = {};

    items?.forEach((nav: any) => {
        const navUrl = nav.url.split('/').filter(Boolean)[0];

        navMap[navUrl] = nav.title;

        if (nav.submenu) {
            nav.submenu[0].services.forEach((sub: any) => {
                navMap[sub.url] = sub.title;
            });
        }
    });

    return navMap;
}

export const getCategorySlugFromNavMap = (navMap: any, category: string) => Object.entries(navMap).find(([key, value]) => value === category)?.[0] || '';