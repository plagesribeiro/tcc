import aidaExample from './aida-example';
import aidaExplanaition from './aida-explanation';

const Skills = [aidaExplanaition, aidaExample];

export default Skills;

export type Input = {
	id: string;
	name: string;
	example: string;
	maxLength: number;
};

export type Skill = {
	id: string;
	name: string;
	description: string;
	inputs: Input[];
	model: string;
	keywords: string[];
	openai: {
		max_tokens: number;
		temperature: number;
		engine?: string;
	};
};

export type ShortenedSkill = {
	id: string;
	name: string;
	description: string;
};
