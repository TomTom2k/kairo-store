import { Hero, FeaturedPlants, Categories, Benefits, Newsletter } from '@/features/home';
import { Header, Footer } from '@/shared/layout';
import { ScrollIndicator } from '@/shared/ui';

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
