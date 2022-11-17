import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { getSkill } from '../skills/[id]';
import { formatOutput, isSkill, resolve, sanitizeVariables } from './service';

export async function generateText(
	skillId: string,
	inputs: Record<string, unknown>,
	openAiKey: string
) {
	const quantity = 2;

	const configuration = new Configuration({
		organization: 'org-XI3OPbuger4EFyUWmhRfwzeo',
		apiKey: openAiKey
	});
	const openai = new OpenAIApi(configuration);

	const skill = await getSkill(skillId);
	if (!skill) {
		return null;
	}

	const sanitizedVariables = sanitizeVariables(skill, inputs);
	const completions: string[] = [];

	if (isSkill(skill)) {
		const text = resolve(skill.model, sanitizedVariables);
		const engine = skill.openai.engine ?? 'text-davinci-002';
		const openaiOptions = { ...skill.openai };

		delete openaiOptions.engine;

		try {
			const openAiResp = await query(
				{
					model: engine,
					prompt: text,
					n: quantity,
					...openaiOptions
				},
				openAiKey
			);

			/*openai.createCompletion(
				{
					model: engine,
					prompt: text,
					n: quantity,
					...openaiOptions
				},
				{
					timeout: 20000
				}
			);*/

			if (openAiResp.data.choices) {
				let i = 0;
				await Promise.all(
					openAiResp.data.choices.map((choice: any) => {
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
			throw new Error(error.message);
		}
	} else {
		throw new Error('Skill not found or not supported');
	}

	return completions;
}

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const id = request.body.skillId;
	const inputs = request.body.inputs;
	const openAiKey = request.body.openAiKey;

	const jsonData = await generateText(
		id as string,
		inputs as Record<string, unknown>,
		openAiKey
	);

	if (jsonData) {
		response.status(200).json(jsonData);
	} else {
		response.status(404).json({ message: 'Skill not found' });
	}
}

const DEFAULT_PARAMS = {
	model: 'text-davinci-002',
	temperature: 0.7,
	max_tokens: 256,
	top_p: 1,
	frequency_penalty: 0,
	presence_penalty: 0
};

export async function query(params = {}, openAiKey: string) {
	const params_ = { ...DEFAULT_PARAMS, ...params };
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + String(openAiKey)
		},
		body: JSON.stringify(params_)
	};
	const response = await fetch(
		'https://api.openai.com/v1/completions',
		requestOptions
	);
	const data = await response.json();
	return data.choices[0].text;
}
