import { NextApiRequest, NextApiResponse } from 'next';
import skills from 'skills';
import type { ShortenedSkill } from 'skills';

export default async function getSkills(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const shortenedSkills: ShortenedSkill[] = skills.map((skill) => {
		const shortenedSkill = {
			id: skill.id,
			name: skill.name,
			description: skill.description
		};
		return shortenedSkill;
	});

	response.json(shortenedSkills);
}
