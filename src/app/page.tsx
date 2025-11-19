import { Hero } from '@/components/sections/Hero';
import { FeaturedPlants } from '@/components/sections/FeaturedPlants';
import { Categories } from '@/components/sections/Categories';
import { Benefits } from '@/components/sections/Benefits';
import { Newsletter } from '@/components/sections/Newsletter';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

export default function Home() {
	return (
		<div className='min-h-screen'>
			<Header />
			<main>
				<Hero />
				<FeaturedPlants />
				<Categories />
				<Benefits />
				<Newsletter />
			</main>
			<Footer />
			<ScrollIndicator />
		</div>
	);
}
