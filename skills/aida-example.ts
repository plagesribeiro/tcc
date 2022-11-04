import type { Skill } from 'skills';

const aidaExample: Skill = {
	id: 'aida-example',
	name: 'AIDA framework - Exemplo',
	description:
		'Crie um framework AIDA (Atenção, Interesse, Desejo e Ação) de copy usando Inteligência Artificial. Esse framework é treinado através da explicação do framework AIDA para a GPT-3.',
	inputs: [
		{
			id: 'product-name',
			name: 'Nome do Produto',
			example: 'Escreve AI',
			maxLength: 50
		},
		{
			id: 'product-description',
			name: 'Descrição do Produto',
			example:
				'Com essa ferramenta de inteligência artificial você vai conseguir escrever textos persuasivos mesmo que você não saiba nada sobre comunicação persuasiva e.',
			maxLength: 350
		}
	],
	model: `
	Nome do produto: Escreve AI
	Descrição do produto: Com essa ferramenta de inteligência artificial você vai conseguir escrever textos persuasivos mesmo que você não saiba nada sobre comunicação persuasiva. Você irá conseguir se tornar um copywriter em tempo recorde e conseguir escrever textos que geram vendas. Com a Escreve AI você escreve muito melhor e muito mais rápido.
	"""
	Exemplo de estrutura de copy do produto:
	Título: Para de sofrer para criar textos que façam você vender online agora mesmo!
	Atenção: Você está procurando uma maneira de escrever textos persuasivos muito mais rápido?
	Interesse: A Escreve AI é uma ferramenta de inteligência artificial que o ajudará a escrever textos persuasivos em tempo recorde. Você será capaz de escrever textos que geram vendas, mesmo que você não tenha nenhum conhecimento sobre o assunto. 
	Desejo: Essa ferramenta lhe permite economizar horas de trabalho e é muito fácil para qualquer um que queira aprender a escrever melhor. Não importa se você não sabe nada sobre comunicação persuasiva, com a Escreve AI tudo se torna mais fácil! 
	Ação: Clique aqui agora mesmo e experimente a melhor ferramenta do mercado hoje!
	"""
	Nome do produto: Templates de e-mail
	Descrição do produto: Os templates de e-mail foram desenvolvidos para servirem como a melhor abordagem possível por correio eletrônico. Basta copiar, colar e personalizar um modelo que atenda sua necessidade e ver suas taxas de conversão crescendo sem nenhum esforço.
	"""
	Exemplo de estrutura de copy do produto:
	Título: Não perca mais tempo para escrever emails bem redigidos mais! 
	Atenção: Gostaria de obter resultados de conversão por e-mail copiando de quem sabe?
	Interesse: Os templates de e-mail foram desenvolvidos para ser fáceis de usar e para atender as necessidades de qualquer pessoa. Os templates foram desenvolvidos a partir de referências do mercado que possuem resultados comprovados. Fora isso, você pode personalizar o template livremente para atender as suas necessidades.
	Desejo: Com esse material, não importa qual o seu segmento, você terá resultados comprovados sem saber nada sobre e-mail marketing e sem gastar tempo ou dinheiro.
	Ação: Clique aqui agora mesmo e tenha acesso a um dos melhores e mais recomendados produtos no mercado hoje!
	"""
	Nome do produto: {{product-name}}
	Descrição do produto: {{product-description}}
	"""
	Exemplo de estrutura de copy do produto:	
    `,
	keywords: ['Título', 'Atenção:', 'Interesse:', 'Desejo:', 'Ação:'],
	openai: {
		max_tokens: 350,
		temperature: 0.7
	}
};

export default aidaExample;
