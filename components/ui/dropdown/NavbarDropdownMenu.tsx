import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { NavbarItem } from "@heroui/navbar";
import { ChevronDownIcon, SettingsIcon, TagsIcon } from "lucide-react";

type HeaderDropdownMenuProps = {
	triggerLabel: string;
	items: {
		title: string; url?: string; description?: string;
		services?: any;
	}[];
};

export const NavbarDropdownMenu = ({ triggerLabel, items }: HeaderDropdownMenuProps) => {
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
                className="w-[320px]"
                itemClasses={{
                    base: 'gap-4 rounded-md data-[hover=true]:bg-brand-gradient data-[hover=true]:text-fill-transparent',
                    title: 'font-semibold truncate max-w-full',
                }}
            >
                <DropdownItem
                    key={items[0].title}
                    classNames={{
                        title: 'font-light'
                    }} href={items[0].url} startContent={triggerLabel === 'Услуги' ? <SettingsIcon /> : <TagsIcon />}>
                    {items[0].title}
                </DropdownItem>
                {items[0]?.services?.map((item: any) => (
                    <DropdownItem
                        key={item.title}
                        description={item.description}
                        href={`${items[0].url}/${item.url}`}
                    >
                        {item.title}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};