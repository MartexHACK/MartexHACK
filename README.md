<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=26&pause=1200&color=58A6FF&center=true&vCenter=true&width=650&height=45&lines=Hi%2C+I'm+Martex+%F0%9F%91%8B;AI+%26+Machine+Learning+engineer+in+progress;Applying+ML+to+finance%2C+trading+and+quant;I+ship+small+tools+that+actually+get+used" alt="Intro" />

<p>
<img src="https://img.shields.io/badge/Focus-AI%20%2F%20ML%20Engineering-58A6FF?style=for-the-badge&labelColor=0D1117" alt="Focus" />
<img src="https://img.shields.io/badge/Domain-Quant%20%26%20Trading-3FB950?style=for-the-badge&labelColor=0D1117" alt="Domain" />
<img src="https://img.shields.io/badge/Style-Ship%20an%20honest%20v1-D29922?style=for-the-badge&labelColor=0D1117" alt="Style" />
</p>

<a href="https://github.com/martex-dev?tab=followers"><img src="https://img.shields.io/github/followers/martex-dev?style=flat-square&logo=github&logoColor=white&label=Followers&labelColor=0D1117&color=58A6FF" alt="Followers" /></a>
<a href="https://github.com/martex-dev?tab=repositories"><img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.github.com%2Fusers%2Fmartex-dev&query=%24.public_repos&style=flat-square&logo=github&logoColor=white&label=Repos&labelColor=0D1117&color=3FB950" alt="Repos" /></a>
<img src="https://komarev.com/ghpvc/?username=martex-dev&style=flat-square&label=Profile+views&labelColor=0D1117&color=D29922" alt="Profile views" />

</div>

---

## 👨‍💻 About

I'm a self-taught, project-driven builder working toward becoming an **AI & Machine Learning engineer** — learning by shipping real, working tools rather than following a fixed curriculum. Currently a student, building outside of that on my own track.

I like applying ML and coding skills to **finance, trading and quant** concepts — creating tools that genuinely help investors and traders.

I like taking an idea from *"does anyone actually need this"* through to a live, tested product — not just a prototype.

<div align="center">
<img src="https://raw.githubusercontent.com/martex-dev/martex-dev/output/highlights.svg" alt="Highlights" />
</div>

---

## 🚀 What I'm building

I build tools that solve one real problem well and are honest about their own limits — usually with an AI-assisted workflow (Claude Code) and a bias toward **getting things correct before getting them polished**.

Work is grouped below by the problem it belongs to. A category appears here once something is shipped in it.

<br/>

### ◆ Flagship

<sub>Long-running systems built to production standards rather than demo standards — the ones worth reading the source of.</sub>

