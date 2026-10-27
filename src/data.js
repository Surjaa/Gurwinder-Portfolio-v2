// All portfolio content lives here. Edit text in this file; the components only render it.

export const person = {
  name: 'Gurwinder Parhar',
  short: 'GP',
  role: 'Full Stack Developer & BI Analyst',
  location: 'Punjab, India',
  email: 'gurwinderanusurja@gmail.com',
  phone: '+91 77105 90719',
  status: 'Open to new roles',
  resume: 'Gurwinder_CV.pdf',
  links: {
    linkedin: 'https://www.linkedin.com/in/gurwinder-parhar/',
    github: 'https://github.com/surjaa',
    instagram: 'https://www.instagram.com/_suraj_parhar_21/',
    facebook: 'https://www.facebook.com/profile.php?id=100028327630339',
  },
};

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'bi-mis', label: 'BI / MIS' },
  { id: 'projects', label: 'Projects' },
  { id: 'path', label: 'Path' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

export const heroStats = [
  { value: 7, suffix: '', label: 'Featured projects', hint: 'Apps and dashboards you can open today' },
  { value: 16, suffix: '', label: 'Live demos online', hint: 'Web tools and 3D games you can play' },
  { value: 3, suffix: '+', label: 'Years building for the web', hint: 'Web and writing experience' },
  { value: 1, suffix: '', label: 'Award', hint: 'Best HTML & CSS Framework Developer, 2022' },
];

export const skillTicker = [
  'React.js', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap 5', 'Power BI', 'SQL',
  'Excel & Power Query', 'Responsive design', 'Dashboards', 'Data visualization', 'Git & GitHub',
];

export const about = {
  intro:
    'I build responsive websites and web applications, plus the business systems behind them: financial, inventory and purchase tools, company websites and Power BI reporting dashboards.',
  paragraphs: [
    'I studied a Bachelor of Computer Applications at Lyallpur Khalsa College, where I won Best HTML & CSS Framework Developer at Tech Fest 2022.',
    'My portfolio includes project management software, enterprise dashboards, an analytics portal, an online store and interactive front-end experiments.',
    'I also cover MIS reporting and business operations: turning operational data into management reports, KPI dashboards and decision-ready information. As Head MDO (Managing Direct Officer), I focus on coordination, reporting discipline and data-driven execution.',
  ],
  // Plain-English summary for readers who are not from a tech background.
  plain:
    'In short: I make websites and apps that look good on phones, and I turn messy business numbers into clear charts that help people decide.',
  tabs: {
    'How I build': [
      'Start from the layout on a small screen, then scale up',
      'Write semantic HTML first, style second, script last',
      'Add motion only where it explains what changed',
      'Respect keyboard users and reduced-motion settings',
    ],
    'How I ship': [
      'Version everything with Git and GitHub',
      'Test on mobile, tablet and desktop before release',
      'Keep pages light: optimized images, no heavy libraries',
      'Document the code so the next person can pick it up',
    ],
  },
  facts: [
    ['Based in', 'Punjab, India'],
    ['Languages', 'English, Punjabi, Hindi'],
    ['Education', 'BCA, Lyallpur Khalsa College'],
    ['Experience', '3+ years, web and writing'],
    ['Award', 'Best HTML & CSS Framework Developer, 2022'],
    ['Status', 'Open to new roles'],
  ],
};

export const services = [
  {
    icon: 'code',
    title: 'Front-end development',
    plain: 'The part of a website you see and click.',
    points: [
      'Websites and web apps from design to launch',
      'Admin dashboards with charts, data tables and exports',
      'Reusable components and hooks in React.js',
      'Bootstrap 5 builds and WordPress front-end work',
    ],
    tools: ['React.js', 'Vite', 'Bootstrap 5', 'Node.js'],
  },
  {
    icon: 'chart',
    title: 'Business intelligence',
    plain: 'Turning sales, stock and money numbers into pictures anyone can read.',
    points: [
      'Power BI dashboards and executive reporting',
      'SQL queries, data preparation and analysis',
      'Data visualization and KPI tracking',
      'Excel and Power Query reporting workflows',
    ],
    tools: ['Power BI', 'SQL', 'Excel', 'Power Query'],
  },
  {
    icon: 'layers',
    title: 'MIS reporting & operations',
    plain: 'Regular reports that show a team how it is doing and what to fix next.',
    points: [
      'Daily, weekly and monthly MIS reporting',
      'Management dashboards and performance summaries',
      'Data validation, reconciliation and automation',
      'Operational visibility and process improvement',
    ],
    tools: ['MIS', 'KPIs', 'Reporting', 'Process'],
  },
];

export const skillGroups = {
  'Front end': [
    ['JavaScript', 3, 'Interactive pages and logic'],
    ['React.js', 3, 'Reusable components and hooks'],
    ['TypeScript', 2, 'Typed components and props'],
    ['Bootstrap 5', 3, 'Responsive grids and components'],
    ['HTML5 & CSS3', 3, 'Semantic pages, layout and motion'],
    ['WordPress', 2, 'Theme and layout customisation'],
  ],
  'Data & BI': [
    ['Power BI', 3, 'Dashboards and KPI visuals'],
    ['SQL', 3, 'Extracting and shaping data'],
    ['SVG charting', 3, 'Hand-built charts with no library'],
    ['Recharts', 2, 'Charts inside React apps'],
    ['Data tables & dashboard design', 3, 'Sortable, paginated, readable'],
    ['Excel & Power Query', 3, 'Clean, repeatable reports'],
  ],
  'Back end & tools': [
    ['Node.js', 2, 'Small servers and APIs'],
    ['REST API design', 2, 'Sending data between apps'],
    ['Git & GitHub', 3, 'Version control and team work'],
    ['Visual Studio Code', 3, 'Daily editor'],
    ['Figma', 2, 'Reading and checking designs'],
    ['Cross-browser testing', 3, 'Phone, tablet and desktop checks'],
  ],
  'SEO & analytics': [
    ['Technical documentation', 3, 'Guides and release notes'],
    ['SEO copywriting', 2, 'Search-friendly articles'],
    ['Keyword research', 2, 'Finding what people search for'],
    ['Google Analytics', 2, 'Reading traffic and behaviour'],
    ['Google Search Console', 2, 'Checking search health'],
  ],
};

export const bizPillars = [
  {
    title: 'BI analyst & developer',
    points: [
      'Power BI dashboard development and KPI visualization',
      'SQL-based data extraction, transformation and analysis',
      'Excel, Power Query and structured reporting workflows',
      'Dashboard UX that connects business questions with numbers',
    ],
  },
  {
    title: 'MIS executive & Head MDO',
    points: [
      'Daily, weekly and monthly MIS reporting',
      'Management information, KPI tracking and performance reports',
      'Data validation, reconciliation and exception tracking',
      'Cross-functional follow-up and action tracking',
    ],
  },
];

export const bizCounters = [
  { value: 3, suffix: '+', label: 'Years of reporting and web work' },
  { value: 7, suffix: '', label: 'Featured apps and dashboards' },
  { value: 3, suffix: '', label: 'Business systems built: FMS, IMS, PMS' },
];

export const processSteps = [
  { title: 'Plan the layout', plain: 'Sketch what goes where, starting from a phone screen.' },
  { title: 'Design the look', plain: 'Pick colours, fonts and spacing that suit the audience.' },
  { title: 'Build the parts', plain: 'Write each piece as a small, reusable component.' },
  { title: 'Add the motion', plain: 'Animate only what helps the visitor understand a change.' },
  { title: 'Test and ship', plain: 'Check on phone, tablet and desktop, then publish.' },
];

// Seven featured projects. "plain" is the one-line explanation for non-technical visitors.
export const projects = [
  {
    id: 'stockpulse',
    title: 'StockPulse Inventory & Reorder Dashboard',
    kind: 'Full stack inventory app',
    tone: 'teal',
    plain: 'Track stock across warehouses, get low-stock alerts and see what to reorder, all in one dashboard.',
    summary:
      'A full stack inventory management dashboard. It records stock in, stock out and adjustments for every warehouse, values the stock, and flags products that are low, out of stock or due for purchase.',
    features: [
      'Dashboard with stock health KPIs, daily stock in vs out charts, stock value by warehouse and category, and top movers',
      'Products with SKU, cost, price, reorder levels and suppliers, plus search, category filter and CSV export',
      'Stock movements for IN, OUT and ADJUSTMENT across Main Warehouse, Cold Store and Overflow Depot, with date and type filters',
      'Low-stock and reorder alerts, purchase suggestions, and login with admin and staff roles',
    ],
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Recharts', 'JWT'],
    live: 'https://stockpulse-bnym.onrender.com/',
    shots: [
      ['images/shots/stockpulse-dashboard.webp', 'Dashboard'],
      ['images/shots/stockpulse-products.webp', 'Products'],
      ['images/shots/stockpulse-movements.webp', 'Movements'],
    ],
  },
  {
    id: 'erp',
    title: 'ERP Business Management System',
    kind: 'ERP system',
    tone: 'teal',
    plain: 'One app that runs buying, stock, sales, accounts and staff, instead of many spreadsheets.',
    summary:
      'A browser-based ERP demo for a small trading company. Buying from suppliers, stock in warehouses, sales and invoices, accounting, manufacturing, staff attendance and leave all run in one place.',
    features: [
      'Eleven modules in one sidebar: sales, purchasing, inventory, accounting, manufacturing and reports',
      'Stock tracked across warehouses, with low-stock alerts; sales orders, invoices and supplier records',
      'Employee directory, attendance and leave approval workflows, with CSV export on every table',
      'Sign-up with a password strength meter, a one-click demo account, notifications and dark mode',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5'],
    live: 'https://surjaa.github.io/ERP---Business-Management-System.github.io/',
    shots: [
      ['images/shots/erp-overview.webp', 'Overview'],
      ['images/shots/erp-inventory-updated.webp', 'Inventory'],
      ['images/shots/erp-purchasing.webp', 'Purchasing'],
      ['images/shots/erp-sales.webp', 'Sales'],
    ],
  },
  {
    id: 'pm',
    title: 'Project Management Application',
    kind: 'Kanban board',
    tone: 'coral',
    plain: 'A to-do board where each task shows how urgent it is, by colour.',
    summary:
      'Think Jira, Trello or Monday.com, with one difference: every task knows how much attention it needs right now, and its card glows from cool teal to blazing red-orange.',
    features: [
      'Framework-free Kanban app with a heat engine that scores each task from 0 to 100 by priority, due date and idle time',
      'Time Machine slider that rewinds the board, plus a standup writer and a report of where work waits',
      'Drag and drop with WIP limits, subtasks, undo, calendar and timeline views, and a Ctrl+K command palette',
      'Team and reports pages, light and dark themes, and JSON backup and restore',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Canvas', 'Drag and Drop API'],
    live: 'https://surjaa.github.io/Project-Management-Application.github.io/',
    shots: [
      ['images/shots/project-management-board.webp', 'Board'],
      ['images/shots/project-management-timeline.webp', 'Timeline'],
      ['images/shots/project-management-reports.webp', 'Reports'],
    ],
  },
  {
    id: 'saas',
    title: 'Enterprise SaaS Dashboard',
    kind: 'Commerce dashboard',
    tone: 'violet',
    plain: 'A shop dashboard with a live "business pulse" that speeds up when orders arrive.',
    summary:
      'A B2B commerce dashboard that shows how the business feels, not just what it earned. One score sums up the health of the business, and orders appear live.',
    features: [
      'Business pulse score (5 to 99) built from revenue, conversion, churn and unpaid orders',
      'Hand-written SVG line, bar, donut, heatmap, funnel and tile-map charts; date ranges update every KPI',
      'Fifteen views with sortable, paginated tables and keyboard shortcuts, focus management and reduced-motion support',
      'Light, dark and system themes, with a Ctrl+K command palette for plain-English questions',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'SVG'],
    live: 'https://surjaa.github.io/Enterprise-SaaS-Dashboard.github.io/',
    shots: [
      ['images/shots/saas-dashboard-dashboard.webp', 'Dashboard'],
      ['images/shots/saas-dashboard-analytics.webp', 'Analytics'],
      ['images/shots/saas-dashboard-customers.webp', 'Customers'],
    ],
  },
  {
    id: 'bi',
    title: 'BI Analytics Portal',
    kind: 'Power BI style portal',
    tone: 'sun',
    plain: 'A Power BI style report room, built from scratch with its own charts.',
    summary:
      'A Power BI style analytics portal built in plain HTML, CSS and JavaScript, with its own SVG chart library, drill-downs and 219,200 rows of data.',
    features: [
      'Seven pages: executive, sales, marketing, operations, finance and customer analysis',
      'Drill-down and cross-filtering with year-over-year KPIs across 219,200 daily rows',
      'Hand-written SVG chart library: column, line, donut, funnel, heatmap, map and waterfall charts',
      'Group-by reports with search, CSV export and a print layout',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    live: 'https://surjaa.github.io/BI-Analytics-Portal.github.io/',
    shots: [
      ['images/shots/bi-executive.webp', 'Executive'],
      ['images/shots/bi-sales.webp', 'Sales'],
      ['images/shots/bi-finance.webp', 'Finance'],
      ['images/shots/bi-operations.webp', 'Operations'],
    ],
  },
  {
    id: 'larder',
    title: 'Larder Store',
    kind: 'E-commerce store',
    tone: 'coral',
    plain: 'A working online grocery shop: browse, add to cart, check out, track the order.',
    summary:
      'A complete online store for everyday staples, with browsing, filters, cart, checkout and order tracking. A small Node.js server saves customers and orders and re-checks prices.',
    features: [
      'Online store with mega menu, search, filters, product comparison and a four-step checkout',
      'Dependency-free Node.js server that saves orders and re-checks prices on the server side',
      'Key-protected admin page, with skip links and live regions for screen reader users',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Node.js'],
    live: 'https://surjaa.github.io/Larder-store.github.io/',
    shots: [
      ['images/shots/larder-home.webp', 'Home'],
      ['images/shots/larder-shop.webp', 'Shop'],
      ['images/shots/larder-cart.webp', 'Cart'],
      ['images/shots/larder-checkout.webp', 'Checkout'],
    ],
  },
  {
    id: 'blog',
    title: 'Blogging Dashboard',
    kind: 'Writing dashboard',
    tone: 'teal',
    plain: 'A writer\'s home: track posts, drafts, streaks and word counts in one place.',
    summary:
      'A blogging dashboard for writers. It shows how often you write, what you have published and what is still in draft, and where your readers are responding.',
    features: [
      'Overview with a writing streak heatmap, published and draft counts, and total words written',
      'Recently edited list with word counts, plus a topics breakdown of what you write about',
      'Community page for reading and reacting to other writers, with latest comments in one place',
      'Light and dark themes; drafts are saved in the browser',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    live: 'https://surjaa.github.io/Blogging-Dashboard.github.io/',
    shots: [
      ['images/shots/blog-overview.webp', 'Overview'],
      ['images/shots/blog-community.webp', 'Community'],
    ],
  },
];

// Every other repository, shown under "View all projects".
export const repos = [
  { title: 'ERP Business Management System', repo: 'ERP---Business-Management-System.github.io', group: 'web', live: true },
  { title: 'Portfolio Website (v1)', repo: 'Gurwinder-portfolio.github.io', group: 'web', live: true },
  { title: 'Project Management Application', repo: 'Project-Management-Application.github.io', group: 'web', live: true },
  { title: 'BI Analytics Portal', repo: 'BI-Analytics-Portal.github.io', group: 'web', live: true },
  { title: 'Larder Store', repo: 'Larder-store.github.io', group: 'web', live: true },
  { title: 'Blogging Dashboard', repo: 'Blogging-Dashboard.github.io', group: 'web', live: true },
  { title: 'Enterprise SaaS Dashboard', repo: 'Enterprise-SaaS-Dashboard.github.io', group: 'web', live: true },
  { title: 'Security Score App', repo: 'Security-Score-App.github.io', group: 'web', live: true },
  { title: 'Music App', repo: 'Music-app', group: 'web', live: true },
  { title: 'Coffee Website', repo: 'Coffee-website.github.io', group: 'web', live: true },
  { title: 'Rock Paper Scissor 3D', repo: 'Rock-Paper-Scissor.io', group: 'games', live: true },
  { title: 'Snake 3D', repo: 'Snake-3D.io', group: 'games', live: true },
  { title: 'Canon Armed', repo: 'Canon-armed.io', group: 'games', live: true },
  { title: 'Chroma Tilt', repo: 'ChromaTilt.io', group: 'games', live: true },
  { title: 'Relay Stack 2027', repo: 'Relay-stack.io', group: 'games', live: true },
  { title: 'Prism Path', repo: 'Prism-path.io', group: 'games', live: true },
  { title: 'GitHub Profile', repo: 'Surjaa', group: 'web', live: false },
];

export const certs = [
  'Samsung Innovation Campus: Solve for Tomorrow',
  'HTML Programming', 'CSS Programming', 'JavaScript Programming', 'C++ Programming', 'SEO for Beginners',
];

export const writing = [
  { big: '200+', title: 'Technical articles', text: 'SEO-focused articles on programming, cloud and software, researched and optimized for search.' },
  { big: 'Docs', title: 'User guides', text: 'User guides and technical documentation written with development and product teams.' },
  { big: 'Copy', title: 'Clear interface text', text: 'Buttons, errors and empty states that say exactly what happens, in plain words.' },
];

export const summary =
  'Full Stack Developer with 3+ years of experience building responsive, accessible web applications, interactive dashboards and business systems. Skilled in React.js, JavaScript and Node.js, with hand-built SVG data visualization and BI-style reporting.';

export const education = [
  {
    when: 'Aug 2020 – May 2023',
    title: 'Bachelor of Computer Applications (BCA)',
    org: 'Lyallpur Khalsa College, Guru Nanak Dev University (GNDU)',
    where: 'Jalandhar, Punjab',
    bullets: ['Modules: Networking, Operating Systems, DBMS, Software Engineering, Web Technologies'],
  },
  {
    when: '2018 – 2020',
    title: 'Higher Secondary, Commerce',
    org: 'Sutlej Public Senior Secondary School',
    where: 'Banga, Punjab',
    bullets: [],
  },
];

export const languages = [
  ['English', 'Proficient'],
  ['Punjabi', 'Native'],
  ['Hindi', 'Conversational'],
];
