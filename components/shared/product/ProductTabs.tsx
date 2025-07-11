'use client'
import { Tabs, Tab } from '@heroui/tabs';
import { formattedOptions } from './lib';
import {JSX} from "react";

export const ProductTabs: ({description, options}: { description: any; options: any }) => (null | JSX.Element) = ({ description, options }) => {
    if (!description && !options) return null;
    
    return (
		<article className="flex w-full flex-col prose mt-8 max-w-full">
			<Tabs aria-label="Options" color="primary" variant="underlined">
				{description && (
					<Tab
						key="Описание"
						title={
							<div className="flex items-center space-x-2">
								<span>Описание</span>
							</div>
						}
					>
						<div dangerouslySetInnerHTML={{__html: description}} />
					</Tab>
				)}
				{options && (
					<Tab
						key="Характеристики"
						title={
							<div className="flex items-center space-x-2">
								<span>Характеристики</span>
							</div>
						}
					>
						<div dangerouslySetInnerHTML={{__html: formattedOptions(options)}} />
					</Tab>
				)}
			</Tabs>
		</article>
	);
}
