import { useState, useEffect, useRef } from 'react';
import {
	ChevronDownIcon,
	ChevronUpIcon,
	MoonIcon,
	SunIcon
} from '@heroicons/react/solid';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Button } from '@components/Button';
import { Menu } from '@headlessui/react';
import DropdownMenu from '@components/DropdownMenu';
import Logo from '@components/Logo';
import styles from './Header.module.css';
import { ShortenedSkill } from 'skills';

const Header = () => {
	const { systemTheme, theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [skills, setSkills] = useState([]);

	useEffect(() => setMounted(true), []);

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

	const loadSkills = async () => {
		const res = await fetch('http://localhost:3000/api/skills');
		const skills = await res.json();

		setSkills(skills);
	};

	// function that runs on page load
	useEffect(() => {
		loadSkills();
	}, []);

	return (
		<header className={`border-b border-slate-300 dark:border-slate-600`}>
			<div className={`${styles.root}`}>
				<Logo />

				<div className={`${styles.flexCenter}`}>
					{renderThemeChanger()}

					<div className={`${styles.flexCenter}`}>
						<Menu as='div' className='relative inline-block text-left'>
							<Menu.Button
								onClick={() => setMenuOpen((prev) => !prev)}
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

							<DropdownMenu skills={skills} />
						</Menu>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
