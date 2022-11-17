import { Button } from '@components/Button';
import Card from '@components/Card';
import CardContainer from '@components/CardContainer';
import { NextPage } from 'next';
import { generateText } from 'pages/api/openai';
import { getSkill } from 'pages/api/skills/[id]';
import React from 'react';
import type { Skill } from 'skills';

type SkillPageProps = {
	skill: Skill;
	openAiKey: string;
};

export async function getServerSideProps(context: { params: { id: string } }) {
	const skill = await getSkill(context.params.id);
	const openAiKey = process.env.OPENAI_API_KEY;
	return { props: { skill, openAiKey } };
}

const { useState } = React;

const BlogPage: NextPage<SkillPageProps> = (props) => {
	const { skill, openAiKey } = props;
	const [isLoading, setIsLoading] = useState(false);
	const [generatedText, setGeneratedText] = useState<string[]>([]);

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
		const generatedText = await generateText(
			skill.id,
			{
				...inputs
			},
			openAiKey
		);
		if (!generatedText) return;

		setGeneratedText(generatedText);
		setIsLoading(false);
	};

	return (
		<div className='flex flex-col w-full items-center'>
			<div className='max-w-[80rem]'>
				<h1 className='font-bold text-xl flex items-start max-w-full'>
					{skill.name}
				</h1>
				<h1 className='text-sm flex items-start w-full mb-6'>
					{skill.description}
				</h1>
			</div>

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
								bgColor='bg-background-light dark:bg-background-dark'
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
