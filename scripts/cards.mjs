// Generates self-hosted profile SVG cards from live GitHub data.
// No third-party image services: everything is rendered here and committed
// to the `output` branch, so the profile README can never show a broken image.

import { mkdirSync, writeFileSync } from "node:fs";

const USER = process.env.GH_USER;
const TOKEN = process.env.GH_TOKEN;
if (!USER || !TOKEN) throw new Error("GH_USER and GH_TOKEN are required");

const C = {
  bg: "#0D1117",
  border: "#30363D",
  title: "#58A6FF",
  text: "#C9D1D9",
  dim: "#8B949E",
  green: "#3FB950",
  yellow: "#D29922",
  purple: "#BC8CFF",
  orange: "#F0883E",
};
const FONT = "'Segoe UI',Ubuntu,'Helvetica Neue',Sans-Serif";
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const nfmt = (n) =>
  n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k" : String(n);

async function gql(query, variables) {
  const r = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "profile-cards",
    },
    body: JSON.stringify({ query, variables }),
  });
  const j = await r.json();
  if (j.errors) throw new Error(JSON.stringify(j.errors));
  return j.data;
}

const QUERY = `query($login:String!){
  user(login:$login){
    name login createdAt
    followers{totalCount}
    following{totalCount}
    repositories(first:100, ownerAffiliations:OWNER, isFork:false, orderBy:{field:STARGAZERS,direction:DESC}){
      totalCount
      nodes{ name stargazerCount forkCount
        languages(first:12, orderBy:{field:SIZE,direction:DESC}){ edges{ size node{ name color } } } }
    }
    pullRequests(states:MERGED){ totalCount }
    openIssues: issues(states:OPEN){ totalCount }
    closedIssues: issues(states:CLOSED){ totalCount }
    contributionsCollection{
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      totalRepositoryContributions
      contributionCalendar{
        totalContributions
        weeks{ contributionDays{ contributionCount date weekday } }
      }
    }
  }
}`;

const data = await gql(QUERY, { login: USER });
const u = data.user;
const cc = u.contributionsCollection;
const repos = u.repositories.nodes;
const stars = repos.reduce((a, r) => a + r.stargazerCount, 0);
const forks = repos.reduce((a, r) => a + r.forkCount, 0);

