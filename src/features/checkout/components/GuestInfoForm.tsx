'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, FileText } from 'lucide-react';
import { GuestInfo } from '@/api/types';
import { Button } from '@/shared/ui';

interface GuestInfoFormProps {
	onSubmit: (guestInfo: GuestInfo) => void;
	isSubmitting: boolean;
}

export function GuestInfoForm({ onSubmit, isSubmitting }: GuestInfoFormProps) {
	const [formData, setFormData] = useState<GuestInfo>({
		name: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		notes: '',
	});

	const [errors, setErrors] = useState<Partial<GuestInfo>>({});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		// Clear error when user starts typing
		if (errors[name as keyof GuestInfo]) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}
	};

	const validate = (): boolean => {
		const newErrors: Partial<GuestInfo> = {};

		if (!formData.name.trim()) {
			newErrors.name = 'Vui lòng nhập họ tên';
		}

		if (!formData.email.trim()) {
			newErrors.email = 'Vui lòng nhập email';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Email không hợp lệ';
		}

		if (!formData.phone.trim()) {
			newErrors.phone = 'Vui lòng nhập số điện thoại';
		} else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
			newErrors.phone = 'Số điện thoại không hợp lệ';
		}

		if (!formData.address.trim()) {
			newErrors.address = 'Vui lòng nhập địa chỉ';
		}

		if (!formData.city.trim()) {
			newErrors.city = 'Vui lòng nhập thành phố';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validate()) {
			onSubmit(formData);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			<div>
				<h2 className='text-2xl font-bold mb-6'>Thông Tin Giao Hàng</h2>

				<div className='space-y-4'>
					{/* Name */}
					<div>
						<label className='block text-sm font-medium mb-2'>
							<User className='w-4 h-4 inline mr-2' />
							Họ và tên <span className='text-red-500'>*</span>
						</label>
						<input
							type='text'
							name='name'
							value={formData.name}
							onChange={handleChange}
							placeholder='Nguyễn Văn A'
							className={`w-full px-4 py-3 rounded-lg glass border ${
								errors.name ? 'border-red-500' : 'border-border'
							} focus:border-primary focus:outline-none transition-colors`}
						/>
						{errors.name && (
							<p className='text-red-500 text-sm mt-1'>{errors.name}</p>
						)}
					</div>

					{/* Email */}
					<div>
						<label className='block text-sm font-medium mb-2'>
							<Mail className='w-4 h-4 inline mr-2' />
							Email <span className='text-red-500'>*</span>
						</label>
						<input
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							placeholder='email@example.com'
							className={`w-full px-4 py-3 rounded-lg glass border ${
								errors.email ? 'border-red-500' : 'border-border'
							} focus:border-primary focus:outline-none transition-colors`}
						/>
						{errors.email && (
							<p className='text-red-500 text-sm mt-1'>{errors.email}</p>
						)}
					</div>

					{/* Phone */}
					<div>
						<label className='block text-sm font-medium mb-2'>
							<Phone className='w-4 h-4 inline mr-2' />
							Số điện thoại <span className='text-red-500'>*</span>
						</label>
						<input
							type='tel'
							name='phone'
							value={formData.phone}
							onChange={handleChange}
							placeholder='0912345678'
							className={`w-full px-4 py-3 rounded-lg glass border ${
								errors.phone ? 'border-red-500' : 'border-border'
							} focus:border-primary focus:outline-none transition-colors`}
						/>
						{errors.phone && (
							<p className='text-red-500 text-sm mt-1'>{errors.phone}</p>
						)}
					</div>

					{/* Address */}
					<div>
						<label className='block text-sm font-medium mb-2'>
							<MapPin className='w-4 h-4 inline mr-2' />
							Địa chỉ <span className='text-red-500'>*</span>
						</label>
						<input
							type='text'
							name='address'
							value={formData.address}
							onChange={handleChange}
							placeholder='123 Đường ABC, Quận XYZ'
							className={`w-full px-4 py-3 rounded-lg glass border ${
								errors.address ? 'border-red-500' : 'border-border'
							} focus:border-primary focus:outline-none transition-colors`}
						/>
						{errors.address && (
							<p className='text-red-500 text-sm mt-1'>{errors.address}</p>
						)}
					</div>

					{/* City */}
					<div>
						<label className='block text-sm font-medium mb-2'>
							<MapPin className='w-4 h-4 inline mr-2' />
							Thành phố <span className='text-red-500'>*</span>
						</label>
						<input
							type='text'
							name='city'
							value={formData.city}
							onChange={handleChange}
							placeholder='Hồ Chí Minh'
							className={`w-full px-4 py-3 rounded-lg glass border ${
								errors.city ? 'border-red-500' : 'border-border'
							} focus:border-primary focus:outline-none transition-colors`}
						/>
						{errors.city && (
							<p className='text-red-500 text-sm mt-1'>{errors.city}</p>
						)}
					</div>

					{/* Notes */}
					<div>
						<label className='block text-sm font-medium mb-2'>
							<FileText className='w-4 h-4 inline mr-2' />
							Ghi chú (tùy chọn)
						</label>
						<textarea
							name='notes'
							value={formData.notes}
							onChange={handleChange}
							placeholder='Ghi chú thêm về đơn hàng...'
							rows={3}
							className='w-full px-4 py-3 rounded-lg glass border border-border focus:border-primary focus:outline-none transition-colors resize-none'
						/>
					</div>
				</div>
			</div>

			{/* Submit Button */}
			<Button
				type='submit'
				disabled={isSubmitting}
				className='w-full py-6 text-base font-semibold'
				size='lg'>
				{isSubmitting ? 'Đang xử lý...' : 'Đặt Hàng'}
			</Button>
		</form>
	);
}
