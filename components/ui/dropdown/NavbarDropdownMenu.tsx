import { urlFor } from "@/sanity/lib/image";
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { NavbarItem } from "@heroui/navbar";
import { ChevronDownIcon, SettingsIcon, TagsIcon } from "lucide-react";
import Image from "next/image";

type HeaderDropdownMenuProps = {
    triggerLabel: string;
    items: {
        title: string; url?: string; description?: string;
        services?: any;
    }[];
};

export const NavbarDropdownMenu = ({ triggerLabel, items }: HeaderDropdownMenuProps) => {
    console.log(items);
    return (
        <Dropdown
            classNames={{
                content: 'rounded-small',
            }}
        >
            <NavbarItem>
                <DropdownTrigger>
                    <Button
                        disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent leading-normal font-semibold hover:underline hover:text-primary transition gap-1"
                        endContent={<ChevronDownIcon className="text-primary" size={20} />}
                        radius="sm"
                        size="md"
                        variant="light"
                    >
                        {triggerLabel}
                    </Button>
                </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
                aria-label="Услуги"
                classNames={{
                    base: 'max-w-[90vw] rounded-small',
                    list: 'grid grid-cols-4 gap-4',
                }}
                itemClasses={{
                    base: 'gap-4 rounded-md data-[hover=true]:bg-brand-gradient data-[hover=true]:text-fill-transparent items-start',
                    title: 'font-semibold whitespace-normal max-w-full',
                    wrapper: 'max-w-[calc(100%-64px)]',
                }}
            >
                {items[0]?.services?.map((item: any) => (
                    <DropdownItem
                        key={item.title}
                        description={item.description}
                        href={`${items[0].url}/${item.url}`}
                        startContent={<Image src={urlFor(item.image?.asset).url()} className="object-contain aspect-square" alt={item.title} width={64} height={64} quality={10} />}
                    >
                        {item.title}
                    </DropdownItem>
                ))}
                <DropdownItem
                    key={items[0].title}
                    classNames={{
                        title: 'font-light'
                    }} href={items[0].url} startContent={triggerLabel === 'Услуги' ? <SettingsIcon /> : <TagsIcon />}>
                    {items[0].title}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};