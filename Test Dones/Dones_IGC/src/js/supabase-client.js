/**
 * supabase-client.js — Dones IGC (v3)
 * Envía el resultado del test a Supabase (schema dones_igc) como respaldo remoto
 * e integra funciones de lectura para el Panel de Administración (admin.html).
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://vmlbrjzsuceizrwqryjf.supabase.co';
const SUPABASE_KEY = 'sb_publishable_XjovwLA5Ja5o49WKhwM_Fw_Q5sWak6x';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: { schema: 'dones_igc' },
});

/**
 * Guarda o actualiza la entrega del test en Supabase.
 */
export async function submitResult(result) {
  try {
    const payload = {
      version: result.version || '3.0.0',
      answers: result.answers,
      scores: result.scores,
      top_gifts: result.topGifts,
      completed_at: result.completedAt || new Date().toISOString(),
      attends_growth_group: result.attendsGrowthGroup ?? null,
      zone_location: result.zoneLocation || null,
      clarity_rating: result.clarityRating || null,
      accuracy_perception: result.accuracyPerception || null,
      feedback_comments: result.feedbackComments || null,
    };

    if (result.id) {
      payload.id = result.id;
      const { error } = await supabase.from('results').upsert(payload);
      if (error) throw error;
    } else {
      const { data, error } = await supabase.from('results').insert(payload).select('id').single();
      if (error) throw error;
      return data?.id;
    }
  } catch (err) {
    console.warn('[Supabase] Sincronización (guardado local preservado):', err?.message || err);
  }
}

/**
 * Consulta métricas y resultados para el Panel Admin (admin.html) con filtros por fecha.
 */
export async function fetchAdminMetrics(startDate = null, endDate = null) {
  try {
    let query = supabase.from('results').select('*').order('completed_at', { ascending: false });

    if (startDate) {
      query = query.gte('completed_at', startDate);
    }
    if (endDate) {
      query = query.lte('completed_at', endDate);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('[Supabase Admin] Error cargando métricas:', err);
    return [];
  }
}
