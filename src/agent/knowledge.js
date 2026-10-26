// Built-in portfolio agent: answers ONLY from the portfolio content in data.js.
// No AI service, no API key, no server. Works on GitHub Pages.
import { person, about, services, skillGroups, bizPillars, bizCounters, projects, repos, certs, education, languages, summary, writing } from '../data';

const plainList = (items) => items.map((i) => `• ${i}`).join('\n');

// Each intent: keywords that trigger it, and a function that builds the answer from the data.
export const intents = [
  {
    id: 'intro',
    keys: ['who is', 'who are you', 'introduce', 'yourself', 'about you', 'about him', 'about gurwinder', 'gurwinder', 'parhar', 'summary', 'profile', 'background'],
    answer: () => `${summary}\n\n${about.plain}`,
  },
  {
    id: 'role',
    keys: ['role', 'title', 'job', 'position', 'developer', 'analyst', 'what do you do', 'what does he do'],
    answer: () => `Gurwinder is a ${person.role}. He builds responsive websites and web apps, plus the business systems behind them: financial, inventory and purchase tools, company websites and Power BI dashboards.`,
  },
  {
    id: 'skills',
    keys: ['skill', 'skills', 'technology', 'technologies', 'tech', 'stack', 'tools', 'know', 'language', 'programming'],
    answer: () =>
      'Skills by group:\n' +
      Object.entries(skillGroups).map(([group, list]) => `${group}: ${list.map((s) => s[0]).join(', ')}`).join('\n'),
  },
  {
    id: 'experience',
    keys: ['experience', 'years', 'work', 'worked', 'career', 'job history', 'professional'],
    answer: () =>
      `${bizCounters.map((c) => `${c.value}${c.suffix} ${c.label}`).join('\n• ')}.\n` +
      `Current role: MIS Executive and Head MDO. Responsibilities:\n${plainList(bizPillars[1].points)}`,
  },
  {
    id: 'bi',
    keys: ['bi', 'power bi', 'business intelligence', 'dashboard', 'sql', 'power query', 'analytics', 'data'],
    answer: () => `Business intelligence work:\n${plainList(bizPillars[0].points)}`,
  },
  {
    id: 'mis',
    keys: ['mis', 'reporting', 'report', 'kpi', 'operations', 'mdo', 'head mdo'],
    answer: () => `MIS and operations work:\n${plainList(bizPillars[1].points)}`,
  },
  {
    id: 'services',
    keys: ['service', 'services', 'offer', 'hire', 'help me', 'build for', 'can you build', 'what can'],
    answer: () =>
      services.map((s) => `${s.title}: ${s.plain}\n${plainList(s.points)}`).join('\n\n'),
  },
  {
    id: 'education',
    keys: ['education', 'study', 'studied', 'college', 'degree', 'bca', 'school', 'university', 'qualification'],
    answer: () =>
      education.map((e) => `${e.title}, ${e.org} (${e.when}, ${e.where})`).join('\n') +
      `\nAward: ${about.facts.find((f) => f[0] === 'Award')[1]}.`,
  },
  {
    id: 'certs',
    keys: ['certificate', 'certification', 'certified', 'certs', 'course', 'courses', 'samsung'],
    answer: () => `Certificates:\n${plainList(certs)}`,
  },
  {
    id: 'languages',
    keys: ['language', 'languages', 'punjabi', 'hindi', 'english', 'speak'],
    answer: () => languages.map(([l, level]) => `${l}: ${level}`).join('\n'),
  },
  {
    id: 'writing',
    keys: ['writing', 'article', 'articles', 'seo', 'documentation', 'copy', 'blog'],
    answer: () => writing.map((w) => `${w.title}: ${w.text}`).join('\n'),
  },
  {
    id: 'location',
    keys: ['where', 'location', 'based', 'city', 'punjab', 'india', 'relocate'],
    answer: () => `Gurwinder is based in ${person.location}.`,
  },
  {
    id: 'availability',
    keys: ['available', 'availability', 'open to', 'hire', 'job', 'opportunity', 'looking for', 'status'],
    answer: () => `Status: ${person.status}. He is looking for a Full Stack Developer role.`,
  },
  {
    id: 'contact',
    keys: ['contact', 'email', 'mail', 'phone', 'call', 'number', 'reach', 'linkedin', 'github', 'instagram', 'facebook', 'social'],
    answer: () =>
      `Email: ${person.email}\nPhone: ${person.phone}\nLinkedIn: ${person.links.linkedin}\nGitHub: ${person.links.github}\nInstagram: ${person.links.instagram}\nFacebook: ${person.links.facebook}`,
  },
  {
    id: 'cv',
    keys: ['cv', 'resume', 'curriculum', 'pdf', 'download'],
    answer: () => 'You can download the CV as a PDF from the Resume button on the site, or open Gurwinder_CV.pdf. You can also email Gurwinder for a copy.',
  },
  {
    id: 'projects',
    keys: ['project', 'projects', 'portfolio', 'work samples', 'built', 'featured', 'show me', 'github repos', 'repositories', 'repo'],
    answer: () =>
      `Featured projects:\n${projects.map((p) => `• ${p.title}: ${p.plain}`).join('\n')}\n\nAsk about any project by name for details. There are ${repos.length} repositories in total.`,
  },
  {
    id: 'games',
    keys: ['game', 'games', 'snake', '3d', 'play'],
    answer: () =>
      `Web games include: ${repos.filter((r) => r.group === 'games').map((r) => r.title).join(', ')}. The Snake game is on the site, under "Collect my skills".`,
  },
  {
    id: 'erp', keys: ['erp'], weight: 3, answer: () => projectAnswer('erp'),
  },
  {
    id: 'pm', keys: ['project management', 'kanban', 'task board', 'pm app'], weight: 3, answer: () => projectAnswer('pm'),
  },
  {
    id: 'saas', keys: ['saas', 'enterprise dashboard', 'commerce dashboard'], weight: 3, answer: () => projectAnswer('saas'),
  },
  {
    id: 'bi-portal', keys: ['analytics portal', 'bi portal', 'bi analytics'], weight: 3, answer: () => projectAnswer('bi'),
  },
  {
    id: 'larder', keys: ['larder', 'store', 'e-commerce', 'ecommerce', 'shop', 'grocery'], weight: 3, answer: () => projectAnswer('larder'),
  },
  {
    id: 'blog', keys: ['blogging', 'blog dashboard', 'writer'], weight: 3, answer: () => projectAnswer('blog'),
  },
];

