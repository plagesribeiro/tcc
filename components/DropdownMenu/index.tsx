import { Menu, Transition } from '@headlessui/react';
import { BookOpenIcon } from '@heroicons/react/solid';
import { getSkills } from 'pages/api/skills';
import { Fragment, useEffect, useState } from 'react';
import { ShortenedSkill } from 'skills';
import styles from './DropdownMenu.module.css';

const DropdownMenu = () => {
	const [skills, setSkills] = useState<ShortenedSkill[]>([]);

	const loadSkills = async () => {
		const shortenedSkills = await getSkills();

		setSkills(shortenedSkills);
	};

	useEffect(() => {
		loadSkills();
	}, []);

	return (
		<Transition
			as={Fragment}
			enter='transition ease-out duration-100'
			enterFrom='transform opacity-0 scale-95'
			enterTo='transform opacity-100 scale-100'
			leave='transition ease-in duration-75'
			leaveFrom='transform opacity-100 scale-100'
			leaveTo='transform opacity-0 scale-95'
		>
			<Menu.Items
				className={`${styles.root} divide-slate-400 dark:divide-slate-600
				bg-background-light-secondary dark:bg-background-dark-secondary`}
			>
				<div className='px-1 py-1 '>
					{skills.map((skill: ShortenedSkill) => (
						<Menu.Item key={skill.id}>
							{({ active }) => (
								<button
									className={`${
										active
											? 'bg-primary text-slate-200'
											: 'text-slate-800 dark:text-slate-200'
									} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									onClick={() => {
										const href = `/skills/${skill.id}`;
										window.location.href = href;
									}}
								>
									<BookOpenIcon
										className='mr-2 h-5 w-5'
										aria-hidden='true'
									/>
									{skill.name}
								</button>
							)}
						</Menu.Item>
					))}
				</div>
			</Menu.Items>
		</Transition>
	);
};

export default DropdownMenu;
