import type { Skill } from 'skills';

const aidaExplanation: Skill = {
	id: 'aida-explanation',
	name: 'AIDA com título - Explicação',
	description: `O Framework AIDA com título cria um texto contendo os tópicos: Título, Atenção, Interesse, Desejo e Ação. 
	Esse framework é treinado através de explicações de como a GPT-3 deve gerar um texto nesse formato.
	Para utilizar essa ferramenta, basta inserir o nome do produto e a descrição do produto que deseja anúnciar.
	Não esqueça de deixar a descrição bem clara e use como inspiração os exemplos de textos que estão nos inputs.
	Depois basta clicar em "Gerar Texto" e aguardar o resultado. Pronto! Você já tem um texto que converte mais para anunciar seu produto ou serviço no seu site, instagram, vídeo ou em algum marketplace.`,
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
			example: `Com a Escreve AI ferramenta de inteligência artificial você vai conseguir escrever textos persuasivos mesmo que você não saiba nada sobre comunicação persuasiva e copywriting. Apenas colocando o nome do seu negócio e fornecendo uma breve explicação sobre ele é possível gerar textos baseados em heurísticas de copywriting que aumentem suas vendas. Os textos gerados podem ser usados em emails, legenda de Instagram, post no Twitter e etc...`,
			maxLength: 350
		}
	],
	model: `
	A estrutura do texto deve seguir o seguinte formato:

	Título: Escrever um título chamativo que demostre urgência (crie a sensação que o leitor precisa do seu produto com urgência, seja através de uma promoção relâmpago ou algum prêmio caso ele compre agora), originalidade (mostrar que seu produto é único e diferente dos outros), utilidade (mostrar que seu produto é útil para resolver o problema específico do leitor).
	
	Atenção: Aqui você deve chamar a atenção do leitor, isso pode ser feito por meio de temas polêmicos, novidades e provocações com a "dor" da audiência. Nessa etapa, é importante que a frase seja impactante e demonstre uma "dor" no público alvo, para que assim ele se identifique e interaja com o conteúdo em questão.
	
	Interesse: Aqui o foco será causar interesse no leitor. Para isso, o ideal é falar da proposta de valor detalhada do seu produto ou serviço, mas não é a hora de vendê-lo ainda.
	
	Desejo: Aqui é o momento de provocar o desejo, e é aqui que você começa a vender seu produto ou serviço. Para isso, podem ser usados textos mais longos e completos, pois a ideia é justificar o motivo pelo qual o seu produto é a solução para a dor do seu cliente. Além disso, é importe que a frase demonstre que a sua empresa é capaz de suprir as necessidades do potencial cliente.
	
	Ação: Aqui é preciso chamar uma ação, isto é, indicar para o leitor onde ele deve clicar, ligar ou acessar para visualizar a sua oferta, de forma que facilite a tomada de decisão dele. E, para que essa mensagem persuasiva não gere dúvidas em quem está lendo o conteúdo sobre como agir, a frase deve ser o mais breve e clara possível.

	"""
	Nome do produto: {{product-name}}
	Descrição do produto: {{product-description}}
	"""
	Exemplo de texto sobre o produto acima no formato explicado acima em português do Brasil:	
    `,
	keywords: ['Título', 'Atenção:', 'Interesse:', 'Desejo:', 'Ação:'],
	openai: {
		max_tokens: 350,
		temperature: 0.7,
		engine: 'text-davinci-002'
	}
};

export default aidaExplanation;
