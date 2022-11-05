import { Input, Skill } from 'skills';

export const isSkill = (skill: Skill): boolean => skill.openai !== undefined;

export const resolve = (
	model: string,
	variables: Record<string, any>
): string => {
	const variablesIds = Object.keys(variables);
	const variablesValues = Object.values(variables);

	// change in model the variables ids to the variables values
	variablesIds.forEach((id, index) => {
		model = model.replace(
			new RegExp(`{{${id}}}`, 'g'),
			variablesValues[index]
		);
	});

	return model;
};

export const sanitizeVariables = (
	skill: Skill,
	userVariables: Record<string, unknown>
): Record<string, unknown> => {
	const sanitizedVariables: any = {};

	skill.inputs.forEach((input) => {
		const variable = userVariables?.[input.id];

		if (variable === undefined) {
			throw new Error(`Missing template variable '${input.id}'`);
		}

		const error = validate(input, variable);
		if (error) {
			throw new Error(error);
		}
		const inputId = input.id;
		sanitizedVariables[inputId] = sanitize(input, variable);
	});

	return sanitizedVariables;
};

const validate = (input: Input, value: unknown): string | false => {
	if (
		typeof value === 'string' &&
		input.maxLength &&
		(value as string).length > input.maxLength
	) {
		return `Text size for '${input.id}' oversized max length`;
	}

	return false;
};

const sanitize = (input: Input, value: unknown): unknown => {
	if (input) {
		value = (value as string).replace(/"""/g, '').replace(/###/g, '');
	}

	return value;
};

export const formatOutput = (skill: Skill, output: string): string => {
	if (skill.keywords) {
		let isFirstKeyword = true;
		skill.keywords.forEach((keyword) => {
			if (!output.includes(`\n${keyword}`) && !isFirstKeyword) {
				output = output.replace(new RegExp(`(${keyword})`), '<br>$1');
			}

			if (isFirstKeyword) {
				isFirstKeyword = false;
			}

			output = output.replace(new RegExp(`(${keyword})`), '<b>$1</b>');
		});
	}

	const resp = output
		.replace(/\n+\s*/g, '\n')
		.replace(/ +/g, ' ')
		.trim();

	return resp;
};