function projectAnswer(id) {
  const p = projects.find((x) => x.id === id);
  if (!p) return 'That project is not in the portfolio.';
  return `${p.title} (${p.kind})\n${p.summary}\n\nFeatures:\n${plainList(p.features)}\n\nBuilt with: ${p.stack.join(', ')}\nLive demo: ${p.live}`;
}

export const topics = [
  'Who is Gurwinder?', 'Skills', 'Experience', 'Projects', 'Education', 'BI and MIS work', 'Contact', 'Download CV',
];

const REFUSAL =
  'I can only answer questions about Gurwinder Parhar: his CV, skills, experience, education, projects and contact details. Try one of the topics below.';

// Scores each intent by the number of keywords found. Longer keywords count more.
export function answerQuestion(question) {
  const q = ` ${question.toLowerCase().replace(/[^a-z0-9+&#.\s-]/g, ' ').replace(/\s+/g, ' ')} `;
  let best = null;
  let bestScore = 0;
  for (const intent of intents) {
    let score = 0;
    for (const k of intent.keys) {
      if (q.includes(` ${k} `) || q.includes(` ${k}s `) || (k.length > 4 && q.includes(k))) {
        score += k.split(' ').length + (k.length > 6 ? 1 : 0);
      }
    }
    score *= intent.weight || 1;
    if (score > bestScore) { bestScore = score; best = intent; }
  }
  if (!best) return { text: REFUSAL, refused: true };
  return { text: best.answer(), refused: false };
}
