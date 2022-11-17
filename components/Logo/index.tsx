import Link from 'next/link';
import styles from './Logo.module.css';

const Logo = () => (
	<Link href='/'>
		<a className={`${styles.root}`}>
			<span className={`${styles.name}`}>TCC - Pedro Lages Ribeiro</span>
		</a>
	</Link>
);

export default Logo;
