# LeapX Member Dashboard

## Project Overview
LeapX Member Dashboard is a frontend-only web application designed for a modern gym/club. It provides an intuitive, responsive interface for members to view their real-time membership insights, activity trends, and settings. 

The dashboard operates entirely on the client side using mock data and simulated real-time updates without page reloads, ensuring a fast and seamless user experience.

## Tech Stack
- **HTML5**: Semantic structure.
- **CSS3**: Vanilla CSS with Grid, Flexbox, custom variables, and a sleek dark theme.
- **JavaScript**: Vanilla JS for logic, state management, and real-time simulation.
- **Chart.js**: Integrated via CDN for interactive line and doughnut charts.
- **Font Awesome**: Integrated via CDN for UI icons.

## Folder Structure
```
CLUB-MEMBER-DASHBOARD-BLR-SOT25/
│
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── charts.js
│   ├── tabs.js
│   └── data.js
├── assets/
│   └── icons/
├── README.md
├── setup-checklist.md
├── coding-guidelines.md
└── project-understanding-notes.md
```

## How to Run Project
Since this is a frontend-only project with no build step required:
1. Clone the repository or download the project files.
2. Open the `index.html` file directly in any modern web browser (Chrome, Firefox, Safari, Edge).
3. The dashboard will load the Overview tab by default and start simulating real-time updates.

## Features
- **Tabbed Navigation**: Smooth transition between Overview, Analytics, and Settings without page reload.
- **Live Membership Cards**: Displaying dynamic data like Rewards Points, Total Sessions, and Membership Status.
- **Interactive Charts**: Activity Trends and Membership Usage visualizations with toggleable Weekly/Monthly/Yearly datasets.
- **Real-Time Data Simulation**: Elements on the screen update dynamically using simulated intervals to mimic a live connection.
- **Responsive Design**: Carefully crafted layout that adapts to Desktop, Tablet, and Mobile devices perfectly.

## GitHub Flow
Follow the standard GitHub flow for contributions:
1. Create a feature branch (`feature/your-feature-name`).
2. Commit changes following the conventions outlined in `coding-guidelines.md`.
3. Push to your branch and create a Pull Request.

## Future Scope
- Integration with a real backend API for actual member data.
- User authentication and login portal.
- Implementation of an actual payment/renewal gateway.
- Push notifications via WebSockets.

---
*Note: This is a frontend-only member dashboard project using HTML, CSS, JavaScript, Chart.js, and mock data.*
