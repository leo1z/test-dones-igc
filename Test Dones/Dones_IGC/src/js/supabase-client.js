/**
 * supabase-client.js — Dones IGC (v2)
 * Envía el resultado del test a Supabase (schema dones_igc, proyecto
 * compartido "IGC") como respaldo remoto. localStorage sigue siendo la
 * fuente de verdad para la UX — esto es best-effort: si falla (sin
 * internet, permisos aún no aplicados, etc.) no bloquea ni rompe nada,
 * el resultado ya quedó guardado local. Ver docs/SCORE_ENGINE.md y
 * supabase/migrations/ para el contrato de datos.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://vmlbrjzsuceizrwqryjf.supabase.co';
const SUPABASE_KEY = 'sb_publishable_XjovwLA5Ja5o49WKhwM_Fw_Q5sWak6x';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: { schema: 'dones_igc' },
});

/**
 * @param {{ version: string, completedAt: string, answers: object, scores: object, topGifts: string[] }} result
 */
export async function submitResult(result) {
  try {
    const { error } = await supabase.from('results').insert({
      version: result.version,
      answers: result.answers,
      scores: result.scores,
      top_gifts: result.topGifts,
      completed_at: result.completedAt,
    });
    if (error) throw error;
  } catch (err) {
    console.warn('[Supabase] No se pudo sincronizar el resultado (queda guardado local):', err?.message || err);
  }
}