**[martex-quant](https://github.com/martex-dev/martex-quant)** — quantitative research platform for crypto &nbsp;<img src="https://img.shields.io/github/stars/martex-dev/martex-quant?style=flat-square&labelColor=0D1117&color=D29922" alt="stars" align="center" />

125 pre-registered trials across 120 hypotheses, walk-forward backtesting with realistic fees, deflated-Sharpe validation, Monte Carlo against prop-firm rule sets, paper trading, and an operations dashboard. It says plainly on the tin that it is not a profitable trading bot — **the permanent ledger of every hypothesis that failed is the product**, and the tooling exists to produce more of it.

<sub>`Python` · `Polars` · `ccxt` · `pydantic` — 184 commits · MIT · CI green</sub>

<br/>

### 📈 Quantitative Finance & Trading

<sub>Market structure, options pricing, and the calendar of things that actually move prices.</sub>

| Project | What it does | Stack |
|---|---|---|
| **[implied-move](https://github.com/martex-dev/implied-move)** · [live ↗](https://implied-move.vercel.app) | Options-implied expected move before earnings. Separates the mean absolute move from a true 1σ, which most calculators quietly conflate — a ~20% understatement of the real band | Next.js · TypeScript |
| **[market-calendar](https://github.com/martex-dev/market-calendar)** · [live ↗](https://market-calendar-three.vercel.app) | Day-by-day calendar of everything that could move US stocks — FRED macro releases and S&P 500 / Nasdaq-100 earnings, merged into one list ranked by impact | Next.js · TypeScript · Turso |

<br/>

### 🧠 Machine Learning & Data Science

<sub>Making models fail honestly in testing instead of expensively in production. These five compose: find leaks statically, catch what static analysis can't at runtime, split correctly, see the split, then trust what comes out.</sub>

| Project | What it does | Stack |
|---|---|---|
| **[timeleak](https://github.com/martex-dev/timeleak)** — `pip install timeleak` | Static linter for data leakage in time-series ML code: scalers fitted before the split, centred windows, backward fill, shuffled splits. Seven rules, zero dependencies, runs as a pre-commit hook | Python · `ast` |
| **[leakguard](https://github.com/martex-dev/leakguard)** | The runtime half — raises at `fit()` when a transformer was fitted on rows outside the current fold, a leak class no static analysis can see. Its demo scores **0.731 on 2000 columns of pure noise** where the honest answer is 0.500 | Python · scikit-learn · pandas |
| **[purged-cv](https://github.com/martex-dev/purged-cv)** | Sklearn-compatible purged k-fold with an embargo, for labels whose outcome windows overlap. Shows that *not shuffling is not enough*: contiguous folds still score 0.781 on noise, purging brings it to 0.503 | Python · scikit-learn · NumPy |
| **[cv-visualizer](https://github.com/martex-dev/cv-visualizer)** | Renders train / test / purge / embargo boundaries as a diagram for any sklearn splitter — so leakage is something you can see rather than something a test asserts | Python · Matplotlib |
| **[calibrate](https://github.com/martex-dev/calibrate)** | Reliability diagrams, ECE / MCE / Brier, Platt scaling and isotonic regression. Makes you *state* what a risk band promises rather than inferring one, because an uncalibrated "high" is worse than no score | Python · scikit-learn · Matplotlib |

<br/>

### 🛡️ Consumer & Small-Business Tools

<sub>Putting an expert-level answer in the hands of someone who shouldn't have to be an expert.</sub>

| Project | What it does | Stack |
|---|---|---|
| **[late-payment-chaser](https://github.com/martex-dev/late-payment-chaser)** · [live ↗](https://late-payment-chaser.vercel.app) | Statutory late-payment interest UK and EU freelancers are legally owed on overdue invoices. Every rate cited to the central bank's own table, all money in integer minor units, and no model anywhere near the arithmetic | Next.js · TypeScript |
| **ScamLens** <sub>· in development</sub> | Scans a message and rates how likely it is to be a scam — reporting the specific signals behind the score rather than handing back a bare verdict | — |

<br/>

<sub>Also: <a href="https://github.com/martex-dev/dev-journal">dev-journal</a> — running notes on ML, quant research and engineering practice.</sub>

---

## 🧭 How I work

| Principle | In practice |
|---|---|
| 🚢 **Ship a small, honest v1** | Scope is chosen by what's expensive to change later — data model, units, rounding |
| 🧪 **Test what can't be wrong** | Money, dates and legal figures get tested harder than layout and copy |
| 🔍 **Disclose over hide** | An assumption stated in the open beats one buried in the code |
| 📚 **Learn the domain** | Well enough to know where a tool could quietly be wrong |

---

## 🛠️ Tech

<div align="center">

<sub>**LANGUAGES**</sub>

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000)
![SQL](https://img.shields.io/badge/SQL-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

<sub>**MACHINE LEARNING & DATA**</sub>

![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)
![pandas](https://img.shields.io/badge/pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)
![Polars](https://img.shields.io/badge/Polars-CD792C?style=for-the-badge&logo=polars&logoColor=white)
![Matplotlib](https://img.shields.io/badge/Matplotlib-11557C?style=for-the-badge&logoColor=white)
![Apache Arrow](https://img.shields.io/badge/Apache%20Arrow-1A6AFF?style=for-the-badge&logo=apachearrow&logoColor=white)
![Pydantic](https://img.shields.io/badge/Pydantic-E92063?style=for-the-badge&logo=pydantic&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![SciPy](https://img.shields.io/badge/SciPy-8CAAE6?style=for-the-badge&logo=scipy&logoColor=white)

<sub>**WEB**</sub>

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Turso](https://img.shields.io/badge/Turso%20%2F%20libSQL-4FF8D2?style=for-the-badge&logo=turso&logoColor=000000)

<sub>**TESTING, CI & TOOLING**</sub>

![pytest](https://img.shields.io/badge/pytest-0A9EDC?style=for-the-badge&logo=pytest&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![pre-commit](https://img.shields.io/badge/pre--commit-FAB040?style=for-the-badge&logo=precommit&logoColor=000000)

<sub>**SHIP**</sub>

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![PyPI](https://img.shields.io/badge/PyPI-3775A9?style=for-the-badge&logo=pypi&logoColor=white)
![Claude Code](https://img.shields.io/badge/Claude%20Code-D97757?style=for-the-badge&logo=anthropic&logoColor=white)

</div>

---

## 📊 GitHub Stats

<div align="center">

<img src="https://raw.githubusercontent.com/martex-dev/martex-dev/output/stats.svg" alt="GitHub stats" />
<img src="https://raw.githubusercontent.com/martex-dev/martex-dev/output/langs.svg" alt="Most used languages" />

<br/><br/>

<img src="https://streak-stats.demolab.com?user=martex-dev&hide_border=true&theme=github-dark-blue&background=0D1117&ring=58A6FF&fire=D29922&currStreakLabel=58A6FF" alt="Streak" />

<br/><br/>

<img src="https://raw.githubusercontent.com/martex-dev/martex-dev/output/contrib.svg" alt="Contribution activity" />

<br/><br/>

<img src="https://raw.githubusercontent.com/martex-dev/martex-dev/output/github-snake-dark.svg" alt="Contribution snake" />

<sub>Stat cards above are generated from live GitHub data by a <a href="https://github.com/martex-dev/martex-dev/blob/main/.github/workflows/snake.yml">scheduled workflow</a> in this repo — no third-party image services, so nothing here can break when someone else's server goes down.</sub>

</div>

---

## 🎓 Currently learning

AI engineering fundamentals · advanced machine learning (neural network architectures, fine-tuning, RAG) · applied trading and quant concepts · and how to take a tool from *"it works on my machine"* to *"someone I've never met trusts it with their invoice."*

---

<div align="center">

📫 **Find my latest work pinned above, or browse my repos** — most are small, scoped, and built to actually be used.

</div>
