const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat,
  HeadingLevel, ExternalHyperlink, TabStopType, TabStopPosition,
  UnderlineType, VerticalAlign
} = require('docx');
const fs = require('fs');

const COLORS = {
  accent: "1A56DB",       // azul tech vibrante
  accentLight: "EBF2FF",  // fundo leve azul
  dark: "111827",         // quase preto
  mid: "374151",          // cinza escuro
  muted: "6B7280",        // cinza médio
  border: "D1D5DB",       // borda suave
  white: "FFFFFF",
  sectionBg: "F3F6FF",    // fundo seções leves
};

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function spacer(pts = 60) {
  return new Paragraph({ children: [], spacing: { before: pts, after: 0 } });
}

function sectionDivider(label) {
  return new Paragraph({
    spacing: { before: 200, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: COLORS.accent, space: 4 } },
    children: [
      new TextRun({
        text: label.toUpperCase(),
        bold: true,
        size: 22,
        color: COLORS.accent,
        font: "Arial",
        characterSpacing: 60,
      }),
    ],
  });
}

function bulletItem(text, boldPart) {
  const children = [];
  if (boldPart) {
    children.push(new TextRun({ text: boldPart, bold: true, size: 20, color: COLORS.dark, font: "Arial" }));
    children.push(new TextRun({ text: text, size: 20, color: COLORS.mid, font: "Arial" }));
  } else {
    children.push(new TextRun({ text: text, size: 20, color: COLORS.mid, font: "Arial" }));
  }
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 40, after: 40 },
    children,
  });
}

function jobHeader(title, company, period, location) {
  return [
    new Paragraph({
      spacing: { before: 160, after: 30 },
      children: [
        new TextRun({ text: title, bold: true, size: 22, color: COLORS.dark, font: "Arial" }),
        new TextRun({ text: "   |   " + company, size: 20, color: COLORS.accent, font: "Arial", bold: true }),
      ],
    }),
    new Paragraph({
      spacing: { before: 0, after: 60 },
      children: [
        new TextRun({ text: period, size: 18, color: COLORS.muted, font: "Arial", italics: true }),
        new TextRun({ text: "   •   " + location, size: 18, color: COLORS.muted, font: "Arial", italics: true }),
      ],
    }),
  ];
}

function skillBadgeTable(skills) {
  // Render skills in rows of 3, using a table
  const cols = 3;
  const rows = [];
  for (let i = 0; i < skills.length; i += cols) {
    const cells = [];
    for (let j = 0; j < cols; j++) {
      const skill = skills[i + j];
      cells.push(new TableCell({
        borders: noBorders,
        width: { size: 3120, type: WidthType.DXA },
        margins: { top: 60, bottom: 60, left: 80, right: 80 },
        shading: skill ? { fill: COLORS.accentLight, type: ShadingType.CLEAR } : { fill: COLORS.white, type: ShadingType.CLEAR },
        children: skill
          ? [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: skill, bold: true, size: 18, color: COLORS.accent, font: "Arial" })],
            })]
          : [new Paragraph({ children: [] })],
      }));
    }
    rows.push(new TableRow({ children: cells }));
  }
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [3120, 3120, 3120],
    rows,
  });
}

function twoColRow(leftText, rightText) {
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    spacing: { before: 40, after: 40 },
    children: [
      new TextRun({ text: leftText, size: 20, color: COLORS.mid, font: "Arial" }),
      new TextRun({ text: "\t" + rightText, size: 20, color: COLORS.muted, font: "Arial", italics: true }),
    ],
  });
}

