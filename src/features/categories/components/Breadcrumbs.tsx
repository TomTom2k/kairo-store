'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
	label: string;
	href: string;
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
	return (
		<nav
			aria-label='Breadcrumb'
			className='mb-6'
			itemScope
			itemType='https://schema.org/BreadcrumbList'>
			<ol className='flex items-center gap-2 text-sm'>
				<li
					itemProp='itemListElement'
					itemScope
					itemType='https://schema.org/ListItem'>
					<Link
						href='/'
						className='flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors duration-200 group'
						itemProp='item'>
						<Home className='w-4 h-4 group-hover:scale-110 transition-transform' />
						<span itemProp='name'>Trang Chủ</span>
					</Link>
					<meta itemProp='position' content='1' />
				</li>

				{items.map((item, index) => (
					<li
						key={item.href}
						itemProp='itemListElement'
						itemScope
						itemType='https://schema.org/ListItem'
						className='flex items-center gap-2'>
						<ChevronRight className='w-4 h-4 text-muted-foreground' />
						{index === items.length - 1 ? (
							<span
								className='text-foreground font-medium'
								itemProp='name'
								aria-current='page'>
								{item.label}
							</span>
						) : (
							<Link
								href={item.href}
								className='text-muted-foreground hover:text-primary transition-colors duration-200'
								itemProp='item'>
								<span itemProp='name'>{item.label}</span>
							</Link>
						)}
						<meta itemProp='position' content={String(index + 2)} />
					</li>
				))}
			</ol>
		</nav>
	);
}
