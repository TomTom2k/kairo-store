'use client';

import { useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface ToastProps {
	message: string;
	isVisible: boolean;
	onClose: () => void;
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(() => {
				onClose();
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [isVisible, onClose]);

	if (!isVisible) return null;

	return (
		<div className='fixed top-4 right-4 z-50 animate-slide-in-right'>
			<div className='glass rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[300px] border border-green-500/20'>
				<div className='w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0'>
					<Check className='w-5 h-5 text-white' />
				</div>
				<p className='flex-1 font-medium'>{message}</p>
				<button
					onClick={onClose}
					className='p-1 hover:bg-primary/10 rounded transition-colors'
					aria-label='Đóng'>
					<X className='w-4 h-4' />
				</button>
			</div>
		</div>
	);
}