function certItem(name, issuer) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 40, after: 40 },
    children: [
      new TextRun({ text: name, bold: true, size: 20, color: COLORS.dark, font: "Arial" }),
      new TextRun({ text: " — " + issuer, size: 20, color: COLORS.muted, font: "Arial" }),
    ],
  });
}

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "–",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 440, hanging: 280 } } },
        }],
      },
    ],
  },
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22, color: COLORS.mid } },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 900, right: 1080, bottom: 900, left: 1080 },
      },
    },
    children: [

      // ── HEADER ──────────────────────────────────────────────
      new Paragraph({
        spacing: { before: 0, after: 0 },
        children: [
          new TextRun({
            text: "Bruno Rafael Araújo de Brito",
            bold: true,
            size: 56,
            color: COLORS.dark,
            font: "Arial",
          }),
        ],
      }),

      new Paragraph({
        spacing: { before: 40, after: 20 },
        children: [
          new TextRun({
            text: "Desenvolvedor em Formação  |  Full Stack (Front-end & Back-end)  |  Cibersegurança",
            size: 22,
            color: COLORS.accent,
            font: "Arial",
            bold: true,
          }),
        ],
      }),

      new Paragraph({
        spacing: { before: 0, after: 100 },
        children: [
          new TextRun({ text: "Recife – PE   ", size: 19, color: COLORS.muted, font: "Arial" }),
          new TextRun({ text: "(81) 98528-4225   ", size: 19, color: COLORS.muted, font: "Arial" }),
          new TextRun({ text: "brunorafael825@gmail.com   ", size: 19, color: COLORS.muted, font: "Arial" }),
          new ExternalHyperlink({
            link: "https://linkedin.com/in/bruno825",
            children: [new TextRun({
              text: "linkedin.com/in/bruno825",
              size: 19, color: COLORS.accent, font: "Arial",
              underline: { type: UnderlineType.SINGLE, color: COLORS.accent },
            })],
          }),
        ],
      }),

      // linha divisória no topo
      new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: COLORS.accent, space: 1 } },
        children: [],
      }),

      spacer(100),

      // ── SOBRE / OBJETIVO ────────────────────────────────────
      sectionDivider("Objetivo Profissional"),

      new Paragraph({
        spacing: { before: 100, after: 80 },
        children: [
          new TextRun({
            text: "Profissional de tecnologia com mais de 9 anos de atuação em hardware, eletrônica industrial, suporte técnico e formação de talentos, em transição sólida para desenvolvimento de software. Estou aprofundando conhecimentos em ",
            size: 20, color: COLORS.mid, font: "Arial",
          }),
          new TextRun({ text: "JavaScript, Python, React e Node.js", bold: true, size: 20, color: COLORS.dark, font: "Arial" }),
          new TextRun({
            text: ", com foco em aplicações web Full Stack. Minha bagagem técnica em sistemas operacionais, redes, segurança da informação e resolução de problemas complexos me dá uma base que a maioria dos desenvolvedores júnior não tem — e é exatamente isso que ofereço: ",
            size: 20, color: COLORS.mid, font: "Arial",
          }),
          new TextRun({
            text: "visão de infraestrutura aliada ao código.",
            bold: true, size: 20, color: COLORS.dark, font: "Arial",
          }),
        ],
      }),

      // ── HABILIDADES TÉCNICAS ─────────────────────────────────
      sectionDivider("Stack Técnico & Habilidades"),

      spacer(80),
      new Paragraph({
        spacing: { before: 0, after: 60 },
        children: [new TextRun({ text: "Desenvolvimento (em formação ativa)", bold: true, size: 20, color: COLORS.dark, font: "Arial" })],
      }),
      skillBadgeTable([
        "JavaScript (ES6+)", "Python", "HTML5 & CSS3",
        "React.js", "Node.js", "REST APIs",
        "Git & GitHub", "SQL (básico)", "Linux / Bash",
      ]),
      spacer(80),
      new Paragraph({
        spacing: { before: 0, after: 60 },
        children: [new TextRun({ text: "Infraestrutura & Segurança (avançado)", bold: true, size: 20, color: COLORS.dark, font: "Arial" })],
      }),
      skillBadgeTable([
        "Cibersegurança", "Redes de Computadores", "Sistemas Operacionais",
        "Manutenção de Hardware", "Fibra Óptica", "Engenharia Reversa",
        "Suporte Técnico", "ITIL (fundamentos)", "Scrum / Agile",
      ]),

      // ── PROJETOS ─────────────────────────────────────────────
      sectionDivider("Projetos & Portfólio"),

      new Paragraph({
        spacing: { before: 100, after: 30 },
        children: [
          new TextRun({ text: "Portfólio em construção", bold: true, size: 22, color: COLORS.dark, font: "Arial" }),
        ],
      }),
      new Paragraph({
        spacing: { before: 0, after: 60 },
        children: [new TextRun({ text: "GitHub • Em desenvolvimento", size: 18, color: COLORS.muted, font: "Arial", italics: true })],
      }),
      bulletItem("Desenvolvendo aplicações práticas com JavaScript e Python para consolidar aprendizado nos cursos em andamento"),
      bulletItem("Projetos de front-end com HTML, CSS e React; back-end com Node.js e consumo de APIs REST"),
      bulletItem("Aplicando conceitos de segurança no desenvolvimento: autenticação, validação de dados e boas práticas OWASP"),

      new Paragraph({
        spacing: { before: 140, after: 30 },
        children: [
          new TextRun({ text: "Painel de Diagnóstico Eletrônico (projeto pessoal)", bold: true, size: 22, color: COLORS.dark, font: "Arial" }),
        ],
      }),
      new Paragraph({
        spacing: { before: 0, after: 60 },
        children: [new TextRun({ text: "Python + Interface Gráfica  •  2025", size: 18, color: COLORS.muted, font: "Arial", italics: true })],
      }),
      bulletItem("Ferramenta em Python para organização e consulta de procedimentos técnicos de reparo eletrônico, aplicando lógica de programação e manipulação de dados em contexto real de trabalho"),

      // ── EXPERIÊNCIA ──────────────────────────────────────────
      sectionDivider("Experiência Profissional"),

      ...jobHeader(
        "Instrutor de Tecnologia",
        "Carreta Digital – RBCIP / Ministério das Comunicações",
        "Fev/2026 – Atual",
        "Pernambuco, Brasil"
      ),
      bulletItem("Ministro aulas práticas de programação, robótica e hardware para jovens em vulnerabilidade social — desenvolvendo didática técnica aplicável ao onboarding de times de desenvolvimento"),
      bulletItem("Aplico metodologias ativas que aceleram a absorção de conceitos complexos, habilidade diretamente transferível para documentação técnica e pair programming"),
      bulletItem("Facilito reuniões de equipe para melhoria contínua de processos — experiência em ambiente ágil colaborativo"),

      ...jobHeader(
        "Instrutor em Manutenção de Smartphone",
        "Grau Profissionalizante",
        "Mar/2019 – Jan/2026",
        "Recife – PE (múltiplas unidades)"
      ),
      bulletItem("Formei centenas de profissionais técnicos em hardware e software ao longo de 7 anos, com material didático próprio"),
      bulletItem("Experiência sólida em comunicação técnica e tradução de conceitos complexos para diferentes perfis — habilidade essencial para equipes de desenvolvimento com stakeholders variados"),

      ...jobHeader(
        "Técnico em Eletrônica Industrial",
        "Nordeste Inversores",
        "Ago/2023 – Dez/2025",
        "Cabo de Santo Agostinho – PE"
      ),
      bulletItem("Diagnóstico e reparo de sistemas industriais complexos (inversores de frequência, soft-starters, IHMs) — raciocínio lógico estruturado e resolução de problemas sob pressão"),
      bulletItem("Engenharia reversa e reprogramação de dispositivos — lógica análoga ao debugging e refactoring de código"),
      bulletItem("Manutenção preventiva e documentação de procedimentos técnicos — base para escrita de testes e documentação de software"),

      ...jobHeader(
        "Técnico em Eletrônica e Informática",
        "Assistência Autorizada Samsung",
        "Jun/2018 – Fev/2023",
        "Recife – PE"
      ),
      bulletItem("Suporte técnico especializado, configuração de sistemas operacionais e diagnóstico de software — compreensão profunda de como hardware e software interagem"),
      bulletItem("Treinamento de usuários e suporte a clientes — comunicação clara e empatia técnica"),

      // ── FORMAÇÃO ─────────────────────────────────────────────
      sectionDivider("Formação Acadêmica"),

      spacer(60),
      twoColRow("Pós-Graduação em Cibersegurança  |  Faculdade Metropolitana – SP", "Dez/2025 – Jul/2026 (cursando)"),
      twoColRow("Tecnólogo em Gestão da Tecnologia da Informação  |  UNIFG – PE", "2016 – 2019 (concluído)"),
      twoColRow("Técnico em Informática  |  UNIFG – PE", "2012 – 2013 (concluído)"),

      // ── CURSOS ───────────────────────────────────────────────
      sectionDivider("Cursos & Certificações"),

      spacer(60),
      new Paragraph({
        spacing: { before: 0, after: 40 },
        children: [new TextRun({ text: "Desenvolvimento Web (em andamento)", bold: true, size: 20, color: COLORS.dark, font: "Arial" })],
      }),
      certItem("JavaScript Completo (ES6+, DOM, APIs)", "Udemy / Curso em Vídeo"),
      certItem("Python para Iniciantes e Desenvolvimento Back-end", "Udemy"),
      certItem("HTML5, CSS3 e Responsividade", "Curso em Vídeo"),
      certItem("React.js — Front-end Moderno", "Em andamento"),
      certItem("Node.js e APIs REST", "Em andamento"),
      spacer(60),
      new Paragraph({
        spacing: { before: 0, after: 40 },
        children: [new TextRun({ text: "Infraestrutura & Metodologias", bold: true, size: 20, color: COLORS.dark, font: "Arial" })],
      }),
      certItem("Scrum Foundation Professional Certificate (SFPC)", "CertiProf"),
      certItem("Fibra Óptica (fusão e rack)", "Técnico"),
      certItem("Lógica de Programação Essencial", "DIO"),
      certItem("EF SET English Certificate — B1 Intermediate (50/100)", "EF Education"),

      // ── IDIOMAS ──────────────────────────────────────────────
      sectionDivider("Idiomas"),
      spacer(60),
      twoColRow("Português", "Nativo"),
      twoColRow("Inglês", "B1 – Leitura técnica avançada (documentação, Stack Overflow, GitHub)"),
      twoColRow("Espanhol", "Básico"),

      spacer(120),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: COLORS.border, space: 4 } },
        spacing: { before: 80, after: 0 },
        children: [
          new TextRun({
            text: "Portfólio GitHub em construção  •  Disponível para projetos freelance, estágio e posições júnior",
            size: 18, color: COLORS.muted, font: "Arial", italics: true,
          }),
        ],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('/home/claude/curriculo_dev_bruno.docx', buf);
  console.log('done');
});