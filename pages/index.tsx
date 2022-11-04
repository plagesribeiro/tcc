import { Button } from '@components/Button';
import Card from '@components/Card';
import CardContainer from '@components/CardContainer';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
	return (
		<div className='flex flex-col gap-4'>
			<CardContainer>
				<Card title='O que é isso?'>
					Esse é um projeto de TCC de Ciência da Computação desenvolvido
					pelo aluno Pedro Lages Ribeiro e o professor Humberto Torres
					Marques na PUC Minas sobre o uso da GPT-3, inteligência
					artificial da Open-AI, para a criação de um produto que auxilie a
					escrita de marketing para negócios de todos os nichos e tamanhos.
					Aqui foram desenvolvidas 3 ferramentas de escrita: duas delas
					baseadas em frameworks de copywriting e uma de geração de
					resposta para email.
				</Card>

				<Card title='O que é copywriting?'>
					Diferentemente de copyright, copywriting ́e um texto persuasivo
					com o objetivo de induzir o leitor a uma ação, geralmente uma
					compra. Os empreendedores e profissionais de marketing estão
					sempre em busca de novas maneiras de impactar seu público-alvo e
					aumentar as conversões. A criação de um bom produto ou serviço ́e
					o primeiro passo, mas, para ter sucesso, também é preciso saber
					como anunciá-lo e vender. Isso é onde entra o copywriting. O
					copywriting ́e uma das principais ferramentas de marketing e,
					portanto, um dos pilares do sucesso de qualquer negócio. No
					entanto, criar um bom texto persuasivo pode ser um desafio,
					especialmente quando se está começando. É aí que entra a GPT-3.
					Iremos discutir a melhor forma de ensinar a inteligência
					artificial para que ela crie textos profissionais no formato que
					queremos para as necessidades específicas de cada cliente.
				</Card>
				<Card title='E a GPT-3?'>
					A plataforma GPT-3 é baseada em uma arquitetura de rede neural
					profunda e é otimizada para processar grandes volumes de dados,
					além disso, ela foi treinada com bilhões de exemplos de conteúdo,
					compondo uma ferramenta capaz de analisar uma entrada de texto e
					identificar as melhores maneiras de criar algo novo e adequado ao
					conteúdo sem necessidade de um treinamento intenso. Iremos
					fornecer apenas um direcionamento técnico específico para alguns
					determinados casos de uso, com o objetivo de tornar a GPT-3 uma
					ferramenta poderosa que consiga ajudar os empreendedores a
					economizar tempo e esforço, com escrita automática de textos
					úteis, permitindo que eles se concentrem mais em outras áreas de
					seu negócio.
				</Card>
			</CardContainer>

			<div className='w-full flex items-center justify-center'>
				<Link href='/skills'>
					<Button>Ver mais sobre as ferramentas</Button>
				</Link>
			</div>
		</div>
	);
};

export default Home;
