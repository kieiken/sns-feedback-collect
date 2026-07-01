#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function argValue(name, fallback) {
  const ix = process.argv.indexOf(name);
  return ix >= 0 && process.argv[ix + 1] ? process.argv[ix + 1] : fallback;
}

const home = process.env.HOME || require('os').homedir();
const queuePath = argValue('--queue', path.join(home, 'kiei-dashboard', 'queue.json'));
const feedbackPath = argValue('--feedback', path.join(home, '.n8n-files', 'fb-feedback.json'));

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function num(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function postNo(id) {
  const m = String(id || '').match(/\d+/);
  return m ? Number(m[0]) : 0;
}

const queue = readJson(queuePath);
const feedbackData = readJson(feedbackPath);
const feedback = feedbackData.items || {};
const posts = (queue.posts || []).filter(p => p.platform && p.platform !== '—');
const posted = posts.filter(p => p.status === 'posted');

const rows = Object.keys(feedback)
  .sort((a, b) => postNo(a) - postNo(b))
  .map(id => {
    const item = feedback[id] || {};
    const metrics = item.metrics || {};
    const reach = num(metrics.reach);
    const views = num(metrics.views);
    const interactions = num(metrics.interactions);
    const strong = num(metrics.shares) + num(metrics.saves) + num(metrics.meaningful_comments);
    return {
      id,
      platform: item.platform || '',
      type: item.type || '',
      views,
      reach,
      interactions,
      reactions: num(metrics.reactions),
      comments: num(metrics.comments),
      meaningful_comments: num(metrics.meaningful_comments),
      shares: num(metrics.shares),
      saves: num(metrics.saves),
      strong,
      interaction_rate: reach ? interactions / reach : null,
      updated_at: item.updated_at || ''
    };
  });

const measuredPosted = posted.filter(p => feedback[p.id]);
const totals = measuredPosted.reduce((acc, p) => {
  const metrics = feedback[p.id].metrics || {};
  const primary = p.platform === 'Threads' ? (num(metrics.views) || num(metrics.reach)) : num(metrics.reach);
  acc.primary += primary;
  acc.reactions += num(metrics.reactions);
  acc.comments += num(metrics.comments);
  acc.shares += num(metrics.shares);
  acc.saves += num(metrics.saves);
  acc.strong += num(metrics.shares) + num(metrics.saves) + num(metrics.meaningful_comments);
  return acc;
}, { primary: 0, reactions: 0, comments: 0, shares: 0, saves: 0, strong: 0 });

const summary = {
  queue_updated_at: queue.meta && queue.meta.updated_at,
  feedback_updated_at: feedbackData.updated_at,
  posted_count: posted.length,
  measured_posted_count: measuredPosted.length,
  unmeasured_posted: posted.filter(p => !feedback[p.id]).map(p => p.id),
  totals
};

console.log(JSON.stringify({ summary, rows }, null, 2));
