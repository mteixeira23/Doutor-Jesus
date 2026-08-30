-- ====================================================================
-- SGI — Fundação Doutor Jesus | Sistema de Gestão Integrada
-- Database Schema for Supabase (PostgreSQL)
-- ====================================================================

-- 1. Tabela de Acolhidos
CREATE TABLE IF NOT EXISTS acolhidos (
  id VARCHAR(30) PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  cpf VARCHAR(14) UNIQUE,
  status VARCHAR(20) DEFAULT 'triagem', -- 'ativo', 'triagem', 'desligado', 'pos_alta'
  fase_pti INT DEFAULT 1 CHECK (fase_pti BETWEEN 1 AND 4),
  leito VARCHAR(80),
  oficina VARCHAR(80),
  origem VARCHAR(100),
  dieta VARCHAR(80) DEFAULT 'Normal',
  acompanhamento_medico TEXT,
  data_admissao DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela de Estoque (Almoxarifado & Despensa FEFO)
CREATE TABLE IF NOT EXISTS estoque (
  id VARCHAR(30) PRIMARY KEY,
  item VARCHAR(150) NOT NULL,
  quantidade INT DEFAULT 0,
  estoque_minimo INT DEFAULT 10,
  validade DATE,
  setor VARCHAR(80) DEFAULT 'Despensa Geral',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabela de Refeições Diárias (1.240 Acolhidos)
CREATE TABLE IF NOT EXISTS refeicoes (
  id BIGSERIAL PRIMARY KEY,
  data DATE DEFAULT CURRENT_DATE,
  tipo_refeicao VARCHAR(50) NOT NULL, -- 'Café da Manhã', 'Almoço Comunitário'
  quantidade_servida INT DEFAULT 1240,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabela de Usuários & Perfis SGI (Módulo 13)
CREATE TABLE IF NOT EXISTS usuarios_sgi (
  id VARCHAR(30) PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  perfil VARCHAR(50) DEFAULT 'Operador', -- 'SuperAdmin', 'Recepção/Triagem', 'TI'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) - Leitura e Escrita Permitidas para Aplicação
ALTER TABLE acolhidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE estoque ENABLE ROW LEVEL SECURITY;
ALTER TABLE refeicoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios_sgi ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública" ON acolhidos FOR SELECT USING (true);
CREATE POLICY "Permitir insercao publica" ON acolhidos FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir leitura publica estoque" ON estoque FOR SELECT USING (true);
CREATE POLICY "Permitir leitura publica refeicoes" ON refeicoes FOR SELECT USING (true);
