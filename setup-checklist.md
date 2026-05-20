# Setup Checklist

## Reading PRD
- [x] Read Project Requirement Document thoroughly.
- [x] Understand the objective and scope.
- [x] Review UI/UX requirements and color scheme.

## Setting Up Environment
- [x] Create project root directory `leapx-member-dashboard`.
- [x] Create `css` folder.
- [x] Create `js` folder.
- [x] Create `assets/icons` folder (optional if using CDN).

## Creating Project Files
- [x] Create documentation files (`README.md`, etc.).
- [ ] Create `index.html`.
- [ ] Create `css/styles.css`.
- [ ] Create JS files inside `js/`.

## Creating Tabs
- [ ] Implement UI for tab buttons in `index.html`.
- [ ] Implement section containers for each tab.
- [ ] Implement JS logic in `js/tabs.js` to handle visibility and active states.

## Creating Cards
- [ ] Design membership cards in `index.html`.
- [ ] Apply CSS styles according to the dark theme guidelines.
- [ ] Render data dynamically using `js/app.js` and `js/data.js`.

## Integrating Chart.js
- [ ] Include Chart.js CDN in `index.html`.
- [ ] Add `<canvas>` elements for `activityChart` and `usageChart`.
- [ ] Initialize charts in `js/charts.js`.
- [ ] Implement dataset toggling buttons (Weekly, Monthly, Yearly).
- [ ] Update charts using `.update()` method without page reload.

## Adding Real-Time Simulation
- [ ] Create mock data in `js/data.js`.
- [ ] Set up `setInterval()` in `js/app.js` for updating rewards points and total sessions.
- [ ] Animate chart data updates.

## Adding Responsive Design
- [ ] Use CSS Grid and Flexbox in `css/styles.css`.
- [ ] Add media queries for Tablet and Mobile breakpoints.
- [ ] Test layout stacking on smaller screens.

## Using GitHub Flow
- [ ] Initialize git repository.
- [ ] Follow commit message rules.
- [ ] (Future) Push to remote repository and create Pull Requests.
