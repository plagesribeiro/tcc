import { Button } from '@components/Button';
import Card from '@components/Card';
import CardContainer from '@components/CardContainer';
import { NextPage } from 'next';
import React from 'react';
import type { ShortenedSkill, Skill } from 'skills';

type SkillPageProps = {
	skill: Skill;
};

export async function getStaticPaths() {
	// Call /api/frameworks to get the list of frameworks
	const res = await fetch('http://localhost:3000/api/skills');
	const skills: ShortenedSkill[] = await res.json();
	const paths = skills.map((skill) => ({ params: { id: skill.id } }));

	return {
		paths,
		fallback: false
	};
}

export async function getStaticProps(context: { params: { id: string } }) {
	const { id } = context.params;

	const res = await fetch(`http://localhost:3000/api/skills/${id}`);
	const skill: Skill = await res.json();

	return {
		props: {
			skill
		}
	};
}

const { useState } = React;

const BlogPage: NextPage<SkillPageProps> = (props) => {
	const { skill } = props;
	const [isLoading, setIsLoading] = useState(false);
	const [generatedText, setGeneratedText] = useState([]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsLoading(true);

		let inputs = {};

		skill.inputs.map(
			(input) =>
				(inputs = {
					...inputs,
					[input.id]: e.currentTarget[input.id].value
				})
		);
		const res = await fetch(`http://localhost:3000/api/openai`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				skillId: skill.id,
				inputs: {
					...inputs
				}
			})
		});
		// console log the response of the API
		const response = await res.json();
		console.log(response);
		setGeneratedText(response);
		setIsLoading(false);
	};

	return (
		<div className='flex flex-col w-full items-center'>
			<h1 className='font-bold text-xl flex items-start w-full'>
				{skill.name}
			</h1>
			<h1 className='text-sm flex items-start w-full mb-6'>
				{skill.description}
			</h1>
			<CardContainer>
				<Card>
					<h1 className='font-bold text-xl flex items-start w-full mb-4'>
						Input
					</h1>

					<form
						className='flex flex-col items-center w-full'
						onSubmit={handleSubmit}
					>
						<div className='w-full'>
							{skill.inputs.map((input) => (
								<div key={input.name}>
									<p>{`${input.name} `}</p>

									{input.maxLength < 100 ? (
										<input
											className='bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 shadow-inner rounded-lg p-2 w-full mb-4'
											id={`${input.id}`}
											maxLength={input.maxLength}
											placeholder={`${input.example}`}
											required
										/>
									) : (
										<textarea
											className='bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 shadow-inner rounded-lg p-2 w-full mb-4'
											id={`${input.id}`}
											rows={7}
											maxLength={input.maxLength}
											placeholder={`${input.example}`}
											required
										/>
									)}
								</div>
							))}
						</div>

						{isLoading ? (
							<Button type='submit' loading>
								Gerando
							</Button>
						) : (
							<Button type='submit'>Gerar</Button>
						)}
					</form>
				</Card>
				<Card>
					<h1 className='font-bold text-xl flex items-start w-full mb-4'>
						Output
					</h1>
					<div className='flex flex-col gap-4'>
						{generatedText.map((text) => (
							<Card
								key={text}
								className='bg-[#f2f2f2] dark:bg-[#1f1d26]'
							>
								<div
									className='product-des'
									dangerouslySetInnerHTML={{ __html: text }}
								></div>
							</Card>
						))}
					</div>
				</Card>
			</CardContainer>
		</div>
	);
};

export default BlogPage;
