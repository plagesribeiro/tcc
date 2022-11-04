import { Button } from '@components/Button';
import Card from '@components/Card';
import CardContainer from '@components/CardContainer';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import type { ShortenedSkill } from 'skills';

type SkillsPageProps = {
	skills: ShortenedSkill[];
};

const SkillsPage: NextPage<SkillsPageProps> = (props) => {
	const { skills } = props;

	return (
		<div className='flex flex-col gap-4'>
			<CardContainer>
				{skills.map((skill) => (
					<Card key={skill.name} title={skill.name}>
						<div className='flex flex-col items-center'>
							<div className='mb-4'>{skill.description}</div>
							<Link href={`/skills/${skill.id}`}>
								<a>
									<Button>Ver detalhes</Button>
								</a>
							</Link>
						</div>
					</Card>
				))}
			</CardContainer>
		</div>
	);
};

export default SkillsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const res = await fetch('http://localhost:3000/api/skills');
	const skills: ShortenedSkill[] = await res.json();

	return {
		props: {
			skills
		}
	};
};
