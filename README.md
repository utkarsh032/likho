```
/likho.in
├── /client               👉 React Frontend
│   ├── /public
│   ├── /src
│   │   ├── /assets
│   │   ├── /components
│   │   ├── /features
│   │   ├── /layouts
│   │   ├── /pages
│   │   ├── /routes
│   │   ├── /services
│   │   ├── /store
│   │   ├── /utils
│   │   ├── /hooks
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── tailwind.config.js
│
├── /server               👉 Express Backend
│   ├── /config
│   ├── /controllers
│   ├── /middleware
│   ├── /models
│   ├── /routes
│   ├── /utils
│   ├── /services         👉 Optional for external APIs (text-to-speech, calendar etc.)
│   ├── /uploads          👉 Uploaded images (if not using cloud storage)
│   └── server.js
│
├── /docs                 👉 PRD, Architecture diagrams, planning notes
├── /scripts              👉 Utility scripts (seeders, migrations etc.)
├── .env
├── .gitignore
├── package.json
└── README.md
```