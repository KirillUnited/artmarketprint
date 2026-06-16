import React from 'react'
import { Tooltip } from '@heroui/tooltip';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import { Calculator } from 'lucide-react';

export default function CalcLinkButton({ children }: { children?: React.ReactNode }) {
    return (
        <Tooltip content="Калькулятор стоимости пакетов" placement="bottom">
            <Button
                aria-label="Calculator"
                as={Link}
                target="_blank"
                className="border-2 border-primary text-primary font-semibold shadow-large hover:scale-105 transition-transform duration-200 bg-brand-gradient text-fill-transparent hover:text-foreground min-w-auto px-2"
                color="default"
                href="/calculator"
                radius="sm"
                size="md"
                variant="light"
            >
                <Calculator className="text-primary" size={18} />
                {children ?? <span className="hidden xl:inline">Рассчитать стоимость</span>}
            </Button>
        </Tooltip>
    )
}
