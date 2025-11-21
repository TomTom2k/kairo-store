'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export type SortOption =
	| 'default'
	| 'price-asc'
	| 'price-desc'
	| 'rating-desc'
	| 'name-asc'
	| 'name-desc';

interface ProductSortProps {
	value: SortOption;
	onChange: (value: SortOption) => void;
}

const sortOptions = [
	{ value: 'default' as const, label: 'Mặc Định' },
	{ value: 'price-asc' as const, label: 'Giá: Thấp đến Cao' },
	{ value: 'price-desc' as const, label: 'Giá: Cao đến Thấp' },
	{ value: 'rating-desc' as const, label: 'Đánh Giá Cao Nhất' },
	{ value: 'name-asc' as const, label: 'Tên: A-Z' },
	{ value: 'name-desc' as const, label: 'Tên: Z-A' },
];

export function ProductSort({ value, onChange }: ProductSortProps) {
	const [isOpen, setIsOpen] = useState(false);
	const selectedOption =
		sortOptions.find((opt) => opt.value === value) || sortOptions[0];

	return (
		<div className='relative'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='flex items-center gap-2 px-4 py-2 glass rounded-lg hover:scale-105 transition-all duration-300 min-w-[200px] justify-between'
				aria-label='Sắp xếp sản phẩm'
				aria-expanded={isOpen}>
				<span className='text-sm font-medium'>{selectedOption.label}</span>
				<ChevronDown
					className={`w-4 h-4 transition-transform duration-300 ${
						isOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>

			{isOpen && (
				<div className='absolute top-full mt-2 right-0 glass rounded-lg overflow-hidden shadow-xl border border-border/50 z-50 min-w-[200px] animate-fade-in-up'>
					{sortOptions.map((option) => (
						<button
							key={option.value}
							onClick={() => {
								onChange(option.value);
								setIsOpen(false);
							}}
							className={`w-full px-4 py-2 text-sm text-left hover:bg-primary/10 transition-colors duration-200 ${
								value === option.value
									? 'bg-primary/20 text-primary font-semibold'
									: ''
							}`}>
							{option.label}
						</button>
					))}
				</div>
			)}

			{/* Backdrop to close dropdown */}
			{isOpen && (
				<div
					className='fixed inset-0 z-40'
					onClick={() => setIsOpen(false)}
					aria-hidden='true'
				/>
			)}
		</div>
	);
}
