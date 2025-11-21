'use client';

import { useState } from 'react';
import { Star, User } from 'lucide-react';

interface ProductTabsProps {
	description: string;
	category: string;
}

type TabType = 'description' | 'care' | 'reviews';

const careInstructions = {
	'Cây Trong Nhà': {
		light: 'Ánh sáng gián tiếp, tránh ánh nắng trực tiếp',
		water: 'Tưới 2-3 lần/tuần, giữ đất ẩm nhưng không úng',
		temperature: '18-25°C',
		fertilizer: 'Bón phân 1 lần/tháng vào mùa sinh trưởng',
	},
	'Cây Ngoài Trời': {
		light: 'Ánh sáng mặt trời trực tiếp 4-6 giờ/ngày',
		water: 'Tưới đều đặn, tăng cường vào mùa khô',
		temperature: '20-30°C',
		fertilizer: 'Bón phân 2 lần/tháng',
	},
	default: {
		light: 'Ánh sáng gián tiếp hoặc bóng râm nhẹ',
		water: 'Tưới khi đất khô, tránh úng nước',
		temperature: '18-28°C',
		fertilizer: 'Bón phân 1 lần/tháng',
	},
};

const mockReviews = [
	{
		id: 1,
		name: 'Nguyễn Văn A',
		rating: 5,
		date: '15/11/2025',
		comment: 'Cây rất đẹp và khỏe, đóng gói cẩn thận. Rất hài lòng!',
	},
	{
		id: 2,
		name: 'Trần Thị B',
		rating: 4,
		date: '10/11/2025',
		comment: 'Cây tươi xanh, giao hàng nhanh. Sẽ ủng hộ shop tiếp!',
	},
	{
		id: 3,
		name: 'Lê Văn C',
		rating: 5,
		date: '05/11/2025',
		comment: 'Chất lượng tuyệt vời, đúng như mô tả. Highly recommended!',
	},
];

export function ProductTabs({ description, category }: ProductTabsProps) {
	const [activeTab, setActiveTab] = useState<TabType>('description');

	const care =
		careInstructions[category as keyof typeof careInstructions] ||
		careInstructions.default;

	const tabs = [
		{ id: 'description' as TabType, label: 'Mô Tả' },
		{ id: 'care' as TabType, label: 'Chăm Sóc' },
		{ id: 'reviews' as TabType, label: 'Đánh Giá' },
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
						<h3 className='text-xl font-semibold'>Mô Tả Sản Phẩm</h3>
						<p className='text-muted-foreground leading-relaxed'>
							{description}
						</p>
						<div className='glass rounded-lg p-6 space-y-3'>
							<h4 className='font-semibold'>Đặc điểm nổi bật:</h4>
							<ul className='space-y-2 text-muted-foreground'>
								<li className='flex items-start gap-2'>
									<span className='text-primary mt-1'>•</span>
									<span>Cây khỏe mạnh, được chăm sóc kỹ lưỡng</span>
								</li>
								<li className='flex items-start gap-2'>
									<span className='text-primary mt-1'>•</span>
									<span>Phù hợp với khí hậu Việt Nam</span>
								</li>
								<li className='flex items-start gap-2'>
									<span className='text-primary mt-1'>•</span>
									<span>Dễ dàng chăm sóc và sinh trưởng tốt</span>
								</li>
								<li className='flex items-start gap-2'>
									<span className='text-primary mt-1'>•</span>
									<span>Đóng gói cẩn thận, giao hàng an toàn</span>
								</li>
							</ul>
						</div>
					</div>
				)}

				{activeTab === 'care' && (
					<div className='space-y-4 animate-fade-in'>
						<h3 className='text-xl font-semibold'>Hướng Dẫn Chăm Sóc</h3>
						<div className='grid md:grid-cols-2 gap-4'>
							<div className='glass rounded-lg p-6 space-y-2'>
								<div className='w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3'>
									<span className='text-2xl'>☀️</span>
								</div>
								<h4 className='font-semibold'>Ánh Sáng</h4>
								<p className='text-sm text-muted-foreground'>{care.light}</p>
							</div>
							<div className='glass rounded-lg p-6 space-y-2'>
								<div className='w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3'>
									<span className='text-2xl'>💧</span>
								</div>
								<h4 className='font-semibold'>Tưới Nước</h4>
								<p className='text-sm text-muted-foreground'>{care.water}</p>
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

				{activeTab === 'reviews' && (
					<div className='space-y-6 animate-fade-in'>
						<div className='flex items-center justify-between'>
							<h3 className='text-xl font-semibold'>Đánh Giá Khách Hàng</h3>
							<span className='text-sm text-muted-foreground'>
								{mockReviews.length} đánh giá
							</span>
						</div>
						<div className='space-y-4'>
							{mockReviews.map((review) => (
								<div key={review.id} className='glass rounded-lg p-6 space-y-3'>
									<div className='flex items-start justify-between'>
										<div className='flex items-center gap-3'>
											<div className='w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center'>
												<User className='w-5 h-5 text-primary' />
											</div>
											<div>
												<p className='font-semibold'>{review.name}</p>
												<p className='text-xs text-muted-foreground'>
													{review.date}
												</p>
											</div>
										</div>
										<div className='flex items-center gap-1'>
											{[...Array(5)].map((_, i) => (
												<Star
													key={i}
													className={`w-4 h-4 ${
														i < review.rating
															? 'fill-yellow-400 text-yellow-400'
															: 'text-gray-300'
													}`}
												/>
											))}
										</div>
									</div>
									<p className='text-muted-foreground'>{review.comment}</p>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
