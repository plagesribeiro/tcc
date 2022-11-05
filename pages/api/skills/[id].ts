import { NextApiRequest, NextApiResponse } from 'next';
import skills from 'skills';

// pages/api/user
export async function getSkill(skillId: string) {
	const filteredSkills = skills.filter((skill) => skill.id === skillId);

	if (filteredSkills.length > 1) {
		throw 'More than one skill with the same id';
	} else if (filteredSkills.length === 0) {
		return null;
	} else {
		return filteredSkills[0];
	}
}

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const { id } = request.query;
	const jsonData = await getSkill(id as string);

	if (jsonData) {
		response.status(200).json(jsonData);
	} else {
		response.status(404).json({ message: 'Skill not found' });
	}
}
