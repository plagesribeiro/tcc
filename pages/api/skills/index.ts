import { NextApiRequest, NextApiResponse } from 'next';
import skills from 'skills';
import type { ShortenedSkill } from 'skills';

export async function getSkills() {
	const shortenedSkills: ShortenedSkill[] = skills.map((skill) => {
		const shortenedSkill = {
			id: skill.id,
			name: skill.name,
			description: skill.description
		};
		return shortenedSkill;
	});

	return shortenedSkills;
}

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const jsonData = await getSkills();
	response.status(200).json(jsonData);
}
