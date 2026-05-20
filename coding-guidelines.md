# Coding Guidelines

## Variable Naming Rules
- Use `camelCase` for standard variables and standard functions (e.g., `activeTab`, `rewardsPoints`, `updateChartData`).
- Use `PascalCase` for component-like functions or class definitions, if any (e.g., `ChartRenderer`).
- Use `UPPER_CASE` for constants that do not change during runtime (e.g., `MAX_CHART_VALUES`, `UPDATE_INTERVAL`).
- Use plural names for arrays containing multiple items (e.g., `memberships`, `weeklyDataLabels`).
- Use meaningful and descriptive names instead of single letters (`x`, `y`) unless iterating in a tight, simple loop.

## Function Naming Rules
- Function names should start with a verb describing what they do (e.g., `switchTab()`, `renderMembershipCards()`, `simulateRealTimeUpdates()`).
- Keep function names concise but descriptive.

## File Naming Rules
- Use lowercase and hyphens (kebab-case) for HTML, CSS, and Markdown files (e.g., `index.html`, `styles.css`, `setup-checklist.md`).
- Use lowercase for JavaScript files reflecting their modules (e.g., `data.js`, `app.js`).

## Comment Rules
- Write meaningful comments only where needed.
- Focus comments on *why* something is done or explaining complex logic.
- Explain chart update logic and real-time simulation logic.
- Avoid redundant comments that merely restate the code (e.g., `let age = 20; // age is 20`).

## Commit Message Rules
- Start with a clear verb (e.g., Add, Fix, Update).
- Keep the message concise but descriptive.
- Example: `Add real-time simulation logic to app.js`.

## Branch Naming Rules
- Use lowercase and hyphens.
- Prefix with feature or fix (e.g., `feature/tab-navigation`, `fix/mobile-responsive-layout`).
