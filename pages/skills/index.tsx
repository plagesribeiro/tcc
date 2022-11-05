import { Button } from '@components/Button';
import Card from '@components/Card';
import CardContainer from '@components/CardContainer';
import { NextPage } from 'next';
import Link from 'next/link';
import type { ShortenedSkill } from 'skills';
import { getSkills } from 'pages/api/skills';

type SkillsPageProps = {
	shortenedSkills: ShortenedSkill[];
};

export async function getServerSideProps(context: { params: SkillsPageProps }) {
	const shortenedSkills = await getSkills();
	return { props: { shortenedSkills } };
}

const SkillsPage: NextPage<SkillsPageProps> = (props) => {
	const skills = props.shortenedSkills;

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
