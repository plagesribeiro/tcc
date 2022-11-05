import { useState, useEffect } from 'react';
import {
	ChevronDownIcon,
	ChevronUpIcon,
	MoonIcon,
	SunIcon
} from '@heroicons/react/solid';
import { useTheme } from 'next-themes';
import { Menu } from '@headlessui/react';
import DropdownMenu from '@components/DropdownMenu';
import Logo from '@components/Logo';
import styles from './Header.module.css';

const Header = () => {
	const { systemTheme, theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const renderThemeChanger = () => {
		if (!mounted) return null;
		const currentTheme = theme === 'system' ? systemTheme : theme;

		if (currentTheme === 'dark') {
			return (
				<SunIcon
					className='w-5 h-5 mr-2'
					role='button'
					onClick={() => setTheme('light')}
				/>
			);
		} else {
			return (
				<MoonIcon
					className='w-5 h-5 mr-2'
					role='button'
					onClick={() => setTheme('dark')}
				/>
			);
		}
	};

	return (
		<header className={`border-b border-slate-300 dark:border-slate-600`}>
			<div className={`${styles.root}`}>
				<Logo />

				<div className={`${styles.flexCenter}`}>
					{renderThemeChanger()}

					<div className={`${styles.flexCenter}`}>
						<Menu as='div' className='relative inline-block text-left'>
							<Menu.Button
								onClick={() => {
									if (menuOpen) {
										setMenuOpen(false);
									} else {
										setMenuOpen(true);
									}
								}}
								className={`${styles.flexCenter} space-x-1`}
							>
								<p className={`${styles.flexCenter} sm:space-x-1`}>
									<span className=' hidden sm:inline-block'>
										Habilidades
									</span>
									{!menuOpen ? (
										<ChevronDownIcon className='w-4 h-4' />
									) : (
										<ChevronUpIcon className='w-4 h-4' />
									)}
								</p>
							</Menu.Button>

							<DropdownMenu />
						</Menu>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
