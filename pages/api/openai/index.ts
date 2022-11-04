import { NextApiRequest, NextApiResponse } from 'next';
import { Skill } from 'skills';
import {
	formatOutput,
	isSkill,
	openai,
	resolve,
	sanitizeVariables
} from './service';

export default async function generateText(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const quantity = 2;
	const skillId = request.body.skillId;
	const inputs = request.body.inputs;

	const res = await fetch(`http://localhost:3000/api/skills/${skillId}`);
	const skill: Skill = await res.json();

	const sanitizedVariables = sanitizeVariables(skill, inputs);
	const completions: string[] = [];

	if (isSkill(skill)) {
		const text = resolve(skill.model, sanitizedVariables);
		const engine = skill.openai.engine ?? 'text-davinci-002';
		const openaiOptions = { ...skill.openai };

		delete openaiOptions.engine;

		try {
			const response = await openai.createCompletion(
				{
					model: engine,
					prompt: text,
					n: quantity,
					...openaiOptions
				},
				{
					timeout: 20000
				}
			);

			if (response.data.choices) {
				let i = 0;
				await Promise.all(
					response.data.choices.map((choice) => {
						if (choice.text) {
							const formattedText = formatOutput(skill, choice.text);
							completions[i] = formattedText;
							i++;
						}
					})
				);
			}
		} catch (error: any) {
			if (error.response) {
				console.error(error.response.status);
				console.error(error.response.data);
			} else {
				console.error(error.message);
			}
		}
	} else {
		throw new Error('Skill not found or not supported');
	}

	response.json(completions);
	return completions;
}
