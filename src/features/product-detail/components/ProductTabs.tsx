'use client';

import { useState } from 'react';

interface ProductTabsProps {
	description: string;
	category: string;
	careLight?: string | null;
	careWater?: string | null;
	careTemperature?: string | null;
	careFertilizer?: string | null;
}

type TabType = 'description' | 'care';

export function ProductTabs({
	description,
	category,
	careLight,
	careWater,
	careTemperature,
	careFertilizer,
}: ProductTabsProps) {
	const [activeTab, setActiveTab] = useState<TabType>('description');

	// Use product-specific care instructions from database
	const care = {
		light: careLight || 'Thông tin chưa được cập nhật',
		water: careWater || 'Thông tin chưa được cập nhật',
		temperature: careTemperature || 'Thông tin chưa được cập nhật',
		fertilizer: careFertilizer || 'Thông tin chưa được cập nhật',
	};

	const tabs = [
		{ id: 'description' as TabType, label: 'Mô Tả' },
		{ id: 'care' as TabType, label: 'Chăm Sóc' },
	];

	return (
		<div className='space-y-6'>
			{/* Tab Navigation */}
			<div className='flex gap-2 border-b border-border'>
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`px-6 py-3 font-medium transition-all duration-300 relative ${
							activeTab === tab.id
								? 'text-primary'
								: 'text-muted-foreground hover:text-foreground'
						}`}>
						{tab.label}
						{activeTab === tab.id && (
							<div className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-slide-in' />
						)}
					</button>
				))}
			</div>

			{/* Tab Content */}
			<div className='py-4'>
				{activeTab === 'description' && (
					<div className='space-y-4 animate-fade-in'>
						<h3 className='text-xl font-semibold'>
							Mô Tả Sản Phẩm
						</h3>
						<div
							className='text-muted-foreground leading-relaxed prose prose-sm max-w-none'
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					</div>
				)}

				{activeTab === 'care' && (
					<div className='space-y-4 animate-fade-in'>
						<h3 className='text-xl font-semibold'>
							Hướng Dẫn Chăm Sóc
						</h3>
						<div className='grid md:grid-cols-2 gap-4'>
							<div className='glass rounded-lg p-6 space-y-2'>
								<div className='w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3'>
									<span className='text-2xl'>☀️</span>
								</div>
								<h4 className='font-semibold'>Ánh Sáng</h4>
								<p className='text-sm text-muted-foreground'>
									{care.light}
								</p>
							</div>
							<div className='glass rounded-lg p-6 space-y-2'>
								<div className='w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3'>
									<span className='text-2xl'>💧</span>
								</div>
								<h4 className='font-semibold'>Tưới Nước</h4>
								<p className='text-sm text-muted-foreground'>
									{care.water}
								</p>
							</div>
							<div className='glass rounded-lg p-6 space-y-2'>
								<div className='w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3'>
									<span className='text-2xl'>🌡️</span>
								</div>
								<h4 className='font-semibold'>Nhiệt Độ</h4>
								<p className='text-sm text-muted-foreground'>
									{care.temperature}
								</p>
							</div>
							<div className='glass rounded-lg p-6 space-y-2'>
								<div className='w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3'>
									<span className='text-2xl'>🌱</span>
								</div>
								<h4 className='font-semibold'>Bón Phân</h4>
								<p className='text-sm text-muted-foreground'>
									{care.fertilizer}
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
