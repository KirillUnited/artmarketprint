'use client'
import { Tabs, Tab } from '@heroui/tabs';
import { formattedOptions } from './lib';

export const ProductTabs: React.FC<{ description: string, options: string }> = ({ description, options }) => {
    if (!description && !options) return null;
    
    return (
        <article className="flex w-full flex-col prose mt-8 max-w-full">
            <Tabs
                aria-label="Options"
                color="primary"
                variant="underlined"
            >
                {description && (
                    <Tab
                        key="Описание"
                        title={
                            <div className="flex items-center space-x-2">
                                <span>Описание</span>

                            </div>
                        }
                    >
                        {description}
                    </Tab>
                )
                }
                {options && (
                    <Tab
                        key="Характеристики"
                        title={
                            <div className="flex items-center space-x-2">
                                <span>Характеристики</span>

                            </div>
                        }
                    >
                        <p dangerouslySetInnerHTML={{ __html: formattedOptions(options) }} />
                    </Tab>
                )}
            </Tabs>
        </article>
    )
}
