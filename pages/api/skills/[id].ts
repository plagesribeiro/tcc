import { NextApiRequest, NextApiResponse } from 'next';
import skills from 'skills';

export default async function getSkill(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const { id } = request.query;
	const filteredSkills = skills.filter((skill) => skill.id === id);

	if (filteredSkills.length > 1) {
		throw 'More than one skill with the same id';
	} else if (filteredSkills.length === 0) {
		response.status(404).json({ message: 'Skill not found' });
	} else {
		response.json(filteredSkills[0]);
	}
}