// ---------- card 1: stats overview ----------
function statsCard() {
  const rows = [
    ["Total Stars Earned", nfmt(stars), C.yellow, "star"],
    ["Total Commits (past year)", nfmt(cc.totalCommitContributions), C.green, "commit"],
    ["Merged Pull Requests", nfmt(u.pullRequests.totalCount), C.purple, "pr"],
    ["Total Issues", nfmt(u.openIssues.totalCount + u.closedIssues.totalCount), C.orange, "issue"],
    ["Public Repositories", nfmt(u.repositories.totalCount), C.title, "repo"],
    ["Followers", nfmt(u.followers.totalCount), C.title, "people"],
    ["Contributions (past year)", nfmt(cc.contributionCalendar.totalContributions), C.green, "graph"],
  ];
  const W = 480;
  const H = 62 + rows.length * 26 + 18;
  const body = rows
    .map(
      (r, i) => `
    <g transform="translate(28,${72 + i * 26})">
      <circle cx="0" cy="-4" r="4" fill="${r[2]}"/>
      <text x="16" y="0" fill="${C.text}" font-size="13" font-family="${FONT}">${esc(r[0])}</text>
      <text x="${W - 56}" y="0" fill="${r[2]}" font-size="14" font-weight="700"
            font-family="${FONT}" text-anchor="end">${esc(r[1])}</text>
    </g>`
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="GitHub statistics">
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="10" fill="${C.bg}" stroke="${C.border}"/>
  <text x="28" y="36" fill="${C.title}" font-size="17" font-weight="700" font-family="${FONT}">${esc(u.name || u.login)}'s GitHub Stats</text>
  <line x1="28" y1="50" x2="${W - 28}" y2="50" stroke="${C.border}"/>
  ${body}
</svg>`;
}

// ---------- card 2: top languages ----------
function langsCard() {
  const totals = new Map();
  for (const r of repos)
    for (const e of r.languages.edges) {
      const cur = totals.get(e.node.name) || { size: 0, color: e.node.color || C.dim };
      cur.size += e.size;
      totals.set(e.node.name, cur);
    }
  const all = [...totals.entries()].sort((a, b) => b[1].size - a[1].size).slice(0, 6);
  const sum = all.reduce((a, x) => a + x[1].size, 0) || 1;
  const W = 380;
  const H = 62 + 20 + all.length * 24 + 14;

  let x = 28;
  const barW = W - 56;
  const bar = all
    .map((l) => {
      const w = Math.max(2, (l[1].size / sum) * barW);
      const seg = `<rect x="${x.toFixed(1)}" y="66" width="${w.toFixed(1)}" height="9" fill="${l[1].color}"/>`;
      x += w;
      return seg;
    })
    .join("");

  const legend = all
    .map((l, i) => {
      const pct = ((l[1].size / sum) * 100).toFixed(1);
      return `<g transform="translate(28,${100 + i * 24})">
      <rect x="0" y="-9" width="11" height="11" rx="2.5" fill="${l[1].color}"/>
      <text x="20" y="0" fill="${C.text}" font-size="13" font-family="${FONT}">${esc(l[0])}</text>
      <text x="${barW}" y="0" fill="${C.dim}" font-size="13" font-family="${FONT}" text-anchor="end">${pct}%</text>
    </g>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Most used languages">
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="10" fill="${C.bg}" stroke="${C.border}"/>
  <text x="28" y="36" fill="${C.title}" font-size="17" font-weight="700" font-family="${FONT}">Most Used Languages</text>
  <line x1="28" y1="50" x2="${W - 28}" y2="50" stroke="${C.border}"/>
  <clipPath id="r"><rect x="28" y="66" width="${barW}" height="9" rx="4.5"/></clipPath>
  <g clip-path="url(#r)"><rect x="28" y="66" width="${barW}" height="9" fill="${C.border}"/>${bar}</g>
  ${legend}
</svg>`;
}

// ---------- card 3: contribution heatmap ----------
function heatCard() {
  const weeks = cc.contributionCalendar.weeks;
  const cell = 11,
    gap = 3,
    step = cell + gap;
  const W = 56 + weeks.length * step;
  const H = 96 + 7 * step;
  const scale = (n) =>
    n === 0 ? "#161B22" : n < 3 ? "#0E4429" : n < 6 ? "#006D32" : n < 10 ? "#26A641" : "#39D353";

  const cells = weeks
    .map((w, wi) =>
      w.contributionDays
        .map(
          (d) =>
            `<rect x="${28 + wi * step}" y="${76 + d.weekday * step}" width="${cell}" height="${cell}" rx="2.5" fill="${scale(
              d.contributionCount
            )}"><title>${d.date}: ${d.contributionCount}</title></rect>`
        )
        .join("")
    )
    .join("");

  const legend = [0, 2, 5, 9, 12]
    .map(
      (n, i) =>
        `<rect x="${W - 130 + i * step}" y="${H - 26}" width="${cell}" height="${cell}" rx="2.5" fill="${scale(n)}"/>`
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Contribution activity">
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="10" fill="${C.bg}" stroke="${C.border}"/>
  <text x="28" y="36" fill="${C.title}" font-size="17" font-weight="700" font-family="${FONT}">Contribution Activity</text>
  <text x="28" y="58" fill="${C.dim}" font-size="12.5" font-family="${FONT}">${nfmt(
    cc.contributionCalendar.totalContributions
  )} contributions in the last year</text>
  ${cells}
  <text x="${W - 152}" y="${H - 16}" fill="${C.dim}" font-size="11" font-family="${FONT}" text-anchor="end">Less</text>
  ${legend}
  <text x="${W - 28}" y="${H - 16}" fill="${C.dim}" font-size="11" font-family="${FONT}" text-anchor="end">More</text>
</svg>`;
}

// ---------- card 4: highlights ("trophy" replacement) ----------
function highlightsCard() {
  const items = [
    ["Repositories", u.repositories.totalCount, C.title],
    ["Stars", stars, C.yellow],
    ["Forks", forks, C.orange],
    ["Merged PRs", u.pullRequests.totalCount, C.purple],
    ["Commits / yr", cc.totalCommitContributions, C.green],
    ["Followers", u.followers.totalCount, C.title],
  ];
  const cw = 148,
    ch = 84,
    gap = 12,
    cols = items.length;
  const W = 28 * 2 + cols * cw + (cols - 1) * gap;
  const H = 62 + ch + 18;
  const tiles = items
    .map(
      (it, i) => `
    <g transform="translate(${28 + i * (cw + gap)},62)">
      <rect x="0" y="0" width="${cw}" height="${ch}" rx="9" fill="#161B22" stroke="${C.border}"/>
      <text x="${cw / 2}" y="38" fill="${it[2]}" font-size="26" font-weight="700"
            font-family="${FONT}" text-anchor="middle">${esc(nfmt(it[1]))}</text>
      <text x="${cw / 2}" y="62" fill="${C.dim}" font-size="12" font-family="${FONT}"
            text-anchor="middle">${esc(it[0])}</text>
    </g>`
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Profile highlights">
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="10" fill="${C.bg}" stroke="${C.border}"/>
  <text x="28" y="36" fill="${C.title}" font-size="17" font-weight="700" font-family="${FONT}">Highlights</text>
  ${tiles}
</svg>`;
}

mkdirSync("dist", { recursive: true });
writeFileSync("dist/stats.svg", statsCard());
writeFileSync("dist/langs.svg", langsCard());
writeFileSync("dist/contrib.svg", heatCard());
writeFileSync("dist/highlights.svg", highlightsCard());
console.log(
  `ok: stars=${stars} repos=${u.repositories.totalCount} mergedPRs=${u.pullRequests.totalCount} contribs=${cc.contributionCalendar.totalContributions}`
);
