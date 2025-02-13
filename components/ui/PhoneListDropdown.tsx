import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/dropdown";
import {Button} from "@heroui/button";
import {ChevronDownIcon} from "lucide-react";
import {PhoneIcon} from "@/components/icons";
import {siteConfig} from "@/config/site";
import {Link} from "@heroui/link";
import React from "react";


export const PhoneListDropdown = () => (
    <Dropdown
        classNames={{
            content: 'rounded-md',
        }}>
        <DropdownTrigger>
            <Button className="min-w-fit p-0 bg-transparent data-[hover=true]:bg-transparent hidden lg:flex text-primary gap-1 hover:underline hover:text-primary transition" endContent={<ChevronDownIcon className="text-primary" size={20} />} radius='sm'
                    variant="light">
                <PhoneIcon />
                <span className='text-foreground hidden 2xl:inline'>{siteConfig?.contacts?.[0]?.list?.[0]?.label}</span>
            </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Link Actions"
                      itemClasses={{
                          base: "gap-4 rounded-md data-[hover=true]:bg-transparent",
                          title: "text-center",
                      }}
        ><>
            {
                siteConfig?.contacts?.[0]?.list?.map((item, index) => (
                    <DropdownItem key={index} className="py-0" textValue={item.label}>
                        <Link className="text-sm hover:text-primary" color={'foreground'} href={`tel:${item.href}`}>
                            <span>{item.label}</span>
                        </Link>
                    </DropdownItem>
                ))
            }
        </>
        </DropdownMenu>
    </Dropdown>
)