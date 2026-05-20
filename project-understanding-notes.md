# Project Understanding Notes: LeapX Member Dashboard

## Project Name
LeapX Member Dashboard

## Objective
To build a responsive, interactive, frontend-only member dashboard for a gym/club called LeapX. It must provide users with real-time membership insights and charts without the need for page reloads.

## Project Type
Frontend-only Web Application

## Main Users
Club/Gym Members (LeapX Members)

## Main Features
- **Tabbed Navigation**: Switch between Overview, Analytics, and Settings.
- **Membership Status Cards**: View real-time data such as Active Plan, Membership Expiry, Total Sessions, Rewards Points, and Status.
- **Interactive Charts**: Visualize Activity Trends (Line Chart) and Membership Usage (Doughnut Chart) with toggleable datasets (Weekly, Monthly, Yearly).
- **Real-Time Data Simulation**: Simulated live updates on cards and charts using JavaScript timers.

## Required Tabs
1. Overview
2. Analytics
3. Settings

## Functional Requirements
- Navigate between sections using tab buttons seamlessly.
- View simulated live membership information updating on the page.
- Switch between different chart data ranges instantly using toggle buttons.
- Display "Updating data..." or similar loading indicators during data switch.
- Handle empty state with a "No analytics data available" message when needed.
- Fully responsive on desktop, tablet, and mobile platforms.

## Tech Stack
- HTML5
- CSS3 (Vanilla, custom variables, CSS Grid, Flexbox)
- JavaScript (Vanilla)
- Chart.js (via CDN)
- Font Awesome/Lucide icons (via CDN)

## Non-Goals
- No backend server development.
- No database integration.
- No user authentication system.
- No payment processing integration.
- No server-side rendering (SSR).

## Deliverables
1. `index.html`
2. `css/styles.css`
3. `js/data.js`
4. `js/tabs.js`
5. `js/charts.js`
6. `js/app.js`
7. `README.md`
8. `setup-checklist.md`
9. `coding-guidelines.md`
10. `project-understanding-notes.md`
