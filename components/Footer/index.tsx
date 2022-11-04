import { PropsWithChildren } from 'react';

const Footer: React.FunctionComponent<PropsWithChildren> = () => (
	<footer className='p-6'>
		<p className='text-center text-sm'>
			© {new Date().getFullYear()} Pedro Lages Ribeiro. All rights reserved.
		</p>
	</footer>
);

export default Footer;
