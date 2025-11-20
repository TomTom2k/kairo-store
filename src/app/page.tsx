import { Hero, FeaturedPlants, Categories, Benefits, Newsletter } from '@/modules/home';
import { Header, Footer, ScrollIndicator } from '@/modules/shared';

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
