/* =========================================================
   DADOS DO SITE — edite aqui sem mexer no resto do código
   ========================================================= */

window.CASA = {
  /* ---------- INSCRIÇÕES ----------
     abertas: true  → os botões levam para o Formulário do Google de cada unidade
     abertas: false → o site mostra "Inscrições encerradas"
     Cole o link do formulário de cada unidade em `links`.            */
  inscricoes: {
    abertas: false,
    links: {
      'beira-linha': '', // ex.: 'https://forms.gle/xxxxxxxx'
      'sao-pedro': ''
    }
  },

  contato: {
    whatsapp: '5521966907209',
    instagram: 'https://www.instagram.com/casadainovacaoteresopolis/',
    instagramUser: '@casadainovacaoteresopolis',
    facebook: 'https://www.facebook.com/casadainovacaoteresopolis/'
  },

  unidades: {
    'beira-linha': {
      nome: 'Beira Linha',
      selo: 'Unidade sede',
      endereco: 'Rua Beira Linha, 329',
      cidade: 'Teresópolis · RJ',
      maps: 'https://www.google.com/maps/search/?api=1&query=Rua+Beira+Linha+329+Teresopolis+RJ',
      embed: 'https://www.google.com/maps?q=Rua+Beira+Linha,+329,+Teres%C3%B3polis+-+RJ&output=embed',
      telefone: '(21) 96690-7209',
      tel: '+5521966907209',
      email: 'casadainovacaoteresopolis@gmail.com'
    },
    'sao-pedro': {
      nome: 'São Pedro',
      selo: 'Nova unidade',
      endereco: 'Rua São Pedro, nº 191, Loja 01',
      cidade: 'São Pedro, Teresópolis · RJ',
      maps: 'https://www.google.com/maps/search/?api=1&query=Rua+S%C3%A3o+Pedro+191+Loja+01+S%C3%A3o+Pedro+Teres%C3%B3polis+RJ',
      embed: 'https://www.google.com/maps?q=Rua+S%C3%A3o+Pedro,+191,+Teres%C3%B3polis+-+RJ&output=embed',
      telefone: '(21) 2040-1220',
      tel: '+552120401220',
      email: 'casadainovacaosaopedro@gmail.com'
    }
  },

  /* ---------- CURSOS POR UNIDADE ----------
     idades: 'kids' (8–11), 'teens' (12–17), 'adultos' (18–59), '60' (60+)
     icone:  robo | games | apps | ingles | pc | sessenta
     horarios: [dias, horário, turma (opcional)]                         */
  cursos: {
    'beira-linha': [
      {
        id: 'ingles', icone: 'ingles', area: 'Idiomas',
        nome: 'Introdução à Língua Inglesa',
        publico: 'Kids · 8–11 anos', idades: ['kids'],
        resumo: 'Um primeiro contato com a língua inglesa de forma leve, prática e conectada ao dia a dia.',
        aprende: 'Vocabulário, conversação, compreensão e confiança para se comunicar.',
        horarios: [['Seg. / Qua.', '09h–10h'], ['Ter. / Qui.', '14h–15h']]
      },
      {
        id: 'apps', icone: 'apps', area: 'Tecnologia',
        nome: 'Criação de Aplicativos',
        publico: 'A partir de 15 anos', idades: ['teens', 'adultos'],
        resumo: 'Transforme uma ideia em um projeto digital, criando tanto sites quanto aplicativos.',
        aprende: 'Ideação, prototipação, lógica de programação, criação de interfaces, sites e aplicativos.',
        horarios: [['Seg. / Qua.', '10h–11h'], ['Ter. / Qui.', '15h–16h']]
      },
      {
        id: 'robotica', icone: 'robo', area: 'Tecnologia',
        nome: 'Robótica',
        publico: 'Kids · 8–11 anos · Teens · 12–17 anos', idades: ['kids', 'teens'],
        resumo: 'Aprendizado mão na massa para explorar tecnologia, criatividade e resolução de problemas.',
        aprende: 'Eletrônica básica, lógica, programação e construção de projetos com movimento.',
        horarios: [['Seg. / Qua.', '14h–15h'], ['Ter. / Qui.', '10h–11h']]
      },
      {
        id: 'games', icone: 'games', area: 'Tecnologia',
        nome: 'Desenvolvimento de Games',
        publico: 'Kids · 8–11 anos · Teens · 12–17 anos', idades: ['kids', 'teens'],
        resumo: 'Um espaço para imaginar, criar e programar jogos do zero usando o Clickteam Fusion.',
        aprende: 'Roteiro, lógica, programação, design de fases e criação de jogos com o Clickteam Fusion.',
        horarios: [['Seg. / Qua.', '15h–16h'], ['Seg. / Qua.', '16h–17h'], ['Ter. / Qui.', '09h–10h']]
      },
      {
        id: 'informatica18', icone: 'pc', area: 'Tecnologia',
        nome: 'Introdução à Informática',
        publico: 'Adultos · 18–59 anos · Teens · 12–17 anos', idades: ['adultos', 'teens'],
        resumo: 'Aprenda a usar as principais ferramentas digitais para estudar, trabalhar e organizar sua rotina.',
        aprende: 'Word, PowerPoint, Excel, criação e organização de pastas e arquivos.',
        horarios: [
          ['Seg. / Qua.', '17h–18h', 'Adultos'], ['Ter. / Qui.', '17h–18h', 'Adultos'],
          ['Seg. / Qua.', '11h–12h', 'Teens'], ['Ter. / Qui.', '16h–17h', 'Teens']
        ]
      },
      {
        id: 'informatica60', icone: 'sessenta', area: 'Tecnologia',
        nome: 'Inclusão Digital 60+',
        publico: '60 anos ou mais', idades: ['60'],
        resumo: 'Mais autonomia para explorar o mundo digital.',
        aprende: 'Mais autonomia para explorar o mundo digital.',
        horarios: [['Ter. / Qui.', '11h–12h']]
      }
    ],
    'sao-pedro': [
      {
        id: 'informatica60', icone: 'sessenta', area: 'Tecnologia',
        nome: 'Inclusão Digital 60+',
        publico: 'Melhor idade · 60+ anos', idades: ['60'],
        resumo: 'Tecnologia, criatividade e autonomia digital para a melhor idade.',
        aprende: 'Tecnologia, criatividade e autonomia digital para a melhor idade.',
        horarios: [['Seg. / Qua.', '08h–09h'], ['Ter. / Qui.', '08h–09h']]
      },
      {
        id: 'games', icone: 'games', area: 'Tecnologia',
        nome: 'Desenvolvimento de Games',
        publico: 'Kids · 8–11 anos · Teens · 12–17 anos', idades: ['kids', 'teens'],
        resumo: 'Um espaço para imaginar, criar e programar jogos do zero.',
        aprende: 'Roteiro, lógica, programação, design de fases e criação de jogos.',
        horarios: [
          ['Seg. / Qua.', '09–10h / 10–11h', 'Kids / Teens A'], ['Seg. / Qua.', '13–14h / 14–15h', 'Kids / Teens C'],
          ['Ter. / Qui.', '09–10h / 10–11h', 'Kids / Teens B'], ['Ter. / Qui.', '15–16h / 16–17h', 'Kids / Teens D']
        ]
      },
      {
        id: 'ingles', icone: 'ingles', area: 'Idiomas',
        nome: 'Inglês',
        publico: 'A partir de 15 anos', idades: ['teens', 'adultos'],
        resumo: 'Prática de inglês para ampliar possibilidades de estudo, trabalho e comunicação.',
        aprende: 'Vocabulário, conversação, compreensão e confiança para se comunicar.',
        horarios: [['Ter. / Qui.', '11h–12h', 'Inglês Teens A'], ['Ter. / Qui.', '13h–14h', 'Inglês Teens B']]
      }
    ]
  }
};
