/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * Supabase Client Initializer
 */

const SUPABASE_URL = window.ENV_SUPABASE_URL || 'https://seu-projeto.supabase.co';
const SUPABASE_ANON_KEY = window.ENV_SUPABASE_ANON_KEY || 'sua-chave-anonima';

let supabaseClient = null;

if (window.supabase && SUPABASE_URL !== 'https://seu-projeto.supabase.co') {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('⚡ Supabase Conectado com Sucesso!');
} else {
  console.log('ℹ️ Modo LocalStorage Ativo (Supabase aguardando credenciais)');
}

window.supabaseClient = supabaseClient;
