import React, { useEffect, useState } from "react";

export default function TestText() {
    const [listText, setListText] = useState<string[]>([]);    

    useEffect(() => {
        const text:string[] = [
            "A Revolução da Inteligência Artificial: Transformando o Presente e Moldando o Futuro  A Inteligência Artificial (IA) é, sem dúvida, uma das tecnologias mais revolucionárias do século XXI. Ela está redefinindo a maneira como vivemos, trabalhamos e interagimos com o mundo ao nosso redor. Desde assistentes virtuais que respondem às nossas perguntas até sistemas complexos que diagnosticam doenças com precisão impressionante, a IA está se tornando uma força onipresente em quase todos os setores da sociedade.  O que é Inteligência Artificial? Em termos simples, a IA refere-se à capacidade de máquinas e sistemas de realizar tarefas que, tradicionalmente, exigiriam inteligência humana. Isso inclui atividades como aprender, raciocinar, perceber, tomar decisões e até mesmo entender linguagem natural. A IA pode ser dividida em duas categorias principais:  IA Estreita (ou Fraca): Projetada para realizar tarefas específicas, como reconhecimento de voz ou recomendação de produtos.  IA Geral (ou Forte): Um conceito ainda em desenvolvimento, que visa replicar a inteligência humana em sua totalidade, capaz de realizar qualquer tarefa intelectual que um ser humano possa fazer.  Aplicações da IA no Mundo Real A IA já está presente em diversas áreas, trazendo benefícios significativos:  Saúde: Sistemas de IA ajudam médicos a diagnosticar doenças com maior precisão, analisando imagens médicas, como radiografias e ressonâncias magnéticas. Além disso, algoritmos de IA são usados para prever surtos de doenças e otimizar tratamentos personalizados.  Transporte: Carros autônomos, guiados por IA, prometem revolucionar a mobilidade, reduzindo acidentes e congestionamentos. A IA também é usada para otimizar rotas de entrega e gerenciar sistemas de tráfego em tempo real.  Educação: Plataformas de aprendizado adaptativo utilizam IA para personalizar o ensino, ajustando o conteúdo de acordo com o ritmo e as necessidades de cada aluno.  Negócios: Empresas usam IA para analisar grandes volumes de dados, prever tendências de mercado e automatizar processos, aumentando a eficiência e reduzindo custos.  Entretenimento: Serviços de streaming, como Netflix e Spotify, utilizam algoritmos de IA para recomendar filmes, séries e músicas com base nas preferências dos usuários.  Desafios e Preocupações Apesar de seus benefícios, a IA também levanta questões importantes que precisam ser abordadas:  Ética e Privacidade: O uso de IA em vigilância e coleta de dados pode representar riscos à privacidade e à liberdade individual.  Viés e Discriminação: Algoritmos de IA podem perpetuar vieses presentes nos dados usados para treiná-los, resultando em decisões injustas ou discriminatórias.  Impacto no Emprego: A automação de tarefas pode levar à substituição de trabalhadores em certas áreas, exigindo a requalificação da força de trabalho.  Segurança: Sistemas de IA maliciosos ou mal utilizados podem representar ameaças à segurança cibernética e até mesmo à estabilidade global.  O Futuro da IA O futuro da IA é repleto de possibilidades. Avanços em áreas como aprendizado profundo (deep learning) e redes neurais estão tornando os sistemas de IA cada vez mais poderosos e versáteis. A integração da IA com outras tecnologias, como a Internet das Coisas (IoT) e a computação quântica, promete abrir novos horizontes, desde cidades inteligentes até descobertas científicas revolucionárias.  No entanto, para que a IA alcance seu potencial máximo, é essencial que seu desenvolvimento seja guiado por princípios éticos e responsáveis. A colaboração entre governos, empresas, pesquisadores e a sociedade civil será fundamental para garantir que a IA beneficie a todos, sem deixar ninguém para trás.  Conclusão A Inteligência Artificial não é apenas uma ferramenta tecnológica; é uma força transformadora que está moldando o futuro da humanidade. Se usada com sabedoria, a IA tem o potencial de resolver alguns dos maiores desafios do nosso tempo, desde a cura de doenças até a mitigação das mudanças climáticas. No entanto, também exige que enfrentemos questões complexas e trabalhemos juntos para garantir que seu impacto seja positivo e equitativo.  A jornada da IA está apenas começando, e o que vem pela frente dependerá das escolhas que fizermos hoje. Que possamos abraçar essa tecnologia com curiosidade, responsabilidade ",
            "Explorando Novos Horizontes  Em um mundo cada vez mais conectado, a busca por conhecimento e experiências novas tornou-se uma parte essencial da vida moderna. A tecnologia avança a passos largos, abrindo portas para possibilidades que antes pareciam distantes. Hoje, podemos explorar culturas diferentes, aprender novas habilidades e nos comunicar com pessoas do outro lado do globo em questão de segundos.  No entanto, com tantas oportunidades, também surgem desafios. A necessidade de filtrar informações, manter o foco e equilibrar o tempo entre o virtual e o real é constante. A chave está em aproveitar as ferramentas que temos de forma consciente, sempre buscando crescimento pessoal e profissional.  Que este texto sirva como um lembrete de que, independentemente dos caminhos que escolhermos, o importante é seguir com curiosidade, resiliência e a mente aberta para o que o futuro reserva.",
            "c",
            "d"
        ]

        setListText(text);
    }, []);

    return (
        <div className="absolute max-w-lvw max-h-lvh flex justify-center p-10 bg-green-950/40 overflow-auto">
            <ul className="flex flex-col gap-6 max-h-full">
                {listText.map((m, i) => (
                    <li className="bg-white p-3 rounded">
                        <div>
                            <p>{m}</p>
                            <p>- {i}</p>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
}