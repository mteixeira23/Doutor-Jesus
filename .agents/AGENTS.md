# Regras do Projeto - SGI Fundação Doutor Jesus

## 1. Perfil do Desenvolvedor & Papel
Você é o Desenvolvedor Web Sênior e Arquiteto de Software responsável por entregar o **SGI — Sistema de Gestão Integrada da Fundação Doutor Jesus**.
Seu objetivo é garantir código limpo, de alta performance, sem dependências desnecessárias, com uma interface visual impressionante (Dark/Light mode, HSL, Glassmorphism) e total usabilidade para os operadores da instituição.

## 2. Stack Tecnológica Obrigatória
- **Front-end**: HTML5 semântico, CSS Vanilla (variáveis HSL, tema escuro moderno, glassmorphism, animações sutis), JavaScript (ES6+ modular).
- **Persistência**: LocalStorage nativo com gerenciamento no `js/store.js` e dados iniciais mockados realistas.
- **Fontes & Ícones**: Google Fonts (`Outfit` para títulos, `Inter` para corpo) e `Lucide Icons`.
- **Impressão**: Folha de estilos `@media print` dedicada para relatórios A4, Crachá de Identificação e Declaração de Quitação.

## 3. Arquitetura Modular dos 13 Módulos
O sistema é organizado nos seguintes Macromódulos:
1. **Macromódulo 1: Gestão dos Acolhidos**
   - Módulo 1: Triagem, Leitos, Admissão e Altas
   - Módulo 2: Prontuário Eletrônico & PTI (Plano Terapêutico Individual Fases 1 a 4)
   - Módulo 3: Emissão de Crachás de Identificação e Declarações de Quitação
   - Módulo 4: Relação de Transportados & Acompanhamento
2. **Macromódulo 2: Gestão Administrativa & Almoxarifado**
   - Módulo 5: Controle de Estoque FEFO (First Expired, First Out) & Alertas Críticos
   - Módulo 6: Gestão de Refeições (Café e Almoço para 1.240 Acolhidos)
   - Módulo 7: Escala de Oficinas (Cozinha Industrial, Horta Orgânica, Elétrica, Manutenção)
   - Módulo 8: Kits de Admissão de Novos Acolhidos
3. **Gestão da Saúde & Atendimento**
   - Módulo 9: Acompanhamento Médico & Psicossocial
   - Módulo 10: Controle de Dietas Especiais (Hipossódica, Diabética, etc.)
4. **Gestão Financeira & Parcerias**
   - Módulo 11: Prestação de Contas MROSC & Termos de Fomento
   - Módulo 12: Gestão de Doações & Voluntariado
5. **Tecnologia da Informação**
   - Módulo 13: Administração do Sistema (Perfis SuperAdmin, Recepção, TI) & Organograma

## 4. Estrutura de Pastas Padrão
- `index.html`: Layout principal e contêineres dos módulos.
- `css/styles.css`: Sistema de design, variáveis HSL, temas e CSS de impressão A4.
- `js/store.js`: Camada de estado e métodos de CRUD no LocalStorage.
- `js/ui.js`: Renderização dinâmica das tabelas, cards, estatísticas e modais.
- `js/app.js`: Inicialização, rotas/tabs e event listeners.
- `.agents/memoria.md`: Registro contínuo de decisões e pendências para a entrega.

## 5. Critérios de Aceite para a Entrega
- **Zero erros no console JS**.
- **Interface responsiva** (funcional em desktop e dispositivos móveis/tablets).
- **Responsividade de Impressão**: Os relatórios e crachás devem imprimir limpos sem barras laterais ou menus.
