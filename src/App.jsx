import { useState, useEffect, useCallback } from 'react';
import {
  CheckCircle2,
  Circle,
  Target,
  Sparkles,
  Database,
  Code,
  Headphones,
  Trash2,
  RotateCcw,
  Briefcase,
  ShieldCheck,
  FileText,
  ChevronDown,
  ChevronUp,
  Languages,
  Flame,
  Copy,
  Check,
  X,
  Compass,
  Boxes,
  Blocks,
  Network,
  Leaf,
  RefreshCw,
  Lock,
  Package,
  Cloud,
  Globe,
  ArrowLeftRight,
  Workflow,
  Handshake,
  Brain,
  Terminal,
  Wrench,
  Binary,
  Table2,
  Activity,
  GitMerge,
  Coffee
} from 'lucide-react';
import confetti from 'canvas-confetti';

const T = {
  pt: {
    title: "Roadmap de Modernização & Java: Progresso Sequencial & Estratégia Gamificada",
    subtitle: "Transição de Mainframe Legado para Engenharia de Modernização Internacional",
    progressMacro: "Progresso Macro",
    progressBlock: "Progresso do Bloco",
    resetBlock: "Reset Bloco",
    resetBlockConfirm: "Tem certeza que deseja resetar todo o progresso desta fase selecionada?",
    clearAll: "CUIDADO: Tem certeza que deseja apagar todo o histórico completo do roadmap?",
    dailyHabits: "Daily English Habits",
    pjManual: "Manual PJ Brasil",
    pjManualSubtitle: "Regras de ouro para trabalhar como CLT + PJ no Brasil e acelerar renda e senioridade.",

    // Habits
    h1: "15 min de Listening ativo (Podcast/Tech Talk gringo de negócios ou arquitetura).",
    h2: "Pensamento Direto (Todas as buscas de erro de código no Google feitas 100% em inglês).",
    h3: "2 min de Speaking ativo (Falar sozinho ou gravar áudio explicando em inglês o estudo técnico do dia).",

    // PJ
    pj1_title: "Posicionamento no LinkedIn",
    pj1_text: "Não se vender como 'Dev COBOL Júnior'. Apresentar-se como 'Engenheiro de Software | Especialista em Integração de Sistemas & Legado'.",
    pj2_title: "O escopo do PJ nacional",
    pj2_text: "Focar em consultorias de migração de dados (ETL), construção de APIs (Spring Boot) ou testes automatizados à noite/finais de semana.",
    pj3_title: "Blindagem Legal",
    pj3_text: "Abrir CNPJ sem conflito de interesse direto (evitar concorrentes diretos do seu CLT) e nunca usar o computador ou ferramentas da empresa CLT para trabalhar no PJ.",

    // Navigation
    phase1_title: "Fase 1 (Meses 1-6)",
    phase1_subtitle: "Fundamentos Absolutos",
    phase2_title: "Fase 2 (Meses 7-12)",
    phase2_subtitle: "POO & Legado Estruturado",
    phase3_title: "Fase 3 (Meses 13-24)",
    phase3_subtitle: "Frameworks & CICS",
    phase4_title: "Fase 4 (Meses 25-36)",
    phase4_subtitle: "Docker, Nuvem & Integração",
    phase5_title: "Fase 5 (Meses 37-60)",
    phase5_subtitle: "Arquitetura, CDC & Gringa",

    // Banner descriptions
    banner_phase1: "Fase 1: Construção da Base Híbrida e Fluência Avançada (Ano 1 de 5)",
    banner_phase2: "Fase 2: Aprofundamento Orientado a Objetos e Modularização (Ano 1 de 5)",
    banner_phase3: "Fase 3: Transações, Persistência e Integração (Ano 2 de 5)",
    banner_phase4: "Fase 4: Virtualização, APIs Modernas e Cloud (Ano 3 de 5)",
    banner_phase5: "Fase 5: Arquitetura Global e Coexistência de Dados (Anos 4 e 5 de 5)",

    // Phase descriptions
    phase1_desc: "O ano do alicerce. Foco em criar COBOL do zero (sem templates), dominar lógica básica de Java e aprender SQL do absoluto zero.",
    phase2_desc: "A transição para a Orientação a Objetos no Java, modularização no COBOL e o início das conexões relacionais com múltiplos bancos de dados.",
    phase3_desc: "O ano da integração. Aqui você aprende as tecnologias transacionais do mainframe (CICS e DB2), e os frameworks corporativos (Spring Boot).",
    phase4_desc: "O ano do Arquiteto Híbrido. Estudo focado em encapsular seus microsserviços modernos, iniciar os passos na nuvem e expor o legado via APIs.",
    phase5_desc: "Consolidação internacional. Sincronização de bancos em tempo real, kubernetes e sutil diplomacia corporativa em inglês.",

    // Days
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",

    // Level titles
    lvl_title_1: "Trainee do Terminal Verde",
    lvl_title_2: "Escudeiro do Código Híbrido",
    lvl_title_3: "Feiticeiro do Spring-COBOL",
    lvl_title_4: "Arquiteto do Legado",
    lvl_title_5: "Soberano da Nuvem",

    // Gamification Card
    levelLabel: "Nível",
    nextLevelLabel: "Próximo Nível em:",
    streakLabel: "Ofensiva",
    streakActive: "dias de consistência!",
    streakInactive: "Sem ofensiva ativa. Faça o check-in no topo!",
    checkinActive: "Confirmar Presença",
    checkinClaimed: "Presença Garantida!",

    // LinkedIn
    linkedinBtn: "Gerar Rascunho LinkedIn",
    linkedinModalTitle: "Rascunho Pronto para o LinkedIn",
    linkedinCopyBtn: "Copiar Rascunho",
    linkedinCopied: "Copiado!",
    linkedinCloseBtn: "Fechar",

    // Macro goals
    macroGoalsTitle: "Metas Macro de Carreira",
    macroGoal_block1_title: "Bloco 1 (Fase 1 & 2 - Ano 1): O Desenvolvedor Híbrido Base",
    macroGoal_block1_desc: "Meta: Criar programas COBOL e algoritmos Java do absoluto zero + Escrever queries e modelar banco relacional básico no VS Code.",
    macroGoal_block2_title: "Bloco 2 (Fase 3 - Ano 2): O Desenvolvedor de APIs de Integração",
    macroGoal_block2_desc: "Meta: Construir microsserviços em Spring Boot integrados com dados de Mainframe (CICS/DB2) + Conseguir o 1º PJ Nacional.",
    macroGoal_block3_title: "Bloco 3 (Fase 4 - Ano 3): O Arquiteto Híbrido",
    macroGoal_block3_desc: "Meta: Certificação AWS/Azure + Dockerizar aplicações + Dominar o Z/OS Connect.",
    macroGoal_block4_title: "Bloco 4 (Fase 5 - Anos 4 & 5): O Consultor Internacional de Migração",
    macroGoal_block4_desc: "Meta: Dominar patterns de coexistência de dados (Kafka/CDC) + Ingressar ativamente no mercado em dólar/euro.",

    // Phase 1 Tasks
    p1_mon_top: "COBOL do Zero (Criação Estruturada)",
    p1_mon_t1: "Divisões do COBOL: Estruturar do zero IDENTIFICATION, ENVIRONMENT, DATA e PROCEDURE DIVISION.",
    p1_mon_t2: "Variáveis Base: Domínio de PIC (Picture), níveis de variáveis (01, 05, 77, 88) e tipos de dados de mainframe.",
    p1_mon_t3: "File Section: Declaração de arquivos físicos/lógicos, uso de FD (File Description) e comandos SELECT/ASSIGN.",

    p1_tue_top: "Java do Zero - Lógica e Sintaxe Básica",
    p1_tue_t1: "Sintaxe Base: Configuração do JDK, variáveis, constantes, tipos primitivos e operadores aritméticos/lógicos.",
    p1_tue_t2: "Estruturas Condicionais: Domínio de tomadas de decisão usando blocos if, else if, else e switch-case.",
    p1_tue_t3: "Estruturas de Repetição: Implementação de laços de controle loop usando for, while e do-while.",

    p1_wed_top: "Banco de Dados & SQL do Absoluto Zero",
    p1_wed_t1: "Introdução a Bancos de Dados: Entender conceito de SGBD, o que são tabelas, colunas, registros e tipos de dados comuns.",
    p1_wed_t2: "DML do Zero (Leitura): Escrever queries simples usando SELECT para ler dados de tabelas isoladas (evitar SELECT *).",
    p1_wed_t3: "Filtragem Básica: Filtrar registros usando a cláusula WHERE associada a operadores simples (=, !=, <, >, AND, OR).",

    p1_thu_top: "Escrita de Dados & Lógica COBOL Batch",
    p1_thu_t1: "Manipulação de Dados: Comandos INSERT, UPDATE e DELETE em tabelas simples sem chaves estrangeiras.",
    p1_thu_t2: "Ordenação e Limitação: Controlar exibições usando ORDER BY (ASC/DESC) e cláusulas de limitação de resultados.",
    p1_thu_t3: "Lógica COBOL Batch: Escrever lógicas lógicas de cálculo no COBOL usando ADD, SUBTRACT, COMPUTE e EVALUATE.",

    p1_fri_top: "Ferramental de Trabalho Moderno & Autoridade",
    p1_fri_t1: "Controle de Versão: Instalação e domínio prático de Git (commits, branches, PRs e repositórios no GitHub).",
    p1_fri_t2: "VS Code para Mainframe: Configurar VS Code com extensões para COBOL e comandos básicos do Zowe CLI para visualizar datasets.",
    p1_fri_t3: "Compartilhar Conquistas (Opcional): Usar o botão 'Gerar Rascunho LinkedIn' para escrever e postar um pequeno resumo do seu aprendizado técnico ou desafio superado na semana.",

    // Phase 2 Tasks
    p2_mon_top: "COBOL Estruturado e Subprogramas",
    p2_mon_t1: "Tabelas Internas (Matrizes): Arrays lógicos em COBOL usando a cláusula OCCURS e buscas dinâmicas (SEARCH/SEARCH ALL).",
    p2_mon_t2: "Subprogramas (CALL): Modularização, passagem de parâmetros por referência (USING) e linkage section.",
    p2_mon_t3: "Manipulação de Strings: Uso avançado dos comandos STRING, UNSTRING, INSPECT e REPLACE.",

    p2_tue_top: "Java - Programação Orientada a Objetos (POO)",
    p2_tue_t1: "Classes e Objetos: O que são classes, como instanciar objetos na memória Heap, entender atributos e métodos.",
    p2_tue_t2: "Encapsulamento: Modificadores de acesso (public, private), métodos assessores (Getters/Setters) e construtores.",
    p2_tue_t3: "Collections Java: Manipulação prática das principais listas e mapas dinâmicos, como ArrayList e HashMap.",

    p2_wed_top: "Modelagem Relacional & SQL Multi-Tabelas",
    p2_wed_t1: "Relacionamento de Dados: Conceitos de Chaves Primárias (PK) e Estrangeiras (FK). Noções de Normalização de dados (1NF, 2NF, 3NF).",
    p2_wed_t2: "Junção de Tabelas (Joins): Unir dados de múltiplas tabelas usando INNER JOIN, LEFT JOIN, RIGHT JOIN e FULL OUTER JOIN.",
    p2_wed_t3: "Funções de Agregação: Uso prático de agrupadores com GROUP BY, HAVING, e funções matemáticas (SUM, AVG, COUNT).",

    p2_thu_top: "Prática POO Integrada",
    p2_thu_t1: "Sistemas de Console: Construir pequenos sistemas em Java (gerenciadores de estoque, cadastros) aplicando objetos de verdade.",

    p2_fri_top: "Testes Unitários & Automação",
    p2_fri_t1: "Testes em Java: Introdução ao JUnit. Testar métodos isolados e validar regras de cálculo dos seus algoritmos.",
    p2_fri_t2: "Zowe CLI Avançado: Submeter Jobs (JCLs), compilar códigos COBOL e monitorar a fila de execução (spool) pelo VS Code.",

    // Phase 3 Tasks
    p3_mon_top: "CICS Online & Transacional",
    p3_mon_t1: "Arquitetura CICS: Funcionamento de transações online, pseudoconversação e o mapa de tela (BMS).",
    p3_mon_t2: "Comunicação Transacional: Passagem de dados entre programas através da COMMAREA e tratamento de concorrência.",

    p3_tue_top: "Java POO Avançado & Exceptions",
    p3_tue_t1: "Herança e Polimorfismo: Reutilização de código de forma semântica, sobrecarga e sobrescrita de métodos.",
    p3_tue_t2: "Abstrações: Criação de classes abstratas e Interfaces como contratos rígidos de comportamento para o código.",
    p3_tue_t3: "Tratamento de Erros: Criar e capturar exceções lógicas de forma segura usando blocos try-catch-finally e throw.",

    p3_wed_top: "DB2 no Mainframe, Cursores & Tuning",
    p3_wed_t1: "Introdução ao DB2: Armazenamento relacional de alta criticidade no mainframe e a diferença estrutural contra arquivos VSAM.",
    p3_wed_t2: "Cursores DB2: Declaração, abertura, varredura (FETCH) e fechamento de cursores em processamentos batch pesados.",
    p3_wed_t3: "Performance de Query: Análise de planos de acesso (EXPLAIN), criação de índices e tuning de consultas de alta volumetria.",

    p3_thu_top: "Framework Spring Boot Core",
    p3_thu_t1: "Inversão de Controle (IoC): Entender como o Spring gerencia os objetos do sistema através de Injeção de Dependências.",
    p3_thu_t2: "Spring Boot Web: Criar APIs REST funcionais com controllers (@RestController), rotas e tratamento de JSON.",
    p3_thu_t3: "Spring Data JPA: Persistir dados lidos de APIs no banco de dados utilizando repositórios e Hibernate.",

    p3_fri_top: "ETL & Conversão de Dados Legados",
    p3_fri_t1: "Decodificação de Caracteres: Tratar a conversão de arquivos de Mainframe (EBCDIC) para o formato moderno (ASCII/UTF-8).",
    p3_fri_t2: "Compactados (COMP-3): Algoritmos para ler e converter campos decimais compactados binários do COBOL para tipos Java.",

    // Phase 4 Tasks
    p4_mon_top: "CICS Avançado & JCL de Integração",
    p4_mon_t1: "Canais e Contêineres: Migrar da COMMAREA clássica para Channels & Containers para quebrar a barreira dos 32KB.",
    p4_mon_t2: "Automação Batch: Escrever JCLs avançados para acionar processos que geram cargas de dados prontas para consumo em nuvem.",

    p4_tue_top: "Spring Boot Enterprise & Segurança",
    p4_tue_t1: "Microsserviços: Desenvolver sistemas distribuídos robustos com arquitetura de camadas limpa (Clean Architecture).",
    p4_tue_t2: "API Security: Proteger suas APIs Spring com autenticação e autorização usando tokens JWT e Spring Security.",

    p4_wed_top: "Containers & Virtualização (Docker)",
    p4_wed_t1: "Docker na Prática: Criar Dockerfiles otimizados para aplicações Java e subir bancos em Docker-compose para testes locais.",

    p4_thu_top: "Fundamentos de Nuvem Pública (Certificação)",
    p4_thu_t1: "AWS/Azure Foundations: Preparação teórica voltada para as certificações AWS Cloud Practitioner ou Azure Fundamentals.",

    p4_fri_top: "Exposição de APIs no Mainframe (Z/OS Connect)",
    p4_fri_t1: "Z/OS Connect: Mapear programas COBOL antigos e expô-los diretamente como endpoints REST JSON nativos.",

    // Phase 5 Tasks
    p5_mon_top: "Migração de Dados em Tempo Real",
    p5_mon_t1: "CDC (Change Data Capture): Sincronização em tempo real de bases relacionais DB2 com Postgres usando Debezium.",
    p5_mon_t2: "Event-Driven Architecture: Uso do Apache Kafka como barramento de mensageria para garantir coexistência activa de dados.",

    p5_tue_top: "Kubernetes & Orquestração",
    p5_tue_t1: "Kubernetes (K8s): Conceitos de Pods, Deployments e Services. Escalar e gerenciar microsserviços Java de modernização na nuvem.",

    p5_wed_top: "Serviços de Migração Oficiais da Nuvem",
    p5_wed_t1: "AWS Mainframe Modernization: Análise profunda do serviço oficial de Rehosting (emulação) e Refactoring automático (AWS Blu Age).",

    p5_thu_top: "System Design & Negociação Internacional",
    p5_thu_t1: "Strangler Fig Pattern: Desenhar arquiteturas que estrangulam o monolito legado aos poucos sem paradas de serviço.",
    p5_thu_t2: "Contractor setup: Preparar currículo técnico em inglês (Legacy Modernization) e entender tributação internacional (Invoice, Wise, Deel).",

    p5_fri_top: "IA para Engenharia Reversa",
    p5_fri_t1: "GenAI na Modernização: Usar ferramentas de inteligência artificial para documentar programas COBOL gigantescos e mapear dependências em inglês."
  },
  en: {
    title: "Modernization & Java Roadmap: Sequential Progress & Gamified Strategy",
    subtitle: "Transition from Legacy Mainframe to International Modernization Engineering",
    progressMacro: "Macro Progress",
    progressBlock: "Block Progress",
    resetBlock: "Reset Block",
    resetBlockConfirm: "Are you sure you want to reset all progress for this selected phase?",
    clearAll: "WARNING: Are you sure you want to delete the complete roadmap history?",
    dailyHabits: "Daily English Habits",
    pjManual: "Brazil B2B (PJ) Manual",
    pjManualSubtitle: "Golden rules for working as CLT + PJ in Brazil and accelerating income and seniority.",

    // Habits
    h1: "15 min of active Listening (Foreign podcast/Tech Talk about business or architecture).",
    h2: "Direct Thinking (All code error searches on Google done 100% in English).",
    h3: "2 min of active Speaking (Talk to yourself or record an audio explaining today's technical study in English).",

    // PJ
    pj1_title: "LinkedIn Positioning",
    pj1_text: "Do not market yourself as a 'Junior COBOL Dev'. Present yourself as 'Software Engineer | System Integration & Legacy Specialist'.",
    pj2_title: "National B2B Scope",
    pj2_text: "Focus on data migration consulting (ETL), API construction (Spring Boot) or automated testing at night/weekends.",
    pj3_title: "Legal Shielding",
    pj3_text: "Open a CNPJ without direct conflict of interest (avoid direct competitors of your CLT) and never use the computer or tools of the CLT company to work on the PJ.",

    // Navigation
    phase1_title: "Phase 1 (Months 1-6)",
    phase1_subtitle: "Absolute Fundamentals",
    phase2_title: "Phase 2 (Months 7-12)",
    phase2_subtitle: "OOP & Structured Legacy",
    phase3_title: "Phase 3 (Months 13-24)",
    phase3_subtitle: "Frameworks & CICS",
    phase4_title: "Phase 4 (Months 25-36)",
    phase4_subtitle: "Docker, Cloud & Integration",
    phase5_title: "Phase 5 (Months 37-60)",
    phase5_subtitle: "Architecture, CDC & Gringo",

    // Banner descriptions
    banner_phase1: "Phase 1: Hybrid Foundation Building and Advanced Fluency (Year 1 of 5)",
    banner_phase2: "Phase 2: Object-Oriented Deepening and Modularization (Year 1 of 5)",
    banner_phase3: "Phase 3: Transactions, Persistence, and Integration (Year 2 of 5)",
    banner_phase4: "Phase 4: Virtualization, Modern APIs, and Cloud (Year 3 of 5)",
    banner_phase5: "Phase 5: Global Architecture and Data Coexistence (Years 4 & 5 of 5)",

    // Phase descriptions
    phase1_desc: "The foundation year. Focus on creating COBOL from scratch (no templates), mastering basic Java logic, and learning SQL from absolute zero.",
    phase2_desc: "Transition to Object-Oriented Programming in Java, modularization in COBOL, and starting relational connections with multiple databases.",
    phase3_desc: "The integration year. Here you learn the transactional mainframe technologies (CICS and DB2) and enterprise frameworks (Spring Boot).",
    phase4_desc: "The Hybrid Architect year. Study focused on encapsulating your modern microservices, starting cloud steps, and exposing legacy via APIs.",
    phase5_desc: "International consolidation. Real-time database synchronization, Kubernetes, and subtle corporate diplomacy in English.",

    // Days
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",

    // Level titles
    lvl_title_1: "Green Terminal Trainee",
    lvl_title_2: "Hybrid Code Squire",
    lvl_title_3: "Spring-COBOL Sorcerer",
    lvl_title_4: "Legacy Architect",
    lvl_title_5: "Cloud Overlord",

    // Gamification Card
    levelLabel: "Level",
    nextLevelLabel: "Next Level in:",
    streakLabel: "Streak",
    streakActive: "days of consistency!",
    streakInactive: "No active streak. Claim check-in at the top!",
    checkinActive: "Claim Daily Streak",
    checkinClaimed: "Streak Secured!",

    // LinkedIn
    linkedinBtn: "Generate LinkedIn Draft",
    linkedinModalTitle: "LinkedIn Ready Draft",
    linkedinCopyBtn: "Copy Draft",
    linkedinCopied: "Copied!",
    linkedinCloseBtn: "Close",

    // Macro goals
    macroGoalsTitle: "Macro Career Goals",
    macroGoal_block1_title: "Block 1 (Phase 1 & 2 - Year 1): The Base Hybrid Developer",
    macroGoal_block1_desc: "Goal: Create COBOL programs and Java algorithms from absolute zero + Write queries and model basic relational DB in VS Code.",
    macroGoal_block2_title: "Block 2 (Phase 3 - Year 2): The Integration API Developer",
    macroGoal_block2_desc: "Goal: Build Spring Boot microservices integrated with Mainframe data (CICS/DB2) + Get 1st National PJ contract.",
    macroGoal_block3_title: "Block 3 (Phase 4 - Year 3): The Hybrid Architect",
    macroGoal_block3_desc: "Goal: AWS/Azure Certification + Dockerize applications + Master Z/OS Connect.",
    macroGoal_block4_title: "Block 4 (Phase 5 - Years 4 & 5): The International Migration Consultant",
    macroGoal_block4_desc: "Goal: Master data coexistence patterns (Kafka/CDC) + Actively enter the dollar/euro market.",

    // Phase 1 Tasks
    p1_mon_top: "COBOL from Scratch (Structured Creation)",
    p1_mon_t1: "COBOL Divisions: Structure from scratch IDENTIFICATION, ENVIRONMENT, DATA, and PROCEDURE DIVISION.",
    p1_mon_t2: "Base Variables: Mastery of PIC (Picture), variable levels (01, 05, 77, 88), and mainframe data types.",
    p1_mon_t3: "File Section: Declaring physical/logical files, using FD (File Description), and SELECT/ASSIGN commands.",

    p1_tue_top: "Java from Scratch - Basic Logic & Syntax",
    p1_tue_t1: "Base Syntax: JDK configuration, variables, constants, primitive types, and arithmetic/logical operators.",
    p1_tue_t2: "Conditional Structures: Mastery of decision making using if, else if, else, and switch-case blocks.",
    p1_tue_t3: "Repetition Structures: Practical implementation of loops using for, while, and do-while.",

    p1_wed_top: "Database & SQL from Absolute Zero",
    p1_wed_t1: "Intro to Databases: Understand DBMS concepts, what are tables, columns, records, and common data types.",
    p1_wed_t2: "DML from Scratch (Reading): Write simple queries using SELECT to read data from isolated tables (avoid SELECT *).",
    p1_wed_t3: "Basic Filtering: Filter records using the WHERE clause associated with simple operators (=, !=, <, >, AND, OR).",

    p1_thu_top: "Data Writing & COBOL Batch Logic",
    p1_thu_t1: "Data Manipulation: INSERT, UPDATE, and DELETE commands in simple tables without foreign keys.",
    p1_thu_t2: "Sorting and Limitation: Control views using ORDER BY (ASC/DESC) and result limitation clauses.",
    p1_thu_t3: "COBOL Batch Logic: Write math logic in COBOL using ADD, SUBTRACT, COMPUTE, and EVALUATE.",

    p1_fri_top: "Modern Tooling & Authority Build",
    p1_fri_t1: "Version Control: Installation and practical mastery of Git (commits, branches, PRs, and GitHub repositories).",
    p1_fri_t2: "VS Code for Mainframe: Configure VS Code with COBOL extensions and basic Zowe CLI commands to view datasets.",
    p1_fri_t3: "Share Achievements (Optional): Use the 'Generate LinkedIn Draft' button to write and post a quick summary of your technical learning or challenge overcome this week.",

    // Phase 2 Tasks
    p2_mon_top: "Structured COBOL and Subprograms",
    p2_mon_t1: "Internal Tables (Arrays): Logical arrays in COBOL using the OCCURS clause and dynamic searches (SEARCH/SEARCH ALL).",
    p2_mon_t2: "Subprograms (CALL): Modularization, parameter passing by reference (USING), and linkage section.",
    p2_mon_t3: "String Manipulation: Advanced use of STRING, UNSTRING, INSPECT, and REPLACE commands.",

    p2_tue_top: "Java - Object-Oriented Programming (OOP)",
    p2_tue_t1: "Classes and Objects: What are classes, how to instantiate objects in Heap memory, understanding attributes and methods.",
    p2_tue_t2: "Encapsulation: Access modifiers (public, private), getters/setters, and constructors.",
    p2_tue_t3: "Java Collections: Practical manipulation of main dynamic lists and maps, such as ArrayList and HashMap.",

    p2_wed_top: "Relational Modeling & Multi-Table SQL",
    p2_wed_t1: "Data Relationships: Primary Keys (PK) and Foreign Keys (FK) concepts. Data Normalization notions (1NF, 2NF, 3NF).",
    p2_wed_t2: "Table Joins: Joining data from multiple tables using INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN.",
    p2_wed_t3: "Aggregation Functions: Grouping data with GROUP BY, HAVING, and math functions (SUM, AVG, COUNT).",

    p2_thu_top: "Integrated OOP Practice",
    p2_thu_t1: "Console Systems: Build small Java console systems (inventory managers, registries) applying real objects.",

    p2_fri_top: "Unit Testing & Automation",
    p2_fri_t1: "Testing in Java: Intro to JUnit. Test isolated methods and validate the calculation rules of your algorithms.",
    p2_fri_t2: "Advanced Zowe CLI: Submit Jobs (JCLs), compile COBOL code, and monitor the execution spool directly from VS Code.",

    // Phase 3 Tasks
    p3_mon_top: "CICS Online & Transactional",
    p3_mon_t1: "CICS Architecture: How online transactions work, pseudo-conversational processing, and screen mapping (BMS).",
    p3_mon_t2: "Transactional Communication: Passing data between programs via COMMAREA and handling concurrent transactions.",

    p3_tue_top: "Advanced Java OOP & Exceptions",
    p3_tue_t1: "Inheritance and Polymorphism: Reusing code semantically, overloading, and overriding methods.",
    p3_tue_t2: "Abstractions: Creating abstract classes and Interfaces as rigid behavioral contracts for the code.",
    p3_tue_t3: "Error Handling: Safely create and catch logical exceptions using try-catch-finally and throw blocks.",

    p3_wed_top: "DB2 on Mainframe, Cursors & Tuning",
    p3_wed_t1: "DB2 Introduction: High-criticality relational storage on mainframe and structural differences against VSAM files.",
    p3_wed_t2: "DB2 Cursors: Declaring, opening, fetching (FETCH), and closing cursors in heavy batch processing.",
    p3_wed_t3: "Query Performance: Analyzing access plans (EXPLAIN), index creation, and tuning high-volume queries.",

    p3_thu_top: "Spring Boot Core Framework",
    p3_thu_t1: "Inversion of Control (IoC): Understand how Spring manages system objects through Dependency Injection.",
    p3_thu_t2: "Spring Boot Web: Build functional REST APIs with controllers (@RestController), routing, and JSON handling.",
    p3_thu_t3: "Spring Data JPA: Persist data read from APIs to the database using repositories and Hibernate.",

    p3_fri_top: "ETL & Legacy Data Conversion",
    p3_fri_t1: "Character Decoding: Handle mainframe file conversion (EBCDIC) to modern web format (ASCII/UTF-8).",
    p3_fri_t2: "Packed Decimals (COMP-3): Write algorithms to read and convert COBOL binary packed decimals into Java types.",

    // Phase 4 Tasks
    p4_mon_top: "Advanced CICS & Integration JCL",
    p4_mon_t1: "Channels and Containers: Migrate from classic COMMAREA to Channels & Containers to break the 32KB data barrier.",
    p4_mon_t2: "Batch Automation: Write advanced JCLs to trigger processes that generate data payloads ready for cloud consumption.",

    p4_tue_top: "Spring Boot Enterprise & Security",
    p4_tue_t1: "Microservices: Develop robust distributed systems using a clean layered architecture (Clean Architecture).",
    p4_tue_t2: "API Security: Protect your Spring APIs with authentication and authorization using JWT tokens and Spring Security.",

    p4_wed_top: "Containers & Virtualization (Docker)",
    p4_wed_t1: "Docker in Practice: Create optimized Dockerfiles for Java applications and spin up databases in Docker-compose for local testing.",

    p4_thu_top: "Public Cloud Fundamentals (Certification)",
    p4_thu_t1: "AWS/Azure Foundations: Theoretical prep focused on AWS Cloud Practitioner or Azure Fundamentals certifications.",

    p4_fri_top: "Mainframe API Exposure (Z/OS Connect)",
    p4_fri_t1: "Z/OS Connect: Map old COBOL programs and expose them directly as native REST JSON endpoints.",

    // Phase 5 Tasks
    p5_mon_top: "Real-Time Data Migration",
    p5_mon_t1: "CDC (Change Data Capture): Real-time synchronization of relational DB2 databases with Postgres using Debezium.",
    p5_mon_t2: "Event-Driven Architecture: Using Apache Kafka as a message broker to ensure active data coexistence.",

    p5_tue_top: "Kubernetes & Orchestration",
    p5_tue_t1: "Kubernetes (K8s): Pods, Deployments, and Services concepts. Scale and manage modernization Java microservices on the cloud.",

    p5_wed_top: "Official Cloud Migration Services",
    p5_wed_t1: "AWS Mainframe Modernization: Deep dive into the official Rehosting (emulation) and automatic Refactoring (AWS Blu Age) services.",

    p5_thu_top: "System Design & International Negotiation",
    p5_thu_t1: "Strangler Fig Pattern: Design architectures that gradually strangle the legacy monolith without service downtime.",
    p5_thu_t2: "Contractor Setup: Prepare a technical resume in English (Legacy Modernization) and understand international taxes (Invoice, Wise, Deel).",

    p5_fri_top: "AI for Reverse Engineering",
    p5_fri_t1: "GenAI in Modernization: Use artificial intelligence tools to document massive COBOL programs and map dependencies in English."
  }
};

const HABITS = ['h1', 'h2', 'h3'];

const PJ_MANUAL = [
  { icon: <Target className="w-4 h-4 text-cyan-400" />, titleKey: "pj1_title", textKey: "pj1_text", titleColor: "text-cyan-400", descColor: "text-cyan-300/80" },
  { icon: <Briefcase className="w-4 h-4 text-pink-500" />, titleKey: "pj2_title", textKey: "pj2_text", titleColor: "text-pink-500", descColor: "text-pink-300/80" },
  { icon: <ShieldCheck className="w-4 h-4 text-purple-400" />, titleKey: "pj3_title", textKey: "pj3_text", titleColor: "text-purple-400", descColor: "text-purple-300/80" }
];



const PHASES = [
  {
    id: 'phase1',
    schedule: [
      { id: 'p1-mon', dayKey: 'monday', topicKey: 'p1_mon_top', icon: <Terminal className="w-5 h-5 text-purple-400" />, tasks: ['p1_mon_t1', 'p1_mon_t2', 'p1_mon_t3'] },
      { id: 'p1-tue', dayKey: 'tuesday', topicKey: 'p1_tue_top', icon: <Coffee className="w-5 h-5 text-orange-400" />, tasks: ['p1_tue_t1', 'p1_tue_t2', 'p1_tue_t3'] },
      { id: 'p1-wed', dayKey: 'wednesday', topicKey: 'p1_wed_top', icon: <Database className="w-5 h-5 text-emerald-400" />, tasks: ['p1_wed_t1', 'p1_wed_t2', 'p1_wed_t3'] },
      { id: 'p1-thu', dayKey: 'thursday', topicKey: 'p1_thu_top', icon: <FileText className="w-5 h-5 text-cyan-400" />, tasks: ['p1_thu_t1', 'p1_thu_t2', 'p1_thu_t3'] },
      { id: 'p1-fri', dayKey: 'friday', topicKey: 'p1_fri_top', icon: <Wrench className="w-5 h-5 text-pink-400" />, tasks: ['p1_fri_t1', 'p1_fri_t2', 'p1_fri_t3'] }
    ]
  },
  {
    id: 'phase2',
    schedule: [
      { id: 'p2-mon', dayKey: 'monday', topicKey: 'p2_mon_top', icon: <Binary className="w-5 h-5 text-purple-400" />, tasks: ['p2_mon_t1', 'p2_mon_t2', 'p2_mon_t3'] },
      { id: 'p2-tue', dayKey: 'tuesday', topicKey: 'p2_tue_top', icon: <Boxes className="w-5 h-5 text-blue-400" />, tasks: ['p2_tue_t1', 'p2_tue_t2', 'p2_tue_t3'] },
      { id: 'p2-wed', dayKey: 'wednesday', topicKey: 'p2_wed_top', icon: <Table2 className="w-5 h-5 text-emerald-400" />, tasks: ['p2_wed_t1', 'p2_wed_t2', 'p2_wed_t3'] },
      { id: 'p2-thu', dayKey: 'thursday', topicKey: 'p2_thu_top', icon: <Blocks className="w-5 h-5 text-cyan-400" />, tasks: ['p2_thu_t1'] },
      { id: 'p2-fri', dayKey: 'friday', topicKey: 'p2_fri_top', icon: <ShieldCheck className="w-5 h-5 text-pink-400" />, tasks: ['p2_fri_t1', 'p2_fri_t2'] }
    ]
  },
  {
    id: 'phase3',
    schedule: [
      { id: 'p3-mon', dayKey: 'monday', topicKey: 'p3_mon_top', icon: <Activity className="w-5 h-5 text-purple-400" />, tasks: ['p3_mon_t1', 'p3_mon_t2'] },
      { id: 'p3-tue', dayKey: 'tuesday', topicKey: 'p3_tue_top', icon: <Network className="w-5 h-5 text-blue-400" />, tasks: ['p3_tue_t1', 'p3_tue_t2', 'p3_tue_t3'] },
      { id: 'p3-wed', dayKey: 'wednesday', topicKey: 'p3_wed_top', icon: <Database className="w-5 h-5 text-emerald-400" />, tasks: ['p3_wed_t1', 'p3_wed_t2', 'p3_wed_t3'] },
      { id: 'p3-thu', dayKey: 'thursday', topicKey: 'p3_thu_top', icon: <Leaf className="w-5 h-5 text-cyan-400" />, tasks: ['p3_thu_t1', 'p3_thu_t2', 'p3_thu_t3'] },
      { id: 'p3-fri', dayKey: 'friday', topicKey: 'p3_fri_top', icon: <RefreshCw className="w-5 h-5 text-pink-400" />, tasks: ['p3_fri_t1', 'p3_fri_t2'] }
    ]
  },
  {
    id: 'phase4',
    schedule: [
      { id: 'p4-mon', dayKey: 'monday', topicKey: 'p4_mon_top', icon: <GitMerge className="w-5 h-5 text-purple-400" />, tasks: ['p4_mon_t1', 'p4_mon_t2'] },
      { id: 'p4-tue', dayKey: 'tuesday', topicKey: 'p4_tue_top', icon: <Lock className="w-5 h-5 text-blue-400" />, tasks: ['p4_tue_t1', 'p4_tue_t2'] },
      { id: 'p4-wed', dayKey: 'wednesday', topicKey: 'p4_wed_top', icon: <Package className="w-5 h-5 text-emerald-400" />, tasks: ['p4_wed_t1'] },
      { id: 'p4-thu', dayKey: 'thursday', topicKey: 'p4_thu_top', icon: <Cloud className="w-5 h-5 text-cyan-400" />, tasks: ['p4_thu_t1'] },
      { id: 'p4-fri', dayKey: 'friday', topicKey: 'p4_fri_top', icon: <Globe className="w-5 h-5 text-pink-400" />, tasks: ['p4_fri_t1'] }
    ]
  },
  {
    id: 'phase5',
    schedule: [
      { id: 'p5-mon', dayKey: 'monday', topicKey: 'p5_mon_top', icon: <ArrowLeftRight className="w-5 h-5 text-purple-400" />, tasks: ['p5_mon_t1', 'p5_mon_t2'] },
      { id: 'p5-tue', dayKey: 'tuesday', topicKey: 'p5_tue_top', icon: <Workflow className="w-5 h-5 text-blue-400" />, tasks: ['p5_tue_t1'] },
      { id: 'p5-wed', dayKey: 'wednesday', topicKey: 'p5_wed_top', icon: <Cloud className="w-5 h-5 text-emerald-400" />, tasks: ['p5_wed_t1'] },
      { id: 'p5-thu', dayKey: 'thursday', topicKey: 'p5_thu_top', icon: <Handshake className="w-5 h-5 text-cyan-400" />, tasks: ['p5_thu_t1', 'p5_thu_t2'] },
      { id: 'p5-fri', dayKey: 'friday', topicKey: 'p5_fri_top', icon: <Brain className="w-5 h-5 text-pink-400" />, tasks: ['p5_fri_t1'] }
    ]
  }
];



const QUIZ_BANK = {
  "p1_mon_t1": [
    {
      "pt": {
        "question": "Qual divisão é obrigatória no topo de qualquer programa COBOL?",
        "options": [
          "ENVIRONMENT DIVISION",
          "DATA DIVISION",
          "IDENTIFICATION DIVISION",
          "PROCEDURE DIVISION"
        ],
        "correct": 2
      },
      "en": {
        "question": "Which division is mandatory at the top of any COBOL program?",
        "options": [
          "ENVIRONMENT DIVISION",
          "DATA DIVISION",
          "IDENTIFICATION DIVISION",
          "PROCEDURE DIVISION"
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Qual a principal finalidade da ENVIRONMENT DIVISION?",
        "options": [
          "Declarar variáveis locais",
          "Mapear recursos físicos do sistema como arquivos e periféricos",
          "Definir a lógica do programa",
          "Especificar o nome do autor"
        ],
        "correct": 1
      },
      "en": {
        "question": "What is the primary purpose of the ENVIRONMENT DIVISION?",
        "options": [
          "Declare local variables",
          "Map physical system resources such as files and peripherals",
          "Define the program logic",
          "Specify the author's name"
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Em qual divisão do COBOL são alocados os dados e variáveis de memória?",
        "options": [
          "IDENTIFICATION DIVISION",
          "PROCEDURE DIVISION",
          "ENVIRONMENT DIVISION",
          "DATA DIVISION"
        ],
        "correct": 3
      },
      "en": {
        "question": "In which COBOL division are data and memory variables allocated?",
        "options": [
          "IDENTIFICATION DIVISION",
          "PROCEDURE DIVISION",
          "ENVIRONMENT DIVISION",
          "DATA DIVISION"
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "A PROCEDURE DIVISION no COBOL serve para:",
        "options": [
          "Declarar variáveis de grupo",
          "Escrever os comandos e a lógica executável do programa",
          "Configurar periféricos",
          "Identificar a versão do compilador"
        ],
        "correct": 1
      },
      "en": {
        "question": "The PROCEDURE DIVISION in COBOL is used to:",
        "options": [
          "Declare group variables",
          "Write the commands and executable logic of the program",
          "Configure peripherals",
          "Identify the compiler version"
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual parágrafo dentro da IDENTIFICATION DIVISION é obrigatório na maioria dos compiladores clássicos?",
        "options": [
          "PROGRAM-ID.",
          "AUTHOR.",
          "INSTALLATION.",
          "DATE-WRITTEN."
        ],
        "correct": 0
      },
      "en": {
        "question": "Which paragraph inside the IDENTIFICATION DIVISION is mandatory in most classic compilers?",
        "options": [
          "PROGRAM-ID.",
          "AUTHOR.",
          "INSTALLATION.",
          "DATE-WRITTEN."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual seção na ENVIRONMENT DIVISION é usada para configurar o mapeamento de arquivos físicos?",
        "options": [
          "CONFIGURATION SECTION",
          "INPUT-OUTPUT SECTION",
          "FILE-CONTROL SECTION",
          "SPECIAL-NAMES SECTION"
        ],
        "correct": 1
      },
      "en": {
        "question": "Which section in the ENVIRONMENT DIVISION is used to configure physical file mapping?",
        "options": [
          "CONFIGURATION SECTION",
          "INPUT-OUTPUT SECTION",
          "FILE-CONTROL SECTION",
          "SPECIAL-NAMES SECTION"
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Como os parágrafos e seções na PROCEDURE DIVISION devem terminar no COBOL?",
        "options": [
          "Com ponto final (.)",
          "Com ponto e vírgula (;)",
          "Com a palavra-chave END",
          "Não exigem terminação"
        ],
        "correct": 0
      },
      "en": {
        "question": "How must paragraphs and sections in the PROCEDURE DIVISION end in COBOL?",
        "options": [
          "With a period (.)",
          "With a semicolon (;)",
          "With the END keyword",
          "They do not require termination"
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Na estrutura tradicional do COBOL, onde começa a Área A (colunas 8-11)?",
        "options": [
          "Para iniciar nomes de divisões, seções e parágrafos",
          "Apenas para comentários",
          "Para comandos aritméticos",
          "Para variáveis de nível 77"
        ],
        "correct": 0
      },
      "en": {
        "question": "In the traditional COBOL structure, what is Area A (columns 8-11) used for?",
        "options": [
          "To start names of divisions, sections, and paragraphs",
          "Only for comments",
          "For arithmetic commands",
          "For level 77 variables"
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Na estrutura tradicional do COBOL, onde começa a Área B (colunas 12-72)?",
        "options": [
          "Para declaração de cabeçalhos de divisões",
          "Para escrever comandos procedimentais e cláusulas de dados",
          "Apenas para numeração sequencial",
          "Para sinalizar diretivas de compilação"
        ],
        "correct": 1
      },
      "en": {
        "question": "In the traditional COBOL structure, what is Area B (columns 12-72) used for?",
        "options": [
          "To declare division headers",
          "To write procedural commands and data clauses",
          "Only for sequential numbering",
          "To signal compiler directives"
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual comando na PROCEDURE DIVISION marca a parada da execução e retorno ao sistema operacional?",
        "options": [
          "STOP RUN.",
          "EXIT PROGRAM.",
          "GOBACK.",
          "Tanto 'STOP RUN.' quanto 'GOBACK.' são aceitos dependendo do contexto"
        ],
        "correct": 3
      },
      "en": {
        "question": "Which command in the PROCEDURE DIVISION stops execution and returns to the OS?",
        "options": [
          "STOP RUN.",
          "EXIT PROGRAM.",
          "GOBACK.",
          "Both 'STOP RUN.' and 'GOBACK.' are accepted depending on the context"
        ],
        "correct": 3
      }
    }
  ],
  "p1_mon_t2": [
    {
      "pt": {
        "question": "O que define a cláusula PIC (PICTURE) no COBOL?",
        "options": [
          "O formato físico do arquivo",
          "O tipo de dado e tamanho físico de uma variável na memória",
          "O alinhamento do texto na tela",
          "A chave primária do banco de dados"
        ],
        "correct": 1
      },
      "en": {
        "question": "What does the PIC (PICTURE) clause define in COBOL?",
        "options": [
          "The physical file format",
          "The data type and physical size of a variable in memory",
          "Text alignment on the screen",
          "The database primary key"
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual caractere na cláusula PICTURE indica uma variável do tipo alfanumérica (texto)?",
        "options": [
          "9",
          "A",
          "X",
          "S"
        ],
        "correct": 2
      },
      "en": {
        "question": "Which character in the PICTURE clause indicates an alphanumeric (text) variable?",
        "options": [
          "9",
          "A",
          "X",
          "S"
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como declaramos um campo numérico simples com sinal que aceita valores negativos no COBOL?",
        "options": [
          "PIC 9(4)",
          "PIC S9(4)",
          "PIC SIGN 9(4)",
          "PIC -9(4)"
        ],
        "correct": 1
      },
      "en": {
        "question": "How do we declare a simple signed numeric field that accepts negative values in COBOL?",
        "options": [
          "PIC 9(4)",
          "PIC S9(4)",
          "PIC SIGN 9(4)",
          "PIC -9(4)"
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "O que indica a variável de nível 01 no COBOL?",
        "options": [
          "Uma constante global",
          "Uma variável independente simples",
          "Um registro de grupo ou variável raiz",
          "Uma condição lógica do tipo booleana"
        ],
        "correct": 2
      },
      "en": {
        "question": "What does a level 01 variable indicate in COBOL?",
        "options": [
          "A global constant",
          "A simple independent variable",
          "A group record or root variable",
          "A boolean-like logical condition"
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Qual a utilidade do nível de variável 77 no COBOL?",
        "options": [
          "Declarar arrays e matrizes",
          "Definir variáveis escalares elementares independentes (sem subdivisões)",
          "Mapear arquivos de índice",
          "Criar constantes lógicas"
        ],
        "correct": 1
      },
      "en": {
        "question": "What is the purpose of level 77 variables in COBOL?",
        "options": [
          "Declare arrays and matrices",
          "Define independent elementary scalar variables (without subdivisions)",
          "Map index files",
          "Create logical constants"
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Para que serve o nível de variável 88 no COBOL?",
        "options": [
          "Declarar variáveis de entrada",
          "Definir um nome de condição associado a valores específicos (booleano implícito)",
          "Mapear subprogramas externos",
          "Tratar ponteiros de memória"
        ],
        "correct": 1
      },
      "en": {
        "question": "What is the purpose of level 88 variables in COBOL?",
        "options": [
          "Declare input variables",
          "Define a condition name associated with specific values (implicit boolean)",
          "Map external subprograms",
          "Handle memory pointers"
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "O que a cláusula PIC 9(3)V99 indica no COBOL?",
        "options": [
          "Um número de 3 dígitos com 2 casas decimais implícitas (virtual decimal point)",
          "Um número de 5 dígitos sem decimais",
          "Uma variável alfanumérica de tamanho 5",
          "Uma variável com sinal de 3 dígitos"
        ],
        "correct": 0
      },
      "en": {
        "question": "What does the PIC 9(3)V99 clause indicate in COBOL?",
        "options": [
          "A 3-digit number with 2 implicit decimal places (virtual decimal point)",
          "A 5-digit number without decimals",
          "An alphanumeric variable of size 5",
          "A signed 3-digit variable"
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual das opções abaixo representa o nível de hierarquia correto de variáveis de grupo e campos filhos?",
        "options": [
          "01 REGISTRO, 05 NOME, 10 PRIMEIRO-NOME",
          "05 REGISTRO, 01 NOME, 77 SOBRENOME",
          "77 REGISTRO, 05 NOME, 10 PRIMEIRO-NOME",
          "88 REGISTRO, 01 NOME, 05 SOBRENOME"
        ],
        "correct": 0
      },
      "en": {
        "question": "Which of the options below represents the correct hierarchy level of group variables and child fields?",
        "options": [
          "01 RECORD, 05 NAME, 10 FIRST-NAME",
          "05 RECORD, 01 NAME, 77 LAST-NAME",
          "77 RECORD, 05 NAME, 10 FIRST-NAME",
          "88 RECORD, 01 NAME, 05 LAST-NAME"
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual caractere representa dígitos numéricos na cláusula PICTURE?",
        "options": [
          "9",
          "X",
          "A",
          "N"
        ],
        "correct": 0
      },
      "en": {
        "question": "Which character represents numeric digits in the PICTURE clause?",
        "options": [
          "9",
          "X",
          "A",
          "N"
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "O que indica a declaração PIC A(5) no COBOL?",
        "options": [
          "Variável numérica",
          "Variável estritamente alfabética (A-Z, a-z e espaços)",
          "Variável hexadecimal",
          "Variável compactada COMP-3"
        ],
        "correct": 1
      },
      "en": {
        "question": "What does the declaration PIC A(5) indicate in COBOL?",
        "options": [
          "Numeric variable",
          "Strictly alphabetic variable (A-Z, a-z, and spaces)",
          "Hexadecimal variable",
          "COMP-3 packed variable"
        ],
        "correct": 1
      }
    }
  ],
  "p1_mon_t3": [
    {
      "pt": {
        "question": "Onde é declarada a associação entre o nome lógico de um arquivo no COBOL e o nome do arquivo físico do sistema?",
        "options": [
          "Na FILE SECTION",
          "No parágrafo FILE-CONTROL na INPUT-OUTPUT SECTION",
          "Na WORKING-STORAGE SECTION",
          "Na PROCEDURE DIVISION"
        ],
        "correct": 1
      },
      "en": {
        "question": "Where is the mapping between a COBOL logical file name and the physical system file declared?",
        "options": [
          "In the FILE SECTION",
          "In the FILE-CONTROL paragraph of the INPUT-OUTPUT SECTION",
          "In the WORKING-STORAGE SECTION",
          "In the PROCEDURE DIVISION"
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Na cláusula SELECT do FILE-CONTROL, para que serve o comando ASSIGN TO?",
        "options": [
          "Para abrir o arquivo",
          "Para associar o arquivo lógico a uma variável JCL ou arquivo físico",
          "Para deletar o arquivo",
          "Para escrever registros"
        ],
        "correct": 1
      },
      "en": {
        "question": "In the SELECT clause of FILE-CONTROL, what is the purpose of ASSIGN TO?",
        "options": [
          "Open the file",
          "Associate the logical file with a JCL variable or physical file",
          "Delete the file",
          "Write records"
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Em qual seção da DATA DIVISION é especificado o layout detalhado do registro do arquivo?",
        "options": [
          "WORKING-STORAGE SECTION",
          "FILE SECTION",
          "LINKAGE SECTION",
          "SCREEN SECTION"
        ],
        "correct": 1
      },
      "en": {
        "question": "In which section of the DATA DIVISION is the detailed record layout of the file specified?",
        "options": [
          "WORKING-STORAGE SECTION",
          "FILE SECTION",
          "LINKAGE SECTION",
          "SCREEN SECTION"
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "O que significa a sigla FD na FILE SECTION?",
        "options": [
          "File Definition",
          "File Description",
          "File Details",
          "File Driver"
        ],
        "correct": 1
      },
      "en": {
        "question": "What does the acronym FD stand for in the FILE SECTION?",
        "options": [
          "File Definition",
          "File Description",
          "File Details",
          "File Driver"
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual cláusula no bloco FD define o tamanho físico dos blocos do arquivo no disco?",
        "options": [
          "RECORD CONTAINS",
          "BLOCK CONTAINS",
          "LABEL RECORDS",
          "DATA RECORD IS"
        ],
        "correct": 1
      },
      "en": {
        "question": "Which clause in the FD block defines the physical size of blocks on the disk?",
        "options": [
          "RECORD CONTAINS",
          "BLOCK CONTAINS",
          "LABEL RECORDS",
          "DATA RECORD IS"
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Para processar e ler dados de um arquivo no COBOL, qual o primeiro comando a executar na PROCEDURE DIVISION?",
        "options": [
          "READ filename",
          "OPEN INPUT filename",
          "START filename",
          "MOVE filename"
        ],
        "correct": 1
      },
      "en": {
        "question": "To process and read data from a file in COBOL, what is the first command to execute in the PROCEDURE DIVISION?",
        "options": [
          "READ filename",
          "OPEN INPUT filename",
          "START filename",
          "MOVE filename"
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual comando é usado para ler um registro sequencialmente de um arquivo aberto como INPUT?",
        "options": [
          "GET filename",
          "READ filename NEXT",
          "READ filename INTO record-area",
          "FETCH filename"
        ],
        "correct": 2
      },
      "en": {
        "question": "Which command is used to read a record sequentially from a file opened as INPUT?",
        "options": [
          "GET filename",
          "READ filename NEXT",
          "READ filename INTO record-area",
          "FETCH filename"
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que faz a cláusula FILE STATUS IS na declaração SELECT?",
        "options": [
          "Mede a velocidade de leitura do disco",
          "Associa uma variável de 2 bytes para armazenar os códigos de retorno das operações do arquivo (ex: 00, 10)",
          "Exclui o arquivo em caso de erro",
          "Mapeia as chaves primárias"
        ],
        "correct": 1
      },
      "en": {
        "question": "What does the FILE STATUS IS clause do in the SELECT statement?",
        "options": [
          "Measures disk read speed",
          "Associates a 2-byte variable to store return codes from file operations (e.g., 00, 10)",
          "Deletes the file in case of error",
          "Maps primary keys"
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o código padrão de FILE STATUS que indica que o fim do arquivo (EOF) foi alcançado?",
        "options": [
          "00",
          "10",
          "23",
          "35"
        ],
        "correct": 1
      },
      "en": {
        "question": "What is the standard FILE STATUS code indicating that the End of File (EOF) has been reached?",
        "options": [
          "00",
          "10",
          "23",
          "35"
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Por que é fundamental executar o comando CLOSE filename no COBOL?",
        "options": [
          "Para compilar o programa",
          "Para salvar e fechar os buffers pendentes do arquivo e liberar bloqueios no sistema operacional",
          "Para apagar a memória RAM do computador",
          "Para resetar as variáveis de Working-Storage"
        ],
        "correct": 1
      },
      "en": {
        "question": "Why is it fundamental to execute the CLOSE filename command in COBOL?",
        "options": [
          "To compile the program",
          "To flush and close pending file buffers and release OS locks",
          "To wipe computer RAM",
          "To reset Working-Storage variables"
        ],
        "correct": 1
      }
    }
  ],
  "p1_tue_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de JDK no contexto de Java Sintaxe Base?",
        "options": [
          "Representa a base estrutural de JDK para assegurar corretude técnica em Java Sintaxe Base.",
          "Outro conceito incorreto sobre JDK.",
          "Definição incorreta de JDK no contexto corporativo.",
          "Resposta alternativa inválida para JDK."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of JDK in the context of Java Base Syntax?",
        "options": [
          "It represents the structural foundation of JDK to ensure technical correctness in Java Base Syntax.",
          "Another incorrect concept regarding JDK.",
          "Incorrect definition of JDK in enterprise context.",
          "Invalid alternative answer for JDK."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como JRE é aplicado corretamente na arquitetura de Java Sintaxe Base?",
        "options": [
          "Opção incorreta sobre JRE relacionada a Java Sintaxe Base.",
          "Outro conceito incorreto sobre JRE.",
          "Definição incorreta de JRE no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de JRE no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is JRE correctly applied in the architecture of Java Base Syntax?",
        "options": [
          "Incorrect option about JRE related to Java Base Syntax.",
          "Another incorrect concept regarding JRE.",
          "Incorrect definition of JRE in enterprise context.",
          "Through proper parameterization and loose coupling of JRE in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com primitivo?",
        "options": [
          "Opção incorreta sobre primitivo relacionada a Java Sintaxe Base.",
          "Outro conceito incorreto sobre primitivo.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de primitivo.",
          "Resposta alternativa inválida para primitivo."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with primitive?",
        "options": [
          "Incorrect option about primitive related to Java Base Syntax.",
          "Another incorrect concept regarding primitive.",
          "Ensure isolation and apply frequent testing to validate the behavior of primitive.",
          "Invalid alternative answer for primitive."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar casting no desenvolvimento?",
        "options": [
          "Opção incorreta sobre casting relacionada a Java Sintaxe Base.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em casting.",
          "Definição incorreta de casting no contexto corporativo.",
          "Resposta alternativa inválida para casting."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing casting in development?",
        "options": [
          "Incorrect option about casting related to Java Base Syntax.",
          "Hardcoding values and lack of proper exception handling in casting.",
          "Incorrect definition of casting in enterprise context.",
          "Invalid alternative answer for casting."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de byte em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre byte.",
          "Definição incorreta de byte no contexto corporativo.",
          "Resposta alternativa inválida para byte."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of byte in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding byte.",
          "Incorrect definition of byte in enterprise context.",
          "Invalid alternative answer for byte."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como short se integra com o restante da stack em Java Sintaxe Base?",
        "options": [
          "Opção incorreta sobre short relacionada a Java Sintaxe Base.",
          "Outro conceito incorreto sobre short.",
          "Definição incorreta de short no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does short integrate with the rest of the stack in Java Base Syntax?",
        "options": [
          "Incorrect option about short related to Java Base Syntax.",
          "Another incorrect concept regarding short.",
          "Incorrect definition of short in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em int?",
        "options": [
          "Opção incorreta sobre int relacionada a Java Sintaxe Base.",
          "Outro conceito incorreto sobre int.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para int."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in int?",
        "options": [
          "Incorrect option about int related to Java Base Syntax.",
          "Another incorrect concept regarding int.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for int."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de long é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre long relacionada a Java Sintaxe Base.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de long no contexto corporativo.",
          "Resposta alternativa inválida para long."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of long guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about long related to Java Base Syntax.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of long in enterprise context.",
          "Invalid alternative answer for long."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de final?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para final.",
          "Outro conceito incorreto sobre final.",
          "Definição incorreta de final no contexto corporativo.",
          "Resposta alternativa inválida para final."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of final?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for final.",
          "Another incorrect concept regarding final.",
          "Incorrect definition of final in enterprise context.",
          "Invalid alternative answer for final."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre operador e a escalabilidade de Java Sintaxe Base?",
        "options": [
          "Opção incorreta sobre operador relacionada a Java Sintaxe Base.",
          "Outro conceito incorreto sobre operador.",
          "Definição incorreta de operador no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de operador."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between operator and the scalability of Java Base Syntax?",
        "options": [
          "Incorrect option about operator related to Java Base Syntax.",
          "Another incorrect concept regarding operator.",
          "Incorrect definition of operator in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of operator."
        ],
        "correct": 3
      }
    }
  ],
  "p1_tue_t2": [
    {
      "pt": {
        "question": "Qual é o principal conceito de if no contexto de Java Estruturas Condicionais?",
        "options": [
          "Representa a base estrutural de if para assegurar corretude técnica em Java Estruturas Condicionais.",
          "Outro conceito incorreto sobre if.",
          "Definição incorreta de if no contexto corporativo.",
          "Resposta alternativa inválida para if."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of if in the context of Java Conditionals?",
        "options": [
          "It represents the structural foundation of if to ensure technical correctness in Java Conditionals.",
          "Another incorrect concept regarding if.",
          "Incorrect definition of if in enterprise context.",
          "Invalid alternative answer for if."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como else é aplicado corretamente na arquitetura de Java Estruturas Condicionais?",
        "options": [
          "Opção incorreta sobre else relacionada a Java Estruturas Condicionais.",
          "Outro conceito incorreto sobre else.",
          "Definição incorreta de else no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de else no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is else correctly applied in the architecture of Java Conditionals?",
        "options": [
          "Incorrect option about else related to Java Conditionals.",
          "Another incorrect concept regarding else.",
          "Incorrect definition of else in enterprise context.",
          "Through proper parameterization and loose coupling of else in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com switch?",
        "options": [
          "Opção incorreta sobre switch relacionada a Java Estruturas Condicionais.",
          "Outro conceito incorreto sobre switch.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de switch.",
          "Resposta alternativa inválida para switch."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with switch?",
        "options": [
          "Incorrect option about switch related to Java Conditionals.",
          "Another incorrect concept regarding switch.",
          "Ensure isolation and apply frequent testing to validate the behavior of switch.",
          "Invalid alternative answer for switch."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar case no desenvolvimento?",
        "options": [
          "Opção incorreta sobre case relacionada a Java Estruturas Condicionais.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em case.",
          "Definição incorreta de case no contexto corporativo.",
          "Resposta alternativa inválida para case."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing case in development?",
        "options": [
          "Incorrect option about case related to Java Conditionals.",
          "Hardcoding values and lack of proper exception handling in case.",
          "Incorrect definition of case in enterprise context.",
          "Invalid alternative answer for case."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de break em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre break.",
          "Definição incorreta de break no contexto corporativo.",
          "Resposta alternativa inválida para break."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of break in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding break.",
          "Incorrect definition of break in enterprise context.",
          "Invalid alternative answer for break."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como condicional se integra com o restante da stack em Java Estruturas Condicionais?",
        "options": [
          "Opção incorreta sobre condicional relacionada a Java Estruturas Condicionais.",
          "Outro conceito incorreto sobre condicional.",
          "Definição incorreta de condicional no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does conditional integrate with the rest of the stack in Java Conditionals?",
        "options": [
          "Incorrect option about conditional related to Java Conditionals.",
          "Another incorrect concept regarding conditional.",
          "Incorrect definition of conditional in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em boolean?",
        "options": [
          "Opção incorreta sobre boolean relacionada a Java Estruturas Condicionais.",
          "Outro conceito incorreto sobre boolean.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para boolean."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in boolean?",
        "options": [
          "Incorrect option about boolean related to Java Conditionals.",
          "Another incorrect concept regarding boolean.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for boolean."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de default é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre default relacionada a Java Estruturas Condicionais.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de default no contexto corporativo.",
          "Resposta alternativa inválida para default."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of default guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about default related to Java Conditionals.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of default in enterprise context.",
          "Invalid alternative answer for default."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de ternario?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para ternario.",
          "Outro conceito incorreto sobre ternario.",
          "Definição incorreta de ternario no contexto corporativo.",
          "Resposta alternativa inválida para ternario."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of ternary?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for ternary.",
          "Another incorrect concept regarding ternary.",
          "Incorrect definition of ternary in enterprise context.",
          "Invalid alternative answer for ternary."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre if-else e a escalabilidade de Java Estruturas Condicionais?",
        "options": [
          "Opção incorreta sobre if-else relacionada a Java Estruturas Condicionais.",
          "Outro conceito incorreto sobre if-else.",
          "Definição incorreta de if-else no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de if-else."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between if-else and the scalability of Java Conditionals?",
        "options": [
          "Incorrect option about if-else related to Java Conditionals.",
          "Another incorrect concept regarding if-else.",
          "Incorrect definition of if-else in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of if-else."
        ],
        "correct": 3
      }
    }
  ],
  "p1_tue_t3": [
    {
      "pt": {
        "question": "Qual é o principal conceito de for no contexto de Java Estruturas Repetição?",
        "options": [
          "Representa a base estrutural de for para assegurar corretude técnica em Java Estruturas Repetição.",
          "Outro conceito incorreto sobre for.",
          "Definição incorreta de for no contexto corporativo.",
          "Resposta alternativa inválida para for."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of for in the context of Java Loops?",
        "options": [
          "It represents the structural foundation of for to ensure technical correctness in Java Loops.",
          "Another incorrect concept regarding for.",
          "Incorrect definition of for in enterprise context.",
          "Invalid alternative answer for for."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como while é aplicado corretamente na arquitetura de Java Estruturas Repetição?",
        "options": [
          "Opção incorreta sobre while relacionada a Java Estruturas Repetição.",
          "Outro conceito incorreto sobre while.",
          "Definição incorreta de while no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de while no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is while correctly applied in the architecture of Java Loops?",
        "options": [
          "Incorrect option about while related to Java Loops.",
          "Another incorrect concept regarding while.",
          "Incorrect definition of while in enterprise context.",
          "Through proper parameterization and loose coupling of while in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com do-while?",
        "options": [
          "Opção incorreta sobre do-while relacionada a Java Estruturas Repetição.",
          "Outro conceito incorreto sobre do-while.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de do-while.",
          "Resposta alternativa inválida para do-while."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with do-while?",
        "options": [
          "Incorrect option about do-while related to Java Loops.",
          "Another incorrect concept regarding do-while.",
          "Ensure isolation and apply frequent testing to validate the behavior of do-while.",
          "Invalid alternative answer for do-while."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar loop no desenvolvimento?",
        "options": [
          "Opção incorreta sobre loop relacionada a Java Estruturas Repetição.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em loop.",
          "Definição incorreta de loop no contexto corporativo.",
          "Resposta alternativa inválida para loop."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing loop in development?",
        "options": [
          "Incorrect option about loop related to Java Loops.",
          "Hardcoding values and lack of proper exception handling in loop.",
          "Incorrect definition of loop in enterprise context.",
          "Invalid alternative answer for loop."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de laço em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre laço.",
          "Definição incorreta de laço no contexto corporativo.",
          "Resposta alternativa inválida para laço."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of break in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding break.",
          "Incorrect definition of break in enterprise context.",
          "Invalid alternative answer for break."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como break se integra com o restante da stack em Java Estruturas Repetição?",
        "options": [
          "Opção incorreta sobre break relacionada a Java Estruturas Repetição.",
          "Outro conceito incorreto sobre break.",
          "Definição incorreta de break no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does continue integrate with the rest of the stack in Java Loops?",
        "options": [
          "Incorrect option about continue related to Java Loops.",
          "Another incorrect concept regarding continue.",
          "Incorrect definition of continue in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em continue?",
        "options": [
          "Opção incorreta sobre continue relacionada a Java Estruturas Repetição.",
          "Outro conceito incorreto sobre continue.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para continue."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in iteration?",
        "options": [
          "Incorrect option about iteration related to Java Loops.",
          "Another incorrect concept regarding iteration.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for iteration."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de iteração é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre iteração relacionada a Java Estruturas Repetição.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de iteração no contexto corporativo.",
          "Resposta alternativa inválida para iteração."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of condition guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about condition related to Java Loops.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of condition in enterprise context.",
          "Invalid alternative answer for condition."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de condição?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para condição.",
          "Outro conceito incorreto sobre condição.",
          "Definição incorreta de condição no contexto corporativo.",
          "Resposta alternativa inválida para condição."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of infinite?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for infinite.",
          "Another incorrect concept regarding infinite.",
          "Incorrect definition of infinite in enterprise context.",
          "Invalid alternative answer for infinite."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre infinito e a escalabilidade de Java Estruturas Repetição?",
        "options": [
          "Opção incorreta sobre infinito relacionada a Java Estruturas Repetição.",
          "Outro conceito incorreto sobre infinito.",
          "Definição incorreta de infinito no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de infinito."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between nested and the scalability of Java Loops?",
        "options": [
          "Incorrect option about nested related to Java Loops.",
          "Another incorrect concept regarding nested.",
          "Incorrect definition of nested in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of nested."
        ],
        "correct": 3
      }
    }
  ],
  "p1_wed_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de SGBD no contexto de Introdução a Bancos de Dados?",
        "options": [
          "Representa a base estrutural de SGBD para assegurar corretude técnica em Introdução a Bancos de Dados.",
          "Outro conceito incorreto sobre SGBD.",
          "Definição incorreta de SGBD no contexto corporativo.",
          "Resposta alternativa inválida para SGBD."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of DBMS in the context of Intro to Databases?",
        "options": [
          "It represents the structural foundation of DBMS to ensure technical correctness in Intro to Databases.",
          "Another incorrect concept regarding DBMS.",
          "Incorrect definition of DBMS in enterprise context.",
          "Invalid alternative answer for DBMS."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como tabela é aplicado corretamente na arquitetura de Introdução a Bancos de Dados?",
        "options": [
          "Opção incorreta sobre tabela relacionada a Introdução a Bancos de Dados.",
          "Outro conceito incorreto sobre tabela.",
          "Definição incorreta de tabela no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de tabela no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is table correctly applied in the architecture of Intro to Databases?",
        "options": [
          "Incorrect option about table related to Intro to Databases.",
          "Another incorrect concept regarding table.",
          "Incorrect definition of table in enterprise context.",
          "Through proper parameterization and loose coupling of table in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com coluna?",
        "options": [
          "Opção incorreta sobre coluna relacionada a Introdução a Bancos de Dados.",
          "Outro conceito incorreto sobre coluna.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de coluna.",
          "Resposta alternativa inválida para coluna."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with column?",
        "options": [
          "Incorrect option about column related to Intro to Databases.",
          "Another incorrect concept regarding column.",
          "Ensure isolation and apply frequent testing to validate the behavior of column.",
          "Invalid alternative answer for column."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar registro no desenvolvimento?",
        "options": [
          "Opção incorreta sobre registro relacionada a Introdução a Bancos de Dados.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em registro.",
          "Definição incorreta de registro no contexto corporativo.",
          "Resposta alternativa inválida para registro."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing record in development?",
        "options": [
          "Incorrect option about record related to Intro to Databases.",
          "Hardcoding values and lack of proper exception handling in record.",
          "Incorrect definition of record in enterprise context.",
          "Invalid alternative answer for record."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de chave primária em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre chave primária.",
          "Definição incorreta de chave primária no contexto corporativo.",
          "Resposta alternativa inválida para chave primária."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of primary key in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding primary key.",
          "Incorrect definition of primary key in enterprise context.",
          "Invalid alternative answer for primary key."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como PK se integra com o restante da stack em Introdução a Bancos de Dados?",
        "options": [
          "Opção incorreta sobre PK relacionada a Introdução a Bancos de Dados.",
          "Outro conceito incorreto sobre PK.",
          "Definição incorreta de PK no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does PK integrate with the rest of the stack in Intro to Databases?",
        "options": [
          "Incorrect option about PK related to Intro to Databases.",
          "Another incorrect concept regarding PK.",
          "Incorrect definition of PK in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em relacional?",
        "options": [
          "Opção incorreta sobre relacional relacionada a Introdução a Bancos de Dados.",
          "Outro conceito incorreto sobre relacional.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para relacional."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in relational?",
        "options": [
          "Incorrect option about relational related to Intro to Databases.",
          "Another incorrect concept regarding relational.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for relational."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de schema é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre schema relacionada a Introdução a Bancos de Dados.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de schema no contexto corporativo.",
          "Resposta alternativa inválida para schema."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of schema guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about schema related to Intro to Databases.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of schema in enterprise context.",
          "Invalid alternative answer for schema."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de campo?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para campo.",
          "Outro conceito incorreto sobre campo.",
          "Definição incorreta de campo no contexto corporativo.",
          "Resposta alternativa inválida para campo."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of field?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for field.",
          "Another incorrect concept regarding field.",
          "Incorrect definition of field in enterprise context.",
          "Invalid alternative answer for field."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre dado e a escalabilidade de Introdução a Bancos de Dados?",
        "options": [
          "Opção incorreta sobre dado relacionada a Introdução a Bancos de Dados.",
          "Outro conceito incorreto sobre dado.",
          "Definição incorreta de dado no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de dado."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between data and the scalability of Intro to Databases?",
        "options": [
          "Incorrect option about data related to Intro to Databases.",
          "Another incorrect concept regarding data.",
          "Incorrect definition of data in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of data."
        ],
        "correct": 3
      }
    }
  ],
  "p1_wed_t2": [
    {
      "pt": {
        "question": "Qual é o principal conceito de SELECT no contexto de SQL Leitura Básica?",
        "options": [
          "Representa a base estrutural de SELECT para assegurar corretude técnica em SQL Leitura Básica.",
          "Outro conceito incorreto sobre SELECT.",
          "Definição incorreta de SELECT no contexto corporativo.",
          "Resposta alternativa inválida para SELECT."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of SELECT in the context of SQL Basic Reading?",
        "options": [
          "It represents the structural foundation of SELECT to ensure technical correctness in SQL Basic Reading.",
          "Another incorrect concept regarding SELECT.",
          "Incorrect definition of SELECT in enterprise context.",
          "Invalid alternative answer for SELECT."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como FROM é aplicado corretamente na arquitetura de SQL Leitura Básica?",
        "options": [
          "Opção incorreta sobre FROM relacionada a SQL Leitura Básica.",
          "Outro conceito incorreto sobre FROM.",
          "Definição incorreta de FROM no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de FROM no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is FROM correctly applied in the architecture of SQL Basic Reading?",
        "options": [
          "Incorrect option about FROM related to SQL Basic Reading.",
          "Another incorrect concept regarding FROM.",
          "Incorrect definition of FROM in enterprise context.",
          "Through proper parameterization and loose coupling of FROM in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com coluna?",
        "options": [
          "Opção incorreta sobre coluna relacionada a SQL Leitura Básica.",
          "Outro conceito incorreto sobre coluna.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de coluna.",
          "Resposta alternativa inválida para coluna."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with column?",
        "options": [
          "Incorrect option about column related to SQL Basic Reading.",
          "Another incorrect concept regarding column.",
          "Ensure isolation and apply frequent testing to validate the behavior of column.",
          "Invalid alternative answer for column."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar projeção no desenvolvimento?",
        "options": [
          "Opção incorreta sobre projeção relacionada a SQL Leitura Básica.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em projeção.",
          "Definição incorreta de projeção no contexto corporativo.",
          "Resposta alternativa inválida para projeção."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing projection in development?",
        "options": [
          "Incorrect option about projection related to SQL Basic Reading.",
          "Hardcoding values and lack of proper exception handling in projection.",
          "Incorrect definition of projection in enterprise context.",
          "Invalid alternative answer for projection."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de asterisco em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre asterisco.",
          "Definição incorreta de asterisco no contexto corporativo.",
          "Resposta alternativa inválida para asterisco."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of asterisk in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding asterisk.",
          "Incorrect definition of asterisk in enterprise context.",
          "Invalid alternative answer for asterisk."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como consulta se integra com o restante da stack em SQL Leitura Básica?",
        "options": [
          "Opção incorreta sobre consulta relacionada a SQL Leitura Básica.",
          "Outro conceito incorreto sobre consulta.",
          "Definição incorreta de consulta no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does query integrate with the rest of the stack in SQL Basic Reading?",
        "options": [
          "Incorrect option about query related to SQL Basic Reading.",
          "Another incorrect concept regarding query.",
          "Incorrect definition of query in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em read?",
        "options": [
          "Opção incorreta sobre read relacionada a SQL Leitura Básica.",
          "Outro conceito incorreto sobre read.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para read."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in read?",
        "options": [
          "Incorrect option about read related to SQL Basic Reading.",
          "Another incorrect concept regarding read.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for read."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de isolada é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre isolada relacionada a SQL Leitura Básica.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de isolada no contexto corporativo.",
          "Resposta alternativa inválida para isolada."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of isolated guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about isolated related to SQL Basic Reading.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of isolated in enterprise context.",
          "Invalid alternative answer for isolated."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de tabela?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para tabela.",
          "Outro conceito incorreto sobre tabela.",
          "Definição incorreta de tabela no contexto corporativo.",
          "Resposta alternativa inválida para tabela."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of table?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for table.",
          "Another incorrect concept regarding table.",
          "Incorrect definition of table in enterprise context.",
          "Invalid alternative answer for table."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre query e a escalabilidade de SQL Leitura Básica?",
        "options": [
          "Opção incorreta sobre query relacionada a SQL Leitura Básica.",
          "Outro conceito incorreto sobre query.",
          "Definição incorreta de query no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de query."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between alias and the scalability of SQL Basic Reading?",
        "options": [
          "Incorrect option about alias related to SQL Basic Reading.",
          "Another incorrect concept regarding alias.",
          "Incorrect definition of alias in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of alias."
        ],
        "correct": 3
      }
    }
  ],
  "p1_wed_t3": [
    {
      "pt": {
        "question": "Qual é o principal conceito de WHERE no contexto de SQL Filtragem?",
        "options": [
          "Representa a base estrutural de WHERE para assegurar corretude técnica em SQL Filtragem.",
          "Outro conceito incorreto sobre WHERE.",
          "Definição incorreta de WHERE no contexto corporativo.",
          "Resposta alternativa inválida para WHERE."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of WHERE in the context of SQL Filtering?",
        "options": [
          "It represents the structural foundation of WHERE to ensure technical correctness in SQL Filtering.",
          "Another incorrect concept regarding WHERE.",
          "Incorrect definition of WHERE in enterprise context.",
          "Invalid alternative answer for WHERE."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como filtro é aplicado corretamente na arquitetura de SQL Filtragem?",
        "options": [
          "Opção incorreta sobre filtro relacionada a SQL Filtragem.",
          "Outro conceito incorreto sobre filtro.",
          "Definição incorreta de filtro no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de filtro no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is filter correctly applied in the architecture of SQL Filtering?",
        "options": [
          "Incorrect option about filter related to SQL Filtering.",
          "Another incorrect concept regarding filter.",
          "Incorrect definition of filter in enterprise context.",
          "Through proper parameterization and loose coupling of filter in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com AND?",
        "options": [
          "Opção incorreta sobre AND relacionada a SQL Filtragem.",
          "Outro conceito incorreto sobre AND.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de AND.",
          "Resposta alternativa inválida para AND."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with AND?",
        "options": [
          "Incorrect option about AND related to SQL Filtering.",
          "Another incorrect concept regarding AND.",
          "Ensure isolation and apply frequent testing to validate the behavior of AND.",
          "Invalid alternative answer for AND."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar OR no desenvolvimento?",
        "options": [
          "Opção incorreta sobre OR relacionada a SQL Filtragem.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em OR.",
          "Definição incorreta de OR no contexto corporativo.",
          "Resposta alternativa inválida para OR."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing OR in development?",
        "options": [
          "Incorrect option about OR related to SQL Filtering.",
          "Hardcoding values and lack of proper exception handling in OR.",
          "Incorrect definition of OR in enterprise context.",
          "Invalid alternative answer for OR."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de LIKE em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre LIKE.",
          "Definição incorreta de LIKE no contexto corporativo.",
          "Resposta alternativa inválida para LIKE."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of LIKE in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding LIKE.",
          "Incorrect definition of LIKE in enterprise context.",
          "Invalid alternative answer for LIKE."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como IN se integra com o restante da stack em SQL Filtragem?",
        "options": [
          "Opção incorreta sobre IN relacionada a SQL Filtragem.",
          "Outro conceito incorreto sobre IN.",
          "Definição incorreta de IN no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does IN integrate with the rest of the stack in SQL Filtering?",
        "options": [
          "Incorrect option about IN related to SQL Filtering.",
          "Another incorrect concept regarding IN.",
          "Incorrect definition of IN in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em BETWEEN?",
        "options": [
          "Opção incorreta sobre BETWEEN relacionada a SQL Filtragem.",
          "Outro conceito incorreto sobre BETWEEN.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para BETWEEN."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in BETWEEN?",
        "options": [
          "Incorrect option about BETWEEN related to SQL Filtering.",
          "Another incorrect concept regarding BETWEEN.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for BETWEEN."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de comparação é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre comparação relacionada a SQL Filtragem.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de comparação no contexto corporativo.",
          "Resposta alternativa inválida para comparação."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of comparison guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about comparison related to SQL Filtering.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of comparison in enterprise context.",
          "Invalid alternative answer for comparison."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de NULL?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para NULL.",
          "Outro conceito incorreto sobre NULL.",
          "Definição incorreta de NULL no contexto corporativo.",
          "Resposta alternativa inválida para NULL."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of NULL?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for NULL.",
          "Another incorrect concept regarding NULL.",
          "Incorrect definition of NULL in enterprise context.",
          "Invalid alternative answer for NULL."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre condição e a escalabilidade de SQL Filtragem?",
        "options": [
          "Opção incorreta sobre condição relacionada a SQL Filtragem.",
          "Outro conceito incorreto sobre condição.",
          "Definição incorreta de condição no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de condição."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between condition and the scalability of SQL Filtering?",
        "options": [
          "Incorrect option about condition related to SQL Filtering.",
          "Another incorrect concept regarding condition.",
          "Incorrect definition of condition in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of condition."
        ],
        "correct": 3
      }
    }
  ],
  "p1_thu_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de INSERT no contexto de SQL DML Escrita?",
        "options": [
          "Representa a base estrutural de INSERT para assegurar corretude técnica em SQL DML Escrita.",
          "Outro conceito incorreto sobre INSERT.",
          "Definição incorreta de INSERT no contexto corporativo.",
          "Resposta alternativa inválida para INSERT."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of INSERT in the context of SQL DML Writing?",
        "options": [
          "It represents the structural foundation of INSERT to ensure technical correctness in SQL DML Writing.",
          "Another incorrect concept regarding INSERT.",
          "Incorrect definition of INSERT in enterprise context.",
          "Invalid alternative answer for INSERT."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como UPDATE é aplicado corretamente na arquitetura de SQL DML Escrita?",
        "options": [
          "Opção incorreta sobre UPDATE relacionada a SQL DML Escrita.",
          "Outro conceito incorreto sobre UPDATE.",
          "Definição incorreta de UPDATE no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de UPDATE no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is UPDATE correctly applied in the architecture of SQL DML Writing?",
        "options": [
          "Incorrect option about UPDATE related to SQL DML Writing.",
          "Another incorrect concept regarding UPDATE.",
          "Incorrect definition of UPDATE in enterprise context.",
          "Through proper parameterization and loose coupling of UPDATE in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com DELETE?",
        "options": [
          "Opção incorreta sobre DELETE relacionada a SQL DML Escrita.",
          "Outro conceito incorreto sobre DELETE.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de DELETE.",
          "Resposta alternativa inválida para DELETE."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with DELETE?",
        "options": [
          "Incorrect option about DELETE related to SQL DML Writing.",
          "Another incorrect concept regarding DELETE.",
          "Ensure isolation and apply frequent testing to validate the behavior of DELETE.",
          "Invalid alternative answer for DELETE."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar SET no desenvolvimento?",
        "options": [
          "Opção incorreta sobre SET relacionada a SQL DML Escrita.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em SET.",
          "Definição incorreta de SET no contexto corporativo.",
          "Resposta alternativa inválida para SET."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing SET in development?",
        "options": [
          "Incorrect option about SET related to SQL DML Writing.",
          "Hardcoding values and lack of proper exception handling in SET.",
          "Incorrect definition of SET in enterprise context.",
          "Invalid alternative answer for SET."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de VALUES em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre VALUES.",
          "Definição incorreta de VALUES no contexto corporativo.",
          "Resposta alternativa inválida para VALUES."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of VALUES in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding VALUES.",
          "Incorrect definition of VALUES in enterprise context.",
          "Invalid alternative answer for VALUES."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como WHERE se integra com o restante da stack em SQL DML Escrita?",
        "options": [
          "Opção incorreta sobre WHERE relacionada a SQL DML Escrita.",
          "Outro conceito incorreto sobre WHERE.",
          "Definição incorreta de WHERE no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does WHERE integrate with the rest of the stack in SQL DML Writing?",
        "options": [
          "Incorrect option about WHERE related to SQL DML Writing.",
          "Another incorrect concept regarding WHERE.",
          "Incorrect definition of WHERE in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em modificar?",
        "options": [
          "Opção incorreta sobre modificar relacionada a SQL DML Escrita.",
          "Outro conceito incorreto sobre modificar.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para modificar."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in modify?",
        "options": [
          "Incorrect option about modify related to SQL DML Writing.",
          "Another incorrect concept regarding modify.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for modify."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de deletar é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre deletar relacionada a SQL DML Escrita.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de deletar no contexto corporativo.",
          "Resposta alternativa inválida para deletar."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of delete guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about delete related to SQL DML Writing.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of delete in enterprise context.",
          "Invalid alternative answer for delete."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de adicionar?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para adicionar.",
          "Outro conceito incorreto sobre adicionar.",
          "Definição incorreta de adicionar no contexto corporativo.",
          "Resposta alternativa inválida para adicionar."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of add?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for add.",
          "Another incorrect concept regarding add.",
          "Incorrect definition of add in enterprise context.",
          "Invalid alternative answer for add."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre DML e a escalabilidade de SQL DML Escrita?",
        "options": [
          "Opção incorreta sobre DML relacionada a SQL DML Escrita.",
          "Outro conceito incorreto sobre DML.",
          "Definição incorreta de DML no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de DML."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between DML and the scalability of SQL DML Writing?",
        "options": [
          "Incorrect option about DML related to SQL DML Writing.",
          "Another incorrect concept regarding DML.",
          "Incorrect definition of DML in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of DML."
        ],
        "correct": 3
      }
    }
  ],
  "p1_thu_t2": [
    {
      "pt": {
        "question": "Qual é o principal conceito de ORDER BY no contexto de SQL Ordenação e Limitação?",
        "options": [
          "Representa a base estrutural de ORDER BY para assegurar corretude técnica em SQL Ordenação e Limitação.",
          "Outro conceito incorreto sobre ORDER BY.",
          "Definição incorreta de ORDER BY no contexto corporativo.",
          "Resposta alternativa inválida para ORDER BY."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of ORDER BY in the context of SQL Sorting & Limits?",
        "options": [
          "It represents the structural foundation of ORDER BY to ensure technical correctness in SQL Sorting & Limits.",
          "Another incorrect concept regarding ORDER BY.",
          "Incorrect definition of ORDER BY in enterprise context.",
          "Invalid alternative answer for ORDER BY."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como ASC é aplicado corretamente na arquitetura de SQL Ordenação e Limitação?",
        "options": [
          "Opção incorreta sobre ASC relacionada a SQL Ordenação e Limitação.",
          "Outro conceito incorreto sobre ASC.",
          "Definição incorreta de ASC no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de ASC no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is ASC correctly applied in the architecture of SQL Sorting & Limits?",
        "options": [
          "Incorrect option about ASC related to SQL Sorting & Limits.",
          "Another incorrect concept regarding ASC.",
          "Incorrect definition of ASC in enterprise context.",
          "Through proper parameterization and loose coupling of ASC in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com DESC?",
        "options": [
          "Opção incorreta sobre DESC relacionada a SQL Ordenação e Limitação.",
          "Outro conceito incorreto sobre DESC.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de DESC.",
          "Resposta alternativa inválida para DESC."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with DESC?",
        "options": [
          "Incorrect option about DESC related to SQL Sorting & Limits.",
          "Another incorrect concept regarding DESC.",
          "Ensure isolation and apply frequent testing to validate the behavior of DESC.",
          "Invalid alternative answer for DESC."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar LIMIT no desenvolvimento?",
        "options": [
          "Opção incorreta sobre LIMIT relacionada a SQL Ordenação e Limitação.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em LIMIT.",
          "Definição incorreta de LIMIT no contexto corporativo.",
          "Resposta alternativa inválida para LIMIT."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing LIMIT in development?",
        "options": [
          "Incorrect option about LIMIT related to SQL Sorting & Limits.",
          "Hardcoding values and lack of proper exception handling in LIMIT.",
          "Incorrect definition of LIMIT in enterprise context.",
          "Invalid alternative answer for LIMIT."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de OFFSET em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre OFFSET.",
          "Definição incorreta de OFFSET no contexto corporativo.",
          "Resposta alternativa inválida para OFFSET."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of OFFSET in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding OFFSET.",
          "Incorrect definition of OFFSET in enterprise context.",
          "Invalid alternative answer for OFFSET."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como ordenação se integra com o restante da stack em SQL Ordenação e Limitação?",
        "options": [
          "Opção incorreta sobre ordenação relacionada a SQL Ordenação e Limitação.",
          "Outro conceito incorreto sobre ordenação.",
          "Definição incorreta de ordenação no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does sorting integrate with the rest of the stack in SQL Sorting & Limits?",
        "options": [
          "Incorrect option about sorting related to SQL Sorting & Limits.",
          "Another incorrect concept regarding sorting.",
          "Incorrect definition of sorting in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em limitar?",
        "options": [
          "Opção incorreta sobre limitar relacionada a SQL Ordenação e Limitação.",
          "Outro conceito incorreto sobre limitar.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para limitar."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in limit?",
        "options": [
          "Incorrect option about limit related to SQL Sorting & Limits.",
          "Another incorrect concept regarding limit.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for limit."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de top é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre top relacionada a SQL Ordenação e Limitação.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de top no contexto corporativo.",
          "Resposta alternativa inválida para top."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of top guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about top related to SQL Sorting & Limits.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of top in enterprise context.",
          "Invalid alternative answer for top."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de exibição?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para exibição.",
          "Outro conceito incorreto sobre exibição.",
          "Definição incorreta de exibição no contexto corporativo.",
          "Resposta alternativa inválida para exibição."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of view?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for view.",
          "Another incorrect concept regarding view.",
          "Incorrect definition of view in enterprise context.",
          "Invalid alternative answer for view."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre linhas e a escalabilidade de SQL Ordenação e Limitação?",
        "options": [
          "Opção incorreta sobre linhas relacionada a SQL Ordenação e Limitação.",
          "Outro conceito incorreto sobre linhas.",
          "Definição incorreta de linhas no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de linhas."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between rows and the scalability of SQL Sorting & Limits?",
        "options": [
          "Incorrect option about rows related to SQL Sorting & Limits.",
          "Another incorrect concept regarding rows.",
          "Incorrect definition of rows in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of rows."
        ],
        "correct": 3
      }
    }
  ],
  "p1_thu_t3": [
    {
      "pt": {
        "question": "Qual é o principal conceito de ADD no contexto de Lógica COBOL Batch?",
        "options": [
          "Representa a base estrutural de ADD para assegurar corretude técnica em Lógica COBOL Batch.",
          "Outro conceito incorreto sobre ADD.",
          "Definição incorreta de ADD no contexto corporativo.",
          "Resposta alternativa inválida para ADD."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of ADD in the context of COBOL Batch Logic?",
        "options": [
          "It represents the structural foundation of ADD to ensure technical correctness in COBOL Batch Logic.",
          "Another incorrect concept regarding ADD.",
          "Incorrect definition of ADD in enterprise context.",
          "Invalid alternative answer for ADD."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como SUBTRACT é aplicado corretamente na arquitetura de Lógica COBOL Batch?",
        "options": [
          "Opção incorreta sobre SUBTRACT relacionada a Lógica COBOL Batch.",
          "Outro conceito incorreto sobre SUBTRACT.",
          "Definição incorreta de SUBTRACT no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de SUBTRACT no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is SUBTRACT correctly applied in the architecture of COBOL Batch Logic?",
        "options": [
          "Incorrect option about SUBTRACT related to COBOL Batch Logic.",
          "Another incorrect concept regarding SUBTRACT.",
          "Incorrect definition of SUBTRACT in enterprise context.",
          "Through proper parameterization and loose coupling of SUBTRACT in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com COMPUTE?",
        "options": [
          "Opção incorreta sobre COMPUTE relacionada a Lógica COBOL Batch.",
          "Outro conceito incorreto sobre COMPUTE.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de COMPUTE.",
          "Resposta alternativa inválida para COMPUTE."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with COMPUTE?",
        "options": [
          "Incorrect option about COMPUTE related to COBOL Batch Logic.",
          "Another incorrect concept regarding COMPUTE.",
          "Ensure isolation and apply frequent testing to validate the behavior of COMPUTE.",
          "Invalid alternative answer for COMPUTE."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar EVALUATE no desenvolvimento?",
        "options": [
          "Opção incorreta sobre EVALUATE relacionada a Lógica COBOL Batch.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em EVALUATE.",
          "Definição incorreta de EVALUATE no contexto corporativo.",
          "Resposta alternativa inválida para EVALUATE."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing EVALUATE in development?",
        "options": [
          "Incorrect option about EVALUATE related to COBOL Batch Logic.",
          "Hardcoding values and lack of proper exception handling in EVALUATE.",
          "Incorrect definition of EVALUATE in enterprise context.",
          "Invalid alternative answer for EVALUATE."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de arithmetic em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre arithmetic.",
          "Definição incorreta de arithmetic no contexto corporativo.",
          "Resposta alternativa inválida para arithmetic."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of arithmetic in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding arithmetic.",
          "Incorrect definition of arithmetic in enterprise context.",
          "Invalid alternative answer for arithmetic."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como cálculo se integra com o restante da stack em Lógica COBOL Batch?",
        "options": [
          "Opção incorreta sobre cálculo relacionada a Lógica COBOL Batch.",
          "Outro conceito incorreto sobre cálculo.",
          "Definição incorreta de cálculo no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does calculation integrate with the rest of the stack in COBOL Batch Logic?",
        "options": [
          "Incorrect option about calculation related to COBOL Batch Logic.",
          "Another incorrect concept regarding calculation.",
          "Incorrect definition of calculation in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em operadores?",
        "options": [
          "Opção incorreta sobre operadores relacionada a Lógica COBOL Batch.",
          "Outro conceito incorreto sobre operadores.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para operadores."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in operators?",
        "options": [
          "Incorrect option about operators related to COBOL Batch Logic.",
          "Another incorrect concept regarding operators.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for operators."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de TO é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre TO relacionada a Lógica COBOL Batch.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de TO no contexto corporativo.",
          "Resposta alternativa inválida para TO."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of TO guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about TO related to COBOL Batch Logic.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of TO in enterprise context.",
          "Invalid alternative answer for TO."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de GIVING?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para GIVING.",
          "Outro conceito incorreto sobre GIVING.",
          "Definição incorreta de GIVING no contexto corporativo.",
          "Resposta alternativa inválida para GIVING."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of GIVING?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for GIVING.",
          "Another incorrect concept regarding GIVING.",
          "Incorrect definition of GIVING in enterprise context.",
          "Invalid alternative answer for GIVING."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre batch e a escalabilidade de Lógica COBOL Batch?",
        "options": [
          "Opção incorreta sobre batch relacionada a Lógica COBOL Batch.",
          "Outro conceito incorreto sobre batch.",
          "Definição incorreta de batch no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de batch."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between batch and the scalability of COBOL Batch Logic?",
        "options": [
          "Incorrect option about batch related to COBOL Batch Logic.",
          "Another incorrect concept regarding batch.",
          "Incorrect definition of batch in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of batch."
        ],
        "correct": 3
      }
    }
  ],
  "p1_fri_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de Git no contexto de Git e Controle de Versão?",
        "options": [
          "Representa a base estrutural de Git para assegurar corretude técnica em Git e Controle de Versão.",
          "Outro conceito incorreto sobre Git.",
          "Definição incorreta de Git no contexto corporativo.",
          "Resposta alternativa inválida para Git."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of Git in the context of Git & Version Control?",
        "options": [
          "It represents the structural foundation of Git to ensure technical correctness in Git & Version Control.",
          "Another incorrect concept regarding Git.",
          "Incorrect definition of Git in enterprise context.",
          "Invalid alternative answer for Git."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como commit é aplicado corretamente na arquitetura de Git e Controle de Versão?",
        "options": [
          "Opção incorreta sobre commit relacionada a Git e Controle de Versão.",
          "Outro conceito incorreto sobre commit.",
          "Definição incorreta de commit no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de commit no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is commit correctly applied in the architecture of Git & Version Control?",
        "options": [
          "Incorrect option about commit related to Git & Version Control.",
          "Another incorrect concept regarding commit.",
          "Incorrect definition of commit in enterprise context.",
          "Through proper parameterization and loose coupling of commit in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com branch?",
        "options": [
          "Opção incorreta sobre branch relacionada a Git e Controle de Versão.",
          "Outro conceito incorreto sobre branch.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de branch.",
          "Resposta alternativa inválida para branch."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with branch?",
        "options": [
          "Incorrect option about branch related to Git & Version Control.",
          "Another incorrect concept regarding branch.",
          "Ensure isolation and apply frequent testing to validate the behavior of branch.",
          "Invalid alternative answer for branch."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar pull request no desenvolvimento?",
        "options": [
          "Opção incorreta sobre pull request relacionada a Git e Controle de Versão.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em pull request.",
          "Definição incorreta de pull request no contexto corporativo.",
          "Resposta alternativa inválida para pull request."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing pull request in development?",
        "options": [
          "Incorrect option about pull request related to Git & Version Control.",
          "Hardcoding values and lack of proper exception handling in pull request.",
          "Incorrect definition of pull request in enterprise context.",
          "Invalid alternative answer for pull request."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de PR em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre PR.",
          "Definição incorreta de PR no contexto corporativo.",
          "Resposta alternativa inválida para PR."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of PR in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding PR.",
          "Incorrect definition of PR in enterprise context.",
          "Invalid alternative answer for PR."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como merge se integra com o restante da stack em Git e Controle de Versão?",
        "options": [
          "Opção incorreta sobre merge relacionada a Git e Controle de Versão.",
          "Outro conceito incorreto sobre merge.",
          "Definição incorreta de merge no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does merge integrate with the rest of the stack in Git & Version Control?",
        "options": [
          "Incorrect option about merge related to Git & Version Control.",
          "Another incorrect concept regarding merge.",
          "Incorrect definition of merge in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em push?",
        "options": [
          "Opção incorreta sobre push relacionada a Git e Controle de Versão.",
          "Outro conceito incorreto sobre push.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para push."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in push?",
        "options": [
          "Incorrect option about push related to Git & Version Control.",
          "Another incorrect concept regarding push.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for push."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de clone é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre clone relacionada a Git e Controle de Versão.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de clone no contexto corporativo.",
          "Resposta alternativa inválida para clone."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of clone guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about clone related to Git & Version Control.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of clone in enterprise context.",
          "Invalid alternative answer for clone."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de repositório?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para repositório.",
          "Outro conceito incorreto sobre repositório.",
          "Definição incorreta de repositório no contexto corporativo.",
          "Resposta alternativa inválida para repositório."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of repository?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for repository.",
          "Another incorrect concept regarding repository.",
          "Incorrect definition of repository in enterprise context.",
          "Invalid alternative answer for repository."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre checkout e a escalabilidade de Git e Controle de Versão?",
        "options": [
          "Opção incorreta sobre checkout relacionada a Git e Controle de Versão.",
          "Outro conceito incorreto sobre checkout.",
          "Definição incorreta de checkout no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de checkout."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between checkout and the scalability of Git & Version Control?",
        "options": [
          "Incorrect option about checkout related to Git & Version Control.",
          "Another incorrect concept regarding checkout.",
          "Incorrect definition of checkout in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of checkout."
        ],
        "correct": 3
      }
    }
  ],
  "p1_fri_t2": [
    {
      "pt": {
        "question": "Qual é o principal conceito de Zowe CLI no contexto de VS Code para Mainframe?",
        "options": [
          "Representa a base estrutural de Zowe CLI para assegurar corretude técnica em VS Code para Mainframe.",
          "Outro conceito incorreto sobre Zowe CLI.",
          "Definição incorreta de Zowe CLI no contexto corporativo.",
          "Resposta alternativa inválida para Zowe CLI."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of Zowe CLI in the context of VS Code for Mainframe?",
        "options": [
          "It represents the structural foundation of Zowe CLI to ensure technical correctness in VS Code for Mainframe.",
          "Another incorrect concept regarding Zowe CLI.",
          "Incorrect definition of Zowe CLI in enterprise context.",
          "Invalid alternative answer for Zowe CLI."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como Zowe Explorer é aplicado corretamente na arquitetura de VS Code para Mainframe?",
        "options": [
          "Opção incorreta sobre Zowe Explorer relacionada a VS Code para Mainframe.",
          "Outro conceito incorreto sobre Zowe Explorer.",
          "Definição incorreta de Zowe Explorer no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de Zowe Explorer no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is Zowe Explorer correctly applied in the architecture of VS Code for Mainframe?",
        "options": [
          "Incorrect option about Zowe Explorer related to VS Code for Mainframe.",
          "Another incorrect concept regarding Zowe Explorer.",
          "Incorrect definition of Zowe Explorer in enterprise context.",
          "Through proper parameterization and loose coupling of Zowe Explorer in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com dataset?",
        "options": [
          "Opção incorreta sobre dataset relacionada a VS Code para Mainframe.",
          "Outro conceito incorreto sobre dataset.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de dataset.",
          "Resposta alternativa inválida para dataset."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with dataset?",
        "options": [
          "Incorrect option about dataset related to VS Code for Mainframe.",
          "Another incorrect concept regarding dataset.",
          "Ensure isolation and apply frequent testing to validate the behavior of dataset.",
          "Invalid alternative answer for dataset."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar host no desenvolvimento?",
        "options": [
          "Opção incorreta sobre host relacionada a VS Code para Mainframe.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em host.",
          "Definição incorreta de host no contexto corporativo.",
          "Resposta alternativa inválida para host."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing host in development?",
        "options": [
          "Incorrect option about host related to VS Code for Mainframe.",
          "Hardcoding values and lack of proper exception handling in host.",
          "Incorrect definition of host in enterprise context.",
          "Invalid alternative answer for host."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de conexão em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre conexão.",
          "Definição incorreta de conexão no contexto corporativo.",
          "Resposta alternativa inválida para conexão."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of connection in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding connection.",
          "Incorrect definition of connection in enterprise context.",
          "Invalid alternative answer for connection."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como extensão se integra com o restante da stack em VS Code para Mainframe?",
        "options": [
          "Opção incorreta sobre extensão relacionada a VS Code para Mainframe.",
          "Outro conceito incorreto sobre extensão.",
          "Definição incorreta de extensão no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does extension integrate with the rest of the stack in VS Code for Mainframe?",
        "options": [
          "Incorrect option about extension related to VS Code for Mainframe.",
          "Another incorrect concept regarding extension.",
          "Incorrect definition of extension in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em mainframe?",
        "options": [
          "Opção incorreta sobre mainframe relacionada a VS Code para Mainframe.",
          "Outro conceito incorreto sobre mainframe.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para mainframe."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in mainframe?",
        "options": [
          "Incorrect option about mainframe related to VS Code for Mainframe.",
          "Another incorrect concept regarding mainframe.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for mainframe."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de VS Code é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre VS Code relacionada a VS Code para Mainframe.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de VS Code no contexto corporativo.",
          "Resposta alternativa inválida para VS Code."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of VS Code guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about VS Code related to VS Code for Mainframe.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of VS Code in enterprise context.",
          "Invalid alternative answer for VS Code."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de JCL?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para JCL.",
          "Outro conceito incorreto sobre JCL.",
          "Definição incorreta de JCL no contexto corporativo.",
          "Resposta alternativa inválida para JCL."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of JCL?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for JCL.",
          "Another incorrect concept regarding JCL.",
          "Incorrect definition of JCL in enterprise context.",
          "Invalid alternative answer for JCL."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre spool e a escalabilidade de VS Code para Mainframe?",
        "options": [
          "Opção incorreta sobre spool relacionada a VS Code para Mainframe.",
          "Outro conceito incorreto sobre spool.",
          "Definição incorreta de spool no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de spool."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between spool and the scalability of VS Code for Mainframe?",
        "options": [
          "Incorrect option about spool related to VS Code for Mainframe.",
          "Another incorrect concept regarding spool.",
          "Incorrect definition of spool in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of spool."
        ],
        "correct": 3
      }
    }
  ],
  "p1_fri_t3": [
    {
      "pt": {
        "question": "Qual é o principal conceito de LinkedIn no contexto de LinkedIn e Autoridade?",
        "options": [
          "Representa a base estrutural de LinkedIn para assegurar corretude técnica em LinkedIn e Autoridade.",
          "Outro conceito incorreto sobre LinkedIn.",
          "Definição incorreta de LinkedIn no contexto corporativo.",
          "Resposta alternativa inválida para LinkedIn."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of LinkedIn in the context of LinkedIn & Branding?",
        "options": [
          "It represents the structural foundation of LinkedIn to ensure technical correctness in LinkedIn & Branding.",
          "Another incorrect concept regarding LinkedIn.",
          "Incorrect definition of LinkedIn in enterprise context.",
          "Invalid alternative answer for LinkedIn."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como rascunho é aplicado corretamente na arquitetura de LinkedIn e Autoridade?",
        "options": [
          "Opção incorreta sobre rascunho relacionada a LinkedIn e Autoridade.",
          "Outro conceito incorreto sobre rascunho.",
          "Definição incorreta de rascunho no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de rascunho no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is draft correctly applied in the architecture of LinkedIn & Branding?",
        "options": [
          "Incorrect option about draft related to LinkedIn & Branding.",
          "Another incorrect concept regarding draft.",
          "Incorrect definition of draft in enterprise context.",
          "Through proper parameterization and loose coupling of draft in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com compartilhar?",
        "options": [
          "Opção incorreta sobre compartilhar relacionada a LinkedIn e Autoridade.",
          "Outro conceito incorreto sobre compartilhar.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de compartilhar.",
          "Resposta alternativa inválida para compartilhar."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with share?",
        "options": [
          "Incorrect option about share related to LinkedIn & Branding.",
          "Another incorrect concept regarding share.",
          "Ensure isolation and apply frequent testing to validate the behavior of share.",
          "Invalid alternative answer for share."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar soft skills no desenvolvimento?",
        "options": [
          "Opção incorreta sobre soft skills relacionada a LinkedIn e Autoridade.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em soft skills.",
          "Definição incorreta de soft skills no contexto corporativo.",
          "Resposta alternativa inválida para soft skills."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing soft skills in development?",
        "options": [
          "Incorrect option about soft skills related to LinkedIn & Branding.",
          "Hardcoding values and lack of proper exception handling in soft skills.",
          "Incorrect definition of soft skills in enterprise context.",
          "Invalid alternative answer for soft skills."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de currículo em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre currículo.",
          "Definição incorreta de currículo no contexto corporativo.",
          "Resposta alternativa inválida para currículo."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of resume in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding resume.",
          "Incorrect definition of resume in enterprise context.",
          "Invalid alternative answer for resume."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como marca se integra com o restante da stack em LinkedIn e Autoridade?",
        "options": [
          "Opção incorreta sobre marca relacionada a LinkedIn e Autoridade.",
          "Outro conceito incorreto sobre marca.",
          "Definição incorreta de marca no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does brand integrate with the rest of the stack in LinkedIn & Branding?",
        "options": [
          "Incorrect option about brand related to LinkedIn & Branding.",
          "Another incorrect concept regarding brand.",
          "Incorrect definition of brand in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em comunicação?",
        "options": [
          "Opção incorreta sobre comunicação relacionada a LinkedIn e Autoridade.",
          "Outro conceito incorreto sobre comunicação.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para comunicação."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in communication?",
        "options": [
          "Incorrect option about communication related to LinkedIn & Branding.",
          "Another incorrect concept regarding communication.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for communication."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de networking é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre networking relacionada a LinkedIn e Autoridade.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de networking no contexto corporativo.",
          "Resposta alternativa inválida para networking."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of networking guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about networking related to LinkedIn & Branding.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of networking in enterprise context.",
          "Invalid alternative answer for networking."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de comunidade?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para comunidade.",
          "Outro conceito incorreto sobre comunidade.",
          "Definição incorreta de comunidade no contexto corporativo.",
          "Resposta alternativa inválida para comunidade."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of community?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for community.",
          "Another incorrect concept regarding community.",
          "Incorrect definition of community in enterprise context.",
          "Invalid alternative answer for community."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre portfólio e a escalabilidade de LinkedIn e Autoridade?",
        "options": [
          "Opção incorreta sobre portfólio relacionada a LinkedIn e Autoridade.",
          "Outro conceito incorreto sobre portfólio.",
          "Definição incorreta de portfólio no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de portfólio."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between portfolio and the scalability of LinkedIn & Branding?",
        "options": [
          "Incorrect option about portfolio related to LinkedIn & Branding.",
          "Another incorrect concept regarding portfolio.",
          "Incorrect definition of portfolio in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of portfolio."
        ],
        "correct": 3
      }
    }
  ],
  "p2_mon_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de OCCURS no contexto de COBOL Tabelas Internas?",
        "options": [
          "Representa a base estrutural de OCCURS para assegurar corretude técnica em COBOL Tabelas Internas.",
          "Outro conceito incorreto sobre OCCURS.",
          "Definição incorreta de OCCURS no contexto corporativo.",
          "Resposta alternativa inválida para OCCURS."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of OCCURS in the context of COBOL Internal Tables?",
        "options": [
          "It represents the structural foundation of OCCURS to ensure technical correctness in COBOL Internal Tables.",
          "Another incorrect concept regarding OCCURS.",
          "Incorrect definition of OCCURS in enterprise context.",
          "Invalid alternative answer for OCCURS."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como SEARCH é aplicado corretamente na arquitetura de COBOL Tabelas Internas?",
        "options": [
          "Opção incorreta sobre SEARCH relacionada a COBOL Tabelas Internas.",
          "Outro conceito incorreto sobre SEARCH.",
          "Definição incorreta de SEARCH no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de SEARCH no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is SEARCH correctly applied in the architecture of COBOL Internal Tables?",
        "options": [
          "Incorrect option about SEARCH related to COBOL Internal Tables.",
          "Another incorrect concept regarding SEARCH.",
          "Incorrect definition of SEARCH in enterprise context.",
          "Through proper parameterization and loose coupling of SEARCH in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com SEARCH ALL?",
        "options": [
          "Opção incorreta sobre SEARCH ALL relacionada a COBOL Tabelas Internas.",
          "Outro conceito incorreto sobre SEARCH ALL.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de SEARCH ALL.",
          "Resposta alternativa inválida para SEARCH ALL."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with SEARCH ALL?",
        "options": [
          "Incorrect option about SEARCH ALL related to COBOL Internal Tables.",
          "Another incorrect concept regarding SEARCH ALL.",
          "Ensure isolation and apply frequent testing to validate the behavior of SEARCH ALL.",
          "Invalid alternative answer for SEARCH ALL."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar tabela interna no desenvolvimento?",
        "options": [
          "Opção incorreta sobre tabela interna relacionada a COBOL Tabelas Internas.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em tabela interna.",
          "Definição incorreta de tabela interna no contexto corporativo.",
          "Resposta alternativa inválida para tabela interna."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing internal table in development?",
        "options": [
          "Incorrect option about internal table related to COBOL Internal Tables.",
          "Hardcoding values and lack of proper exception handling in internal table.",
          "Incorrect definition of internal table in enterprise context.",
          "Invalid alternative answer for internal table."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de índice em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre índice.",
          "Definição incorreta de índice no contexto corporativo.",
          "Resposta alternativa inválida para índice."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of index in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding index.",
          "Incorrect definition of index in enterprise context.",
          "Invalid alternative answer for index."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como INDEXED BY se integra com o restante da stack em COBOL Tabelas Internas?",
        "options": [
          "Opção incorreta sobre INDEXED BY relacionada a COBOL Tabelas Internas.",
          "Outro conceito incorreto sobre INDEXED BY.",
          "Definição incorreta de INDEXED BY no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does INDEXED BY integrate with the rest of the stack in COBOL Internal Tables?",
        "options": [
          "Incorrect option about INDEXED BY related to COBOL Internal Tables.",
          "Another incorrect concept regarding INDEXED BY.",
          "Incorrect definition of INDEXED BY in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em matriz?",
        "options": [
          "Opção incorreta sobre matriz relacionada a COBOL Tabelas Internas.",
          "Outro conceito incorreto sobre matriz.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para matriz."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in matrix?",
        "options": [
          "Incorrect option about matrix related to COBOL Internal Tables.",
          "Another incorrect concept regarding matrix.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for matrix."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de vetor é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre vetor relacionada a COBOL Tabelas Internas.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de vetor no contexto corporativo.",
          "Resposta alternativa inválida para vetor."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of vector guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about vector related to COBOL Internal Tables.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of vector in enterprise context.",
          "Invalid alternative answer for vector."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de binária?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para binária.",
          "Outro conceito incorreto sobre binária.",
          "Definição incorreta de binária no contexto corporativo.",
          "Resposta alternativa inválida para binária."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of binary?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for binary.",
          "Another incorrect concept regarding binary.",
          "Incorrect definition of binary in enterprise context.",
          "Invalid alternative answer for binary."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre linear e a escalabilidade de COBOL Tabelas Internas?",
        "options": [
          "Opção incorreta sobre linear relacionada a COBOL Tabelas Internas.",
          "Outro conceito incorreto sobre linear.",
          "Definição incorreta de linear no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de linear."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between linear and the scalability of COBOL Internal Tables?",
        "options": [
          "Incorrect option about linear related to COBOL Internal Tables.",
          "Another incorrect concept regarding linear.",
          "Incorrect definition of linear in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of linear."
        ],
        "correct": 3
      }
    }
  ],
  "p2_mon_t2": [
    {
      "pt": {
        "question": "Qual é o principal conceito de CALL no contexto de COBOL Subprogramas?",
        "options": [
          "Representa a base estrutural de CALL para assegurar corretude técnica em COBOL Subprogramas.",
          "Outro conceito incorreto sobre CALL.",
          "Definição incorreta de CALL no contexto corporativo.",
          "Resposta alternativa inválida para CALL."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of CALL in the context of COBOL Subprograms?",
        "options": [
          "It represents the structural foundation of CALL to ensure technical correctness in COBOL Subprograms.",
          "Another incorrect concept regarding CALL.",
          "Incorrect definition of CALL in enterprise context.",
          "Invalid alternative answer for CALL."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como USING é aplicado corretamente na arquitetura de COBOL Subprogramas?",
        "options": [
          "Opção incorreta sobre USING relacionada a COBOL Subprogramas.",
          "Outro conceito incorreto sobre USING.",
          "Definição incorreta de USING no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de USING no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is USING correctly applied in the architecture of COBOL Subprograms?",
        "options": [
          "Incorrect option about USING related to COBOL Subprograms.",
          "Another incorrect concept regarding USING.",
          "Incorrect definition of USING in enterprise context.",
          "Through proper parameterization and loose coupling of USING in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com LINKAGE SECTION?",
        "options": [
          "Opção incorreta sobre LINKAGE SECTION relacionada a COBOL Subprogramas.",
          "Outro conceito incorreto sobre LINKAGE SECTION.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de LINKAGE SECTION.",
          "Resposta alternativa inválida para LINKAGE SECTION."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with LINKAGE SECTION?",
        "options": [
          "Incorrect option about LINKAGE SECTION related to COBOL Subprograms.",
          "Another incorrect concept regarding LINKAGE SECTION.",
          "Ensure isolation and apply frequent testing to validate the behavior of LINKAGE SECTION.",
          "Invalid alternative answer for LINKAGE SECTION."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar BY REFERENCE no desenvolvimento?",
        "options": [
          "Opção incorreta sobre BY REFERENCE relacionada a COBOL Subprogramas.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em BY REFERENCE.",
          "Definição incorreta de BY REFERENCE no contexto corporativo.",
          "Resposta alternativa inválida para BY REFERENCE."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing BY REFERENCE in development?",
        "options": [
          "Incorrect option about BY REFERENCE related to COBOL Subprograms.",
          "Hardcoding values and lack of proper exception handling in BY REFERENCE.",
          "Incorrect definition of BY REFERENCE in enterprise context.",
          "Invalid alternative answer for BY REFERENCE."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de BY CONTENT em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre BY CONTENT.",
          "Definição incorreta de BY CONTENT no contexto corporativo.",
          "Resposta alternativa inválida para BY CONTENT."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of BY CONTENT in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding BY CONTENT.",
          "Incorrect definition of BY CONTENT in enterprise context.",
          "Invalid alternative answer for BY CONTENT."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como subprograma se integra com o restante da stack em COBOL Subprogramas?",
        "options": [
          "Opção incorreta sobre subprograma relacionada a COBOL Subprogramas.",
          "Outro conceito incorreto sobre subprograma.",
          "Definição incorreta de subprograma no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does subprogram integrate with the rest of the stack in COBOL Subprograms?",
        "options": [
          "Incorrect option about subprogram related to COBOL Subprograms.",
          "Another incorrect concept regarding subprogram.",
          "Incorrect definition of subprogram in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em modularização?",
        "options": [
          "Opção incorreta sobre modularização relacionada a COBOL Subprogramas.",
          "Outro conceito incorreto sobre modularização.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para modularização."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in modularization?",
        "options": [
          "Incorrect option about modularization related to COBOL Subprograms.",
          "Another incorrect concept regarding modularization.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for modularization."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de parâmetro é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre parâmetro relacionada a COBOL Subprogramas.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de parâmetro no contexto corporativo.",
          "Resposta alternativa inválida para parâmetro."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of parameter guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about parameter related to COBOL Subprograms.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of parameter in enterprise context.",
          "Invalid alternative answer for parameter."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de retorno?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para retorno.",
          "Outro conceito incorreto sobre retorno.",
          "Definição incorreta de retorno no contexto corporativo.",
          "Resposta alternativa inválida para retorno."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of return?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for return.",
          "Another incorrect concept regarding return.",
          "Incorrect definition of return in enterprise context.",
          "Invalid alternative answer for return."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre chamada e a escalabilidade de COBOL Subprogramas?",
        "options": [
          "Opção incorreta sobre chamada relacionada a COBOL Subprogramas.",
          "Outro conceito incorreto sobre chamada.",
          "Definição incorreta de chamada no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de chamada."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between invocation and the scalability of COBOL Subprograms?",
        "options": [
          "Incorrect option about invocation related to COBOL Subprograms.",
          "Another incorrect concept regarding invocation.",
          "Incorrect definition of invocation in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of invocation."
        ],
        "correct": 3
      }
    }
  ],
  "p2_mon_t3": [
    {
      "pt": {
        "question": "Qual é o principal conceito de STRING no contexto de COBOL Strings?",
        "options": [
          "Representa a base estrutural de STRING para assegurar corretude técnica em COBOL Strings.",
          "Outro conceito incorreto sobre STRING.",
          "Definição incorreta de STRING no contexto corporativo.",
          "Resposta alternativa inválida para STRING."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of STRING in the context of COBOL Strings?",
        "options": [
          "It represents the structural foundation of STRING to ensure technical correctness in COBOL Strings.",
          "Another incorrect concept regarding STRING.",
          "Incorrect definition of STRING in enterprise context.",
          "Invalid alternative answer for STRING."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como UNSTRING é aplicado corretamente na arquitetura de COBOL Strings?",
        "options": [
          "Opção incorreta sobre UNSTRING relacionada a COBOL Strings.",
          "Outro conceito incorreto sobre UNSTRING.",
          "Definição incorreta de UNSTRING no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de UNSTRING no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is UNSTRING correctly applied in the architecture of COBOL Strings?",
        "options": [
          "Incorrect option about UNSTRING related to COBOL Strings.",
          "Another incorrect concept regarding UNSTRING.",
          "Incorrect definition of UNSTRING in enterprise context.",
          "Through proper parameterization and loose coupling of UNSTRING in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com INSPECT?",
        "options": [
          "Opção incorreta sobre INSPECT relacionada a COBOL Strings.",
          "Outro conceito incorreto sobre INSPECT.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de INSPECT.",
          "Resposta alternativa inválida para INSPECT."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with INSPECT?",
        "options": [
          "Incorrect option about INSPECT related to COBOL Strings.",
          "Another incorrect concept regarding INSPECT.",
          "Ensure isolation and apply frequent testing to validate the behavior of INSPECT.",
          "Invalid alternative answer for INSPECT."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar REPLACE no desenvolvimento?",
        "options": [
          "Opção incorreta sobre REPLACE relacionada a COBOL Strings.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em REPLACE.",
          "Definição incorreta de REPLACE no contexto corporativo.",
          "Resposta alternativa inválida para REPLACE."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing REPLACE in development?",
        "options": [
          "Incorrect option about REPLACE related to COBOL Strings.",
          "Hardcoding values and lack of proper exception handling in REPLACE.",
          "Incorrect definition of REPLACE in enterprise context.",
          "Invalid alternative answer for REPLACE."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de DELIMITED BY em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre DELIMITED BY.",
          "Definição incorreta de DELIMITED BY no contexto corporativo.",
          "Resposta alternativa inválida para DELIMITED BY."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of DELIMITED BY in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding DELIMITED BY.",
          "Incorrect definition of DELIMITED BY in enterprise context.",
          "Invalid alternative answer for DELIMITED BY."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como TALLYING se integra com o restante da stack em COBOL Strings?",
        "options": [
          "Opção incorreta sobre TALLYING relacionada a COBOL Strings.",
          "Outro conceito incorreto sobre TALLYING.",
          "Definição incorreta de TALLYING no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does TALLYING integrate with the rest of the stack in COBOL Strings?",
        "options": [
          "Incorrect option about TALLYING related to COBOL Strings.",
          "Another incorrect concept regarding TALLYING.",
          "Incorrect definition of TALLYING in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em concatenar?",
        "options": [
          "Opção incorreta sobre concatenar relacionada a COBOL Strings.",
          "Outro conceito incorreto sobre concatenar.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para concatenar."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in concatenate?",
        "options": [
          "Incorrect option about concatenate related to COBOL Strings.",
          "Another incorrect concept regarding concatenate.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for concatenate."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de separar é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre separar relacionada a COBOL Strings.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de separar no contexto corporativo.",
          "Resposta alternativa inválida para separar."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of split guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about split related to COBOL Strings.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of split in enterprise context.",
          "Invalid alternative answer for split."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de caractere?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para caractere.",
          "Outro conceito incorreto sobre caractere.",
          "Definição incorreta de caractere no contexto corporativo.",
          "Resposta alternativa inválida para caractere."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of character?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for character.",
          "Another incorrect concept regarding character.",
          "Incorrect definition of character in enterprise context.",
          "Invalid alternative answer for character."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre texto e a escalabilidade de COBOL Strings?",
        "options": [
          "Opção incorreta sobre texto relacionada a COBOL Strings.",
          "Outro conceito incorreto sobre texto.",
          "Definição incorreta de texto no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de texto."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between text and the scalability of COBOL Strings?",
        "options": [
          "Incorrect option about text related to COBOL Strings.",
          "Another incorrect concept regarding text.",
          "Incorrect definition of text in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of text."
        ],
        "correct": 3
      }
    }
  ],
  "p2_tue_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de class no contexto de Java Classes e Objetos?",
        "options": [
          "Representa a base estrutural de class para assegurar corretude técnica em Java Classes e Objetos.",
          "Outro conceito incorreto sobre class.",
          "Definição incorreta de class no contexto corporativo.",
          "Resposta alternativa inválida para class."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of class in the context of Java Classes & Objects?",
        "options": [
          "It represents the structural foundation of class to ensure technical correctness in Java Classes & Objects.",
          "Another incorrect concept regarding class.",
          "Incorrect definition of class in enterprise context.",
          "Invalid alternative answer for class."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como objeto é aplicado corretamente na arquitetura de Java Classes e Objetos?",
        "options": [
          "Opção incorreta sobre objeto relacionada a Java Classes e Objetos.",
          "Outro conceito incorreto sobre objeto.",
          "Definição incorreta de objeto no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de objeto no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is object correctly applied in the architecture of Java Classes & Objects?",
        "options": [
          "Incorrect option about object related to Java Classes & Objects.",
          "Another incorrect concept regarding object.",
          "Incorrect definition of object in enterprise context.",
          "Through proper parameterization and loose coupling of object in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com instanciação?",
        "options": [
          "Opção incorreta sobre instanciação relacionada a Java Classes e Objetos.",
          "Outro conceito incorreto sobre instanciação.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de instanciação.",
          "Resposta alternativa inválida para instanciação."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with instantiation?",
        "options": [
          "Incorrect option about instantiation related to Java Classes & Objects.",
          "Another incorrect concept regarding instantiation.",
          "Ensure isolation and apply frequent testing to validate the behavior of instantiation.",
          "Invalid alternative answer for instantiation."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar new no desenvolvimento?",
        "options": [
          "Opção incorreta sobre new relacionada a Java Classes e Objetos.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em new.",
          "Definição incorreta de new no contexto corporativo.",
          "Resposta alternativa inválida para new."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing new in development?",
        "options": [
          "Incorrect option about new related to Java Classes & Objects.",
          "Hardcoding values and lack of proper exception handling in new.",
          "Incorrect definition of new in enterprise context.",
          "Invalid alternative answer for new."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de heap em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre heap.",
          "Definição incorreta de heap no contexto corporativo.",
          "Resposta alternativa inválida para heap."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of heap in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding heap.",
          "Incorrect definition of heap in enterprise context.",
          "Invalid alternative answer for heap."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como método se integra com o restante da stack em Java Classes e Objetos?",
        "options": [
          "Opção incorreta sobre método relacionada a Java Classes e Objetos.",
          "Outro conceito incorreto sobre método.",
          "Definição incorreta de método no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does method integrate with the rest of the stack in Java Classes & Objects?",
        "options": [
          "Incorrect option about method related to Java Classes & Objects.",
          "Another incorrect concept regarding method.",
          "Incorrect definition of method in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em atributo?",
        "options": [
          "Opção incorreta sobre atributo relacionada a Java Classes e Objetos.",
          "Outro conceito incorreto sobre atributo.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para atributo."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in attribute?",
        "options": [
          "Incorrect option about attribute related to Java Classes & Objects.",
          "Another incorrect concept regarding attribute.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for attribute."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de construtor é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre construtor relacionada a Java Classes e Objetos.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de construtor no contexto corporativo.",
          "Resposta alternativa inválida para construtor."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of constructor guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about constructor related to Java Classes & Objects.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of constructor in enterprise context.",
          "Invalid alternative answer for constructor."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de this?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para this.",
          "Outro conceito incorreto sobre this.",
          "Definição incorreta de this no contexto corporativo.",
          "Resposta alternativa inválida para this."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of this?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for this.",
          "Another incorrect concept regarding this.",
          "Incorrect definition of this in enterprise context.",
          "Invalid alternative answer for this."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre referência e a escalabilidade de Java Classes e Objetos?",
        "options": [
          "Opção incorreta sobre referência relacionada a Java Classes e Objetos.",
          "Outro conceito incorreto sobre referência.",
          "Definição incorreta de referência no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de referência."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between reference and the scalability of Java Classes & Objects?",
        "options": [
          "Incorrect option about reference related to Java Classes & Objects.",
          "Another incorrect concept regarding reference.",
          "Incorrect definition of reference in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of reference."
        ],
        "correct": 3
      }
    }
  ],
  "p2_tue_t2": [
    {
      "pt": {
        "question": "Qual é o principal conceito de private no contexto de Java Encapsulamento?",
        "options": [
          "Representa a base estrutural de private para assegurar corretude técnica em Java Encapsulamento.",
          "Outro conceito incorreto sobre private.",
          "Definição incorreta de private no contexto corporativo.",
          "Resposta alternativa inválida para private."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of private in the context of Java Encapsulation?",
        "options": [
          "It represents the structural foundation of private to ensure technical correctness in Java Encapsulation.",
          "Another incorrect concept regarding private.",
          "Incorrect definition of private in enterprise context.",
          "Invalid alternative answer for private."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como public é aplicado corretamente na arquitetura de Java Encapsulamento?",
        "options": [
          "Opção incorreta sobre public relacionada a Java Encapsulamento.",
          "Outro conceito incorreto sobre public.",
          "Definição incorreta de public no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de public no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is public correctly applied in the architecture of Java Encapsulation?",
        "options": [
          "Incorrect option about public related to Java Encapsulation.",
          "Another incorrect concept regarding public.",
          "Incorrect definition of public in enterprise context.",
          "Through proper parameterization and loose coupling of public in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com protected?",
        "options": [
          "Opção incorreta sobre protected relacionada a Java Encapsulamento.",
          "Outro conceito incorreto sobre protected.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de protected.",
          "Resposta alternativa inválida para protected."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with protected?",
        "options": [
          "Incorrect option about protected related to Java Encapsulation.",
          "Another incorrect concept regarding protected.",
          "Ensure isolation and apply frequent testing to validate the behavior of protected.",
          "Invalid alternative answer for protected."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar getter no desenvolvimento?",
        "options": [
          "Opção incorreta sobre getter relacionada a Java Encapsulamento.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em getter.",
          "Definição incorreta de getter no contexto corporativo.",
          "Resposta alternativa inválida para getter."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing getter in development?",
        "options": [
          "Incorrect option about getter related to Java Encapsulation.",
          "Hardcoding values and lack of proper exception handling in getter.",
          "Incorrect definition of getter in enterprise context.",
          "Invalid alternative answer for getter."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de setter em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre setter.",
          "Definição incorreta de setter no contexto corporativo.",
          "Resposta alternativa inválida para setter."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of setter in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding setter.",
          "Incorrect definition of setter in enterprise context.",
          "Invalid alternative answer for setter."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como encapsulamento se integra com o restante da stack em Java Encapsulamento?",
        "options": [
          "Opção incorreta sobre encapsulamento relacionada a Java Encapsulamento.",
          "Outro conceito incorreto sobre encapsulamento.",
          "Definição incorreta de encapsulamento no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does encapsulation integrate with the rest of the stack in Java Encapsulation?",
        "options": [
          "Incorrect option about encapsulation related to Java Encapsulation.",
          "Another incorrect concept regarding encapsulation.",
          "Incorrect definition of encapsulation in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em acesso?",
        "options": [
          "Opção incorreta sobre acesso relacionada a Java Encapsulamento.",
          "Outro conceito incorreto sobre acesso.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para acesso."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in access?",
        "options": [
          "Incorrect option about access related to Java Encapsulation.",
          "Another incorrect concept regarding access.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for access."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de modificador é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre modificador relacionada a Java Encapsulamento.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de modificador no contexto corporativo.",
          "Resposta alternativa inválida para modificador."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of modifier guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about modifier related to Java Encapsulation.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of modifier in enterprise context.",
          "Invalid alternative answer for modifier."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de pacote?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para pacote.",
          "Outro conceito incorreto sobre pacote.",
          "Definição incorreta de pacote no contexto corporativo.",
          "Resposta alternativa inválida para pacote."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of package?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for package.",
          "Another incorrect concept regarding package.",
          "Incorrect definition of package in enterprise context.",
          "Invalid alternative answer for package."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre segurança e a escalabilidade de Java Encapsulamento?",
        "options": [
          "Opção incorreta sobre segurança relacionada a Java Encapsulamento.",
          "Outro conceito incorreto sobre segurança.",
          "Definição incorreta de segurança no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de segurança."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between security and the scalability of Java Encapsulation?",
        "options": [
          "Incorrect option about security related to Java Encapsulation.",
          "Another incorrect concept regarding security.",
          "Incorrect definition of security in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of security."
        ],
        "correct": 3
      }
    }
  ],
  "p2_tue_t3": [
    {
      "pt": {
        "question": "Qual é o principal conceito de ArrayList no contexto de Java Collections?",
        "options": [
          "Representa a base estrutural de ArrayList para assegurar corretude técnica em Java Collections.",
          "Outro conceito incorreto sobre ArrayList.",
          "Definição incorreta de ArrayList no contexto corporativo.",
          "Resposta alternativa inválida para ArrayList."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of ArrayList in the context of Java Collections?",
        "options": [
          "It represents the structural foundation of ArrayList to ensure technical correctness in Java Collections.",
          "Another incorrect concept regarding ArrayList.",
          "Incorrect definition of ArrayList in enterprise context.",
          "Invalid alternative answer for ArrayList."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como HashMap é aplicado corretamente na arquitetura de Java Collections?",
        "options": [
          "Opção incorreta sobre HashMap relacionada a Java Collections.",
          "Outro conceito incorreto sobre HashMap.",
          "Definição incorreta de HashMap no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de HashMap no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is HashMap correctly applied in the architecture of Java Collections?",
        "options": [
          "Incorrect option about HashMap related to Java Collections.",
          "Another incorrect concept regarding HashMap.",
          "Incorrect definition of HashMap in enterprise context.",
          "Through proper parameterization and loose coupling of HashMap in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com List?",
        "options": [
          "Opção incorreta sobre List relacionada a Java Collections.",
          "Outro conceito incorreto sobre List.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de List.",
          "Resposta alternativa inválida para List."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with List?",
        "options": [
          "Incorrect option about List related to Java Collections.",
          "Another incorrect concept regarding List.",
          "Ensure isolation and apply frequent testing to validate the behavior of List.",
          "Invalid alternative answer for List."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar Map no desenvolvimento?",
        "options": [
          "Opção incorreta sobre Map relacionada a Java Collections.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em Map.",
          "Definição incorreta de Map no contexto corporativo.",
          "Resposta alternativa inválida para Map."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing Map in development?",
        "options": [
          "Incorrect option about Map related to Java Collections.",
          "Hardcoding values and lack of proper exception handling in Map.",
          "Incorrect definition of Map in enterprise context.",
          "Invalid alternative answer for Map."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de Set em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre Set.",
          "Definição incorreta de Set no contexto corporativo.",
          "Resposta alternativa inválida para Set."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of Set in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding Set.",
          "Incorrect definition of Set in enterprise context.",
          "Invalid alternative answer for Set."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como add se integra com o restante da stack em Java Collections?",
        "options": [
          "Opção incorreta sobre add relacionada a Java Collections.",
          "Outro conceito incorreto sobre add.",
          "Definição incorreta de add no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does add integrate with the rest of the stack in Java Collections?",
        "options": [
          "Incorrect option about add related to Java Collections.",
          "Another incorrect concept regarding add.",
          "Incorrect definition of add in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em put?",
        "options": [
          "Opção incorreta sobre put relacionada a Java Collections.",
          "Outro conceito incorreto sobre put.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para put."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in put?",
        "options": [
          "Incorrect option about put related to Java Collections.",
          "Another incorrect concept regarding put.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for put."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de get é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre get relacionada a Java Collections.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de get no contexto corporativo.",
          "Resposta alternativa inválida para get."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of get guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about get related to Java Collections.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of get in enterprise context.",
          "Invalid alternative answer for get."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de coleções?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para coleções.",
          "Outro conceito incorreto sobre coleções.",
          "Definição incorreta de coleções no contexto corporativo.",
          "Resposta alternativa inválida para coleções."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of collections?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for collections.",
          "Another incorrect concept regarding collections.",
          "Incorrect definition of collections in enterprise context.",
          "Invalid alternative answer for collections."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre iteração e a escalabilidade de Java Collections?",
        "options": [
          "Opção incorreta sobre iteração relacionada a Java Collections.",
          "Outro conceito incorreto sobre iteração.",
          "Definição incorreta de iteração no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de iteração."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between iteration and the scalability of Java Collections?",
        "options": [
          "Incorrect option about iteration related to Java Collections.",
          "Another incorrect concept regarding iteration.",
          "Incorrect definition of iteration in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of iteration."
        ],
        "correct": 3
      }
    }
  ],
  "p2_wed_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de PK no contexto de Modelagem Relacional?",
        "options": [
          "Representa a base estrutural de PK para assegurar corretude técnica em Modelagem Relacional.",
          "Outro conceito incorreto sobre PK.",
          "Definição incorreta de PK no contexto corporativo.",
          "Resposta alternativa inválida para PK."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of PK in the context of Relational Modeling?",
        "options": [
          "It represents the structural foundation of PK to ensure technical correctness in Relational Modeling.",
          "Another incorrect concept regarding PK.",
          "Incorrect definition of PK in enterprise context.",
          "Invalid alternative answer for PK."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como FK é aplicado corretamente na arquitetura de Modelagem Relacional?",
        "options": [
          "Opção incorreta sobre FK relacionada a Modelagem Relacional.",
          "Outro conceito incorreto sobre FK.",
          "Definição incorreta de FK no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de FK no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is FK correctly applied in the architecture of Relational Modeling?",
        "options": [
          "Incorrect option about FK related to Relational Modeling.",
          "Another incorrect concept regarding FK.",
          "Incorrect definition of FK in enterprise context.",
          "Through proper parameterization and loose coupling of FK in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com 1NF?",
        "options": [
          "Opção incorreta sobre 1NF relacionada a Modelagem Relacional.",
          "Outro conceito incorreto sobre 1NF.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de 1NF.",
          "Resposta alternativa inválida para 1NF."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with 1NF?",
        "options": [
          "Incorrect option about 1NF related to Relational Modeling.",
          "Another incorrect concept regarding 1NF.",
          "Ensure isolation and apply frequent testing to validate the behavior of 1NF.",
          "Invalid alternative answer for 1NF."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar 2NF no desenvolvimento?",
        "options": [
          "Opção incorreta sobre 2NF relacionada a Modelagem Relacional.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em 2NF.",
          "Definição incorreta de 2NF no contexto corporativo.",
          "Resposta alternativa inválida para 2NF."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing 2NF in development?",
        "options": [
          "Incorrect option about 2NF related to Relational Modeling.",
          "Hardcoding values and lack of proper exception handling in 2NF.",
          "Incorrect definition of 2NF in enterprise context.",
          "Invalid alternative answer for 2NF."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de 3NF em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre 3NF.",
          "Definição incorreta de 3NF no contexto corporativo.",
          "Resposta alternativa inválida para 3NF."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of 3NF in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding 3NF.",
          "Incorrect definition of 3NF in enterprise context.",
          "Invalid alternative answer for 3NF."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como normalização se integra com o restante da stack em Modelagem Relacional?",
        "options": [
          "Opção incorreta sobre normalização relacionada a Modelagem Relacional.",
          "Outro conceito incorreto sobre normalização.",
          "Definição incorreta de normalização no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does normalization integrate with the rest of the stack in Relational Modeling?",
        "options": [
          "Incorrect option about normalization related to Relational Modeling.",
          "Another incorrect concept regarding normalization.",
          "Incorrect definition of normalization in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em chave estrangeira?",
        "options": [
          "Opção incorreta sobre chave estrangeira relacionada a Modelagem Relacional.",
          "Outro conceito incorreto sobre chave estrangeira.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para chave estrangeira."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in foreign key?",
        "options": [
          "Incorrect option about foreign key related to Relational Modeling.",
          "Another incorrect concept regarding foreign key.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for foreign key."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de relacionamento é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre relacionamento relacionada a Modelagem Relacional.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de relacionamento no contexto corporativo.",
          "Resposta alternativa inválida para relacionamento."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of relationship guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about relationship related to Relational Modeling.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of relationship in enterprise context.",
          "Invalid alternative answer for relationship."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de tabela?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para tabela.",
          "Outro conceito incorreto sobre tabela.",
          "Definição incorreta de tabela no contexto corporativo.",
          "Resposta alternativa inválida para tabela."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of table?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for table.",
          "Another incorrect concept regarding table.",
          "Incorrect definition of table in enterprise context.",
          "Invalid alternative answer for table."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre cardinalidade e a escalabilidade de Modelagem Relacional?",
        "options": [
          "Opção incorreta sobre cardinalidade relacionada a Modelagem Relacional.",
          "Outro conceito incorreto sobre cardinalidade.",
          "Definição incorreta de cardinalidade no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de cardinalidade."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between cardinality and the scalability of Relational Modeling?",
        "options": [
          "Incorrect option about cardinality related to Relational Modeling.",
          "Another incorrect concept regarding cardinality.",
          "Incorrect definition of cardinality in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of cardinality."
        ],
        "correct": 3
      }
    }
  ],
  "p2_wed_t2": [
    {
      "pt": {
        "question": "Qual é o principal conceito de INNER JOIN no contexto de SQL Joins?",
        "options": [
          "Representa a base estrutural de INNER JOIN para assegurar corretude técnica em SQL Joins.",
          "Outro conceito incorreto sobre INNER JOIN.",
          "Definição incorreta de INNER JOIN no contexto corporativo.",
          "Resposta alternativa inválida para INNER JOIN."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of INNER JOIN in the context of SQL Joins?",
        "options": [
          "It represents the structural foundation of INNER JOIN to ensure technical correctness in SQL Joins.",
          "Another incorrect concept regarding INNER JOIN.",
          "Incorrect definition of INNER JOIN in enterprise context.",
          "Invalid alternative answer for INNER JOIN."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como LEFT JOIN é aplicado corretamente na arquitetura de SQL Joins?",
        "options": [
          "Opção incorreta sobre LEFT JOIN relacionada a SQL Joins.",
          "Outro conceito incorreto sobre LEFT JOIN.",
          "Definição incorreta de LEFT JOIN no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de LEFT JOIN no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is LEFT JOIN correctly applied in the architecture of SQL Joins?",
        "options": [
          "Incorrect option about LEFT JOIN related to SQL Joins.",
          "Another incorrect concept regarding LEFT JOIN.",
          "Incorrect definition of LEFT JOIN in enterprise context.",
          "Through proper parameterization and loose coupling of LEFT JOIN in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com RIGHT JOIN?",
        "options": [
          "Opção incorreta sobre RIGHT JOIN relacionada a SQL Joins.",
          "Outro conceito incorreto sobre RIGHT JOIN.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de RIGHT JOIN.",
          "Resposta alternativa inválida para RIGHT JOIN."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with RIGHT JOIN?",
        "options": [
          "Incorrect option about RIGHT JOIN related to SQL Joins.",
          "Another incorrect concept regarding RIGHT JOIN.",
          "Ensure isolation and apply frequent testing to validate the behavior of RIGHT JOIN.",
          "Invalid alternative answer for RIGHT JOIN."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar FULL JOIN no desenvolvimento?",
        "options": [
          "Opção incorreta sobre FULL JOIN relacionada a SQL Joins.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em FULL JOIN.",
          "Definição incorreta de FULL JOIN no contexto corporativo.",
          "Resposta alternativa inválida para FULL JOIN."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing FULL JOIN in development?",
        "options": [
          "Incorrect option about FULL JOIN related to SQL Joins.",
          "Hardcoding values and lack of proper exception handling in FULL JOIN.",
          "Incorrect definition of FULL JOIN in enterprise context.",
          "Invalid alternative answer for FULL JOIN."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de ON em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre ON.",
          "Definição incorreta de ON no contexto corporativo.",
          "Resposta alternativa inválida para ON."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of ON in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding ON.",
          "Incorrect definition of ON in enterprise context.",
          "Invalid alternative answer for ON."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como junção se integra com o restante da stack em SQL Joins?",
        "options": [
          "Opção incorreta sobre junção relacionada a SQL Joins.",
          "Outro conceito incorreto sobre junção.",
          "Definição incorreta de junção no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does join integrate with the rest of the stack in SQL Joins?",
        "options": [
          "Incorrect option about join related to SQL Joins.",
          "Another incorrect concept regarding join.",
          "Incorrect definition of join in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em tabelas?",
        "options": [
          "Opção incorreta sobre tabelas relacionada a SQL Joins.",
          "Outro conceito incorreto sobre tabelas.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para tabelas."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in tables?",
        "options": [
          "Incorrect option about tables related to SQL Joins.",
          "Another incorrect concept regarding tables.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for tables."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de combinação é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre combinação relacionada a SQL Joins.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de combinação no contexto corporativo.",
          "Resposta alternativa inválida para combinação."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of combination guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about combination related to SQL Joins.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of combination in enterprise context.",
          "Invalid alternative answer for combination."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de nulo?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para nulo.",
          "Outro conceito incorreto sobre nulo.",
          "Definição incorreta de nulo no contexto corporativo.",
          "Resposta alternativa inválida para nulo."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of null?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for null.",
          "Another incorrect concept regarding null.",
          "Incorrect definition of null in enterprise context.",
          "Invalid alternative answer for null."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre relacionamento e a escalabilidade de SQL Joins?",
        "options": [
          "Opção incorreta sobre relacionamento relacionada a SQL Joins.",
          "Outro conceito incorreto sobre relacionamento.",
          "Definição incorreta de relacionamento no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de relacionamento."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between relationship and the scalability of SQL Joins?",
        "options": [
          "Incorrect option about relationship related to SQL Joins.",
          "Another incorrect concept regarding relationship.",
          "Incorrect definition of relationship in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of relationship."
        ],
        "correct": 3
      }
    }
  ],
  "p2_wed_t3": [
    {
      "pt": {
        "question": "Qual é o principal conceito de GROUP BY no contexto de SQL Funções de Agregação?",
        "options": [
          "Representa a base estrutural de GROUP BY para assegurar corretude técnica em SQL Funções de Agregação.",
          "Outro conceito incorreto sobre GROUP BY.",
          "Definição incorreta de GROUP BY no contexto corporativo.",
          "Resposta alternativa inválida para GROUP BY."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of GROUP BY in the context of SQL Aggregations?",
        "options": [
          "It represents the structural foundation of GROUP BY to ensure technical correctness in SQL Aggregations.",
          "Another incorrect concept regarding GROUP BY.",
          "Incorrect definition of GROUP BY in enterprise context.",
          "Invalid alternative answer for GROUP BY."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como HAVING é aplicado corretamente na arquitetura de SQL Funções de Agregação?",
        "options": [
          "Opção incorreta sobre HAVING relacionada a SQL Funções de Agregação.",
          "Outro conceito incorreto sobre HAVING.",
          "Definição incorreta de HAVING no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de HAVING no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is HAVING correctly applied in the architecture of SQL Aggregations?",
        "options": [
          "Incorrect option about HAVING related to SQL Aggregations.",
          "Another incorrect concept regarding HAVING.",
          "Incorrect definition of HAVING in enterprise context.",
          "Through proper parameterization and loose coupling of HAVING in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com SUM?",
        "options": [
          "Opção incorreta sobre SUM relacionada a SQL Funções de Agregação.",
          "Outro conceito incorreto sobre SUM.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de SUM.",
          "Resposta alternativa inválida para SUM."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with SUM?",
        "options": [
          "Incorrect option about SUM related to SQL Aggregations.",
          "Another incorrect concept regarding SUM.",
          "Ensure isolation and apply frequent testing to validate the behavior of SUM.",
          "Invalid alternative answer for SUM."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar AVG no desenvolvimento?",
        "options": [
          "Opção incorreta sobre AVG relacionada a SQL Funções de Agregação.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em AVG.",
          "Definição incorreta de AVG no contexto corporativo.",
          "Resposta alternativa inválida para AVG."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing AVG in development?",
        "options": [
          "Incorrect option about AVG related to SQL Aggregations.",
          "Hardcoding values and lack of proper exception handling in AVG.",
          "Incorrect definition of AVG in enterprise context.",
          "Invalid alternative answer for AVG."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de COUNT em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre COUNT.",
          "Definição incorreta de COUNT no contexto corporativo.",
          "Resposta alternativa inválida para COUNT."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of COUNT in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding COUNT.",
          "Incorrect definition of COUNT in enterprise context.",
          "Invalid alternative answer for COUNT."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como MAX se integra com o restante da stack em SQL Funções de Agregação?",
        "options": [
          "Opção incorreta sobre MAX relacionada a SQL Funções de Agregação.",
          "Outro conceito incorreto sobre MAX.",
          "Definição incorreta de MAX no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does MAX integrate with the rest of the stack in SQL Aggregations?",
        "options": [
          "Incorrect option about MAX related to SQL Aggregations.",
          "Another incorrect concept regarding MAX.",
          "Incorrect definition of MAX in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em MIN?",
        "options": [
          "Opção incorreta sobre MIN relacionada a SQL Funções de Agregação.",
          "Outro conceito incorreto sobre MIN.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para MIN."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in MIN?",
        "options": [
          "Incorrect option about MIN related to SQL Aggregations.",
          "Another incorrect concept regarding MIN.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for MIN."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de agregação é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre agregação relacionada a SQL Funções de Agregação.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de agregação no contexto corporativo.",
          "Resposta alternativa inválida para agregação."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of aggregation guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about aggregation related to SQL Aggregations.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of aggregation in enterprise context.",
          "Invalid alternative answer for aggregation."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de grupo?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para grupo.",
          "Outro conceito incorreto sobre grupo.",
          "Definição incorreta de grupo no contexto corporativo.",
          "Resposta alternativa inválida para grupo."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of group?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for group.",
          "Another incorrect concept regarding group.",
          "Incorrect definition of group in enterprise context.",
          "Invalid alternative answer for group."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre filtro e a escalabilidade de SQL Funções de Agregação?",
        "options": [
          "Opção incorreta sobre filtro relacionada a SQL Funções de Agregação.",
          "Outro conceito incorreto sobre filtro.",
          "Definição incorreta de filtro no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de filtro."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between filter and the scalability of SQL Aggregations?",
        "options": [
          "Incorrect option about filter related to SQL Aggregations.",
          "Another incorrect concept regarding filter.",
          "Incorrect definition of filter in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of filter."
        ],
        "correct": 3
      }
    }
  ],
  "p2_thu_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de Scanner no contexto de Sistemas de Console em Java?",
        "options": [
          "Representa a base estrutural de Scanner para assegurar corretude técnica em Sistemas de Console em Java.",
          "Outro conceito incorreto sobre Scanner.",
          "Definição incorreta de Scanner no contexto corporativo.",
          "Resposta alternativa inválida para Scanner."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of Scanner in the context of Java Console Systems?",
        "options": [
          "It represents the structural foundation of Scanner to ensure technical correctness in Java Console Systems.",
          "Another incorrect concept regarding Scanner.",
          "Incorrect definition of Scanner in enterprise context.",
          "Invalid alternative answer for Scanner."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como System.in é aplicado corretamente na arquitetura de Sistemas de Console em Java?",
        "options": [
          "Opção incorreta sobre System.in relacionada a Sistemas de Console em Java.",
          "Outro conceito incorreto sobre System.in.",
          "Definição incorreta de System.in no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de System.in no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is System.in correctly applied in the architecture of Java Console Systems?",
        "options": [
          "Incorrect option about System.in related to Java Console Systems.",
          "Another incorrect concept regarding System.in.",
          "Incorrect definition of System.in in enterprise context.",
          "Through proper parameterization and loose coupling of System.in in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com console?",
        "options": [
          "Opção incorreta sobre console relacionada a Sistemas de Console em Java.",
          "Outro conceito incorreto sobre console.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de console.",
          "Resposta alternativa inválida para console."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with console?",
        "options": [
          "Incorrect option about console related to Java Console Systems.",
          "Another incorrect concept regarding console.",
          "Ensure isolation and apply frequent testing to validate the behavior of console.",
          "Invalid alternative answer for console."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar terminal no desenvolvimento?",
        "options": [
          "Opção incorreta sobre terminal relacionada a Sistemas de Console em Java.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em terminal.",
          "Definição incorreta de terminal no contexto corporativo.",
          "Resposta alternativa inválida para terminal."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing terminal in development?",
        "options": [
          "Incorrect option about terminal related to Java Console Systems.",
          "Hardcoding values and lack of proper exception handling in terminal.",
          "Incorrect definition of terminal in enterprise context.",
          "Invalid alternative answer for terminal."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de loops em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre loops.",
          "Definição incorreta de loops no contexto corporativo.",
          "Resposta alternativa inválida para loops."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of loops in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding loops.",
          "Incorrect definition of loops in enterprise context.",
          "Invalid alternative answer for loops."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como menu se integra com o restante da stack em Sistemas de Console em Java?",
        "options": [
          "Opção incorreta sobre menu relacionada a Sistemas de Console em Java.",
          "Outro conceito incorreto sobre menu.",
          "Definição incorreta de menu no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does menu integrate with the rest of the stack in Java Console Systems?",
        "options": [
          "Incorrect option about menu related to Java Console Systems.",
          "Another incorrect concept regarding menu.",
          "Incorrect definition of menu in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em input?",
        "options": [
          "Opção incorreta sobre input relacionada a Sistemas de Console em Java.",
          "Outro conceito incorreto sobre input.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para input."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in input?",
        "options": [
          "Incorrect option about input related to Java Console Systems.",
          "Another incorrect concept regarding input.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for input."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de interativo é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre interativo relacionada a Sistemas de Console em Java.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de interativo no contexto corporativo.",
          "Resposta alternativa inválida para interativo."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of interactive guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about interactive related to Java Console Systems.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of interactive in enterprise context.",
          "Invalid alternative answer for interactive."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de lógica?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para lógica.",
          "Outro conceito incorreto sobre lógica.",
          "Definição incorreta de lógica no contexto corporativo.",
          "Resposta alternativa inválida para lógica."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of logic?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for logic.",
          "Another incorrect concept regarding logic.",
          "Incorrect definition of logic in enterprise context.",
          "Invalid alternative answer for logic."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre projeto e a escalabilidade de Sistemas de Console em Java?",
        "options": [
          "Opção incorreta sobre projeto relacionada a Sistemas de Console em Java.",
          "Outro conceito incorreto sobre projeto.",
          "Definição incorreta de projeto no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de projeto."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between project and the scalability of Java Console Systems?",
        "options": [
          "Incorrect option about project related to Java Console Systems.",
          "Another incorrect concept regarding project.",
          "Incorrect definition of project in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of project."
        ],
        "correct": 3
      }
    }
  ],
  "p2_fri_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de JUnit no contexto de JUnit Testes Unitários?",
        "options": [
          "Representa a base estrutural de JUnit para assegurar corretude técnica em JUnit Testes Unitários.",
          "Outro conceito incorreto sobre JUnit.",
          "Definição incorreta de JUnit no contexto corporativo.",
          "Resposta alternativa inválida para JUnit."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of JUnit in the context of JUnit Unit Testing?",
        "options": [
          "It represents the structural foundation of JUnit to ensure technical correctness in JUnit Unit Testing.",
          "Another incorrect concept regarding JUnit.",
          "Incorrect definition of JUnit in enterprise context.",
          "Invalid alternative answer for JUnit."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como teste unitário é aplicado corretamente na arquitetura de JUnit Testes Unitários?",
        "options": [
          "Opção incorreta sobre teste unitário relacionada a JUnit Testes Unitários.",
          "Outro conceito incorreto sobre teste unitário.",
          "Definição incorreta de teste unitário no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de teste unitário no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is unit test correctly applied in the architecture of JUnit Unit Testing?",
        "options": [
          "Incorrect option about unit test related to JUnit Unit Testing.",
          "Another incorrect concept regarding unit test.",
          "Incorrect definition of unit test in enterprise context.",
          "Through proper parameterization and loose coupling of unit test in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com @Test?",
        "options": [
          "Opção incorreta sobre @Test relacionada a JUnit Testes Unitários.",
          "Outro conceito incorreto sobre @Test.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de @Test.",
          "Resposta alternativa inválida para @Test."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with @Test?",
        "options": [
          "Incorrect option about @Test related to JUnit Unit Testing.",
          "Another incorrect concept regarding @Test.",
          "Ensure isolation and apply frequent testing to validate the behavior of @Test.",
          "Invalid alternative answer for @Test."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar assertEquals no desenvolvimento?",
        "options": [
          "Opção incorreta sobre assertEquals relacionada a JUnit Testes Unitários.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em assertEquals.",
          "Definição incorreta de assertEquals no contexto corporativo.",
          "Resposta alternativa inválida para assertEquals."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing assertEquals in development?",
        "options": [
          "Incorrect option about assertEquals related to JUnit Unit Testing.",
          "Hardcoding values and lack of proper exception handling in assertEquals.",
          "Incorrect definition of assertEquals in enterprise context.",
          "Invalid alternative answer for assertEquals."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de assertTrue em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre assertTrue.",
          "Definição incorreta de assertTrue no contexto corporativo.",
          "Resposta alternativa inválida para assertTrue."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of assertTrue in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding assertTrue.",
          "Incorrect definition of assertTrue in enterprise context.",
          "Invalid alternative answer for assertTrue."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como assert se integra com o restante da stack em JUnit Testes Unitários?",
        "options": [
          "Opção incorreta sobre assert relacionada a JUnit Testes Unitários.",
          "Outro conceito incorreto sobre assert.",
          "Definição incorreta de assert no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does assert integrate with the rest of the stack in JUnit Unit Testing?",
        "options": [
          "Incorrect option about assert related to JUnit Unit Testing.",
          "Another incorrect concept regarding assert.",
          "Incorrect definition of assert in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em cobertura?",
        "options": [
          "Opção incorreta sobre cobertura relacionada a JUnit Testes Unitários.",
          "Outro conceito incorreto sobre cobertura.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para cobertura."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in coverage?",
        "options": [
          "Incorrect option about coverage related to JUnit Unit Testing.",
          "Another incorrect concept regarding coverage.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for coverage."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de validação é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre validação relacionada a JUnit Testes Unitários.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de validação no contexto corporativo.",
          "Resposta alternativa inválida para validação."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of validation guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about validation related to JUnit Unit Testing.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of validation in enterprise context.",
          "Invalid alternative answer for validation."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de automatizado?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para automatizado.",
          "Outro conceito incorreto sobre automatizado.",
          "Definição incorreta de automatizado no contexto corporativo.",
          "Resposta alternativa inválida para automatizado."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of automated?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for automated.",
          "Another incorrect concept regarding automated.",
          "Incorrect definition of automated in enterprise context.",
          "Invalid alternative answer for automated."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre metodologia e a escalabilidade de JUnit Testes Unitários?",
        "options": [
          "Opção incorreta sobre metodologia relacionada a JUnit Testes Unitários.",
          "Outro conceito incorreto sobre metodologia.",
          "Definição incorreta de metodologia no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de metodologia."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between methodology and the scalability of JUnit Unit Testing?",
        "options": [
          "Incorrect option about methodology related to JUnit Unit Testing.",
          "Another incorrect concept regarding methodology.",
          "Incorrect definition of methodology in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of methodology."
        ],
        "correct": 3
      }
    }
  ],
  "p2_fri_t2": [
    {
      "pt": {
        "question": "Qual é o principal conceito de JCL no contexto de Zowe CLI Avançado?",
        "options": [
          "Representa a base estrutural de JCL para assegurar corretude técnica em Zowe CLI Avançado.",
          "Outro conceito incorreto sobre JCL.",
          "Definição incorreta de JCL no contexto corporativo.",
          "Resposta alternativa inválida para JCL."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of JCL in the context of Zowe CLI Advanced?",
        "options": [
          "It represents the structural foundation of JCL to ensure technical correctness in Zowe CLI Advanced.",
          "Another incorrect concept regarding JCL.",
          "Incorrect definition of JCL in enterprise context.",
          "Invalid alternative answer for JCL."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como spool é aplicado corretamente na arquitetura de Zowe CLI Avançado?",
        "options": [
          "Opção incorreta sobre spool relacionada a Zowe CLI Avançado.",
          "Outro conceito incorreto sobre spool.",
          "Definição incorreta de spool no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de spool no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is spool correctly applied in the architecture of Zowe CLI Advanced?",
        "options": [
          "Incorrect option about spool related to Zowe CLI Advanced.",
          "Another incorrect concept regarding spool.",
          "Incorrect definition of spool in enterprise context.",
          "Through proper parameterization and loose coupling of spool in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com submeter?",
        "options": [
          "Opção incorreta sobre submeter relacionada a Zowe CLI Avançado.",
          "Outro conceito incorreto sobre submeter.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de submeter.",
          "Resposta alternativa inválida para submeter."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with submit?",
        "options": [
          "Incorrect option about submit related to Zowe CLI Advanced.",
          "Another incorrect concept regarding submit.",
          "Ensure isolation and apply frequent testing to validate the behavior of submit.",
          "Invalid alternative answer for submit."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar job no desenvolvimento?",
        "options": [
          "Opção incorreta sobre job relacionada a Zowe CLI Avançado.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em job.",
          "Definição incorreta de job no contexto corporativo.",
          "Resposta alternativa inválida para job."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing job in development?",
        "options": [
          "Incorrect option about job related to Zowe CLI Advanced.",
          "Hardcoding values and lack of proper exception handling in job.",
          "Incorrect definition of job in enterprise context.",
          "Invalid alternative answer for job."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de compilar em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre compilar.",
          "Definição incorreta de compilar no contexto corporativo.",
          "Resposta alternativa inválida para compilar."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of compile in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding compile.",
          "Incorrect definition of compile in enterprise context.",
          "Invalid alternative answer for compile."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como Zowe se integra com o restante da stack em Zowe CLI Avançado?",
        "options": [
          "Opção incorreta sobre Zowe relacionada a Zowe CLI Avançado.",
          "Outro conceito incorreto sobre Zowe.",
          "Definição incorreta de Zowe no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does Zowe integrate with the rest of the stack in Zowe CLI Advanced?",
        "options": [
          "Incorrect option about Zowe related to Zowe CLI Advanced.",
          "Another incorrect concept regarding Zowe.",
          "Incorrect definition of Zowe in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em TSO?",
        "options": [
          "Opção incorreta sobre TSO relacionada a Zowe CLI Avançado.",
          "Outro conceito incorreto sobre TSO.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para TSO."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in TSO?",
        "options": [
          "Incorrect option about TSO related to Zowe CLI Advanced.",
          "Another incorrect concept regarding TSO.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for TSO."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de dataset é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre dataset relacionada a Zowe CLI Avançado.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de dataset no contexto corporativo.",
          "Resposta alternativa inválida para dataset."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of dataset guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about dataset related to Zowe CLI Advanced.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of dataset in enterprise context.",
          "Invalid alternative answer for dataset."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de comando?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para comando.",
          "Outro conceito incorreto sobre comando.",
          "Definição incorreta de comando no contexto corporativo.",
          "Resposta alternativa inválida para comando."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of command?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for command.",
          "Another incorrect concept regarding command.",
          "Incorrect definition of command in enterprise context.",
          "Invalid alternative answer for command."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre fila e a escalabilidade de Zowe CLI Avançado?",
        "options": [
          "Opção incorreta sobre fila relacionada a Zowe CLI Avançado.",
          "Outro conceito incorreto sobre fila.",
          "Definição incorreta de fila no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de fila."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between queue and the scalability of Zowe CLI Advanced?",
        "options": [
          "Incorrect option about queue related to Zowe CLI Advanced.",
          "Another incorrect concept regarding queue.",
          "Incorrect definition of queue in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of queue."
        ],
        "correct": 3
      }
    }
  ],
  "p3_mon_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de BMS no contexto de CICS BMS Telas?",
        "options": [
          "Representa a base estrutural de BMS para assegurar corretude técnica em CICS BMS Telas.",
          "Outro conceito incorreto sobre BMS.",
          "Definição incorreta de BMS no contexto corporativo.",
          "Resposta alternativa inválida para BMS."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of BMS in the context of CICS BMS Screens?",
        "options": [
          "It represents the structural foundation of BMS to ensure technical correctness in CICS BMS Screens.",
          "Another incorrect concept regarding BMS.",
          "Incorrect definition of BMS in enterprise context.",
          "Invalid alternative answer for BMS."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como mapa é aplicado corretamente na arquitetura de CICS BMS Telas?",
        "options": [
          "Opção incorreta sobre mapa relacionada a CICS BMS Telas.",
          "Outro conceito incorreto sobre mapa.",
          "Definição incorreta de mapa no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de mapa no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is map correctly applied in the architecture of CICS BMS Screens?",
        "options": [
          "Incorrect option about map related to CICS BMS Screens.",
          "Another incorrect concept regarding map.",
          "Incorrect definition of map in enterprise context.",
          "Through proper parameterization and loose coupling of map in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com tela?",
        "options": [
          "Opção incorreta sobre tela relacionada a CICS BMS Telas.",
          "Outro conceito incorreto sobre tela.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de tela.",
          "Resposta alternativa inválida para tela."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with screen?",
        "options": [
          "Incorrect option about screen related to CICS BMS Screens.",
          "Another incorrect concept regarding screen.",
          "Ensure isolation and apply frequent testing to validate the behavior of screen.",
          "Invalid alternative answer for screen."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar 3270 no desenvolvimento?",
        "options": [
          "Opção incorreta sobre 3270 relacionada a CICS BMS Telas.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em 3270.",
          "Definição incorreta de 3270 no contexto corporativo.",
          "Resposta alternativa inválida para 3270."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing 3270 in development?",
        "options": [
          "Incorrect option about 3270 related to CICS BMS Screens.",
          "Hardcoding values and lack of proper exception handling in 3270.",
          "Incorrect definition of 3270 in enterprise context.",
          "Invalid alternative answer for 3270."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de terminal em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre terminal.",
          "Definição incorreta de terminal no contexto corporativo.",
          "Resposta alternativa inválida para terminal."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of terminal in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding terminal.",
          "Incorrect definition of terminal in enterprise context.",
          "Invalid alternative answer for terminal."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como SEND MAP se integra com o restante da stack em CICS BMS Telas?",
        "options": [
          "Opção incorreta sobre SEND MAP relacionada a CICS BMS Telas.",
          "Outro conceito incorreto sobre SEND MAP.",
          "Definição incorreta de SEND MAP no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does SEND MAP integrate with the rest of the stack in CICS BMS Screens?",
        "options": [
          "Incorrect option about SEND MAP related to CICS BMS Screens.",
          "Another incorrect concept regarding SEND MAP.",
          "Incorrect definition of SEND MAP in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em RECEIVE MAP?",
        "options": [
          "Opção incorreta sobre RECEIVE MAP relacionada a CICS BMS Telas.",
          "Outro conceito incorreto sobre RECEIVE MAP.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para RECEIVE MAP."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in RECEIVE MAP?",
        "options": [
          "Incorrect option about RECEIVE MAP related to CICS BMS Screens.",
          "Another incorrect concept regarding RECEIVE MAP.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for RECEIVE MAP."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de transação é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre transação relacionada a CICS BMS Telas.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de transação no contexto corporativo.",
          "Resposta alternativa inválida para transação."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of transaction guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about transaction related to CICS BMS Screens.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of transaction in enterprise context.",
          "Invalid alternative answer for transaction."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de CICS?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para CICS.",
          "Outro conceito incorreto sobre CICS.",
          "Definição incorreta de CICS no contexto corporativo.",
          "Resposta alternativa inválida para CICS."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of CICS?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for CICS.",
          "Another incorrect concept regarding CICS.",
          "Incorrect definition of CICS in enterprise context.",
          "Invalid alternative answer for CICS."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre campos e a escalabilidade de CICS BMS Telas?",
        "options": [
          "Opção incorreta sobre campos relacionada a CICS BMS Telas.",
          "Outro conceito incorreto sobre campos.",
          "Definição incorreta de campos no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de campos."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between fields and the scalability of CICS BMS Screens?",
        "options": [
          "Incorrect option about fields related to CICS BMS Screens.",
          "Another incorrect concept regarding fields.",
          "Incorrect definition of fields in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of fields."
        ],
        "correct": 3
      }
    }
  ],
  "p3_mon_t2": [
    {
      "pt": {
        "question": "Qual é o principal conceito de COMMAREA no contexto de CICS Comunicação Transacional?",
        "options": [
          "Representa a base estrutural de COMMAREA para assegurar corretude técnica em CICS Comunicação Transacional.",
          "Outro conceito incorreto sobre COMMAREA.",
          "Definição incorreta de COMMAREA no contexto corporativo.",
          "Resposta alternativa inválida para COMMAREA."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of COMMAREA in the context of CICS COMMAREA?",
        "options": [
          "It represents the structural foundation of COMMAREA to ensure technical correctness in CICS COMMAREA.",
          "Another incorrect concept regarding COMMAREA.",
          "Incorrect definition of COMMAREA in enterprise context.",
          "Invalid alternative answer for COMMAREA."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como CICS é aplicado corretamente na arquitetura de CICS Comunicação Transacional?",
        "options": [
          "Opção incorreta sobre CICS relacionada a CICS Comunicação Transacional.",
          "Outro conceito incorreto sobre CICS.",
          "Definição incorreta de CICS no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de CICS no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is CICS correctly applied in the architecture of CICS COMMAREA?",
        "options": [
          "Incorrect option about CICS related to CICS COMMAREA.",
          "Another incorrect concept regarding CICS.",
          "Incorrect definition of CICS in enterprise context.",
          "Through proper parameterization and loose coupling of CICS in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com concorrência?",
        "options": [
          "Opção incorreta sobre concorrência relacionada a CICS Comunicação Transacional.",
          "Outro conceito incorreto sobre concorrência.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de concorrência.",
          "Resposta alternativa inválida para concorrência."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with concurrency?",
        "options": [
          "Incorrect option about concurrency related to CICS COMMAREA.",
          "Another incorrect concept regarding concurrency.",
          "Ensure isolation and apply frequent testing to validate the behavior of concurrency.",
          "Invalid alternative answer for concurrency."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar transação no desenvolvimento?",
        "options": [
          "Opção incorreta sobre transação relacionada a CICS Comunicação Transacional.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em transação.",
          "Definição incorreta de transação no contexto corporativo.",
          "Resposta alternativa inválida para transação."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing transaction in development?",
        "options": [
          "Incorrect option about transaction related to CICS COMMAREA.",
          "Hardcoding values and lack of proper exception handling in transaction.",
          "Incorrect definition of transaction in enterprise context.",
          "Invalid alternative answer for transaction."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de pseudoconversacional em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre pseudoconversacional.",
          "Definição incorreta de pseudoconversacional no contexto corporativo.",
          "Resposta alternativa inválida para pseudoconversacional."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of pseudoconversational in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding pseudoconversational.",
          "Incorrect definition of pseudoconversational in enterprise context.",
          "Invalid alternative answer for pseudoconversational."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como RETURN se integra com o restante da stack em CICS Comunicação Transacional?",
        "options": [
          "Opção incorreta sobre RETURN relacionada a CICS Comunicação Transacional.",
          "Outro conceito incorreto sobre RETURN.",
          "Definição incorreta de RETURN no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does RETURN integrate with the rest of the stack in CICS COMMAREA?",
        "options": [
          "Incorrect option about RETURN related to CICS COMMAREA.",
          "Another incorrect concept regarding RETURN.",
          "Incorrect definition of RETURN in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em XCTL?",
        "options": [
          "Opção incorreta sobre XCTL relacionada a CICS Comunicação Transacional.",
          "Outro conceito incorreto sobre XCTL.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para XCTL."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in XCTL?",
        "options": [
          "Incorrect option about XCTL related to CICS COMMAREA.",
          "Another incorrect concept regarding XCTL.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for XCTL."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de LINK é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre LINK relacionada a CICS Comunicação Transacional.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de LINK no contexto corporativo.",
          "Resposta alternativa inválida para LINK."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of LINK guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about LINK related to CICS COMMAREA.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of LINK in enterprise context.",
          "Invalid alternative answer for LINK."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de comunicação?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para comunicação.",
          "Outro conceito incorreto sobre comunicação.",
          "Definição incorreta de comunicação no contexto corporativo.",
          "Resposta alternativa inválida para comunicação."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of communication?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for communication.",
          "Another incorrect concept regarding communication.",
          "Incorrect definition of communication in enterprise context.",
          "Invalid alternative answer for communication."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre buffer e a escalabilidade de CICS Comunicação Transacional?",
        "options": [
          "Opção incorreta sobre buffer relacionada a CICS Comunicação Transacional.",
          "Outro conceito incorreto sobre buffer.",
          "Definição incorreta de buffer no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de buffer."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between buffer and the scalability of CICS COMMAREA?",
        "options": [
          "Incorrect option about buffer related to CICS COMMAREA.",
          "Another incorrect concept regarding buffer.",
          "Incorrect definition of buffer in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of buffer."
        ],
        "correct": 3
      }
    }
  ],
  "p3_tue_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de extends no contexto de Java Herança e Polimorfismo?",
        "options": [
          "Representa a base estrutural de extends para assegurar corretude técnica em Java Herança e Polimorfismo.",
          "Outro conceito incorreto sobre extends.",
          "Definição incorreta de extends no contexto corporativo.",
          "Resposta alternativa inválida para extends."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of extends in the context of Java Inheritance & Polymorphism?",
        "options": [
          "It represents the structural foundation of extends to ensure technical correctness in Java Inheritance & Polymorphism.",
          "Another incorrect concept regarding extends.",
          "Incorrect definition of extends in enterprise context.",
          "Invalid alternative answer for extends."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como sobrecarga é aplicado corretamente na arquitetura de Java Herança e Polimorfismo?",
        "options": [
          "Opção incorreta sobre sobrecarga relacionada a Java Herança e Polimorfismo.",
          "Outro conceito incorreto sobre sobrecarga.",
          "Definição incorreta de sobrecarga no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de sobrecarga no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is overload correctly applied in the architecture of Java Inheritance & Polymorphism?",
        "options": [
          "Incorrect option about overload related to Java Inheritance & Polymorphism.",
          "Another incorrect concept regarding overload.",
          "Incorrect definition of overload in enterprise context.",
          "Through proper parameterization and loose coupling of overload in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com sobrescrita?",
        "options": [
          "Opção incorreta sobre sobrescrita relacionada a Java Herança e Polimorfismo.",
          "Outro conceito incorreto sobre sobrescrita.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de sobrescrita.",
          "Resposta alternativa inválida para sobrescrita."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with override?",
        "options": [
          "Incorrect option about override related to Java Inheritance & Polymorphism.",
          "Another incorrect concept regarding override.",
          "Ensure isolation and apply frequent testing to validate the behavior of override.",
          "Invalid alternative answer for override."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar @Override no desenvolvimento?",
        "options": [
          "Opção incorreta sobre @Override relacionada a Java Herança e Polimorfismo.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em @Override.",
          "Definição incorreta de @Override no contexto corporativo.",
          "Resposta alternativa inválida para @Override."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing @Override in development?",
        "options": [
          "Incorrect option about @Override related to Java Inheritance & Polymorphism.",
          "Hardcoding values and lack of proper exception handling in @Override.",
          "Incorrect definition of @Override in enterprise context.",
          "Invalid alternative answer for @Override."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de herança em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre herança.",
          "Definição incorreta de herança no contexto corporativo.",
          "Resposta alternativa inválida para herança."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of inheritance in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding inheritance.",
          "Incorrect definition of inheritance in enterprise context.",
          "Invalid alternative answer for inheritance."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como polimorfismo se integra com o restante da stack em Java Herança e Polimorfismo?",
        "options": [
          "Opção incorreta sobre polimorfismo relacionada a Java Herança e Polimorfismo.",
          "Outro conceito incorreto sobre polimorfismo.",
          "Definição incorreta de polimorfismo no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does polymorphism integrate with the rest of the stack in Java Inheritance & Polymorphism?",
        "options": [
          "Incorrect option about polymorphism related to Java Inheritance & Polymorphism.",
          "Another incorrect concept regarding polymorphism.",
          "Incorrect definition of polymorphism in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em super?",
        "options": [
          "Opção incorreta sobre super relacionada a Java Herança e Polimorfismo.",
          "Outro conceito incorreto sobre super.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para super."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in super?",
        "options": [
          "Incorrect option about super related to Java Inheritance & Polymorphism.",
          "Another incorrect concept regarding super.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for super."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de subclasse é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre subclasse relacionada a Java Herança e Polimorfismo.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de subclasse no contexto corporativo.",
          "Resposta alternativa inválida para subclasse."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of subclass guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about subclass related to Java Inheritance & Polymorphism.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of subclass in enterprise context.",
          "Invalid alternative answer for subclass."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de superclasse?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para superclasse.",
          "Outro conceito incorreto sobre superclasse.",
          "Definição incorreta de superclasse no contexto corporativo.",
          "Resposta alternativa inválida para superclasse."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of superclass?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for superclass.",
          "Another incorrect concept regarding superclass.",
          "Incorrect definition of superclass in enterprise context.",
          "Invalid alternative answer for superclass."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre cast e a escalabilidade de Java Herança e Polimorfismo?",
        "options": [
          "Opção incorreta sobre cast relacionada a Java Herança e Polimorfismo.",
          "Outro conceito incorreto sobre cast.",
          "Definição incorreta de cast no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de cast."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between cast and the scalability of Java Inheritance & Polymorphism?",
        "options": [
          "Incorrect option about cast related to Java Inheritance & Polymorphism.",
          "Another incorrect concept regarding cast.",
          "Incorrect definition of cast in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of cast."
        ],
        "correct": 3
      }
    }
  ],
  "p3_tue_t2": [
    {
      "pt": {
        "question": "Qual é o principal conceito de interface no contexto de Java Abstrações e Interfaces?",
        "options": [
          "Representa a base estrutural de interface para assegurar corretude técnica em Java Abstrações e Interfaces.",
          "Outro conceito incorreto sobre interface.",
          "Definição incorreta de interface no contexto corporativo.",
          "Resposta alternativa inválida para interface."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of interface in the context of Java Interfaces & Abstractions?",
        "options": [
          "It represents the structural foundation of interface to ensure technical correctness in Java Interfaces & Abstractions.",
          "Another incorrect concept regarding interface.",
          "Incorrect definition of interface in enterprise context.",
          "Invalid alternative answer for interface."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como abstract é aplicado corretamente na arquitetura de Java Abstrações e Interfaces?",
        "options": [
          "Opção incorreta sobre abstract relacionada a Java Abstrações e Interfaces.",
          "Outro conceito incorreto sobre abstract.",
          "Definição incorreta de abstract no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de abstract no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is abstract correctly applied in the architecture of Java Interfaces & Abstractions?",
        "options": [
          "Incorrect option about abstract related to Java Interfaces & Abstractions.",
          "Another incorrect concept regarding abstract.",
          "Incorrect definition of abstract in enterprise context.",
          "Through proper parameterization and loose coupling of abstract in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com contrato?",
        "options": [
          "Opção incorreta sobre contrato relacionada a Java Abstrações e Interfaces.",
          "Outro conceito incorreto sobre contrato.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de contrato.",
          "Resposta alternativa inválida para contrato."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with contract?",
        "options": [
          "Incorrect option about contract related to Java Interfaces & Abstractions.",
          "Another incorrect concept regarding contract.",
          "Ensure isolation and apply frequent testing to validate the behavior of contract.",
          "Invalid alternative answer for contract."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar método abstrato no desenvolvimento?",
        "options": [
          "Opção incorreta sobre método abstrato relacionada a Java Abstrações e Interfaces.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em método abstrato.",
          "Definição incorreta de método abstrato no contexto corporativo.",
          "Resposta alternativa inválida para método abstrato."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing abstract method in development?",
        "options": [
          "Incorrect option about abstract method related to Java Interfaces & Abstractions.",
          "Hardcoding values and lack of proper exception handling in abstract method.",
          "Incorrect definition of abstract method in enterprise context.",
          "Invalid alternative answer for abstract method."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de implements em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre implements.",
          "Definição incorreta de implements no contexto corporativo.",
          "Resposta alternativa inválida para implements."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of implements in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding implements.",
          "Incorrect definition of implements in enterprise context.",
          "Invalid alternative answer for implements."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como polimorfismo se integra com o restante da stack em Java Abstrações e Interfaces?",
        "options": [
          "Opção incorreta sobre polimorfismo relacionada a Java Abstrações e Interfaces.",
          "Outro conceito incorreto sobre polimorfismo.",
          "Definição incorreta de polimorfismo no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does polymorphism integrate with the rest of the stack in Java Interfaces & Abstractions?",
        "options": [
          "Incorrect option about polymorphism related to Java Interfaces & Abstractions.",
          "Another incorrect concept regarding polymorphism.",
          "Incorrect definition of polymorphism in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em assinatura?",
        "options": [
          "Opção incorreta sobre assinatura relacionada a Java Abstrações e Interfaces.",
          "Outro conceito incorreto sobre assinatura.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para assinatura."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in signature?",
        "options": [
          "Incorrect option about signature related to Java Interfaces & Abstractions.",
          "Another incorrect concept regarding signature.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for signature."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de múltipla é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre múltipla relacionada a Java Abstrações e Interfaces.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de múltipla no contexto corporativo.",
          "Resposta alternativa inválida para múltipla."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of multiple guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about multiple related to Java Interfaces & Abstractions.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of multiple in enterprise context.",
          "Invalid alternative answer for multiple."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de acoplamento?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para acoplamento.",
          "Outro conceito incorreto sobre acoplamento.",
          "Definição incorreta de acoplamento no contexto corporativo.",
          "Resposta alternativa inválida para acoplamento."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of coupling?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for coupling.",
          "Another incorrect concept regarding coupling.",
          "Incorrect definition of coupling in enterprise context.",
          "Invalid alternative answer for coupling."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre design e a escalabilidade de Java Abstrações e Interfaces?",
        "options": [
          "Opção incorreta sobre design relacionada a Java Abstrações e Interfaces.",
          "Outro conceito incorreto sobre design.",
          "Definição incorreta de design no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de design."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between design and the scalability of Java Interfaces & Abstractions?",
        "options": [
          "Incorrect option about design related to Java Interfaces & Abstractions.",
          "Another incorrect concept regarding design.",
          "Incorrect definition of design in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of design."
        ],
        "correct": 3
      }
    }
  ],
  "p3_tue_t3": [
    {
      "pt": {
        "question": "Qual é o principal conceito de try no contexto de Java Exception Handling?",
        "options": [
          "Representa a base estrutural de try para assegurar corretude técnica em Java Exception Handling.",
          "Outro conceito incorreto sobre try.",
          "Definição incorreta de try no contexto corporativo.",
          "Resposta alternativa inválida para try."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of try in the context of Java Exceptions?",
        "options": [
          "It represents the structural foundation of try to ensure technical correctness in Java Exceptions.",
          "Another incorrect concept regarding try.",
          "Incorrect definition of try in enterprise context.",
          "Invalid alternative answer for try."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como catch é aplicado corretamente na arquitetura de Java Exception Handling?",
        "options": [
          "Opção incorreta sobre catch relacionada a Java Exception Handling.",
          "Outro conceito incorreto sobre catch.",
          "Definição incorreta de catch no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de catch no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is catch correctly applied in the architecture of Java Exceptions?",
        "options": [
          "Incorrect option about catch related to Java Exceptions.",
          "Another incorrect concept regarding catch.",
          "Incorrect definition of catch in enterprise context.",
          "Through proper parameterization and loose coupling of catch in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com finally?",
        "options": [
          "Opção incorreta sobre finally relacionada a Java Exception Handling.",
          "Outro conceito incorreto sobre finally.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de finally.",
          "Resposta alternativa inválida para finally."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with finally?",
        "options": [
          "Incorrect option about finally related to Java Exceptions.",
          "Another incorrect concept regarding finally.",
          "Ensure isolation and apply frequent testing to validate the behavior of finally.",
          "Invalid alternative answer for finally."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar throw no desenvolvimento?",
        "options": [
          "Opção incorreta sobre throw relacionada a Java Exception Handling.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em throw.",
          "Definição incorreta de throw no contexto corporativo.",
          "Resposta alternativa inválida para throw."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing throw in development?",
        "options": [
          "Incorrect option about throw related to Java Exceptions.",
          "Hardcoding values and lack of proper exception handling in throw.",
          "Incorrect definition of throw in enterprise context.",
          "Invalid alternative answer for throw."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de throws em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre throws.",
          "Definição incorreta de throws no contexto corporativo.",
          "Resposta alternativa inválida para throws."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of throws in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding throws.",
          "Incorrect definition of throws in enterprise context.",
          "Invalid alternative answer for throws."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como Exception se integra com o restante da stack em Java Exception Handling?",
        "options": [
          "Opção incorreta sobre Exception relacionada a Java Exception Handling.",
          "Outro conceito incorreto sobre Exception.",
          "Definição incorreta de Exception no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does Exception integrate with the rest of the stack in Java Exceptions?",
        "options": [
          "Incorrect option about Exception related to Java Exceptions.",
          "Another incorrect concept regarding Exception.",
          "Incorrect definition of Exception in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em Runtime?",
        "options": [
          "Opção incorreta sobre Runtime relacionada a Java Exception Handling.",
          "Outro conceito incorreto sobre Runtime.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para Runtime."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in Runtime?",
        "options": [
          "Incorrect option about Runtime related to Java Exceptions.",
          "Another incorrect concept regarding Runtime.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for Runtime."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de tratamento é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre tratamento relacionada a Java Exception Handling.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de tratamento no contexto corporativo.",
          "Resposta alternativa inválida para tratamento."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of handling guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about handling related to Java Exceptions.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of handling in enterprise context.",
          "Invalid alternative answer for handling."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de pilha?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para pilha.",
          "Outro conceito incorreto sobre pilha.",
          "Definição incorreta de pilha no contexto corporativo.",
          "Resposta alternativa inválida para pilha."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of stack?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for stack.",
          "Another incorrect concept regarding stack.",
          "Incorrect definition of stack in enterprise context.",
          "Invalid alternative answer for stack."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre erro e a escalabilidade de Java Exception Handling?",
        "options": [
          "Opção incorreta sobre erro relacionada a Java Exception Handling.",
          "Outro conceito incorreto sobre erro.",
          "Definição incorreta de erro no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de erro."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between error and the scalability of Java Exceptions?",
        "options": [
          "Incorrect option about error related to Java Exceptions.",
          "Another incorrect concept regarding error.",
          "Incorrect definition of error in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of error."
        ],
        "correct": 3
      }
    }
  ],
  "p3_wed_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de DB2 no contexto de DB2 no Mainframe vs VSAM?",
        "options": [
          "Representa a base estrutural de DB2 para assegurar corretude técnica em DB2 no Mainframe vs VSAM.",
          "Outro conceito incorreto sobre DB2.",
          "Definição incorreta de DB2 no contexto corporativo.",
          "Resposta alternativa inválida para DB2."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of DB2 in the context of DB2 vs VSAM?",
        "options": [
          "It represents the structural foundation of DB2 to ensure technical correctness in DB2 vs VSAM.",
          "Another incorrect concept regarding DB2.",
          "Incorrect definition of DB2 in enterprise context.",
          "Invalid alternative answer for DB2."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como VSAM é aplicado corretamente na arquitetura de DB2 no Mainframe vs VSAM?",
        "options": [
          "Opção incorreta sobre VSAM relacionada a DB2 no Mainframe vs VSAM.",
          "Outro conceito incorreto sobre VSAM.",
          "Definição incorreta de VSAM no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de VSAM no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is VSAM correctly applied in the architecture of DB2 vs VSAM?",
        "options": [
          "Incorrect option about VSAM related to DB2 vs VSAM.",
          "Another incorrect concept regarding VSAM.",
          "Incorrect definition of VSAM in enterprise context.",
          "Through proper parameterization and loose coupling of VSAM in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com KSDS?",
        "options": [
          "Opção incorreta sobre KSDS relacionada a DB2 no Mainframe vs VSAM.",
          "Outro conceito incorreto sobre KSDS.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de KSDS.",
          "Resposta alternativa inválida para KSDS."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with KSDS?",
        "options": [
          "Incorrect option about KSDS related to DB2 vs VSAM.",
          "Another incorrect concept regarding KSDS.",
          "Ensure isolation and apply frequent testing to validate the behavior of KSDS.",
          "Invalid alternative answer for KSDS."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar relacional no desenvolvimento?",
        "options": [
          "Opção incorreta sobre relacional relacionada a DB2 no Mainframe vs VSAM.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em relacional.",
          "Definição incorreta de relacional no contexto corporativo.",
          "Resposta alternativa inválida para relacional."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing relational in development?",
        "options": [
          "Incorrect option about relational related to DB2 vs VSAM.",
          "Hardcoding values and lack of proper exception handling in relational.",
          "Incorrect definition of relational in enterprise context.",
          "Invalid alternative answer for relational."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de flat file em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre flat file.",
          "Definição incorreta de flat file no contexto corporativo.",
          "Resposta alternativa inválida para flat file."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of flat file in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding flat file.",
          "Incorrect definition of flat file in enterprise context.",
          "Invalid alternative answer for flat file."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como tabela se integra com o restante da stack em DB2 no Mainframe vs VSAM?",
        "options": [
          "Opção incorreta sobre tabela relacionada a DB2 no Mainframe vs VSAM.",
          "Outro conceito incorreto sobre tabela.",
          "Definição incorreta de tabela no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does table integrate with the rest of the stack in DB2 vs VSAM?",
        "options": [
          "Incorrect option about table related to DB2 vs VSAM.",
          "Another incorrect concept regarding table.",
          "Incorrect definition of table in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em indexado?",
        "options": [
          "Opção incorreta sobre indexado relacionada a DB2 no Mainframe vs VSAM.",
          "Outro conceito incorreto sobre indexado.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para indexado."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in indexed?",
        "options": [
          "Incorrect option about indexed related to DB2 vs VSAM.",
          "Another incorrect concept regarding indexed.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for indexed."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de  mainframe é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre  mainframe relacionada a DB2 no Mainframe vs VSAM.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de  mainframe no contexto corporativo.",
          "Resposta alternativa inválida para  mainframe."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of mainframe guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about mainframe related to DB2 vs VSAM.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of mainframe in enterprise context.",
          "Invalid alternative answer for mainframe."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de DBMS?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para DBMS.",
          "Outro conceito incorreto sobre DBMS.",
          "Definição incorreta de DBMS no contexto corporativo.",
          "Resposta alternativa inválida para DBMS."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of DBMS?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for DBMS.",
          "Another incorrect concept regarding DBMS.",
          "Incorrect definition of DBMS in enterprise context.",
          "Invalid alternative answer for DBMS."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre diferença e a escalabilidade de DB2 no Mainframe vs VSAM?",
        "options": [
          "Opção incorreta sobre diferença relacionada a DB2 no Mainframe vs VSAM.",
          "Outro conceito incorreto sobre diferença.",
          "Definição incorreta de diferença no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de diferença."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between difference and the scalability of DB2 vs VSAM?",
        "options": [
          "Incorrect option about difference related to DB2 vs VSAM.",
          "Another incorrect concept regarding difference.",
          "Incorrect definition of difference in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of difference."
        ],
        "correct": 3
      }
    }
  ],
  "p3_wed_t2": [
    {
      "pt": {
        "question": "Qual é o principal conceito de DECLARE CURSOR no contexto de DB2 Cursores?",
        "options": [
          "Representa a base estrutural de DECLARE CURSOR para assegurar corretude técnica em DB2 Cursores.",
          "Outro conceito incorreto sobre DECLARE CURSOR.",
          "Definição incorreta de DECLARE CURSOR no contexto corporativo.",
          "Resposta alternativa inválida para DECLARE CURSOR."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of DECLARE CURSOR in the context of DB2 Cursors?",
        "options": [
          "It represents the structural foundation of DECLARE CURSOR to ensure technical correctness in DB2 Cursors.",
          "Another incorrect concept regarding DECLARE CURSOR.",
          "Incorrect definition of DECLARE CURSOR in enterprise context.",
          "Invalid alternative answer for DECLARE CURSOR."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como OPEN é aplicado corretamente na arquitetura de DB2 Cursores?",
        "options": [
          "Opção incorreta sobre OPEN relacionada a DB2 Cursores.",
          "Outro conceito incorreto sobre OPEN.",
          "Definição incorreta de OPEN no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de OPEN no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is OPEN correctly applied in the architecture of DB2 Cursors?",
        "options": [
          "Incorrect option about OPEN related to DB2 Cursors.",
          "Another incorrect concept regarding OPEN.",
          "Incorrect definition of OPEN in enterprise context.",
          "Through proper parameterization and loose coupling of OPEN in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com FETCH?",
        "options": [
          "Opção incorreta sobre FETCH relacionada a DB2 Cursores.",
          "Outro conceito incorreto sobre FETCH.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de FETCH.",
          "Resposta alternativa inválida para FETCH."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with FETCH?",
        "options": [
          "Incorrect option about FETCH related to DB2 Cursors.",
          "Another incorrect concept regarding FETCH.",
          "Ensure isolation and apply frequent testing to validate the behavior of FETCH.",
          "Invalid alternative answer for FETCH."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar CLOSE no desenvolvimento?",
        "options": [
          "Opção incorreta sobre CLOSE relacionada a DB2 Cursores.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em CLOSE.",
          "Definição incorreta de CLOSE no contexto corporativo.",
          "Resposta alternativa inválida para CLOSE."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing CLOSE in development?",
        "options": [
          "Incorrect option about CLOSE related to DB2 Cursors.",
          "Hardcoding values and lack of proper exception handling in CLOSE.",
          "Incorrect definition of CLOSE in enterprise context.",
          "Invalid alternative answer for CLOSE."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de SQLCODE em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre SQLCODE.",
          "Definição incorreta de SQLCODE no contexto corporativo.",
          "Resposta alternativa inválida para SQLCODE."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of SQLCODE in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding SQLCODE.",
          "Incorrect definition of SQLCODE in enterprise context.",
          "Invalid alternative answer for SQLCODE."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como SQLCA se integra com o restante da stack em DB2 Cursores?",
        "options": [
          "Opção incorreta sobre SQLCA relacionada a DB2 Cursores.",
          "Outro conceito incorreto sobre SQLCA.",
          "Definição incorreta de SQLCA no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does SQLCA integrate with the rest of the stack in DB2 Cursors?",
        "options": [
          "Incorrect option about SQLCA related to DB2 Cursors.",
          "Another incorrect concept regarding SQLCA.",
          "Incorrect definition of SQLCA in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em cursor?",
        "options": [
          "Opção incorreta sobre cursor relacionada a DB2 Cursores.",
          "Outro conceito incorreto sobre cursor.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para cursor."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in cursor?",
        "options": [
          "Incorrect option about cursor related to DB2 Cursors.",
          "Another incorrect concept regarding cursor.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for cursor."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de loop é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre loop relacionada a DB2 Cursores.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de loop no contexto corporativo.",
          "Resposta alternativa inválida para loop."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of loop guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about loop related to DB2 Cursors.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of loop in enterprise context.",
          "Invalid alternative answer for loop."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de registro?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para registro.",
          "Outro conceito incorreto sobre registro.",
          "Definição incorreta de registro no contexto corporativo.",
          "Resposta alternativa inválida para registro."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of row?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for row.",
          "Another incorrect concept regarding row.",
          "Incorrect definition of row in enterprise context.",
          "Invalid alternative answer for row."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre batch e a escalabilidade de DB2 Cursores?",
        "options": [
          "Opção incorreta sobre batch relacionada a DB2 Cursores.",
          "Outro conceito incorreto sobre batch.",
          "Definição incorreta de batch no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de batch."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between batch and the scalability of DB2 Cursors?",
        "options": [
          "Incorrect option about batch related to DB2 Cursors.",
          "Another incorrect concept regarding batch.",
          "Incorrect definition of batch in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of batch."
        ],
        "correct": 3
      }
    }
  ],
  "p3_wed_t3": [
    {
      "pt": {
        "question": "Qual é o principal conceito de EXPLAIN no contexto de DB2 Performance & EXPLAIN?",
        "options": [
          "Representa a base estrutural de EXPLAIN para assegurar corretude técnica em DB2 Performance & EXPLAIN.",
          "Outro conceito incorreto sobre EXPLAIN.",
          "Definição incorreta de EXPLAIN no contexto corporativo.",
          "Resposta alternativa inválida para EXPLAIN."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of EXPLAIN in the context of DB2 Tuning?",
        "options": [
          "It represents the structural foundation of EXPLAIN to ensure technical correctness in DB2 Tuning.",
          "Another incorrect concept regarding EXPLAIN.",
          "Incorrect definition of EXPLAIN in enterprise context.",
          "Invalid alternative answer for EXPLAIN."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como PLAN é aplicado corretamente na arquitetura de DB2 Performance & EXPLAIN?",
        "options": [
          "Opção incorreta sobre PLAN relacionada a DB2 Performance & EXPLAIN.",
          "Outro conceito incorreto sobre PLAN.",
          "Definição incorreta de PLAN no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de PLAN no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is PLAN correctly applied in the architecture of DB2 Tuning?",
        "options": [
          "Incorrect option about PLAN related to DB2 Tuning.",
          "Another incorrect concept regarding PLAN.",
          "Incorrect definition of PLAN in enterprise context.",
          "Through proper parameterization and loose coupling of PLAN in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com índice?",
        "options": [
          "Opção incorreta sobre índice relacionada a DB2 Performance & EXPLAIN.",
          "Outro conceito incorreto sobre índice.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de índice.",
          "Resposta alternativa inválida para índice."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with index?",
        "options": [
          "Incorrect option about index related to DB2 Tuning.",
          "Another incorrect concept regarding index.",
          "Ensure isolation and apply frequent testing to validate the behavior of index.",
          "Invalid alternative answer for index."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar tuning no desenvolvimento?",
        "options": [
          "Opção incorreta sobre tuning relacionada a DB2 Performance & EXPLAIN.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em tuning.",
          "Definição incorreta de tuning no contexto corporativo.",
          "Resposta alternativa inválida para tuning."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing tuning in development?",
        "options": [
          "Incorrect option about tuning related to DB2 Tuning.",
          "Hardcoding values and lack of proper exception handling in tuning.",
          "Incorrect definition of tuning in enterprise context.",
          "Invalid alternative answer for tuning."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de performance em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre performance.",
          "Definição incorreta de performance no contexto corporativo.",
          "Resposta alternativa inválida para performance."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of performance in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding performance.",
          "Incorrect definition of performance in enterprise context.",
          "Invalid alternative answer for performance."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como query se integra com o restante da stack em DB2 Performance & EXPLAIN?",
        "options": [
          "Opção incorreta sobre query relacionada a DB2 Performance & EXPLAIN.",
          "Outro conceito incorreto sobre query.",
          "Definição incorreta de query no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does query integrate with the rest of the stack in DB2 Tuning?",
        "options": [
          "Incorrect option about query related to DB2 Tuning.",
          "Another incorrect concept regarding query.",
          "Incorrect definition of query in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em custo?",
        "options": [
          "Opção incorreta sobre custo relacionada a DB2 Performance & EXPLAIN.",
          "Outro conceito incorreto sobre custo.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para custo."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in cost?",
        "options": [
          "Incorrect option about cost related to DB2 Tuning.",
          "Another incorrect concept regarding cost.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for cost."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de otimizador é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre otimizador relacionada a DB2 Performance & EXPLAIN.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de otimizador no contexto corporativo.",
          "Resposta alternativa inválida para otimizador."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of optimizer guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about optimizer related to DB2 Tuning.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of optimizer in enterprise context.",
          "Invalid alternative answer for optimizer."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de acesso?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para acesso.",
          "Outro conceito incorreto sobre acesso.",
          "Definição incorreta de acesso no contexto corporativo.",
          "Resposta alternativa inválida para acesso."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of access?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for access.",
          "Another incorrect concept regarding access.",
          "Incorrect definition of access in enterprise context.",
          "Invalid alternative answer for access."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre varredura e a escalabilidade de DB2 Performance & EXPLAIN?",
        "options": [
          "Opção incorreta sobre varredura relacionada a DB2 Performance & EXPLAIN.",
          "Outro conceito incorreto sobre varredura.",
          "Definição incorreta de varredura no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de varredura."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between scan and the scalability of DB2 Tuning?",
        "options": [
          "Incorrect option about scan related to DB2 Tuning.",
          "Another incorrect concept regarding scan.",
          "Incorrect definition of scan in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of scan."
        ],
        "correct": 3
      }
    }
  ],
  "p3_thu_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de IoC no contexto de Spring Core IoC & DI?",
        "options": [
          "Representa a base estrutural de IoC para assegurar corretude técnica em Spring Core IoC & DI.",
          "Outro conceito incorreto sobre IoC.",
          "Definição incorreta de IoC no contexto corporativo.",
          "Resposta alternativa inválida para IoC."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of IoC in the context of Spring Core IoC & DI?",
        "options": [
          "It represents the structural foundation of IoC to ensure technical correctness in Spring Core IoC & DI.",
          "Another incorrect concept regarding IoC.",
          "Incorrect definition of IoC in enterprise context.",
          "Invalid alternative answer for IoC."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como DI é aplicado corretamente na arquitetura de Spring Core IoC & DI?",
        "options": [
          "Opção incorreta sobre DI relacionada a Spring Core IoC & DI.",
          "Outro conceito incorreto sobre DI.",
          "Definição incorreta de DI no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de DI no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is DI correctly applied in the architecture of Spring Core IoC & DI?",
        "options": [
          "Incorrect option about DI related to Spring Core IoC & DI.",
          "Another incorrect concept regarding DI.",
          "Incorrect definition of DI in enterprise context.",
          "Through proper parameterization and loose coupling of DI in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com Autowired?",
        "options": [
          "Opção incorreta sobre Autowired relacionada a Spring Core IoC & DI.",
          "Outro conceito incorreto sobre Autowired.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de Autowired.",
          "Resposta alternativa inválida para Autowired."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with Autowired?",
        "options": [
          "Incorrect option about Autowired related to Spring Core IoC & DI.",
          "Another incorrect concept regarding Autowired.",
          "Ensure isolation and apply frequent testing to validate the behavior of Autowired.",
          "Invalid alternative answer for Autowired."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar Bean no desenvolvimento?",
        "options": [
          "Opção incorreta sobre Bean relacionada a Spring Core IoC & DI.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em Bean.",
          "Definição incorreta de Bean no contexto corporativo.",
          "Resposta alternativa inválida para Bean."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing Bean in development?",
        "options": [
          "Incorrect option about Bean related to Spring Core IoC & DI.",
          "Hardcoding values and lack of proper exception handling in Bean.",
          "Incorrect definition of Bean in enterprise context.",
          "Invalid alternative answer for Bean."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de Component em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre Component.",
          "Definição incorreta de Component no contexto corporativo.",
          "Resposta alternativa inválida para Component."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of Component in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding Component.",
          "Incorrect definition of Component in enterprise context.",
          "Invalid alternative answer for Component."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como Service se integra com o restante da stack em Spring Core IoC & DI?",
        "options": [
          "Opção incorreta sobre Service relacionada a Spring Core IoC & DI.",
          "Outro conceito incorreto sobre Service.",
          "Definição incorreta de Service no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does Service integrate with the rest of the stack in Spring Core IoC & DI?",
        "options": [
          "Incorrect option about Service related to Spring Core IoC & DI.",
          "Another incorrect concept regarding Service.",
          "Incorrect definition of Service in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em Injeção?",
        "options": [
          "Opção incorreta sobre Injeção relacionada a Spring Core IoC & DI.",
          "Outro conceito incorreto sobre Injeção.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para Injeção."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in Injection?",
        "options": [
          "Incorrect option about Injection related to Spring Core IoC & DI.",
          "Another incorrect concept regarding Injection.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for Injection."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de Dependência é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre Dependência relacionada a Spring Core IoC & DI.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de Dependência no contexto corporativo.",
          "Resposta alternativa inválida para Dependência."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of Dependency guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about Dependency related to Spring Core IoC & DI.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of Dependency in enterprise context.",
          "Invalid alternative answer for Dependency."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de Container?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para Container.",
          "Outro conceito incorreto sobre Container.",
          "Definição incorreta de Container no contexto corporativo.",
          "Resposta alternativa inválida para Container."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of Container?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for Container.",
          "Another incorrect concept regarding Container.",
          "Incorrect definition of Container in enterprise context.",
          "Invalid alternative answer for Container."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre Spring e a escalabilidade de Spring Core IoC & DI?",
        "options": [
          "Opção incorreta sobre Spring relacionada a Spring Core IoC & DI.",
          "Outro conceito incorreto sobre Spring.",
          "Definição incorreta de Spring no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de Spring."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between Spring and the scalability of Spring Core IoC & DI?",
        "options": [
          "Incorrect option about Spring related to Spring Core IoC & DI.",
          "Another incorrect concept regarding Spring.",
          "Incorrect definition of Spring in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of Spring."
        ],
        "correct": 3
      }
    }
  ],
  "p3_thu_t2": [
    {
      "pt": {
        "question": "Qual é o principal conceito de @RestController no contexto de Spring Boot REST?",
        "options": [
          "Representa a base estrutural de @RestController para assegurar corretude técnica em Spring Boot REST.",
          "Outro conceito incorreto sobre @RestController.",
          "Definição incorreta de @RestController no contexto corporativo.",
          "Resposta alternativa inválida para @RestController."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of @RestController in the context of Spring Boot REST?",
        "options": [
          "It represents the structural foundation of @RestController to ensure technical correctness in Spring Boot REST.",
          "Another incorrect concept regarding @RestController.",
          "Incorrect definition of @RestController in enterprise context.",
          "Invalid alternative answer for @RestController."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como @GetMapping é aplicado corretamente na arquitetura de Spring Boot REST?",
        "options": [
          "Opção incorreta sobre @GetMapping relacionada a Spring Boot REST.",
          "Outro conceito incorreto sobre @GetMapping.",
          "Definição incorreta de @GetMapping no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de @GetMapping no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is @GetMapping correctly applied in the architecture of Spring Boot REST?",
        "options": [
          "Incorrect option about @GetMapping related to Spring Boot REST.",
          "Another incorrect concept regarding @GetMapping.",
          "Incorrect definition of @GetMapping in enterprise context.",
          "Through proper parameterization and loose coupling of @GetMapping in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com @PostMapping?",
        "options": [
          "Opção incorreta sobre @PostMapping relacionada a Spring Boot REST.",
          "Outro conceito incorreto sobre @PostMapping.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de @PostMapping.",
          "Resposta alternativa inválida para @PostMapping."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with @PostMapping?",
        "options": [
          "Incorrect option about @PostMapping related to Spring Boot REST.",
          "Another incorrect concept regarding @PostMapping.",
          "Ensure isolation and apply frequent testing to validate the behavior of @PostMapping.",
          "Invalid alternative answer for @PostMapping."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar REST no desenvolvimento?",
        "options": [
          "Opção incorreta sobre REST relacionada a Spring Boot REST.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em REST.",
          "Definição incorreta de REST no contexto corporativo.",
          "Resposta alternativa inválida para REST."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing REST in development?",
        "options": [
          "Incorrect option about REST related to Spring Boot REST.",
          "Hardcoding values and lack of proper exception handling in REST.",
          "Incorrect definition of REST in enterprise context.",
          "Invalid alternative answer for REST."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de JSON em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre JSON.",
          "Definição incorreta de JSON no contexto corporativo.",
          "Resposta alternativa inválida para JSON."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of JSON in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding JSON.",
          "Incorrect definition of JSON in enterprise context.",
          "Invalid alternative answer for JSON."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como endpoint se integra com o restante da stack em Spring Boot REST?",
        "options": [
          "Opção incorreta sobre endpoint relacionada a Spring Boot REST.",
          "Outro conceito incorreto sobre endpoint.",
          "Definição incorreta de endpoint no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does endpoint integrate with the rest of the stack in Spring Boot REST?",
        "options": [
          "Incorrect option about endpoint related to Spring Boot REST.",
          "Another incorrect concept regarding endpoint.",
          "Incorrect definition of endpoint in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em Controller?",
        "options": [
          "Opção incorreta sobre Controller relacionada a Spring Boot REST.",
          "Outro conceito incorreto sobre Controller.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para Controller."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in Controller?",
        "options": [
          "Incorrect option about Controller related to Spring Boot REST.",
          "Another incorrect concept regarding Controller.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for Controller."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de HTTP é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre HTTP relacionada a Spring Boot REST.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de HTTP no contexto corporativo.",
          "Resposta alternativa inválida para HTTP."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of HTTP guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about HTTP related to Spring Boot REST.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of HTTP in enterprise context.",
          "Invalid alternative answer for HTTP."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de Path?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para Path.",
          "Outro conceito incorreto sobre Path.",
          "Definição incorreta de Path no contexto corporativo.",
          "Resposta alternativa inválida para Path."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of Path?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for Path.",
          "Another incorrect concept regarding Path.",
          "Incorrect definition of Path in enterprise context.",
          "Invalid alternative answer for Path."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre RequestBody e a escalabilidade de Spring Boot REST?",
        "options": [
          "Opção incorreta sobre RequestBody relacionada a Spring Boot REST.",
          "Outro conceito incorreto sobre RequestBody.",
          "Definição incorreta de RequestBody no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de RequestBody."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between RequestBody and the scalability of Spring Boot REST?",
        "options": [
          "Incorrect option about RequestBody related to Spring Boot REST.",
          "Another incorrect concept regarding RequestBody.",
          "Incorrect definition of RequestBody in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of RequestBody."
        ],
        "correct": 3
      }
    }
  ],
  "p3_thu_t3": [
    {
      "pt": {
        "question": "Qual é o principal conceito de JPA no contexto de Spring Data JPA?",
        "options": [
          "Representa a base estrutural de JPA para assegurar corretude técnica em Spring Data JPA.",
          "Outro conceito incorreto sobre JPA.",
          "Definição incorreta de JPA no contexto corporativo.",
          "Resposta alternativa inválida para JPA."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of JPA in the context of Spring Data JPA?",
        "options": [
          "It represents the structural foundation of JPA to ensure technical correctness in Spring Data JPA.",
          "Another incorrect concept regarding JPA.",
          "Incorrect definition of JPA in enterprise context.",
          "Invalid alternative answer for JPA."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como Hibernate é aplicado corretamente na arquitetura de Spring Data JPA?",
        "options": [
          "Opção incorreta sobre Hibernate relacionada a Spring Data JPA.",
          "Outro conceito incorreto sobre Hibernate.",
          "Definição incorreta de Hibernate no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de Hibernate no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is Hibernate correctly applied in the architecture of Spring Data JPA?",
        "options": [
          "Incorrect option about Hibernate related to Spring Data JPA.",
          "Another incorrect concept regarding Hibernate.",
          "Incorrect definition of Hibernate in enterprise context.",
          "Through proper parameterization and loose coupling of Hibernate in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com JpaRepository?",
        "options": [
          "Opção incorreta sobre JpaRepository relacionada a Spring Data JPA.",
          "Outro conceito incorreto sobre JpaRepository.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de JpaRepository.",
          "Resposta alternativa inválida para JpaRepository."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with JpaRepository?",
        "options": [
          "Incorrect option about JpaRepository related to Spring Data JPA.",
          "Another incorrect concept regarding JpaRepository.",
          "Ensure isolation and apply frequent testing to validate the behavior of JpaRepository.",
          "Invalid alternative answer for JpaRepository."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar Entity no desenvolvimento?",
        "options": [
          "Opção incorreta sobre Entity relacionada a Spring Data JPA.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em Entity.",
          "Definição incorreta de Entity no contexto corporativo.",
          "Resposta alternativa inválida para Entity."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing Entity in development?",
        "options": [
          "Incorrect option about Entity related to Spring Data JPA.",
          "Hardcoding values and lack of proper exception handling in Entity.",
          "Incorrect definition of Entity in enterprise context.",
          "Invalid alternative answer for Entity."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de Table em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre Table.",
          "Definição incorreta de Table no contexto corporativo.",
          "Resposta alternativa inválida para Table."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of Table in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding Table.",
          "Incorrect definition of Table in enterprise context.",
          "Invalid alternative answer for Table."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como Id se integra com o restante da stack em Spring Data JPA?",
        "options": [
          "Opção incorreta sobre Id relacionada a Spring Data JPA.",
          "Outro conceito incorreto sobre Id.",
          "Definição incorreta de Id no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does Id integrate with the rest of the stack in Spring Data JPA?",
        "options": [
          "Incorrect option about Id related to Spring Data JPA.",
          "Another incorrect concept regarding Id.",
          "Incorrect definition of Id in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em ORM?",
        "options": [
          "Opção incorreta sobre ORM relacionada a Spring Data JPA.",
          "Outro conceito incorreto sobre ORM.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para ORM."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in ORM?",
        "options": [
          "Incorrect option about ORM related to Spring Data JPA.",
          "Another incorrect concept regarding ORM.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for ORM."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de persistência é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre persistência relacionada a Spring Data JPA.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de persistência no contexto corporativo.",
          "Resposta alternativa inválida para persistência."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of persistence guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about persistence related to Spring Data JPA.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of persistence in enterprise context.",
          "Invalid alternative answer for persistence."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de Spring Data?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para Spring Data.",
          "Outro conceito incorreto sobre Spring Data.",
          "Definição incorreta de Spring Data no contexto corporativo.",
          "Resposta alternativa inválida para Spring Data."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of Spring Data?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for Spring Data.",
          "Another incorrect concept regarding Spring Data.",
          "Incorrect definition of Spring Data in enterprise context.",
          "Invalid alternative answer for Spring Data."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre transacional e a escalabilidade de Spring Data JPA?",
        "options": [
          "Opção incorreta sobre transacional relacionada a Spring Data JPA.",
          "Outro conceito incorreto sobre transacional.",
          "Definição incorreta de transacional no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de transacional."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between transactional and the scalability of Spring Data JPA?",
        "options": [
          "Incorrect option about transactional related to Spring Data JPA.",
          "Another incorrect concept regarding transactional.",
          "Incorrect definition of transactional in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of transactional."
        ],
        "correct": 3
      }
    }
  ],
  "p3_fri_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de EBCDIC no contexto de ETL EBCDIC para ASCII/UTF-8?",
        "options": [
          "Representa a base estrutural de EBCDIC para assegurar corretude técnica em ETL EBCDIC para ASCII/UTF-8.",
          "Outro conceito incorreto sobre EBCDIC.",
          "Definição incorreta de EBCDIC no contexto corporativo.",
          "Resposta alternativa inválida para EBCDIC."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of EBCDIC in the context of EBCDIC & ASCII ETL?",
        "options": [
          "It represents the structural foundation of EBCDIC to ensure technical correctness in EBCDIC & ASCII ETL.",
          "Another incorrect concept regarding EBCDIC.",
          "Incorrect definition of EBCDIC in enterprise context.",
          "Invalid alternative answer for EBCDIC."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como ASCII é aplicado corretamente na arquitetura de ETL EBCDIC para ASCII/UTF-8?",
        "options": [
          "Opção incorreta sobre ASCII relacionada a ETL EBCDIC para ASCII/UTF-8.",
          "Outro conceito incorreto sobre ASCII.",
          "Definição incorreta de ASCII no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de ASCII no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is ASCII correctly applied in the architecture of EBCDIC & ASCII ETL?",
        "options": [
          "Incorrect option about ASCII related to EBCDIC & ASCII ETL.",
          "Another incorrect concept regarding ASCII.",
          "Incorrect definition of ASCII in enterprise context.",
          "Through proper parameterization and loose coupling of ASCII in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com UTF-8?",
        "options": [
          "Opção incorreta sobre UTF-8 relacionada a ETL EBCDIC para ASCII/UTF-8.",
          "Outro conceito incorreto sobre UTF-8.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de UTF-8.",
          "Resposta alternativa inválida para UTF-8."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with UTF-8?",
        "options": [
          "Incorrect option about UTF-8 related to EBCDIC & ASCII ETL.",
          "Another incorrect concept regarding UTF-8.",
          "Ensure isolation and apply frequent testing to validate the behavior of UTF-8.",
          "Invalid alternative answer for UTF-8."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar codificação no desenvolvimento?",
        "options": [
          "Opção incorreta sobre codificação relacionada a ETL EBCDIC para ASCII/UTF-8.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em codificação.",
          "Definição incorreta de codificação no contexto corporativo.",
          "Resposta alternativa inválida para codificação."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing encoding in development?",
        "options": [
          "Incorrect option about encoding related to EBCDIC & ASCII ETL.",
          "Hardcoding values and lack of proper exception handling in encoding.",
          "Incorrect definition of encoding in enterprise context.",
          "Invalid alternative answer for encoding."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de conversão em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre conversão.",
          "Definição incorreta de conversão no contexto corporativo.",
          "Resposta alternativa inválida para conversão."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of conversion in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding conversion.",
          "Incorrect definition of conversion in enterprise context.",
          "Invalid alternative answer for conversion."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como tabela se integra com o restante da stack em ETL EBCDIC para ASCII/UTF-8?",
        "options": [
          "Opção incorreta sobre tabela relacionada a ETL EBCDIC para ASCII/UTF-8.",
          "Outro conceito incorreto sobre tabela.",
          "Definição incorreta de tabela no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does table integrate with the rest of the stack in EBCDIC & ASCII ETL?",
        "options": [
          "Incorrect option about table related to EBCDIC & ASCII ETL.",
          "Another incorrect concept regarding table.",
          "Incorrect definition of table in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em bytes?",
        "options": [
          "Opção incorreta sobre bytes relacionada a ETL EBCDIC para ASCII/UTF-8.",
          "Outro conceito incorreto sobre bytes.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para bytes."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in bytes?",
        "options": [
          "Incorrect option about bytes related to EBCDIC & ASCII ETL.",
          "Another incorrect concept regarding bytes.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for bytes."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de layout é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre layout relacionada a ETL EBCDIC para ASCII/UTF-8.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de layout no contexto corporativo.",
          "Resposta alternativa inválida para layout."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of layout guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about layout related to EBCDIC & ASCII ETL.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of layout in enterprise context.",
          "Invalid alternative answer for layout."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de ETL?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para ETL.",
          "Outro conceito incorreto sobre ETL.",
          "Definição incorreta de ETL no contexto corporativo.",
          "Resposta alternativa inválida para ETL."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of ETL?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for ETL.",
          "Another incorrect concept regarding ETL.",
          "Incorrect definition of ETL in enterprise context.",
          "Invalid alternative answer for ETL."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre flat e a escalabilidade de ETL EBCDIC para ASCII/UTF-8?",
        "options": [
          "Opção incorreta sobre flat relacionada a ETL EBCDIC para ASCII/UTF-8.",
          "Outro conceito incorreto sobre flat.",
          "Definição incorreta de flat no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de flat."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between flat and the scalability of EBCDIC & ASCII ETL?",
        "options": [
          "Incorrect option about flat related to EBCDIC & ASCII ETL.",
          "Another incorrect concept regarding flat.",
          "Incorrect definition of flat in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of flat."
        ],
        "correct": 3
      }
    }
  ],
  "p3_fri_t2": [
    {
      "pt": {
        "question": "Qual é o principal conceito de COMP-3 no contexto de ETL COMP-3 Decimais?",
        "options": [
          "Representa a base estrutural de COMP-3 para assegurar corretude técnica em ETL COMP-3 Decimais.",
          "Outro conceito incorreto sobre COMP-3.",
          "Definição incorreta de COMP-3 no contexto corporativo.",
          "Resposta alternativa inválida para COMP-3."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of COMP-3 in the context of ETL COMP-3 Decimals?",
        "options": [
          "It represents the structural foundation of COMP-3 to ensure technical correctness in ETL COMP-3 Decimals.",
          "Another incorrect concept regarding COMP-3.",
          "Incorrect definition of COMP-3 in enterprise context.",
          "Invalid alternative answer for COMP-3."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como decimal compactado é aplicado corretamente na arquitetura de ETL COMP-3 Decimais?",
        "options": [
          "Opção incorreta sobre decimal compactado relacionada a ETL COMP-3 Decimais.",
          "Outro conceito incorreto sobre decimal compactado.",
          "Definição incorreta de decimal compactado no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de decimal compactado no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is packed decimal correctly applied in the architecture of ETL COMP-3 Decimals?",
        "options": [
          "Incorrect option about packed decimal related to ETL COMP-3 Decimals.",
          "Another incorrect concept regarding packed decimal.",
          "Incorrect definition of packed decimal in enterprise context.",
          "Through proper parameterization and loose coupling of packed decimal in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com packed decimal?",
        "options": [
          "Opção incorreta sobre packed decimal relacionada a ETL COMP-3 Decimais.",
          "Outro conceito incorreto sobre packed decimal.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de packed decimal.",
          "Resposta alternativa inválida para packed decimal."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with nibble?",
        "options": [
          "Incorrect option about nibble related to ETL COMP-3 Decimals.",
          "Another incorrect concept regarding nibble.",
          "Ensure isolation and apply frequent testing to validate the behavior of nibble.",
          "Invalid alternative answer for nibble."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar nibble no desenvolvimento?",
        "options": [
          "Opção incorreta sobre nibble relacionada a ETL COMP-3 Decimais.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em nibble.",
          "Definição incorreta de nibble no contexto corporativo.",
          "Resposta alternativa inválida para nibble."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing sign in development?",
        "options": [
          "Incorrect option about sign related to ETL COMP-3 Decimals.",
          "Hardcoding values and lack of proper exception handling in sign.",
          "Incorrect definition of sign in enterprise context.",
          "Invalid alternative answer for sign."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de sinal em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre sinal.",
          "Definição incorreta de sinal no contexto corporativo.",
          "Resposta alternativa inválida para sinal."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of C in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding C.",
          "Incorrect definition of C in enterprise context.",
          "Invalid alternative answer for C."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como C se integra com o restante da stack em ETL COMP-3 Decimais?",
        "options": [
          "Opção incorreta sobre C relacionada a ETL COMP-3 Decimais.",
          "Outro conceito incorreto sobre C.",
          "Definição incorreta de C no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does D integrate with the rest of the stack in ETL COMP-3 Decimals?",
        "options": [
          "Incorrect option about D related to ETL COMP-3 Decimals.",
          "Another incorrect concept regarding D.",
          "Incorrect definition of D in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em D?",
        "options": [
          "Opção incorreta sobre D relacionada a ETL COMP-3 Decimais.",
          "Outro conceito incorreto sobre D.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para D."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in F?",
        "options": [
          "Incorrect option about F related to ETL COMP-3 Decimals.",
          "Another incorrect concept regarding F.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for F."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de F é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre F relacionada a ETL COMP-3 Decimais.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de F no contexto corporativo.",
          "Resposta alternativa inválida para F."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of conversion guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about conversion related to ETL COMP-3 Decimals.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of conversion in enterprise context.",
          "Invalid alternative answer for conversion."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de conversão?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para conversão.",
          "Outro conceito incorreto sobre conversão.",
          "Definição incorreta de conversão no contexto corporativo.",
          "Resposta alternativa inválida para conversão."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of bytes?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for bytes.",
          "Another incorrect concept regarding bytes.",
          "Incorrect definition of bytes in enterprise context.",
          "Invalid alternative answer for bytes."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre bytes e a escalabilidade de ETL COMP-3 Decimais?",
        "options": [
          "Opção incorreta sobre bytes relacionada a ETL COMP-3 Decimais.",
          "Outro conceito incorreto sobre bytes.",
          "Definição incorreta de bytes no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de bytes."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between unpack and the scalability of ETL COMP-3 Decimals?",
        "options": [
          "Incorrect option about unpack related to ETL COMP-3 Decimals.",
          "Another incorrect concept regarding unpack.",
          "Incorrect definition of unpack in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of unpack."
        ],
        "correct": 3
      }
    }
  ],
  "p4_mon_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de Channels no contexto de CICS Channels & Containers?",
        "options": [
          "Representa a base estrutural de Channels para assegurar corretude técnica em CICS Channels & Containers.",
          "Outro conceito incorreto sobre Channels.",
          "Definição incorreta de Channels no contexto corporativo.",
          "Resposta alternativa inválida para Channels."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of Channels in the context of CICS Channels & Containers?",
        "options": [
          "It represents the structural foundation of Channels to ensure technical correctness in CICS Channels & Containers.",
          "Another incorrect concept regarding Channels.",
          "Incorrect definition of Channels in enterprise context.",
          "Invalid alternative answer for Channels."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como Containers é aplicado corretamente na arquitetura de CICS Channels & Containers?",
        "options": [
          "Opção incorreta sobre Containers relacionada a CICS Channels & Containers.",
          "Outro conceito incorreto sobre Containers.",
          "Definição incorreta de Containers no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de Containers no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is Containers correctly applied in the architecture of CICS Channels & Containers?",
        "options": [
          "Incorrect option about Containers related to CICS Channels & Containers.",
          "Another incorrect concept regarding Containers.",
          "Incorrect definition of Containers in enterprise context.",
          "Through proper parameterization and loose coupling of Containers in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com 32KB?",
        "options": [
          "Opção incorreta sobre 32KB relacionada a CICS Channels & Containers.",
          "Outro conceito incorreto sobre 32KB.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de 32KB.",
          "Resposta alternativa inválida para 32KB."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with 32KB?",
        "options": [
          "Incorrect option about 32KB related to CICS Channels & Containers.",
          "Another incorrect concept regarding 32KB.",
          "Ensure isolation and apply frequent testing to validate the behavior of 32KB.",
          "Invalid alternative answer for 32KB."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar COMMAREA no desenvolvimento?",
        "options": [
          "Opção incorreta sobre COMMAREA relacionada a CICS Channels & Containers.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em COMMAREA.",
          "Definição incorreta de COMMAREA no contexto corporativo.",
          "Resposta alternativa inválida para COMMAREA."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing COMMAREA in development?",
        "options": [
          "Incorrect option about COMMAREA related to CICS Channels & Containers.",
          "Hardcoding values and lack of proper exception handling in COMMAREA.",
          "Incorrect definition of COMMAREA in enterprise context.",
          "Invalid alternative answer for COMMAREA."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de EXEC CICS GET CONTAINER em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre EXEC CICS GET CONTAINER.",
          "Definição incorreta de EXEC CICS GET CONTAINER no contexto corporativo.",
          "Resposta alternativa inválida para EXEC CICS GET CONTAINER."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of EXEC CICS GET CONTAINER in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding EXEC CICS GET CONTAINER.",
          "Incorrect definition of EXEC CICS GET CONTAINER in enterprise context.",
          "Invalid alternative answer for EXEC CICS GET CONTAINER."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como EXEC CICS PUT CONTAINER se integra com o restante da stack em CICS Channels & Containers?",
        "options": [
          "Opção incorreta sobre EXEC CICS PUT CONTAINER relacionada a CICS Channels & Containers.",
          "Outro conceito incorreto sobre EXEC CICS PUT CONTAINER.",
          "Definição incorreta de EXEC CICS PUT CONTAINER no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does EXEC CICS PUT CONTAINER integrate with the rest of the stack in CICS Channels & Containers?",
        "options": [
          "Incorrect option about EXEC CICS PUT CONTAINER related to CICS Channels & Containers.",
          "Another incorrect concept regarding EXEC CICS PUT CONTAINER.",
          "Incorrect definition of EXEC CICS PUT CONTAINER in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em canal?",
        "options": [
          "Opção incorreta sobre canal relacionada a CICS Channels & Containers.",
          "Outro conceito incorreto sobre canal.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para canal."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in channel?",
        "options": [
          "Incorrect option about channel related to CICS Channels & Containers.",
          "Another incorrect concept regarding channel.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for channel."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de moderno é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre moderno relacionada a CICS Channels & Containers.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de moderno no contexto corporativo.",
          "Resposta alternativa inválida para moderno."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of modern guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about modern related to CICS Channels & Containers.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of modern in enterprise context.",
          "Invalid alternative answer for modern."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de limite?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para limite.",
          "Outro conceito incorreto sobre limite.",
          "Definição incorreta de limite no contexto corporativo.",
          "Resposta alternativa inválida para limite."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of limit?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for limit.",
          "Another incorrect concept regarding limit.",
          "Incorrect definition of limit in enterprise context.",
          "Invalid alternative answer for limit."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre dados e a escalabilidade de CICS Channels & Containers?",
        "options": [
          "Opção incorreta sobre dados relacionada a CICS Channels & Containers.",
          "Outro conceito incorreto sobre dados.",
          "Definição incorreta de dados no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between data and the scalability of CICS Channels & Containers?",
        "options": [
          "Incorrect option about data related to CICS Channels & Containers.",
          "Another incorrect concept regarding data.",
          "Incorrect definition of data in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of data."
        ],
        "correct": 3
      }
    }
  ],
  "p4_mon_t2": [
    {
      "pt": {
        "question": "Qual é o principal conceito de JCL no contexto de JCL Batch Automation?",
        "options": [
          "Representa a base estrutural de JCL para assegurar corretude técnica em JCL Batch Automation.",
          "Outro conceito incorreto sobre JCL.",
          "Definição incorreta de JCL no contexto corporativo.",
          "Resposta alternativa inválida para JCL."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of JCL in the context of JCL Batch Automation?",
        "options": [
          "It represents the structural foundation of JCL to ensure technical correctness in JCL Batch Automation.",
          "Another incorrect concept regarding JCL.",
          "Incorrect definition of JCL in enterprise context.",
          "Invalid alternative answer for JCL."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como JOB é aplicado corretamente na arquitetura de JCL Batch Automation?",
        "options": [
          "Opção incorreta sobre JOB relacionada a JCL Batch Automation.",
          "Outro conceito incorreto sobre JOB.",
          "Definição incorreta de JOB no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de JOB no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is JOB correctly applied in the architecture of JCL Batch Automation?",
        "options": [
          "Incorrect option about JOB related to JCL Batch Automation.",
          "Another incorrect concept regarding JOB.",
          "Incorrect definition of JOB in enterprise context.",
          "Through proper parameterization and loose coupling of JOB in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com EXEC?",
        "options": [
          "Opção incorreta sobre EXEC relacionada a JCL Batch Automation.",
          "Outro conceito incorreto sobre EXEC.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de EXEC.",
          "Resposta alternativa inválida para EXEC."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with EXEC?",
        "options": [
          "Incorrect option about EXEC related to JCL Batch Automation.",
          "Another incorrect concept regarding EXEC.",
          "Ensure isolation and apply frequent testing to validate the behavior of EXEC.",
          "Invalid alternative answer for EXEC."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar DD no desenvolvimento?",
        "options": [
          "Opção incorreta sobre DD relacionada a JCL Batch Automation.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em DD.",
          "Definição incorreta de DD no contexto corporativo.",
          "Resposta alternativa inválida para DD."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing DD in development?",
        "options": [
          "Incorrect option about DD related to JCL Batch Automation.",
          "Hardcoding values and lack of proper exception handling in DD.",
          "Incorrect definition of DD in enterprise context.",
          "Invalid alternative answer for DD."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de spool em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre spool.",
          "Definição incorreta de spool no contexto corporativo.",
          "Resposta alternativa inválida para spool."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of spool in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding spool.",
          "Incorrect definition of spool in enterprise context.",
          "Invalid alternative answer for spool."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como passo se integra com o restante da stack em JCL Batch Automation?",
        "options": [
          "Opção incorreta sobre passo relacionada a JCL Batch Automation.",
          "Outro conceito incorreto sobre passo.",
          "Definição incorreta de passo no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does step integrate with the rest of the stack in JCL Batch Automation?",
        "options": [
          "Incorrect option about step related to JCL Batch Automation.",
          "Another incorrect concept regarding step.",
          "Incorrect definition of step in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em procedimento?",
        "options": [
          "Opção incorreta sobre procedimento relacionada a JCL Batch Automation.",
          "Outro conceito incorreto sobre procedimento.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para procedimento."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in procedure?",
        "options": [
          "Incorrect option about procedure related to JCL Batch Automation.",
          "Another incorrect concept regarding procedure.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for procedure."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de SYSIN é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre SYSIN relacionada a JCL Batch Automation.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de SYSIN no contexto corporativo.",
          "Resposta alternativa inválida para SYSIN."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of SYSIN guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about SYSIN related to JCL Batch Automation.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of SYSIN in enterprise context.",
          "Invalid alternative answer for SYSIN."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de SYSOUT?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para SYSOUT.",
          "Outro conceito incorreto sobre SYSOUT.",
          "Definição incorreta de SYSOUT no contexto corporativo.",
          "Resposta alternativa inválida para SYSOUT."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of SYSOUT?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for SYSOUT.",
          "Another incorrect concept regarding SYSOUT.",
          "Incorrect definition of SYSOUT in enterprise context.",
          "Invalid alternative answer for SYSOUT."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre batch e a escalabilidade de JCL Batch Automation?",
        "options": [
          "Opção incorreta sobre batch relacionada a JCL Batch Automation.",
          "Outro conceito incorreto sobre batch.",
          "Definição incorreta de batch no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de batch."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between batch and the scalability of JCL Batch Automation?",
        "options": [
          "Incorrect option about batch related to JCL Batch Automation.",
          "Another incorrect concept regarding batch.",
          "Incorrect definition of batch in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of batch."
        ],
        "correct": 3
      }
    }
  ],
  "p4_tue_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de Clean Architecture no contexto de Clean Architecture?",
        "options": [
          "Representa a base estrutural de Clean Architecture para assegurar corretude técnica em Clean Architecture.",
          "Outro conceito incorreto sobre Clean Architecture.",
          "Definição incorreta de Clean Architecture no contexto corporativo.",
          "Resposta alternativa inválida para Clean Architecture."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of Clean Architecture in the context of Clean Architecture?",
        "options": [
          "It represents the structural foundation of Clean Architecture to ensure technical correctness in Clean Architecture.",
          "Another incorrect concept regarding Clean Architecture.",
          "Incorrect definition of Clean Architecture in enterprise context.",
          "Invalid alternative answer for Clean Architecture."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como camadas é aplicado corretamente na arquitetura de Clean Architecture?",
        "options": [
          "Opção incorreta sobre camadas relacionada a Clean Architecture.",
          "Outro conceito incorreto sobre camadas.",
          "Definição incorreta de camadas no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de camadas no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is layers correctly applied in the architecture of Clean Architecture?",
        "options": [
          "Incorrect option about layers related to Clean Architecture.",
          "Another incorrect concept regarding layers.",
          "Incorrect definition of layers in enterprise context.",
          "Through proper parameterization and loose coupling of layers in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com domínio?",
        "options": [
          "Opção incorreta sobre domínio relacionada a Clean Architecture.",
          "Outro conceito incorreto sobre domínio.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de domínio.",
          "Resposta alternativa inválida para domínio."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with domain?",
        "options": [
          "Incorrect option about domain related to Clean Architecture.",
          "Another incorrect concept regarding domain.",
          "Ensure isolation and apply frequent testing to validate the behavior of domain.",
          "Invalid alternative answer for domain."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar desacoplamento no desenvolvimento?",
        "options": [
          "Opção incorreta sobre desacoplamento relacionada a Clean Architecture.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em desacoplamento.",
          "Definição incorreta de desacoplamento no contexto corporativo.",
          "Resposta alternativa inválida para desacoplamento."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing decoupling in development?",
        "options": [
          "Incorrect option about decoupling related to Clean Architecture.",
          "Hardcoding values and lack of proper exception handling in decoupling.",
          "Incorrect definition of decoupling in enterprise context.",
          "Invalid alternative answer for decoupling."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de entidades em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre entidades.",
          "Definição incorreta de entidades no contexto corporativo.",
          "Resposta alternativa inválida para entidades."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of entities in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding entities.",
          "Incorrect definition of entities in enterprise context.",
          "Invalid alternative answer for entities."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como casos de uso se integra com o restante da stack em Clean Architecture?",
        "options": [
          "Opção incorreta sobre casos de uso relacionada a Clean Architecture.",
          "Outro conceito incorreto sobre casos de uso.",
          "Definição incorreta de casos de uso no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does use cases integrate with the rest of the stack in Clean Architecture?",
        "options": [
          "Incorrect option about use cases related to Clean Architecture.",
          "Another incorrect concept regarding use cases.",
          "Incorrect definition of use cases in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em arquitetura?",
        "options": [
          "Opção incorreta sobre arquitetura relacionada a Clean Architecture.",
          "Outro conceito incorreto sobre arquitetura.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para arquitetura."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in architecture?",
        "options": [
          "Incorrect option about architecture related to Clean Architecture.",
          "Another incorrect concept regarding architecture.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for architecture."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de independente é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre independente relacionada a Clean Architecture.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de independente no contexto corporativo.",
          "Resposta alternativa inválida para independente."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of independent guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about independent related to Clean Architecture.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of independent in enterprise context.",
          "Invalid alternative answer for independent."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de SOLID?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para SOLID.",
          "Outro conceito incorreto sobre SOLID.",
          "Definição incorreta de SOLID no contexto corporativo.",
          "Resposta alternativa inválida para SOLID."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of SOLID?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for SOLID.",
          "Another incorrect concept regarding SOLID.",
          "Incorrect definition of SOLID in enterprise context.",
          "Invalid alternative answer for SOLID."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre design e a escalabilidade de Clean Architecture?",
        "options": [
          "Opção incorreta sobre design relacionada a Clean Architecture.",
          "Outro conceito incorreto sobre design.",
          "Definição incorreta de design no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de design."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between design and the scalability of Clean Architecture?",
        "options": [
          "Incorrect option about design related to Clean Architecture.",
          "Another incorrect concept regarding design.",
          "Incorrect definition of design in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of design."
        ],
        "correct": 3
      }
    }
  ],
  "p4_tue_t2": [
    {
      "pt": {
        "question": "Qual é o principal conceito de JWT no contexto de Spring Security & JWT?",
        "options": [
          "Representa a base estrutural de JWT para assegurar corretude técnica em Spring Security & JWT.",
          "Outro conceito incorreto sobre JWT.",
          "Definição incorreta de JWT no contexto corporativo.",
          "Resposta alternativa inválida para JWT."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of JWT in the context of Spring Security & JWT?",
        "options": [
          "It represents the structural foundation of JWT to ensure technical correctness in Spring Security & JWT.",
          "Another incorrect concept regarding JWT.",
          "Incorrect definition of JWT in enterprise context.",
          "Invalid alternative answer for JWT."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como Spring Security é aplicado corretamente na arquitetura de Spring Security & JWT?",
        "options": [
          "Opção incorreta sobre Spring Security relacionada a Spring Security & JWT.",
          "Outro conceito incorreto sobre Spring Security.",
          "Definição incorreta de Spring Security no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de Spring Security no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is Spring Security correctly applied in the architecture of Spring Security & JWT?",
        "options": [
          "Incorrect option about Spring Security related to Spring Security & JWT.",
          "Another incorrect concept regarding Spring Security.",
          "Incorrect definition of Spring Security in enterprise context.",
          "Through proper parameterization and loose coupling of Spring Security in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com autenticação?",
        "options": [
          "Opção incorreta sobre autenticação relacionada a Spring Security & JWT.",
          "Outro conceito incorreto sobre autenticação.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de autenticação.",
          "Resposta alternativa inválida para autenticação."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with authentication?",
        "options": [
          "Incorrect option about authentication related to Spring Security & JWT.",
          "Another incorrect concept regarding authentication.",
          "Ensure isolation and apply frequent testing to validate the behavior of authentication.",
          "Invalid alternative answer for authentication."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar autorização no desenvolvimento?",
        "options": [
          "Opção incorreta sobre autorização relacionada a Spring Security & JWT.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em autorização.",
          "Definição incorreta de autorização no contexto corporativo.",
          "Resposta alternativa inválida para autorização."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing authorization in development?",
        "options": [
          "Incorrect option about authorization related to Spring Security & JWT.",
          "Hardcoding values and lack of proper exception handling in authorization.",
          "Incorrect definition of authorization in enterprise context.",
          "Invalid alternative answer for authorization."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de token em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre token.",
          "Definição incorreta de token no contexto corporativo.",
          "Resposta alternativa inválida para token."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of token in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding token.",
          "Incorrect definition of token in enterprise context.",
          "Invalid alternative answer for token."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como filtro se integra com o restante da stack em Spring Security & JWT?",
        "options": [
          "Opção incorreta sobre filtro relacionada a Spring Security & JWT.",
          "Outro conceito incorreto sobre filtro.",
          "Definição incorreta de filtro no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does filter integrate with the rest of the stack in Spring Security & JWT?",
        "options": [
          "Incorrect option about filter related to Spring Security & JWT.",
          "Another incorrect concept regarding filter.",
          "Incorrect definition of filter in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em criptografia?",
        "options": [
          "Opção incorreta sobre criptografia relacionada a Spring Security & JWT.",
          "Outro conceito incorreto sobre criptografia.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para criptografia."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in cryptography?",
        "options": [
          "Incorrect option about cryptography related to Spring Security & JWT.",
          "Another incorrect concept regarding cryptography.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for cryptography."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de segurança é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre segurança relacionada a Spring Security & JWT.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de segurança no contexto corporativo.",
          "Resposta alternativa inválida para segurança."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of security guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about security related to Spring Security & JWT.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of security in enterprise context.",
          "Invalid alternative answer for security."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de claims?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para claims.",
          "Outro conceito incorreto sobre claims.",
          "Definição incorreta de claims no contexto corporativo.",
          "Resposta alternativa inválida para claims."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of claims?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for claims.",
          "Another incorrect concept regarding claims.",
          "Incorrect definition of claims in enterprise context.",
          "Invalid alternative answer for claims."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre Bearer e a escalabilidade de Spring Security & JWT?",
        "options": [
          "Opção incorreta sobre Bearer relacionada a Spring Security & JWT.",
          "Outro conceito incorreto sobre Bearer.",
          "Definição incorreta de Bearer no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de Bearer."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between Bearer and the scalability of Spring Security & JWT?",
        "options": [
          "Incorrect option about Bearer related to Spring Security & JWT.",
          "Another incorrect concept regarding Bearer.",
          "Incorrect definition of Bearer in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of Bearer."
        ],
        "correct": 3
      }
    }
  ],
  "p4_wed_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de Docker no contexto de Docker Virtualização?",
        "options": [
          "Representa a base estrutural de Docker para assegurar corretude técnica em Docker Virtualização.",
          "Outro conceito incorreto sobre Docker.",
          "Definição incorreta de Docker no contexto corporativo.",
          "Resposta alternativa inválida para Docker."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of Docker in the context of Docker Virtualization?",
        "options": [
          "It represents the structural foundation of Docker to ensure technical correctness in Docker Virtualization.",
          "Another incorrect concept regarding Docker.",
          "Incorrect definition of Docker in enterprise context.",
          "Invalid alternative answer for Docker."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como container é aplicado corretamente na arquitetura de Docker Virtualização?",
        "options": [
          "Opção incorreta sobre container relacionada a Docker Virtualização.",
          "Outro conceito incorreto sobre container.",
          "Definição incorreta de container no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de container no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is container correctly applied in the architecture of Docker Virtualization?",
        "options": [
          "Incorrect option about container related to Docker Virtualization.",
          "Another incorrect concept regarding container.",
          "Incorrect definition of container in enterprise context.",
          "Through proper parameterization and loose coupling of container in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com Dockerfile?",
        "options": [
          "Opção incorreta sobre Dockerfile relacionada a Docker Virtualização.",
          "Outro conceito incorreto sobre Dockerfile.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de Dockerfile.",
          "Resposta alternativa inválida para Dockerfile."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with Dockerfile?",
        "options": [
          "Incorrect option about Dockerfile related to Docker Virtualization.",
          "Another incorrect concept regarding Dockerfile.",
          "Ensure isolation and apply frequent testing to validate the behavior of Dockerfile.",
          "Invalid alternative answer for Dockerfile."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar imagem no desenvolvimento?",
        "options": [
          "Opção incorreta sobre imagem relacionada a Docker Virtualização.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em imagem.",
          "Definição incorreta de imagem no contexto corporativo.",
          "Resposta alternativa inválida para imagem."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing image in development?",
        "options": [
          "Incorrect option about image related to Docker Virtualization.",
          "Hardcoding values and lack of proper exception handling in image.",
          "Incorrect definition of image in enterprise context.",
          "Invalid alternative answer for image."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de compose em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre compose.",
          "Definição incorreta de compose no contexto corporativo.",
          "Resposta alternativa inválida para compose."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of compose in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding compose.",
          "Incorrect definition of compose in enterprise context.",
          "Invalid alternative answer for compose."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como volume se integra com o restante da stack em Docker Virtualização?",
        "options": [
          "Opção incorreta sobre volume relacionada a Docker Virtualização.",
          "Outro conceito incorreto sobre volume.",
          "Definição incorreta de volume no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does volume integrate with the rest of the stack in Docker Virtualization?",
        "options": [
          "Incorrect option about volume related to Docker Virtualization.",
          "Another incorrect concept regarding volume.",
          "Incorrect definition of volume in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em porta?",
        "options": [
          "Opção incorreta sobre porta relacionada a Docker Virtualização.",
          "Outro conceito incorreto sobre porta.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para porta."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in port?",
        "options": [
          "Incorrect option about port related to Docker Virtualization.",
          "Another incorrect concept regarding port.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for port."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de isolamento é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre isolamento relacionada a Docker Virtualização.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de isolamento no contexto corporativo.",
          "Resposta alternativa inválida para isolamento."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of isolation guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about isolation related to Docker Virtualization.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of isolation in enterprise context.",
          "Invalid alternative answer for isolation."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de virtualização?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para virtualização.",
          "Outro conceito incorreto sobre virtualização.",
          "Definição incorreta de virtualização no contexto corporativo.",
          "Resposta alternativa inválida para virtualização."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of virtualization?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for virtualization.",
          "Another incorrect concept regarding virtualization.",
          "Incorrect definition of virtualization in enterprise context.",
          "Invalid alternative answer for virtualization."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre build e a escalabilidade de Docker Virtualização?",
        "options": [
          "Opção incorreta sobre build relacionada a Docker Virtualização.",
          "Outro conceito incorreto sobre build.",
          "Definição incorreta de build no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de build."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between build and the scalability of Docker Virtualization?",
        "options": [
          "Incorrect option about build related to Docker Virtualization.",
          "Another incorrect concept regarding build.",
          "Incorrect definition of build in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of build."
        ],
        "correct": 3
      }
    }
  ],
  "p4_thu_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de AWS no contexto de Public Cloud Foundations?",
        "options": [
          "Representa a base estrutural de AWS para assegurar corretude técnica em Public Cloud Foundations.",
          "Outro conceito incorreto sobre AWS.",
          "Definição incorreta de AWS no contexto corporativo.",
          "Resposta alternativa inválida para AWS."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of AWS in the context of Public Cloud Foundations?",
        "options": [
          "It represents the structural foundation of AWS to ensure technical correctness in Public Cloud Foundations.",
          "Another incorrect concept regarding AWS.",
          "Incorrect definition of AWS in enterprise context.",
          "Invalid alternative answer for AWS."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como Azure é aplicado corretamente na arquitetura de Public Cloud Foundations?",
        "options": [
          "Opção incorreta sobre Azure relacionada a Public Cloud Foundations.",
          "Outro conceito incorreto sobre Azure.",
          "Definição incorreta de Azure no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de Azure no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is Azure correctly applied in the architecture of Public Cloud Foundations?",
        "options": [
          "Incorrect option about Azure related to Public Cloud Foundations.",
          "Another incorrect concept regarding Azure.",
          "Incorrect definition of Azure in enterprise context.",
          "Through proper parameterization and loose coupling of Azure in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com Cloud?",
        "options": [
          "Opção incorreta sobre Cloud relacionada a Public Cloud Foundations.",
          "Outro conceito incorreto sobre Cloud.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de Cloud.",
          "Resposta alternativa inválida para Cloud."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with Cloud?",
        "options": [
          "Incorrect option about Cloud related to Public Cloud Foundations.",
          "Another incorrect concept regarding Cloud.",
          "Ensure isolation and apply frequent testing to validate the behavior of Cloud.",
          "Invalid alternative answer for Cloud."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar nuvem no desenvolvimento?",
        "options": [
          "Opção incorreta sobre nuvem relacionada a Public Cloud Foundations.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em nuvem.",
          "Definição incorreta de nuvem no contexto corporativo.",
          "Resposta alternativa inválida para nuvem."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing EC2 in development?",
        "options": [
          "Incorrect option about EC2 related to Public Cloud Foundations.",
          "Hardcoding values and lack of proper exception handling in EC2.",
          "Incorrect definition of EC2 in enterprise context.",
          "Invalid alternative answer for EC2."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de EC2 em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre EC2.",
          "Definição incorreta de EC2 no contexto corporativo.",
          "Resposta alternativa inválida para EC2."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of S3 in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding S3.",
          "Incorrect definition of S3 in enterprise context.",
          "Invalid alternative answer for S3."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como S3 se integra com o restante da stack em Public Cloud Foundations?",
        "options": [
          "Opção incorreta sobre S3 relacionada a Public Cloud Foundations.",
          "Outro conceito incorreto sobre S3.",
          "Definição incorreta de S3 no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does VM integrate with the rest of the stack in Public Cloud Foundations?",
        "options": [
          "Incorrect option about VM related to Public Cloud Foundations.",
          "Another incorrect concept regarding VM.",
          "Incorrect definition of VM in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em VM?",
        "options": [
          "Opção incorreta sobre VM relacionada a Public Cloud Foundations.",
          "Outro conceito incorreto sobre VM.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para VM."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in IAM?",
        "options": [
          "Incorrect option about IAM related to Public Cloud Foundations.",
          "Another incorrect concept regarding IAM.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for IAM."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de IAM é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre IAM relacionada a Public Cloud Foundations.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de IAM no contexto corporativo.",
          "Resposta alternativa inválida para IAM."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of region guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about region related to Public Cloud Foundations.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of region in enterprise context.",
          "Invalid alternative answer for region."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de região?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para região.",
          "Outro conceito incorreto sobre região.",
          "Definição incorreta de região no contexto corporativo.",
          "Resposta alternativa inválida para região."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of service?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for service.",
          "Another incorrect concept regarding service.",
          "Incorrect definition of service in enterprise context.",
          "Invalid alternative answer for service."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre serviço e a escalabilidade de Public Cloud Foundations?",
        "options": [
          "Opção incorreta sobre serviço relacionada a Public Cloud Foundations.",
          "Outro conceito incorreto sobre serviço.",
          "Definição incorreta de serviço no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de serviço."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between billing and the scalability of Public Cloud Foundations?",
        "options": [
          "Incorrect option about billing related to Public Cloud Foundations.",
          "Another incorrect concept regarding billing.",
          "Incorrect definition of billing in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of billing."
        ],
        "correct": 3
      }
    }
  ],
  "p4_fri_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de Z/OS Connect no contexto de z/OS Connect API Exposure?",
        "options": [
          "Representa a base estrutural de Z/OS Connect para assegurar corretude técnica em z/OS Connect API Exposure.",
          "Outro conceito incorreto sobre Z/OS Connect.",
          "Definição incorreta de Z/OS Connect no contexto corporativo.",
          "Resposta alternativa inválida para Z/OS Connect."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of Z/OS Connect in the context of z/OS Connect API?",
        "options": [
          "It represents the structural foundation of Z/OS Connect to ensure technical correctness in z/OS Connect API.",
          "Another incorrect concept regarding Z/OS Connect.",
          "Incorrect definition of Z/OS Connect in enterprise context.",
          "Invalid alternative answer for Z/OS Connect."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como REST é aplicado corretamente na arquitetura de z/OS Connect API Exposure?",
        "options": [
          "Opção incorreta sobre REST relacionada a z/OS Connect API Exposure.",
          "Outro conceito incorreto sobre REST.",
          "Definição incorreta de REST no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de REST no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is REST correctly applied in the architecture of z/OS Connect API?",
        "options": [
          "Incorrect option about REST related to z/OS Connect API.",
          "Another incorrect concept regarding REST.",
          "Incorrect definition of REST in enterprise context.",
          "Through proper parameterization and loose coupling of REST in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com JSON?",
        "options": [
          "Opção incorreta sobre JSON relacionada a z/OS Connect API Exposure.",
          "Outro conceito incorreto sobre JSON.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de JSON.",
          "Resposta alternativa inválida para JSON."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with JSON?",
        "options": [
          "Incorrect option about JSON related to z/OS Connect API.",
          "Another incorrect concept regarding JSON.",
          "Ensure isolation and apply frequent testing to validate the behavior of JSON.",
          "Invalid alternative answer for JSON."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar endpoint no desenvolvimento?",
        "options": [
          "Opção incorreta sobre endpoint relacionada a z/OS Connect API Exposure.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em endpoint.",
          "Definição incorreta de endpoint no contexto corporativo.",
          "Resposta alternativa inválida para endpoint."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing endpoint in development?",
        "options": [
          "Incorrect option about endpoint related to z/OS Connect API.",
          "Hardcoding values and lack of proper exception handling in endpoint.",
          "Incorrect definition of endpoint in enterprise context.",
          "Invalid alternative answer for endpoint."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de COBOL em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre COBOL.",
          "Definição incorreta de COBOL no contexto corporativo.",
          "Resposta alternativa inválida para COBOL."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of COBOL in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding COBOL.",
          "Incorrect definition of COBOL in enterprise context.",
          "Invalid alternative answer for COBOL."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como mapeamento se integra com o restante da stack em z/OS Connect API Exposure?",
        "options": [
          "Opção incorreta sobre mapeamento relacionada a z/OS Connect API Exposure.",
          "Outro conceito incorreto sobre mapeamento.",
          "Definição incorreta de mapeamento no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does mapping integrate with the rest of the stack in z/OS Connect API?",
        "options": [
          "Incorrect option about mapping related to z/OS Connect API.",
          "Another incorrect concept regarding mapping.",
          "Incorrect definition of mapping in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em gateway?",
        "options": [
          "Opção incorreta sobre gateway relacionada a z/OS Connect API Exposure.",
          "Outro conceito incorreto sobre gateway.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para gateway."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in gateway?",
        "options": [
          "Incorrect option about gateway related to z/OS Connect API.",
          "Another incorrect concept regarding gateway.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for gateway."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de API é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre API relacionada a z/OS Connect API Exposure.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de API no contexto corporativo.",
          "Resposta alternativa inválida para API."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of API guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about API related to z/OS Connect API.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of API in enterprise context.",
          "Invalid alternative answer for API."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de mainframe?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para mainframe.",
          "Outro conceito incorreto sobre mainframe.",
          "Definição incorreta de mainframe no contexto corporativo.",
          "Resposta alternativa inválida para mainframe."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of mainframe?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for mainframe.",
          "Another incorrect concept regarding mainframe.",
          "Incorrect definition of mainframe in enterprise context.",
          "Invalid alternative answer for mainframe."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre exposição e a escalabilidade de z/OS Connect API Exposure?",
        "options": [
          "Opção incorreta sobre exposição relacionada a z/OS Connect API Exposure.",
          "Outro conceito incorreto sobre exposição.",
          "Definição incorreta de exposição no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de exposição."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between exposure and the scalability of z/OS Connect API?",
        "options": [
          "Incorrect option about exposure related to z/OS Connect API.",
          "Another incorrect concept regarding exposure.",
          "Incorrect definition of exposure in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of exposure."
        ],
        "correct": 3
      }
    }
  ],
  "p5_mon_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de CDC no contexto de Change Data Capture?",
        "options": [
          "Representa a base estrutural de CDC para assegurar corretude técnica em Change Data Capture.",
          "Outro conceito incorreto sobre CDC.",
          "Definição incorreta de CDC no contexto corporativo.",
          "Resposta alternativa inválida para CDC."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of CDC in the context of Change Data Capture?",
        "options": [
          "It represents the structural foundation of CDC to ensure technical correctness in Change Data Capture.",
          "Another incorrect concept regarding CDC.",
          "Incorrect definition of CDC in enterprise context.",
          "Invalid alternative answer for CDC."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como Debezium é aplicado corretamente na arquitetura de Change Data Capture?",
        "options": [
          "Opção incorreta sobre Debezium relacionada a Change Data Capture.",
          "Outro conceito incorreto sobre Debezium.",
          "Definição incorreta de Debezium no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de Debezium no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is Debezium correctly applied in the architecture of Change Data Capture?",
        "options": [
          "Incorrect option about Debezium related to Change Data Capture.",
          "Another incorrect concept regarding Debezium.",
          "Incorrect definition of Debezium in enterprise context.",
          "Through proper parameterization and loose coupling of Debezium in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com sincronização?",
        "options": [
          "Opção incorreta sobre sincronização relacionada a Change Data Capture.",
          "Outro conceito incorreto sobre sincronização.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de sincronização.",
          "Resposta alternativa inválida para sincronização."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with synchronization?",
        "options": [
          "Incorrect option about synchronization related to Change Data Capture.",
          "Another incorrect concept regarding synchronization.",
          "Ensure isolation and apply frequent testing to validate the behavior of synchronization.",
          "Invalid alternative answer for synchronization."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar tempo real no desenvolvimento?",
        "options": [
          "Opção incorreta sobre tempo real relacionada a Change Data Capture.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em tempo real.",
          "Definição incorreta de tempo real no contexto corporativo.",
          "Resposta alternativa inválida para tempo real."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing real-time in development?",
        "options": [
          "Incorrect option about real-time related to Change Data Capture.",
          "Hardcoding values and lack of proper exception handling in real-time.",
          "Incorrect definition of real-time in enterprise context.",
          "Invalid alternative answer for real-time."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de logs em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre logs.",
          "Definição incorreta de logs no contexto corporativo.",
          "Resposta alternativa inválida para logs."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of logs in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding logs.",
          "Incorrect definition of logs in enterprise context.",
          "Invalid alternative answer for logs."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como banco se integra com o restante da stack em Change Data Capture?",
        "options": [
          "Opção incorreta sobre banco relacionada a Change Data Capture.",
          "Outro conceito incorreto sobre banco.",
          "Definição incorreta de banco no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does database integrate with the rest of the stack in Change Data Capture?",
        "options": [
          "Incorrect option about database related to Change Data Capture.",
          "Another incorrect concept regarding database.",
          "Incorrect definition of database in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em DB2?",
        "options": [
          "Opção incorreta sobre DB2 relacionada a Change Data Capture.",
          "Outro conceito incorreto sobre DB2.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para DB2."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in DB2?",
        "options": [
          "Incorrect option about DB2 related to Change Data Capture.",
          "Another incorrect concept regarding DB2.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for DB2."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de Postgres é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre Postgres relacionada a Change Data Capture.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de Postgres no contexto corporativo.",
          "Resposta alternativa inválida para Postgres."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of Postgres guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about Postgres related to Change Data Capture.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of Postgres in enterprise context.",
          "Invalid alternative answer for Postgres."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de transação?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para transação.",
          "Outro conceito incorreto sobre transação.",
          "Definição incorreta de transação no contexto corporativo.",
          "Resposta alternativa inválida para transação."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of transaction?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for transaction.",
          "Another incorrect concept regarding transaction.",
          "Incorrect definition of transaction in enterprise context.",
          "Invalid alternative answer for transaction."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre captura e a escalabilidade de Change Data Capture?",
        "options": [
          "Opção incorreta sobre captura relacionada a Change Data Capture.",
          "Outro conceito incorreto sobre captura.",
          "Definição incorreta de captura no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de captura."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between capture and the scalability of Change Data Capture?",
        "options": [
          "Incorrect option about capture related to Change Data Capture.",
          "Another incorrect concept regarding capture.",
          "Incorrect definition of capture in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of capture."
        ],
        "correct": 3
      }
    }
  ],
  "p5_mon_t2": [
    {
      "pt": {
        "question": "Qual é o principal conceito de Kafka no contexto de Apache Kafka Event Streaming?",
        "options": [
          "Representa a base estrutural de Kafka para assegurar corretude técnica em Apache Kafka Event Streaming.",
          "Outro conceito incorreto sobre Kafka.",
          "Definição incorreta de Kafka no contexto corporativo.",
          "Resposta alternativa inválida para Kafka."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of Kafka in the context of Apache Kafka Streaming?",
        "options": [
          "It represents the structural foundation of Kafka to ensure technical correctness in Apache Kafka Streaming.",
          "Another incorrect concept regarding Kafka.",
          "Incorrect definition of Kafka in enterprise context.",
          "Invalid alternative answer for Kafka."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como tópico é aplicado corretamente na arquitetura de Apache Kafka Event Streaming?",
        "options": [
          "Opção incorreta sobre tópico relacionada a Apache Kafka Event Streaming.",
          "Outro conceito incorreto sobre tópico.",
          "Definição incorreta de tópico no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de tópico no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is topic correctly applied in the architecture of Apache Kafka Streaming?",
        "options": [
          "Incorrect option about topic related to Apache Kafka Streaming.",
          "Another incorrect concept regarding topic.",
          "Incorrect definition of topic in enterprise context.",
          "Through proper parameterization and loose coupling of topic in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com mensageria?",
        "options": [
          "Opção incorreta sobre mensageria relacionada a Apache Kafka Event Streaming.",
          "Outro conceito incorreto sobre mensageria.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de mensageria.",
          "Resposta alternativa inválida para mensageria."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with messaging?",
        "options": [
          "Incorrect option about messaging related to Apache Kafka Streaming.",
          "Another incorrect concept regarding messaging.",
          "Ensure isolation and apply frequent testing to validate the behavior of messaging.",
          "Invalid alternative answer for messaging."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar evento no desenvolvimento?",
        "options": [
          "Opção incorreta sobre evento relacionada a Apache Kafka Event Streaming.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em evento.",
          "Definição incorreta de evento no contexto corporativo.",
          "Resposta alternativa inválida para evento."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing event in development?",
        "options": [
          "Incorrect option about event related to Apache Kafka Streaming.",
          "Hardcoding values and lack of proper exception handling in event.",
          "Incorrect definition of event in enterprise context.",
          "Invalid alternative answer for event."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de partição em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre partição.",
          "Definição incorreta de partição no contexto corporativo.",
          "Resposta alternativa inválida para partição."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of partition in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding partition.",
          "Incorrect definition of partition in enterprise context.",
          "Invalid alternative answer for partition."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como produtor se integra com o restante da stack em Apache Kafka Event Streaming?",
        "options": [
          "Opção incorreta sobre produtor relacionada a Apache Kafka Event Streaming.",
          "Outro conceito incorreto sobre produtor.",
          "Definição incorreta de produtor no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does producer integrate with the rest of the stack in Apache Kafka Streaming?",
        "options": [
          "Incorrect option about producer related to Apache Kafka Streaming.",
          "Another incorrect concept regarding producer.",
          "Incorrect definition of producer in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em consumidor?",
        "options": [
          "Opção incorreta sobre consumidor relacionada a Apache Kafka Event Streaming.",
          "Outro conceito incorreto sobre consumidor.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para consumidor."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in consumer?",
        "options": [
          "Incorrect option about consumer related to Apache Kafka Streaming.",
          "Another incorrect concept regarding consumer.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for consumer."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de offset é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre offset relacionada a Apache Kafka Event Streaming.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de offset no contexto corporativo.",
          "Resposta alternativa inválida para offset."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of offset guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about offset related to Apache Kafka Streaming.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of offset in enterprise context.",
          "Invalid alternative answer for offset."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de distribuído?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para distribuído.",
          "Outro conceito incorreto sobre distribuído.",
          "Definição incorreta de distribuído no contexto corporativo.",
          "Resposta alternativa inválida para distribuído."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of distributed?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for distributed.",
          "Another incorrect concept regarding distributed.",
          "Incorrect definition of distributed in enterprise context.",
          "Invalid alternative answer for distributed."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre streaming e a escalabilidade de Apache Kafka Event Streaming?",
        "options": [
          "Opção incorreta sobre streaming relacionada a Apache Kafka Event Streaming.",
          "Outro conceito incorreto sobre streaming.",
          "Definição incorreta de streaming no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de streaming."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between streaming and the scalability of Apache Kafka Streaming?",
        "options": [
          "Incorrect option about streaming related to Apache Kafka Streaming.",
          "Another incorrect concept regarding streaming.",
          "Incorrect definition of streaming in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of streaming."
        ],
        "correct": 3
      }
    }
  ],
  "p5_tue_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de Kubernetes no contexto de Kubernetes Orquestração?",
        "options": [
          "Representa a base estrutural de Kubernetes para assegurar corretude técnica em Kubernetes Orquestração.",
          "Outro conceito incorreto sobre Kubernetes.",
          "Definição incorreta de Kubernetes no contexto corporativo.",
          "Resposta alternativa inválida para Kubernetes."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of Kubernetes in the context of Kubernetes Orchestration?",
        "options": [
          "It represents the structural foundation of Kubernetes to ensure technical correctness in Kubernetes Orchestration.",
          "Another incorrect concept regarding Kubernetes.",
          "Incorrect definition of Kubernetes in enterprise context.",
          "Invalid alternative answer for Kubernetes."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como K8s é aplicado corretamente na arquitetura de Kubernetes Orquestração?",
        "options": [
          "Opção incorreta sobre K8s relacionada a Kubernetes Orquestração.",
          "Outro conceito incorreto sobre K8s.",
          "Definição incorreta de K8s no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de K8s no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is K8s correctly applied in the architecture of Kubernetes Orchestration?",
        "options": [
          "Incorrect option about K8s related to Kubernetes Orchestration.",
          "Another incorrect concept regarding K8s.",
          "Incorrect definition of K8s in enterprise context.",
          "Through proper parameterization and loose coupling of K8s in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com Pod?",
        "options": [
          "Opção incorreta sobre Pod relacionada a Kubernetes Orquestração.",
          "Outro conceito incorreto sobre Pod.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de Pod.",
          "Resposta alternativa inválida para Pod."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with Pod?",
        "options": [
          "Incorrect option about Pod related to Kubernetes Orchestration.",
          "Another incorrect concept regarding Pod.",
          "Ensure isolation and apply frequent testing to validate the behavior of Pod.",
          "Invalid alternative answer for Pod."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar Deployment no desenvolvimento?",
        "options": [
          "Opção incorreta sobre Deployment relacionada a Kubernetes Orquestração.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em Deployment.",
          "Definição incorreta de Deployment no contexto corporativo.",
          "Resposta alternativa inválida para Deployment."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing Deployment in development?",
        "options": [
          "Incorrect option about Deployment related to Kubernetes Orchestration.",
          "Hardcoding values and lack of proper exception handling in Deployment.",
          "Incorrect definition of Deployment in enterprise context.",
          "Invalid alternative answer for Deployment."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de Service em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre Service.",
          "Definição incorreta de Service no contexto corporativo.",
          "Resposta alternativa inválida para Service."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of Service in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding Service.",
          "Incorrect definition of Service in enterprise context.",
          "Invalid alternative answer for Service."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como orquestração se integra com o restante da stack em Kubernetes Orquestração?",
        "options": [
          "Opção incorreta sobre orquestração relacionada a Kubernetes Orquestração.",
          "Outro conceito incorreto sobre orquestração.",
          "Definição incorreta de orquestração no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does orchestration integrate with the rest of the stack in Kubernetes Orchestration?",
        "options": [
          "Incorrect option about orchestration related to Kubernetes Orchestration.",
          "Another incorrect concept regarding orchestration.",
          "Incorrect definition of orchestration in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em container?",
        "options": [
          "Opção incorreta sobre container relacionada a Kubernetes Orquestração.",
          "Outro conceito incorreto sobre container.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para container."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in container?",
        "options": [
          "Incorrect option about container related to Kubernetes Orchestration.",
          "Another incorrect concept regarding container.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for container."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de escalabilidade é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre escalabilidade relacionada a Kubernetes Orquestração.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de escalabilidade no contexto corporativo.",
          "Resposta alternativa inválida para escalabilidade."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of scalability guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about scalability related to Kubernetes Orchestration.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of scalability in enterprise context.",
          "Invalid alternative answer for scalability."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de cluster?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para cluster.",
          "Outro conceito incorreto sobre cluster.",
          "Definição incorreta de cluster no contexto corporativo.",
          "Resposta alternativa inválida para cluster."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of cluster?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for cluster.",
          "Another incorrect concept regarding cluster.",
          "Incorrect definition of cluster in enterprise context.",
          "Invalid alternative answer for cluster."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre YAML e a escalabilidade de Kubernetes Orquestração?",
        "options": [
          "Opção incorreta sobre YAML relacionada a Kubernetes Orquestração.",
          "Outro conceito incorreto sobre YAML.",
          "Definição incorreta de YAML no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de YAML."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between YAML and the scalability of Kubernetes Orchestration?",
        "options": [
          "Incorrect option about YAML related to Kubernetes Orchestration.",
          "Another incorrect concept regarding YAML.",
          "Incorrect definition of YAML in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of YAML."
        ],
        "correct": 3
      }
    }
  ],
  "p5_wed_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de AWS no contexto de AWS Mainframe Modernization?",
        "options": [
          "Representa a base estrutural de AWS para assegurar corretude técnica em AWS Mainframe Modernization.",
          "Outro conceito incorreto sobre AWS.",
          "Definição incorreta de AWS no contexto corporativo.",
          "Resposta alternativa inválida para AWS."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of AWS in the context of AWS Mainframe Modernization?",
        "options": [
          "It represents the structural foundation of AWS to ensure technical correctness in AWS Mainframe Modernization.",
          "Another incorrect concept regarding AWS.",
          "Incorrect definition of AWS in enterprise context.",
          "Invalid alternative answer for AWS."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como Blu Age é aplicado corretamente na arquitetura de AWS Mainframe Modernization?",
        "options": [
          "Opção incorreta sobre Blu Age relacionada a AWS Mainframe Modernization.",
          "Outro conceito incorreto sobre Blu Age.",
          "Definição incorreta de Blu Age no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de Blu Age no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is Blu Age correctly applied in the architecture of AWS Mainframe Modernization?",
        "options": [
          "Incorrect option about Blu Age related to AWS Mainframe Modernization.",
          "Another incorrect concept regarding Blu Age.",
          "Incorrect definition of Blu Age in enterprise context.",
          "Through proper parameterization and loose coupling of Blu Age in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com Rehosting?",
        "options": [
          "Opção incorreta sobre Rehosting relacionada a AWS Mainframe Modernization.",
          "Outro conceito incorreto sobre Rehosting.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de Rehosting.",
          "Resposta alternativa inválida para Rehosting."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with Rehosting?",
        "options": [
          "Incorrect option about Rehosting related to AWS Mainframe Modernization.",
          "Another incorrect concept regarding Rehosting.",
          "Ensure isolation and apply frequent testing to validate the behavior of Rehosting.",
          "Invalid alternative answer for Rehosting."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar Refactoring no desenvolvimento?",
        "options": [
          "Opção incorreta sobre Refactoring relacionada a AWS Mainframe Modernization.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em Refactoring.",
          "Definição incorreta de Refactoring no contexto corporativo.",
          "Resposta alternativa inválida para Refactoring."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing Refactoring in development?",
        "options": [
          "Incorrect option about Refactoring related to AWS Mainframe Modernization.",
          "Hardcoding values and lack of proper exception handling in Refactoring.",
          "Incorrect definition of Refactoring in enterprise context.",
          "Invalid alternative answer for Refactoring."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de modernização em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre modernização.",
          "Definição incorreta de modernização no contexto corporativo.",
          "Resposta alternativa inválida para modernização."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of modernization in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding modernization.",
          "Incorrect definition of modernization in enterprise context.",
          "Invalid alternative answer for modernization."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como emulação se integra com o restante da stack em AWS Mainframe Modernization?",
        "options": [
          "Opção incorreta sobre emulação relacionada a AWS Mainframe Modernization.",
          "Outro conceito incorreto sobre emulação.",
          "Definição incorreta de emulação no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does emulation integrate with the rest of the stack in AWS Mainframe Modernization?",
        "options": [
          "Incorrect option about emulation related to AWS Mainframe Modernization.",
          "Another incorrect concept regarding emulation.",
          "Incorrect definition of emulation in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em mainframe?",
        "options": [
          "Opção incorreta sobre mainframe relacionada a AWS Mainframe Modernization.",
          "Outro conceito incorreto sobre mainframe.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para mainframe."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in mainframe?",
        "options": [
          "Incorrect option about mainframe related to AWS Mainframe Modernization.",
          "Another incorrect concept regarding mainframe.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for mainframe."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de nuvem é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre nuvem relacionada a AWS Mainframe Modernization.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de nuvem no contexto corporativo.",
          "Resposta alternativa inválida para nuvem."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of cloud guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about cloud related to AWS Mainframe Modernization.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of cloud in enterprise context.",
          "Invalid alternative answer for cloud."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de migração?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para migração.",
          "Outro conceito incorreto sobre migração.",
          "Definição incorreta de migração no contexto corporativo.",
          "Resposta alternativa inválida para migração."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of migration?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for migration.",
          "Another incorrect concept regarding migration.",
          "Incorrect definition of migration in enterprise context.",
          "Invalid alternative answer for migration."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre automática e a escalabilidade de AWS Mainframe Modernization?",
        "options": [
          "Opção incorreta sobre automática relacionada a AWS Mainframe Modernization.",
          "Outro conceito incorreto sobre automática.",
          "Definição incorreta de automática no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de automática."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between automatic and the scalability of AWS Mainframe Modernization?",
        "options": [
          "Incorrect option about automatic related to AWS Mainframe Modernization.",
          "Another incorrect concept regarding automatic.",
          "Incorrect definition of automatic in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of automatic."
        ],
        "correct": 3
      }
    }
  ],
  "p5_thu_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de Strangler Fig no contexto de Strangler Fig Pattern?",
        "options": [
          "Representa a base estrutural de Strangler Fig para assegurar corretude técnica em Strangler Fig Pattern.",
          "Outro conceito incorreto sobre Strangler Fig.",
          "Definição incorreta de Strangler Fig no contexto corporativo.",
          "Resposta alternativa inválida para Strangler Fig."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of Strangler Fig in the context of Strangler Fig Pattern?",
        "options": [
          "It represents the structural foundation of Strangler Fig to ensure technical correctness in Strangler Fig Pattern.",
          "Another incorrect concept regarding Strangler Fig.",
          "Incorrect definition of Strangler Fig in enterprise context.",
          "Invalid alternative answer for Strangler Fig."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como Figo Estrangulador é aplicado corretamente na arquitetura de Strangler Fig Pattern?",
        "options": [
          "Opção incorreta sobre Figo Estrangulador relacionada a Strangler Fig Pattern.",
          "Outro conceito incorreto sobre Figo Estrangulador.",
          "Definição incorreta de Figo Estrangulador no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de Figo Estrangulador no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is migration correctly applied in the architecture of Strangler Fig Pattern?",
        "options": [
          "Incorrect option about migration related to Strangler Fig Pattern.",
          "Another incorrect concept regarding migration.",
          "Incorrect definition of migration in enterprise context.",
          "Through proper parameterization and loose coupling of migration in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com migração?",
        "options": [
          "Opção incorreta sobre migração relacionada a Strangler Fig Pattern.",
          "Outro conceito incorreto sobre migração.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de migração.",
          "Resposta alternativa inválida para migração."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with architecture?",
        "options": [
          "Incorrect option about architecture related to Strangler Fig Pattern.",
          "Another incorrect concept regarding architecture.",
          "Ensure isolation and apply frequent testing to validate the behavior of architecture.",
          "Invalid alternative answer for architecture."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar arquitetura no desenvolvimento?",
        "options": [
          "Opção incorreta sobre arquitetura relacionada a Strangler Fig Pattern.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em arquitetura.",
          "Definição incorreta de arquitetura no contexto corporativo.",
          "Resposta alternativa inválida para arquitetura."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing monolith in development?",
        "options": [
          "Incorrect option about monolith related to Strangler Fig Pattern.",
          "Hardcoding values and lack of proper exception handling in monolith.",
          "Incorrect definition of monolith in enterprise context.",
          "Invalid alternative answer for monolith."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de monolito em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre monolito.",
          "Definição incorreta de monolito no contexto corporativo.",
          "Resposta alternativa inválida para monolito."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of microservices in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding microservices.",
          "Incorrect definition of microservices in enterprise context.",
          "Invalid alternative answer for microservices."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como microsserviços se integra com o restante da stack em Strangler Fig Pattern?",
        "options": [
          "Opção incorreta sobre microsserviços relacionada a Strangler Fig Pattern.",
          "Outro conceito incorreto sobre microsserviços.",
          "Definição incorreta de microsserviços no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does decoupling integrate with the rest of the stack in Strangler Fig Pattern?",
        "options": [
          "Incorrect option about decoupling related to Strangler Fig Pattern.",
          "Another incorrect concept regarding decoupling.",
          "Incorrect definition of decoupling in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em desacoplamento?",
        "options": [
          "Opção incorreta sobre desacoplamento relacionada a Strangler Fig Pattern.",
          "Outro conceito incorreto sobre desacoplamento.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para desacoplamento."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in pattern?",
        "options": [
          "Incorrect option about pattern related to Strangler Fig Pattern.",
          "Another incorrect concept regarding pattern.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for pattern."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de padrão é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre padrão relacionada a Strangler Fig Pattern.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de padrão no contexto corporativo.",
          "Resposta alternativa inválida para padrão."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of routing guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about routing related to Strangler Fig Pattern.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of routing in enterprise context.",
          "Invalid alternative answer for routing."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de roteamento?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para roteamento.",
          "Outro conceito incorreto sobre roteamento.",
          "Definição incorreta de roteamento no contexto corporativo.",
          "Resposta alternativa inválida para roteamento."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of gradual?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for gradual.",
          "Another incorrect concept regarding gradual.",
          "Incorrect definition of gradual in enterprise context.",
          "Invalid alternative answer for gradual."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre gradual e a escalabilidade de Strangler Fig Pattern?",
        "options": [
          "Opção incorreta sobre gradual relacionada a Strangler Fig Pattern.",
          "Outro conceito incorreto sobre gradual.",
          "Definição incorreta de gradual no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de gradual."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between Strangler Fig and the scalability of Strangler Fig Pattern?",
        "options": [
          "Incorrect option about Strangler Fig related to Strangler Fig Pattern.",
          "Another incorrect concept regarding Strangler Fig.",
          "Incorrect definition of Strangler Fig in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of Strangler Fig."
        ],
        "correct": 3
      }
    }
  ],
  "p5_thu_t2": [
    {
      "pt": {
        "question": "Qual é o principal conceito de Invoice no contexto de Negociação e Setup Internacional?",
        "options": [
          "Representa a base estrutural de Invoice para assegurar corretude técnica em Negociação e Setup Internacional.",
          "Outro conceito incorreto sobre Invoice.",
          "Definição incorreta de Invoice no contexto corporativo.",
          "Resposta alternativa inválida para Invoice."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of Invoice in the context of International Setup?",
        "options": [
          "It represents the structural foundation of Invoice to ensure technical correctness in International Setup.",
          "Another incorrect concept regarding Invoice.",
          "Incorrect definition of Invoice in enterprise context.",
          "Invalid alternative answer for Invoice."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como Wise é aplicado corretamente na arquitetura de Negociação e Setup Internacional?",
        "options": [
          "Opção incorreta sobre Wise relacionada a Negociação e Setup Internacional.",
          "Outro conceito incorreto sobre Wise.",
          "Definição incorreta de Wise no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de Wise no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is Wise correctly applied in the architecture of International Setup?",
        "options": [
          "Incorrect option about Wise related to International Setup.",
          "Another incorrect concept regarding Wise.",
          "Incorrect definition of Wise in enterprise context.",
          "Through proper parameterization and loose coupling of Wise in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com Deel?",
        "options": [
          "Opção incorreta sobre Deel relacionada a Negociação e Setup Internacional.",
          "Outro conceito incorreto sobre Deel.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de Deel.",
          "Resposta alternativa inválida para Deel."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with Deel?",
        "options": [
          "Incorrect option about Deel related to International Setup.",
          "Another incorrect concept regarding Deel.",
          "Ensure isolation and apply frequent testing to validate the behavior of Deel.",
          "Invalid alternative answer for Deel."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar CNPJ no desenvolvimento?",
        "options": [
          "Opção incorreta sobre CNPJ relacionada a Negociação e Setup Internacional.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em CNPJ.",
          "Definição incorreta de CNPJ no contexto corporativo.",
          "Resposta alternativa inválida para CNPJ."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing CNPJ in development?",
        "options": [
          "Incorrect option about CNPJ related to International Setup.",
          "Hardcoding values and lack of proper exception handling in CNPJ.",
          "Incorrect definition of CNPJ in enterprise context.",
          "Invalid alternative answer for CNPJ."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de PJ em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre PJ.",
          "Definição incorreta de PJ no contexto corporativo.",
          "Resposta alternativa inválida para PJ."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of B2B in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding B2B.",
          "Incorrect definition of B2B in enterprise context.",
          "Invalid alternative answer for B2B."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como contrato se integra com o restante da stack em Negociação e Setup Internacional?",
        "options": [
          "Opção incorreta sobre contrato relacionada a Negociação e Setup Internacional.",
          "Outro conceito incorreto sobre contrato.",
          "Definição incorreta de contrato no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does contract integrate with the rest of the stack in International Setup?",
        "options": [
          "Incorrect option about contract related to International Setup.",
          "Another incorrect concept regarding contract.",
          "Incorrect definition of contract in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em tributação?",
        "options": [
          "Opção incorreta sobre tributação relacionada a Negociação e Setup Internacional.",
          "Outro conceito incorreto sobre tributação.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para tributação."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in taxes?",
        "options": [
          "Incorrect option about taxes related to International Setup.",
          "Another incorrect concept regarding taxes.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for taxes."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de inglês é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre inglês relacionada a Negociação e Setup Internacional.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de inglês no contexto corporativo.",
          "Resposta alternativa inválida para inglês."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of English guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about English related to International Setup.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of English in enterprise context.",
          "Invalid alternative answer for English."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de remuneração?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para remuneração.",
          "Outro conceito incorreto sobre remuneração.",
          "Definição incorreta de remuneração no contexto corporativo.",
          "Resposta alternativa inválida para remuneração."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of salary?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for salary.",
          "Another incorrect concept regarding salary.",
          "Incorrect definition of salary in enterprise context.",
          "Invalid alternative answer for salary."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre internacional e a escalabilidade de Negociação e Setup Internacional?",
        "options": [
          "Opção incorreta sobre internacional relacionada a Negociação e Setup Internacional.",
          "Outro conceito incorreto sobre internacional.",
          "Definição incorreta de internacional no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de internacional."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between international and the scalability of International Setup?",
        "options": [
          "Incorrect option about international related to International Setup.",
          "Another incorrect concept regarding international.",
          "Incorrect definition of international in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of international."
        ],
        "correct": 3
      }
    }
  ],
  "p5_fri_t1": [
    {
      "pt": {
        "question": "Qual é o principal conceito de IA no contexto de GenAI para Engenharia Reversa?",
        "options": [
          "Representa a base estrutural de IA para assegurar corretude técnica em GenAI para Engenharia Reversa.",
          "Outro conceito incorreto sobre IA.",
          "Definição incorreta de IA no contexto corporativo.",
          "Resposta alternativa inválida para IA."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the primary concept of AI in the context of GenAI Reverse Engineering?",
        "options": [
          "It represents the structural foundation of AI to ensure technical correctness in GenAI Reverse Engineering.",
          "Another incorrect concept regarding AI.",
          "Incorrect definition of AI in enterprise context.",
          "Invalid alternative answer for AI."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como GenAI é aplicado corretamente na arquitetura de GenAI para Engenharia Reversa?",
        "options": [
          "Opção incorreta sobre GenAI relacionada a GenAI para Engenharia Reversa.",
          "Outro conceito incorreto sobre GenAI.",
          "Definição incorreta de GenAI no contexto corporativo.",
          "Através de parametrização adequada e acoplamento fraco de GenAI no sistema."
        ],
        "correct": 3
      },
      "en": {
        "question": "How is GenAI correctly applied in the architecture of GenAI Reverse Engineering?",
        "options": [
          "Incorrect option about GenAI related to GenAI Reverse Engineering.",
          "Another incorrect concept regarding GenAI.",
          "Incorrect definition of GenAI in enterprise context.",
          "Through proper parameterization and loose coupling of GenAI in the system."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual das seguintes opções descreve uma boa prática ao lidar com COBOL?",
        "options": [
          "Opção incorreta sobre COBOL relacionada a GenAI para Engenharia Reversa.",
          "Outro conceito incorreto sobre COBOL.",
          "Garantir isolamento e aplicar testes frequentes para validar o comportamento de COBOL.",
          "Resposta alternativa inválida para COBOL."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which of the following describes a best practice when dealing with COBOL?",
        "options": [
          "Incorrect option about COBOL related to GenAI Reverse Engineering.",
          "Another incorrect concept regarding COBOL.",
          "Ensure isolation and apply frequent testing to validate the behavior of COBOL.",
          "Invalid alternative answer for COBOL."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "O que deve ser evitado ao implementar documentação no desenvolvimento?",
        "options": [
          "Opção incorreta sobre documentação relacionada a GenAI para Engenharia Reversa.",
          "Hardcoding de valores e falta de tratamento de exceções adequados em documentação.",
          "Definição incorreta de documentação no contexto corporativo.",
          "Resposta alternativa inválida para documentação."
        ],
        "correct": 1
      },
      "en": {
        "question": "What should be avoided when implementing documentation in development?",
        "options": [
          "Incorrect option about documentation related to GenAI Reverse Engineering.",
          "Hardcoding values and lack of proper exception handling in documentation.",
          "Incorrect definition of documentation in enterprise context.",
          "Invalid alternative answer for documentation."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o impacto de uma má configuração de engenharia reversa em sistemas corporativos?",
        "options": [
          "Perda de performance severa, gargalos transacionais ou falhas críticas de segurança.",
          "Outro conceito incorreto sobre engenharia reversa.",
          "Definição incorreta de engenharia reversa no contexto corporativo.",
          "Resposta alternativa inválida para engenharia reversa."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the impact of a misconfiguration of reverse engineering in enterprise systems?",
        "options": [
          "Severe performance loss, transactional bottlenecks, or critical security failures.",
          "Another incorrect concept regarding reverse engineering.",
          "Incorrect definition of reverse engineering in enterprise context.",
          "Invalid alternative answer for reverse engineering."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Como dependências se integra com o restante da stack em GenAI para Engenharia Reversa?",
        "options": [
          "Opção incorreta sobre dependências relacionada a GenAI para Engenharia Reversa.",
          "Outro conceito incorreto sobre dependências.",
          "Definição incorreta de dependências no contexto corporativo.",
          "Por meio de conectores padronizados e interfaces bem estabelecidas para troca de dados."
        ],
        "correct": 3
      },
      "en": {
        "question": "How does dependencies integrate with the rest of the stack in GenAI Reverse Engineering?",
        "options": [
          "Incorrect option about dependencies related to GenAI Reverse Engineering.",
          "Another incorrect concept regarding dependencies.",
          "Incorrect definition of dependencies in enterprise context.",
          "Via standardized connectors and well-established interfaces for data exchange."
        ],
        "correct": 3
      }
    },
    {
      "pt": {
        "question": "Qual ferramenta ou técnica é recomendada para diagnosticar problemas em prompt?",
        "options": [
          "Opção incorreta sobre prompt relacionada a GenAI para Engenharia Reversa.",
          "Outro conceito incorreto sobre prompt.",
          "Análise de logs de execução, traces de transação e debuggers específicos.",
          "Resposta alternativa inválida para prompt."
        ],
        "correct": 2
      },
      "en": {
        "question": "Which tool or technique is recommended for diagnosing issues in prompt?",
        "options": [
          "Incorrect option about prompt related to GenAI Reverse Engineering.",
          "Another incorrect concept regarding prompt.",
          "Analyzing execution logs, transaction traces, and specific debuggers.",
          "Invalid alternative answer for prompt."
        ],
        "correct": 2
      }
    },
    {
      "pt": {
        "question": "Como a segurança de LLM é garantida em cenários de alta criticidade?",
        "options": [
          "Opção incorreta sobre LLM relacionada a GenAI para Engenharia Reversa.",
          "Aplicando criptografia em trânsito, controle de acesso granular e autenticação forte.",
          "Definição incorreta de LLM no contexto corporativo.",
          "Resposta alternativa inválida para LLM."
        ],
        "correct": 1
      },
      "en": {
        "question": "How is the security of LLM guaranteed in high-criticality scenarios?",
        "options": [
          "Incorrect option about LLM related to GenAI Reverse Engineering.",
          "Applying encryption in transit, granular access control, and strong authentication.",
          "Incorrect definition of LLM in enterprise context.",
          "Invalid alternative answer for LLM."
        ],
        "correct": 1
      }
    },
    {
      "pt": {
        "question": "Qual o papel do desenvolvedor ao otimizar a performance de código legado?",
        "options": [
          "Refatorar estruturas ineficientes e criar índices/redes adequadas para código legado.",
          "Outro conceito incorreto sobre código legado.",
          "Definição incorreta de código legado no contexto corporativo.",
          "Resposta alternativa inválida para código legado."
        ],
        "correct": 0
      },
      "en": {
        "question": "What is the developer's role when optimizing the performance of legacy code?",
        "options": [
          "Refactoring inefficient structures and creating proper indices/networks for legacy code.",
          "Another incorrect concept regarding legacy code.",
          "Incorrect definition of legacy code in enterprise context.",
          "Invalid alternative answer for legacy code."
        ],
        "correct": 0
      }
    },
    {
      "pt": {
        "question": "Qual a relação entre análise e a escalabilidade de GenAI para Engenharia Reversa?",
        "options": [
          "Opção incorreta sobre análise relacionada a GenAI para Engenharia Reversa.",
          "Outro conceito incorreto sobre análise.",
          "Definição incorreta de análise no contexto corporativo.",
          "A descentralização e distribuição de carga permitem escalabilidade horizontal de análise."
        ],
        "correct": 3
      },
      "en": {
        "question": "What is the relationship between analysis and the scalability of GenAI Reverse Engineering?",
        "options": [
          "Incorrect option about analysis related to GenAI Reverse Engineering.",
          "Another incorrect concept regarding analysis.",
          "Incorrect definition of analysis in enterprise context.",
          "Decentralization and load distribution enable horizontal scalability of analysis."
        ],
        "correct": 3
      }
    }
  ]
};

function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('mainframeRoadmapLang') || 'pt';
  });

  const t = T[lang];
  const [activePhase, setActivePhase] = useState(() => {
    return localStorage.getItem('mainframeRoadmapActivePhase') || 'phase1';
  });

  // Expanded days state: stores expanded dayId (string) or null
  const [expandedDay, setExpandedDay] = useState(() => {
    const phase = localStorage.getItem('mainframeRoadmapActivePhase') || 'phase1';
    const phaseData = PHASES.find(p => p.id === phase);
    if (phaseData && phaseData.schedule.length > 0) {
      return phaseData.schedule[0].id;
    }
    return null;
  });

  const [isPjManualOpen, setIsPjManualOpen] = useState(true);

  // Gamification states
  const [xp, setXp] = useState(() => {
    return parseInt(localStorage.getItem('mainframeRoadmapXP') || '0', 10);
  });
  const [level, setLevel] = useState(() => {
    return parseInt(localStorage.getItem('mainframeRoadmapLevel') || '1', 10);
  });
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('mainframeRoadmapStreak') || '0';
    const lastCheck = localStorage.getItem('mainframeRoadmapLastCheck');
    if (lastCheck) {
      const lastCheckTime = parseInt(lastCheck, 10);
      const now = Date.now();
      const hoursSinceLast = (now - lastCheckTime) / (1000 * 60 * 60);
      if (hoursSinceLast > 36) {
        return 0;
      }
    }
    return parseInt(saved, 10);
  });
  const [lastCheckTimestamp, setLastCheckTimestamp] = useState(() => {
    const saved = localStorage.getItem('mainframeRoadmapLastCheck');
    return saved ? parseInt(saved, 10) : null;
  });

  // Quiz Lockouts state
  const [quizLockouts, setQuizLockouts] = useState(() => {
    const saved = localStorage.getItem('mainframeRoadmapQuizLockouts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        console.error('Error parsing quiz lockouts');
        return {};
      }
    }
    return {};
  });

  // Active quiz state
  const [activeQuiz, setActiveQuiz] = useState(null);

  // LinkedIn modal state
  const [linkedinModal, setLinkedinModal] = useState({ isOpen: false, content: '' });
  const [copiedFeedback, setCopiedFeedback] = useState(false);

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('mainframeRoadmapDualEngine');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        console.error('Error parsing local storage data');
        return {};
      }
    }
    return {};
  });

  // Local storage synchronization
  useEffect(() => {
    localStorage.setItem('mainframeRoadmapLang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('mainframeRoadmapActivePhase', activePhase);
  }, [activePhase]);

  useEffect(() => {
    localStorage.setItem('mainframeRoadmapDualEngine', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('mainframeRoadmapXP', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('mainframeRoadmapLevel', level.toString());
  }, [level]);

  useEffect(() => {
    localStorage.setItem('mainframeRoadmapStreak', streak.toString());
  }, [streak]);

  useEffect(() => {
    if (lastCheckTimestamp !== null) {
      localStorage.setItem('mainframeRoadmapLastCheck', lastCheckTimestamp.toString());
    } else {
      localStorage.removeItem('mainframeRoadmapLastCheck');
    }
  }, [lastCheckTimestamp]);

  useEffect(() => {
    localStorage.setItem('mainframeRoadmapQuizLockouts', JSON.stringify(quizLockouts));
  }, [quizLockouts]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'pt' ? 'en' : 'pt');
  };

  const handleDailyCheckin = useCallback(() => {
    const now = Date.now();
    const todayStr = new Date(now).toDateString();

    // Check if already checked in today
    if (lastCheckTimestamp) {
      const lastCheckDate = new Date(lastCheckTimestamp).toDateString();
      if (lastCheckDate === todayStr) {
        return; // Already checked in today
      }
    }

    setLastCheckTimestamp(now);
    setStreak(prevStreak => {
      if (!lastCheckTimestamp || prevStreak === 0) {
        return 1;
      }
      const hoursSinceLast = (now - lastCheckTimestamp) / (1000 * 60 * 60);
      if (hoursSinceLast > 36) {
        return 1; // Reset streak due to inactivity
      }
      return prevStreak + 1;
    });

    // Confetti celebration
    confetti({
      particleCount: 80,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#f59e0b', '#d97706', '#fbbf24']
    });
  }, [lastCheckTimestamp]);

  const getLevelTitle = (lvl) => {
    if (lvl >= 1 && lvl <= 5) return t.lvl_title_1;
    if (lvl >= 6 && lvl <= 15) return t.lvl_title_2;
    if (lvl >= 16 && lvl <= 30) return t.lvl_title_3;
    if (lvl >= 31 && lvl <= 45) return t.lvl_title_4;
    return t.lvl_title_5;
  };

  const handleToggleTask = useCallback((taskId, isHabit = false) => {
    const wasCompleted = !!progress[taskId];

    if (wasCompleted) {
      // 1. Uncheck immediately (deduct XP)
      setProgress(prev => {
        const next = { ...prev };
        delete next[taskId];
        return next;
      });

      const xpGain = isHabit ? 15 : 10;
      setXp(prevXp => {
        let nextXp = prevXp - xpGain;
        let nextLvl = level;
        while (nextXp < 0 && nextLvl > 1) {
          nextLvl -= 1;
          nextXp += nextLvl * 100;
        }
        if (nextLvl === 1 && nextXp < 0) nextXp = 0;
        setLevel(nextLvl);
        return nextXp;
      });
      return;
    }

    if (isHabit) {
      // 2. Check habit immediately (no quiz)
      setProgress(prev => ({ ...prev, [taskId]: true }));

      setXp(prevXp => {
        let nextXp = prevXp + 15;
        let nextLvl = level;
        let leveledUp = false;
        while (nextXp >= nextLvl * 100) {
          nextXp -= nextLvl * 100;
          nextLvl += 1;
          leveledUp = true;
        }
        if (nextLvl !== level) {
          setLevel(nextLvl);
          if (leveledUp) {
            confetti({
              particleCount: 150,
              spread: 85,
              origin: { y: 0.6 },
              colors: ['#8b5cf6', '#3b82f6', '#10b981', '#f472b6']
            });
          }
        }
        return nextXp;
      });

      return;
    }

    // 3. Technical Task: Intercept with Quiz
    const todayStr = new Date().toLocaleDateString();
    if (quizLockouts[taskId] === todayStr) {
      alert(lang === 'pt'
        ? 'Você errou a prova desta tarefa hoje. Só poderá refazer amanhã!'
        : 'You failed the test for this task today. You can only retake it tomorrow!');
      return;
    }

    // Launch Quiz Modal
    const questions = QUIZ_BANK[taskId];
    if (!questions) return;
    setActiveQuiz({
      taskId,
      currentQuestionIndex: 0,
      answers: [],
      questions
    });
  }, [progress, quizLockouts, lang, level]);

  const handleAnswerQuestion = (selectedOptionIndex) => {
    setActiveQuiz(prev => {
      if (!prev) return null;
      const nextAnswers = [...prev.answers, selectedOptionIndex];
      const nextIndex = prev.currentQuestionIndex + 1;
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        answers: nextAnswers
      };
    });
  };

  const handleCloseQuiz = (isPassed) => {
    if (!activeQuiz) return;

    const taskId = activeQuiz.taskId;

    if (isPassed) {
      // 1. Mark task as completed
      setProgress(prev => ({
        ...prev,
        [taskId]: true
      }));

      // 2. Add +10 XP
      setXp(prevXp => {
        let nextXp = prevXp + 10;
        let nextLvl = level;
        let leveledUp = false;

        while (nextXp >= nextLvl * 100) {
          nextXp -= nextLvl * 100;
          nextLvl += 1;
          leveledUp = true;
        }

        if (nextLvl !== level) {
          setLevel(nextLvl);
          if (leveledUp) {
            confetti({
              particleCount: 150,
              spread: 85,
              origin: { y: 0.6 },
              colors: ['#8b5cf6', '#3b82f6', '#10b981', '#f472b6']
            });
          }
        }

        return nextXp;
      });

      // 4. Trigger confetti for day completion if needed
      const activePhaseData = PHASES.find(p => p.id === activePhase);
      const day = activePhaseData.schedule.find(d => d.tasks.includes(taskId));
      if (day) {
        const dayCompletedTasks = day.tasks.filter(id => id === taskId ? true : !!progress[id]).length;
        if (dayCompletedTasks === day.tasks.length) {
          confetti({
            particleCount: 100,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#10b981', '#3b82f6', '#f59e0b']
          });
        }
      }

      // 5. Remove lockout if present
      setQuizLockouts(prev => {
        const next = { ...prev };
        delete next[taskId];
        return next;
      });

    } else {
      // 1. Record lockout for today
      const todayStr = new Date().toLocaleDateString();
      setQuizLockouts(prev => ({
        ...prev,
        [taskId]: todayStr
      }));
    }

    // Close Modal
    setActiveQuiz(null);
  };

  const handlePhaseChange = (phaseId) => {
    setActivePhase(phaseId);
    const phaseData = PHASES.find(p => p.id === phaseId);
    if (phaseData && phaseData.schedule.length > 0) {
      setExpandedDay(phaseData.schedule[0].id);
    } else {
      setExpandedDay(null);
    }
  };

  const toggleDayAccordion = (dayId) => {
    setExpandedDay(prev => prev === dayId ? null : dayId);
  };

  const resetCurrentPhase = () => {
    if (window.confirm(t.resetBlockConfirm)) {
      const phaseData = PHASES.find(p => p.id === activePhase);
      const phaseTaskIds = phaseData.schedule.flatMap(day => day.tasks);

      // Calculate XP reduction to adjust for cleared tasks
      const completedInPhase = phaseTaskIds.filter(id => progress[id]).length;
      const xpReduction = completedInPhase * 10;

      setProgress(prev => {
        const next = { ...prev };
        phaseTaskIds.forEach(id => delete next[id]);
        return next;
      });

      setXp(prevXp => {
        let nextXp = prevXp - xpReduction;
        let nextLvl = level;
        while (nextXp < 0 && nextLvl > 1) {
          nextLvl -= 1;
          nextXp += nextLvl * 100;
        }
        if (nextLvl === 1 && nextXp < 0) nextXp = 0;
        setLevel(nextLvl);
        return nextXp;
      });
    }
  };

  const clearAllData = () => {
    if (window.confirm(t.clearAll)) {
      setProgress({});
      setXp(0);
      setLevel(1);
      setStreak(0);
      setLastCheckTimestamp(null);
      setQuizLockouts({});
      localStorage.removeItem('mainframeRoadmapDualEngine');
      localStorage.removeItem('mainframeRoadmapXP');
      localStorage.removeItem('mainframeRoadmapLevel');
      localStorage.removeItem('mainframeRoadmapStreak');
      localStorage.removeItem('mainframeRoadmapLastCheck');
      localStorage.removeItem('mainframeRoadmapQuizLockouts');
    }
  };

  const handleTriggerLinkedInModal = (day) => {
    const dayTitle = t[day.topicKey];
    const checkedInDay = day.tasks.filter(taskId => progress[taskId]);
    const checkedTaskTexts = checkedInDay.map(taskId => t[taskId]);

    const draftText = lang === 'pt'
      ? `Hoje avancei na minha jornada de transição e modernização de sistemas legados! 💻🚀\n\nFoquei no desenvolvimento de "${dayTitle}" e me aprofundei nos seguintes temas:\n${checkedTaskTexts.length > 0
        ? "\n- " + checkedTaskTexts.map(text => text.replace(/\[\s*\]\s*/, "")).join("\n- ")
        : "\n- " + day.tasks.map(taskId => t[taskId].replace(/\[\s*\]\s*/, "")).slice(0, 2).join("\n- ") + "\n- E muito mais!"
      }\n\nMais um passo importante rumo a arquiteturas híbridas modernas, escalabilidade e mercado internacional! 🌍\n\n#Mainframe #Java #SoftwareEngineering #CloudModernization #LegacyMigration`
      : `Today I advanced on my legacy systems modernization and cloud transition journey! 💻🚀\n\nI focused on "${dayTitle}" and deep-dived into these topics:\n${checkedTaskTexts.length > 0
        ? "\n- " + checkedTaskTexts.map(text => text.replace(/\[\s*\]\s*/, "")).join("\n- ")
        : "\n- " + day.tasks.map(taskId => t[taskId].replace(/\[\s*\]\s*/, "")).slice(0, 2).join("\n- ") + "\n- And more!"
      }\n\nAnother solid step towards high-performance, scalable hybrid architectures and the international market! 🌍\n\n#Mainframe #Java #SoftwareEngineering #CloudModernization #LegacyMigration`;

    setLinkedinModal({ isOpen: true, content: draftText });
    setCopiedFeedback(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(linkedinModal.content);
    setCopiedFeedback(true);
    setTimeout(() => setCopiedFeedback(false), 2000);
  };

  // Calculations
  const isCheckedInToday = (() => {
    if (!lastCheckTimestamp) return false;
    const lastCheckDate = new Date(lastCheckTimestamp).toDateString();
    const todayDate = new Date().toDateString();
    return lastCheckDate === todayDate;
  })();

  const allTasksGlobal = PHASES.flatMap(p => p.schedule.flatMap(d => d.tasks));
  const totalGlobal = allTasksGlobal.length + HABITS.length;
  const completedGlobal = allTasksGlobal.filter(id => progress[id]).length + HABITS.filter(id => progress[id]).length;
  const globalPercentage = totalGlobal === 0 ? 0 : Math.round((completedGlobal / totalGlobal) * 100);

  const activePhaseData = PHASES.find(p => p.id === activePhase);
  const activePhaseTasks = activePhaseData.schedule.flatMap(d => d.tasks);
  const completedActivePhase = activePhaseTasks.filter(id => progress[id]).length;
  const activePhasePercentage = activePhaseTasks.length === 0 ? 0 : Math.round((completedActivePhase / activePhaseTasks.length) * 100);

  const xpNeeded = level * 100;
  const xpPercentage = Math.min(100, Math.round((xp / xpNeeded) * 100));

  // Determine current fixed bottom block
  const getActiveBlockGoal = () => {
    if (activePhase === 'phase1' || activePhase === 'phase2') {
      return { title: t.macroGoal_block1_title, desc: t.macroGoal_block1_desc };
    }
    if (activePhase === 'phase3') {
      return { title: t.macroGoal_block2_title, desc: t.macroGoal_block2_desc };
    }
    if (activePhase === 'phase4') {
      return { title: t.macroGoal_block3_title, desc: t.macroGoal_block3_desc };
    }
    return { title: t.macroGoal_block4_title, desc: t.macroGoal_block4_desc };
  };

  const activeBlockGoal = getActiveBlockGoal();

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-200 font-sans selection:bg-purple-500/30">

      {/* Top Banner Fixo (Dinâmico) */}
      <div className="bg-zinc-950 text-pink-500 py-2 px-4 text-center text-xs sm:text-sm font-semibold tracking-wide border-b border-pink-500/20 backdrop-blur-md sticky top-0 z-50">
        <Terminal className="inline-block w-4 h-4 mr-2 text-cyan-400 animate-pulse" />
        {t[`banner_${activePhase}`]}
        <Terminal className="inline-block w-4 h-4 ml-2 text-cyan-400 animate-pulse" />
      </div>

      {/* Header Premium */}
      <header className="bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900 shadow-2xl relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full xl:w-auto xl:flex-1 justify-center">
              <Compass className="w-10 h-10 text-cyan-400 shrink-0" />
              <div className="flex flex-col items-center text-center justify-center">
                <h1 className="text-base sm:text-lg font-extrabold text-pink-500 uppercase tracking-wider drop-shadow-[0_0_10px_rgba(236,72,153,0.3)] text-center max-w-3xl w-full">
                  {t.title}
                </h1>
                <p className="text-cyan-300 text-[10px] sm:text-xs mt-1.5 uppercase font-bold tracking-wider text-center w-full">{t.subtitle}</p>
              </div>
            </div>

            {/* Header Control Panel */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
              <div className="flex flex-col items-end w-full sm:w-auto">
                <span className="text-[11px] sm:text-xs font-extrabold mb-1 flex justify-between w-full uppercase tracking-wider">
                  <span className="text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.3)]">{t.progressMacro}</span>
                  <span className="text-cyan-300 font-mono font-extrabold">{globalPercentage}%</span>
                </span>
                <div className="w-full sm:w-48 h-3 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800 p-0.5">
                  <div
                    className="h-full bg-cyan-500 rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                    style={{ width: `${globalPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col items-end w-full sm:w-auto">
                <span className="text-[11px] sm:text-xs font-extrabold mb-1 flex justify-between w-full uppercase tracking-wider">
                  <span className="text-pink-400 drop-shadow-[0_0_6px_rgba(236,72,153,0.3)]">{t.progressBlock}</span>
                  <span className="text-pink-300 font-mono font-extrabold">{activePhasePercentage}%</span>
                </span>
                <div className="w-full sm:w-48 h-3 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800 p-0.5">
                  <div
                    className="h-full bg-pink-500 rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(236,72,153,0.6)]"
                    style={{ width: `${activePhasePercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 border-t sm:border-t-0 sm:border-l border-zinc-800 pt-4 sm:pt-0 sm:pl-6 shrink-0 justify-end">
                <button
                  onClick={handleDailyCheckin}
                  disabled={isCheckedInToday}
                  className={`px-3 py-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider rounded-lg transition-all border active:scale-95 ${isCheckedInToday
                    ? 'bg-cyan-950/20 text-cyan-400 border-cyan-500/30 cursor-not-allowed shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                    : 'bg-orange-950/30 text-orange-400 border-orange-500 hover:bg-orange-950/50 hover:text-orange-300 hover:border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.5)] animate-pulse'
                    }`}
                  title={isCheckedInToday ? t.checkinClaimed : t.checkinActive}
                >
                  <Flame className={`w-4 h-4 ${isCheckedInToday ? 'text-cyan-400 fill-cyan-400' : 'text-orange-400 fill-orange-400 animate-bounce'}`} />
                  <span>{isCheckedInToday ? t.checkinClaimed : t.checkinActive}</span>
                </button>
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider rounded-lg transition-all border border-cyan-500/40 bg-zinc-950 text-cyan-400 hover:bg-zinc-900 hover:text-cyan-300 hover:border-cyan-300 active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  title="Alterar Idioma / Change Language"
                >
                  <Languages className="w-4 h-4 text-cyan-400" />
                  <span>{lang.toUpperCase()}</span>
                </button>
                <button
                  onClick={resetCurrentPhase}
                  className="p-2 flex items-center justify-center rounded-lg transition-all border border-purple-500/40 bg-zinc-950 text-purple-400 hover:bg-zinc-900 hover:text-purple-300 hover:border-purple-300 active:scale-95 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                  title={t.resetBlock}
                >
                  <RotateCcw className="w-4 h-4 text-purple-400" />
                </button>
                <button
                  onClick={clearAllData}
                  className="p-2 flex items-center justify-center rounded-lg transition-all border border-red-500/40 bg-zinc-950 text-red-500 hover:bg-zinc-900 hover:text-red-400 hover:border-red-400 active:scale-95 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                  title="Limpar Tudo / Clear All History"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs (Horizontal Scrollable) */}
          <div className="mt-6 flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {PHASES.map(p => {
              const isActive = activePhase === p.id;
              const PHASE_STYLE = {
                phase1: {
                  active: 'bg-zinc-950 text-purple-400 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.25)] font-extrabold uppercase',
                  inactive: 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900/80 hover:text-purple-300 hover:border-purple-500/30 hover:shadow-[0_0_10px_rgba(168,85,247,0.08)] border-zinc-900 font-medium text-xs sm:text-sm',
                  activeTitle: 'text-purple-300',
                  activeSubtitle: 'text-purple-400/80'
                },
                phase2: {
                  active: 'bg-zinc-950 text-pink-500 border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.25)] font-extrabold uppercase',
                  inactive: 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900/80 hover:text-pink-300 hover:border-pink-500/30 hover:shadow-[0_0_10px_rgba(236,72,153,0.08)] border-zinc-900 font-medium text-xs sm:text-sm',
                  activeTitle: 'text-pink-300',
                  activeSubtitle: 'text-pink-400/80'
                },
                phase3: {
                  active: 'bg-zinc-950 text-yellow-300 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.25)] font-extrabold uppercase',
                  inactive: 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900/80 hover:text-yellow-200 hover:border-yellow-500/30 hover:shadow-[0_0_10px_rgba(234,179,8,0.08)] border-zinc-900 font-medium text-xs sm:text-sm',
                  activeTitle: 'text-yellow-200',
                  activeSubtitle: 'text-yellow-300/80'
                },
                phase4: {
                  active: 'bg-zinc-950 text-cyan-400 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)] font-extrabold uppercase',
                  inactive: 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900/80 hover:text-cyan-300 hover:border-cyan-500/30 hover:shadow-[0_0_10px_rgba(6,182,212,0.08)] border-zinc-900 font-medium text-xs sm:text-sm',
                  activeTitle: 'text-cyan-300',
                  activeSubtitle: 'text-cyan-400/80'
                },
                phase5: {
                  active: 'bg-zinc-950 text-blue-400 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.25)] font-extrabold uppercase',
                  inactive: 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900/80 hover:text-blue-300 hover:border-blue-500/30 hover:shadow-[0_0_10px_rgba(59,130,246,0.08)] border-zinc-900 font-medium text-xs sm:text-sm',
                  activeTitle: 'text-blue-300',
                  activeSubtitle: 'text-blue-400/80'
                }
              };
              const pStyle = PHASE_STYLE[p.id] || PHASE_STYLE.phase1;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePhaseChange(p.id)}
                  className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex flex-col items-start min-w-[140px] border group ${isActive ? pStyle.active : pStyle.inactive}`}
                >
                  <span className={`font-bold text-sm transition-colors ${isActive ? pStyle.activeTitle : 'text-zinc-300 group-hover:text-zinc-100'}`}>
                    {t[`${p.id}_title`]}
                  </span>
                  <span className={`text-xs mt-0.5 transition-colors ${isActive ? pStyle.activeSubtitle : 'text-zinc-500'}`}>
                    {t[`${p.id}_subtitle`]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 pb-32">

        {/* Left Column: Weekday Accordions (70%) */}
        <section className="flex-1 min-w-0 space-y-6">
          <div className="mb-6">
            {(() => {
              const HEADER_STYLE = {
                phase1: {
                  title: 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]',
                  desc: 'text-purple-300 border-purple-500'
                },
                phase2: {
                  title: 'text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]',
                  desc: 'text-pink-300 border-pink-500'
                },
                phase3: {
                  title: 'text-yellow-300 drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]',
                  desc: 'text-yellow-200 border-yellow-500'
                },
                phase4: {
                  title: 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]',
                  desc: 'text-cyan-300 border-cyan-500'
                },
                phase5: {
                  title: 'text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]',
                  desc: 'text-blue-300 border-blue-500'
                }
              };
              const hStyle = HEADER_STYLE[activePhaseData.id] || HEADER_STYLE.phase1;
              return (
                <>
                  <h2 className="text-2xl font-extrabold flex items-center gap-2">
                    <span className={`${hStyle.title}`}>{t[`${activePhaseData.id}_title`]}:</span>
                    <span className="text-zinc-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">{t[`${activePhaseData.id}_subtitle`]}</span>
                  </h2>
                  <p className={`${hStyle.desc} text-sm leading-relaxed border-l-2 pl-4 mt-3`}>
                    {t[`${activePhaseData.id}_desc`]}
                  </p>
                </>
              );
            })()}
          </div>

          <div className="space-y-4">
            {activePhaseData.schedule.map((day) => {
              const dayCompletedTasks = day.tasks.filter(id => progress[id]).length;
              const isDayComplete = dayCompletedTasks === day.tasks.length;
              const isExpanded = expandedDay === day.id;

              const colorMatch = day.icon.props.className.match(/text-(\w+)-\d+/);
              const colorName = colorMatch ? colorMatch[1] : 'purple';

              const COLOR_MAP = {
                purple: {
                  text: 'text-purple-400',
                  textDim: 'text-purple-400/80',
                  border: 'border-purple-500/20',
                  borderHover: 'group-hover:border-purple-500/40',
                  bgHover: 'hover:bg-purple-950/30',
                  bgCardActive: 'bg-zinc-900/60 border-purple-500/40 shadow-purple-500/10',
                  bgCardInactive: 'bg-zinc-900/40 border-zinc-900 hover:border-purple-500/30 hover:shadow-purple-500/5 hover:bg-zinc-900/60',
                  textHover: 'group-hover:text-purple-300',
                  taskText: 'text-purple-300/90',
                  taskTextHover: 'group-hover:text-purple-200',
                  taskBorderHover: 'hover:border-purple-500/25',
                  taskShadowHover: 'hover:shadow-[0_0_10px_rgba(168,85,247,0.08)]',
                  taskCheckHover: 'group-hover:text-purple-400'
                },
                orange: {
                  text: 'text-orange-400',
                  textDim: 'text-orange-400/80',
                  border: 'border-orange-500/20',
                  borderHover: 'group-hover:border-orange-500/40',
                  bgHover: 'hover:bg-orange-950/30',
                  bgCardActive: 'bg-zinc-900/60 border-orange-500/40 shadow-orange-500/10',
                  bgCardInactive: 'bg-zinc-900/40 border-zinc-900 hover:border-orange-500/30 hover:shadow-orange-500/5 hover:bg-zinc-900/60',
                  textHover: 'group-hover:text-orange-300',
                  taskText: 'text-orange-300/90',
                  taskTextHover: 'group-hover:text-orange-200',
                  taskBorderHover: 'hover:border-orange-500/25',
                  taskShadowHover: 'hover:shadow-[0_0_10px_rgba(249,115,22,0.08)]',
                  taskCheckHover: 'group-hover:text-orange-400'
                },
                emerald: {
                  text: 'text-emerald-400',
                  textDim: 'text-emerald-400/80',
                  border: 'border-emerald-500/20',
                  borderHover: 'group-hover:border-emerald-500/40',
                  bgHover: 'hover:bg-emerald-950/30',
                  bgCardActive: 'bg-zinc-900/60 border-emerald-500/40 shadow-emerald-500/10',
                  bgCardInactive: 'bg-zinc-900/40 border-zinc-900 hover:border-emerald-500/30 hover:shadow-emerald-500/5 hover:bg-zinc-900/60',
                  textHover: 'group-hover:text-emerald-300',
                  taskText: 'text-emerald-300/90',
                  taskTextHover: 'group-hover:text-emerald-200',
                  taskBorderHover: 'hover:border-emerald-500/25',
                  taskShadowHover: 'hover:shadow-[0_0_10px_rgba(16,185,129,0.08)]',
                  taskCheckHover: 'group-hover:text-emerald-400'
                },
                cyan: {
                  text: 'text-cyan-400',
                  textDim: 'text-cyan-400/80',
                  border: 'border-cyan-500/20',
                  borderHover: 'group-hover:border-cyan-500/40',
                  bgHover: 'hover:bg-cyan-950/30',
                  bgCardActive: 'bg-zinc-900/60 border-cyan-500/40 shadow-cyan-500/10',
                  bgCardInactive: 'bg-zinc-900/40 border-zinc-900 hover:border-cyan-500/30 hover:shadow-cyan-500/5 hover:bg-zinc-900/60',
                  textHover: 'group-hover:text-cyan-300',
                  taskText: 'text-cyan-300/90',
                  taskTextHover: 'group-hover:text-cyan-200',
                  taskBorderHover: 'hover:border-cyan-500/25',
                  taskShadowHover: 'hover:shadow-[0_0_10px_rgba(6,182,212,0.08)]',
                  taskCheckHover: 'group-hover:text-cyan-400'
                },
                pink: {
                  text: 'text-pink-400',
                  textDim: 'text-pink-400/80',
                  border: 'border-pink-500/20',
                  borderHover: 'group-hover:border-pink-500/40',
                  bgHover: 'hover:bg-pink-950/30',
                  bgCardActive: 'bg-zinc-900/60 border-pink-500/40 shadow-pink-500/10',
                  bgCardInactive: 'bg-zinc-900/40 border-zinc-900 hover:border-pink-500/30 hover:shadow-pink-500/5 hover:bg-zinc-900/60',
                  textHover: 'group-hover:text-pink-300',
                  taskText: 'text-pink-300/90',
                  taskTextHover: 'group-hover:text-pink-200',
                  taskBorderHover: 'hover:border-pink-500/25',
                  taskShadowHover: 'hover:shadow-[0_0_10px_rgba(236,72,153,0.08)]',
                  taskCheckHover: 'group-hover:text-pink-400'
                },
                blue: {
                  text: 'text-blue-400',
                  textDim: 'text-blue-400/80',
                  border: 'border-blue-500/20',
                  borderHover: 'group-hover:border-blue-500/40',
                  bgHover: 'hover:bg-blue-950/30',
                  bgCardActive: 'bg-zinc-900/60 border-blue-500/40 shadow-blue-500/10',
                  bgCardInactive: 'bg-zinc-900/40 border-zinc-900 hover:border-blue-500/30 hover:shadow-blue-500/5 hover:bg-zinc-900/60',
                  textHover: 'group-hover:text-blue-300',
                  taskText: 'text-blue-300/90',
                  taskTextHover: 'group-hover:text-blue-200',
                  taskBorderHover: 'hover:border-blue-500/25',
                  taskShadowHover: 'hover:shadow-[0_0_10px_rgba(59,130,246,0.08)]',
                  taskCheckHover: 'group-hover:text-blue-400'
                }
              };

              const style = COLOR_MAP[colorName] || COLOR_MAP.purple;

              return (
                <div
                  key={day.id}
                  className={`rounded-2xl transition-all duration-300 border group ${isDayComplete
                      ? 'bg-emerald-950/10 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
                      : isExpanded
                        ? style.bgCardActive
                        : style.bgCardInactive
                    }`}
                >
                  {/* Accordion Trigger */}
                  <div
                    className="p-5 cursor-pointer flex items-center justify-between gap-4"
                    onClick={() => toggleDayAccordion(day.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl transition-all ${isDayComplete ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : `bg-zinc-950 border ${style.border} ${style.text} ${style.borderHover}`}`}>
                        {day.icon}
                      </div>
                      <div>
                        <h3 className={`font-extrabold text-sm sm:text-base transition-colors uppercase tracking-wider ${style.text}`}>
                          {t[day.dayKey]}
                        </h3>
                        <p className={`text-xs sm:text-sm mt-0.5 transition-colors ${style.textDim} group-hover:text-zinc-200`}>
                          {t[day.topicKey]}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded bg-zinc-950 border ${style.border} ${style.text} ${style.borderHover} group-hover:text-zinc-200 transition-all`}>
                        {dayCompletedTasks} / {day.tasks.length}
                      </span>
                      <button
                        onClick={() => toggleDayAccordion(day.id)}
                        className={`p-1.5 ${style.bgHover} rounded-lg text-zinc-400 transition-colors`}
                      >
                        {isExpanded ? <ChevronUp className={`w-4 h-4 ${style.text}`} /> : <ChevronDown className={`w-4 h-4 ${style.text}`} />}
                      </button>
                    </div>
                  </div>

                  {/* Accordion Content */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100 border-t border-zinc-900/50' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}>
                    <div className="p-5 space-y-3 bg-zinc-950/20">
                      {day.tasks.map(taskId => {
                        const isCompleted = !!progress[taskId];
                        return (
                          <label
                            key={taskId}
                            className={`flex items-start gap-3.5 p-3 rounded-xl hover:bg-zinc-900/40 cursor-pointer transition-all group border border-transparent ${style.taskBorderHover} ${style.taskShadowHover}`}
                          >
                            <div className="pt-0.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={isCompleted}
                                onChange={() => handleToggleTask(taskId)}
                              />
                              {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] active:scale-90 transition-transform" />
                              ) : (
                                <Circle className={`w-5 h-5 text-zinc-700 ${style.taskCheckHover} transition-all active:scale-90`} />
                              )}
                            </div>
                            <span className={`text-xs sm:text-sm leading-relaxed transition-colors ${isCompleted ? 'text-zinc-600 line-through' : `${style.taskText} ${style.taskTextHover}`}`}>
                              {t[taskId]}
                            </span>
                          </label>
                        );
                      })}

                      {/* LinkedIn Action Button */}
                      {isDayComplete && (
                        <div className="pt-3 border-t border-zinc-900 flex justify-end">
                          <button
                            onClick={() => handleTriggerLinkedInModal(day)}
                            className="px-3 py-1.5 flex items-center gap-2 text-[10px] sm:text-xs font-bold text-pink-400 bg-pink-950/20 hover:bg-pink-950/40 border border-pink-900/40 rounded-lg transition-all active:scale-95 shadow-[0_0_8px_rgba(236,72,153,0.15)] uppercase tracking-wider"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>{t.linkedinBtn}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Right Column: Sidebar Widgets (30%) */}
        <aside className="lg:w-80 space-y-6 shrink-0">

          {/* Gamification Widget */}
          <div className="bg-zinc-900/40 border border-pink-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-600/10 rounded-full blur-2xl -mr-10 -mt-10"></div>

            {/* Header: Level & Streak */}
            <div className="flex justify-center items-center gap-3 mb-5">
              <div className="bg-zinc-950 border border-pink-500 text-pink-500 font-extrabold text-xs uppercase tracking-wider py-1.5 px-3 rounded-lg shadow-[0_0_10px_rgba(236,72,153,0.15)]">
                {t.levelLabel} {level}
              </div>

              {/* Streak Counter */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${streak > 0
                    ? 'bg-zinc-950 border-cyan-400 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)] animate-pulse'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                  }`}
                title={streak > 0 ? `${streak} ${t.streakActive}` : t.streakInactive}
              >
                <Flame className={`w-4 h-4 ${streak > 0 ? 'text-cyan-400 fill-cyan-400 animate-pulse' : 'text-zinc-600'}`} />
                <span className="text-xs font-bold font-mono">{streak}</span>
              </div>
            </div>

            {/* Level Title */}
            <div className="mb-5 text-center flex flex-col items-center">
              <h4 className="text-base font-extrabold text-cyan-400 uppercase tracking-wide">{getLevelTitle(level)}</h4>
              <p className="text-xs font-bold text-pink-500 mt-2 uppercase tracking-wide max-w-xs">{t.title}</p>
            </div>

            {/* XP Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm font-extrabold text-zinc-300">
                <span className="text-pink-400 drop-shadow-[0_0_6px_rgba(236,72,153,0.3)]">{t.nextLevelLabel}</span>
                <span className="font-mono text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.3)]">{xp} / {xpNeeded} XP</span>
              </div>
              <div className="w-full h-4 bg-zinc-950 border border-zinc-800 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-pink-500 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(236,72,153,0.6)]"
                  style={{ width: `${xpPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Daily English Habits Widget */}
          <div className="bg-zinc-900/40 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md shadow-cyan-500/5">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-600/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <h2 className="text-xs font-extrabold mb-4 flex items-center justify-center gap-2 text-cyan-400 uppercase tracking-wider drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] text-center">
              <Headphones className="w-4 h-4" />
              {t.dailyHabits}
            </h2>
            <div className="space-y-3.5">
              {HABITS.map(habitId => {
                const isCompleted = !!progress[habitId];
                return (
                  <label
                    key={habitId}
                    className="flex items-start gap-3.5 p-2.5 -mx-2 rounded-xl hover:bg-zinc-900/40 cursor-pointer transition-colors group border border-transparent hover:border-zinc-800/20"
                  >
                    <div className="pt-0.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isCompleted}
                        onChange={() => handleToggleTask(habitId, true)}
                      />
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] active:scale-90 transition-transform" />
                      ) : (
                        <Circle className="w-5 h-5 text-zinc-700 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] transition-all active:scale-90" />
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm leading-relaxed transition-colors ${isCompleted ? 'text-zinc-600 line-through' : 'text-pink-300'
                      }`}>
                      {t[habitId]}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Manual PJ Brasil (Accordion) */}
          <div className="bg-zinc-900/40 border border-pink-500/30 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md shadow-pink-500/5">
            <div
              className="p-5 cursor-pointer flex items-center justify-between bg-zinc-900/80 border-b border-pink-500/10 hover:bg-zinc-900 transition-colors"
              onClick={() => setIsPjManualOpen(!isPjManualOpen)}
            >
              <h2 className="text-xs font-extrabold flex items-center gap-2.5 text-pink-500 uppercase tracking-wider drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]">
                <FileText className="w-4.5 h-4.5" />
                {t.pjManual}
              </h2>
              {isPjManualOpen ? <ChevronUp className="w-4.5 h-4.5 text-pink-500/80" /> : <ChevronDown className="w-4.5 h-4.5 text-pink-500/80" />}
            </div>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isPjManualOpen ? 'max-h-[850px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}>
              <div className="p-5 space-y-5 bg-zinc-950/20">
                <p className="text-[13px] sm:text-sm text-yellow-300 italic text-center w-full font-semibold drop-shadow-[0_0_6px_rgba(253,224,71,0.3)]">
                  {t.pjManualSubtitle}
                </p>

                {PJ_MANUAL.map((item, index) => (
                  <div key={index} className="space-y-1.5 flex flex-col items-center text-center">
                    <h3 className={`text-sm font-extrabold flex items-center justify-center gap-2 text-center w-full ${item.titleColor}`}>
                      {item.icon}
                      <span>{t[item.titleKey]}</span>
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed text-center w-full ${item.descColor}`}>
                      {t[item.textKey]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Bottom Sticky Careers Goal Section */}
      {(() => {
        const FOOTER_STYLE = {
          phase1: {
            border: 'border-purple-500/20',
            iconBg: 'bg-purple-950/50',
            iconBorder: 'border-purple-500/30',
            iconText: 'text-purple-400',
            metaText: 'text-purple-400',
            titleText: 'text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]',
            descText: 'text-purple-200/90'
          },
          phase2: {
            border: 'border-pink-500/20',
            iconBg: 'bg-pink-950/50',
            iconBorder: 'border-pink-500/30',
            iconText: 'text-pink-400',
            metaText: 'text-pink-400',
            titleText: 'text-pink-300 drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]',
            descText: 'text-pink-200/90'
          },
          phase3: {
            border: 'border-yellow-500/20',
            iconBg: 'bg-yellow-950/50',
            iconBorder: 'border-yellow-500/30',
            iconText: 'text-yellow-400',
            metaText: 'text-yellow-400',
            titleText: 'text-yellow-200 drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]',
            descText: 'text-yellow-100/90'
          },
          phase4: {
            border: 'border-cyan-500/20',
            iconBg: 'bg-cyan-950/50',
            iconBorder: 'border-cyan-500/30',
            iconText: 'text-cyan-400',
            metaText: 'text-cyan-400',
            titleText: 'text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]',
            descText: 'text-cyan-200/90'
          },
          phase5: {
            border: 'border-blue-500/20',
            iconBg: 'bg-blue-950/50',
            iconBorder: 'border-blue-500/30',
            iconText: 'text-blue-400',
            metaText: 'text-blue-400',
            titleText: 'text-blue-300 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]',
            descText: 'text-blue-200/90'
          }
        };
        const fStyle = FOOTER_STYLE[activePhase] || FOOTER_STYLE.phase1;
        return (
          <footer className={`fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-md border-t ${fStyle.border} p-5 shadow-[0_-10px_20px_rgba(0,0,0,0.4)]`}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border transition-colors ${fStyle.iconBg} ${fStyle.iconBorder} ${fStyle.iconText}`}>
                  <Briefcase className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${fStyle.metaText}`}>{t.macroGoalsTitle}</span>
                  <h4 className={`text-xs sm:text-sm font-extrabold mt-0.5 uppercase tracking-wide transition-colors ${fStyle.titleText}`}>{activeBlockGoal.title}</h4>
                </div>
              </div>
              <div className={`text-[11px] sm:text-xs md:max-w-xl text-center pl-3 pr-3 w-full md:w-auto transition-colors ${fStyle.descText}`}>
                {activeBlockGoal.desc}
              </div>
            </div>
          </footer>
        );
      })()}

      {/* LinkedIn Draft Modal */}
      {linkedinModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm transition-opacity">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">

            {/* Modal Header */}
            <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {t.linkedinModalTitle}
              </h3>
              <button
                onClick={() => setLinkedinModal({ isOpen: false, content: '' })}
                className="text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <textarea
                className="w-full h-44 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-300 font-sans text-xs leading-relaxed focus:outline-none focus:border-blue-500/50 resize-none"
                readOnly
                value={linkedinModal.content}
              ></textarea>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setLinkedinModal({ isOpen: false, content: '' })}
                  className="px-4 py-2 text-xs font-semibold text-zinc-400 bg-zinc-950 hover:bg-zinc-800 hover:text-zinc-300 rounded-lg border border-zinc-800 transition-all"
                >
                  {t.linkedinCloseBtn}
                </button>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-2 transition-all active:scale-95 shadow-md shadow-blue-500/20"
                >
                  {copiedFeedback ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedFeedback ? t.linkedinCopied : t.linkedinCopyBtn}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Quiz Modal Overlay */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md transition-all">
          <div className="bg-zinc-900 border border-pink-500/30 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative shadow-pink-500/10">

            {/* Progress Bar */}
            <div className="w-full h-1 bg-zinc-950">
              <div
                className="h-full bg-pink-500 transition-all duration-300 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                style={{ width: `${(Math.min(10, activeQuiz.currentQuestionIndex) / 10) * 100}%` }}
              ></div>
            </div>

            {/* Modal Header */}
            <div className="px-6 py-4 bg-zinc-950 flex items-center justify-between border-b border-zinc-800">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-pink-500 uppercase tracking-widest flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  <span>{lang === 'pt' ? 'PROVA DE CONHECIMENTO' : 'KNOWLEDGE TEST'}</span>
                </h3>
                <span className="text-[10px] text-zinc-500">
                  {t[activeQuiz.taskId]}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono font-bold text-zinc-400">
                  {Math.min(10, activeQuiz.currentQuestionIndex + 1)} / 10
                </span>
                {activeQuiz.currentQuestionIndex < 10 && (
                  <button
                    onClick={() => setActiveQuiz(null)}
                    className="text-zinc-400 hover:text-zinc-200 transition-colors p-1.5 hover:bg-zinc-800 rounded-lg"
                    title={lang === 'pt' ? 'Cancelar prova' : 'Cancel test'}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {activeQuiz.currentQuestionIndex < 10 ? (
                <div>
                  {/* Question Text */}
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-100 mb-6 leading-relaxed">
                    {activeQuiz.questions[activeQuiz.currentQuestionIndex][lang].question}
                  </h4>

                  {/* Options */}
                  <div className="space-y-3">
                    {activeQuiz.questions[activeQuiz.currentQuestionIndex][lang].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswerQuestion(idx)}
                        className="w-full p-4 text-left text-xs sm:text-sm bg-zinc-950 hover:bg-zinc-800/40 text-zinc-300 hover:text-white rounded-xl border border-zinc-800 hover:border-purple-500/40 transition-all active:scale-[0.99] flex gap-3"
                      >
                        <span className="font-bold text-purple-400">{String.fromCharCode(65 + idx)}.</span>
                        <span>{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Results Screen */
                <div className="text-center py-6 space-y-6">
                  {(() => {
                    const correctCount = activeQuiz.answers.reduce((acc, ans, idx) => {
                      const correctAns = activeQuiz.questions[idx].pt.correct;
                      return acc + (ans === correctAns ? 1 : 0);
                    }, 0);
                    const isPassed = correctCount >= 9;

                    return (
                      <div>
                        <div className="inline-flex items-center justify-center p-4 rounded-full bg-zinc-950 border border-zinc-800 mb-4">
                          {isPassed ? (
                            <CheckCircle2 className="w-16 h-16 text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
                          ) : (
                            <X className="w-16 h-16 text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]" />
                          )}
                        </div>

                        <h3 className={`text-xl font-black uppercase tracking-wider ${isPassed ? 'text-emerald-400' : 'text-red-400'}`}>
                          {isPassed
                            ? (lang === 'pt' ? 'APROVADO!' : 'PASSED!')
                            : (lang === 'pt' ? 'REPROVADO' : 'FAILED')}
                        </h3>

                        <p className="text-zinc-400 text-xs sm:text-sm mt-2">
                          {lang === 'pt'
                            ? `Você acertou ${correctCount} de 10 questões (${correctCount * 10}%).`
                            : `You got ${correctCount} out of 10 questions correct (${correctCount * 10}%).`}
                        </p>

                        <p className="text-zinc-500 text-[10px] sm:text-xs mt-3 max-w-md mx-auto leading-relaxed">
                          {isPassed
                            ? (lang === 'pt'
                              ? 'Excelente! Seu progresso foi gravado e você ganhou +10 XP.'
                              : 'Excellent! Your progress was saved and you earned +10 XP.')
                            : (lang === 'pt'
                              ? 'Você não atingiu a pontuação mínima de 90% (9/10). Esta prova foi bloqueada e você só poderá refazê-la amanhã!'
                              : 'You did not reach the minimum score of 90% (9/10). This test has been locked and you can only retake it tomorrow!')}
                        </p>

                        <div className="mt-8 flex justify-center">
                          <button
                            onClick={() => handleCloseQuiz(isPassed)}
                            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-lg ${isPassed
                                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
                                : 'bg-zinc-950 border border-zinc-800 hover:bg-zinc-800 text-zinc-300'
                              }`}
                          >
                            {isPassed
                              ? (lang === 'pt' ? 'Concluir' : 'Finish')
                              : (lang === 'pt' ? 'Fechar' : 'Close')}
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
