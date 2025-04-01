'use client';
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from '@heroui/dropdown';
import {Button} from '@heroui/button';
import {ChevronDownIcon} from 'lucide-react';
import {Link} from '@heroui/link';
import React from 'react';
import {PhoneIcon} from '@/components/icons';

/**
 * A dropdown component that displays a list of phone numbers.
 * @param {{link: string, number: string}[]} items - The list of phone numbers to display.
 * @returns {JSX.Element} - The rendered dropdown component.
 */
export const PhoneListDropdown = ({items}: {items: {link: string, number: string}[]}): JSX.Element => (
    <Dropdown
        classNames={{
            content: 'rounded-md',
        }}>
        <DropdownTrigger>
            <Button className="min-w-fit p-0 bg-transparent data-[hover=true]:bg-transparent hidden lg:flex text-primary gap-1 hover:underline hover:text-primary transition" endContent={<ChevronDownIcon className="text-primary" size={20} />} radius='sm'
                    variant="light">
                <PhoneIcon />
            </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Link Actions"
                      itemClasses={{
                          base: 'gap-4 rounded-md data-[hover=true]:bg-transparent',
                          title: 'text-center',
                      }}
        >
            {
                items.map((item, index) => (
                    <DropdownItem key={index} className="py-0" textValue={item.number}>
                        <Link className="text-sm hover:text-primary" color={'foreground'} href={`tel:${item.link}`}>
                            <span>{item.number}</span>
                        </Link>
                    </DropdownItem>
                ))
            }
        </DropdownMenu>
    </Dropdown>
)
