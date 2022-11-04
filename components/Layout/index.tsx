import Header from '@components/Header';
import Footer from '@components/Footer';
import Head from 'next/head';
import { useRouter } from 'next/router';

type LoyoutProps = {
	pageMeta?: { title?: string; description?: string; date?: string };
} & React.ObjectHTMLAttributes<HTMLObjectElement>;

const Layout: React.FunctionComponent<LoyoutProps> = ({
	children,
	pageMeta
}) => {
	const router = useRouter();

	const meta = {
		title: 'Pedro Lages - TCC',
		description: 'O que foi desenvolvido no TCC sobre copywriting e GPT-3',
		type: 'website',
		...pageMeta
	};

	return (
		<>
			<Head>
				<title>{meta.title}</title>
				<meta name='description' content={meta.description} />
				<link rel='icon' href='/favicon.svg' />
				{/* Open Graph */}
				<meta
					property='org:url'
					content={`http://www.pedrolagesribeiro.com.br${router.asPath}`}
				/>
				<meta property='og:type' content={meta.type} />
				<meta property='og:title' content={meta.title} />
				<meta property='og:site_name' content='Help Your Store' />
				<meta property='og:description' content={meta.description} />
				{meta.date && (
					<meta property='article:published_time' content={meta.date} />
				)}
			</Head>

			<div className='min-h-screen felx felx-col'>
				<Header />
				<main className='w-full p-10 flex items-center justify-center'>
					{children}
				</main>
				<Footer />
			</div>
		</>
	);
};

export default Layout;
