// Lògica de votació - Carrers Engalanats

import type { Env, VoteResponse } from '../types';
import { hashEmail, hasVotedBefore } from './email-validator';
import { isValidStreetId } from '../utils/validators';

export async function submitVote(
  env: Env,
  streetId: number,
  email: string,
  ipAddress: string | null,
  userAgent: string | null
): Promise<VoteResponse> {
  // Validar street_id
  if (!isValidStreetId(streetId)) {
    return {
      success: false,
      message: 'Carrer no vàlid. Si us plau, selecciona un carrer de la llista.'
    };
  }

  // Hash de l'email
  const emailHash = await hashEmail(email);

  // Comprovar si ja ha votat
  const alreadyVoted = await hasVotedBefore(env.DB, emailHash);
  if (alreadyVoted) {
    return {
      success: false,
      message: 'Ja has votat amb aquest correu electrònic. Només es permet un vot per persona.'
    };
  }

  try {
    // Transacció atòmica: inserir vot i registre d'email
    const voteResult = await env.DB.prepare(
      'INSERT INTO votes (street_id, email_hash, ip_address, user_agent) VALUES (?, ?, ?, ?)'
    ).bind(streetId, emailHash, ipAddress, userAgent).run();

    if (!voteResult.success || !voteResult.meta.last_row_id) {
      throw new Error('Error al guardar el vot');
    }

    const voteId = voteResult.meta.last_row_id;

    // Registrar l'email com a utilitzat
    await env.DB.prepare(
      'INSERT INTO email_votes (email_hash, vote_id) VALUES (?, ?)'
    ).bind(emailHash, voteId).run();

    return {
      success: true,
      message: 'Vot registrat correctament. Gràcies per participar!',
      vote_id: voteId
    };
  } catch (error) {
    console.error('Error al processar el vot:', error);
    return {
      success: false,
      message: 'Error al processar el vot. Si us plau, torna-ho a intentar.'
    };
  }
}

export async function getResults(env: Env): Promise<any> {
  const query = `
    SELECT
      s.id as street_id,
      s.name,
      s.display_name,
      COUNT(v.id) as vote_count
    FROM streets s
    LEFT JOIN votes v ON s.id = v.street_id
    GROUP BY s.id, s.name, s.display_name
    ORDER BY vote_count DESC, s.display_name ASC
  `;

  const result = await env.DB.prepare(query).all();
  const totalVotes = result.results.reduce((sum: number, row: any) => sum + row.vote_count, 0);

  const results = result.results.map((row: any) => ({
    street_id: row.street_id,
    name: row.name,
    display_name: row.display_name,
    vote_count: row.vote_count,
    percentage: totalVotes > 0 ? Math.round((row.vote_count / totalVotes) * 100 * 10) / 10 : 0
  }));

  return {
    total_votes: totalVotes,
    results,
    last_updated: new Date().toISOString()
  };
}
