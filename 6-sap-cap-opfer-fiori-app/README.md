\# SAP CAP Lunch Order App



A sample SAP CAP application for managing lunch orders at DSAG TechXChange 2026.



\## Prerequisites



\- Node.js 20+

\- VS Code with GitHub Copilot extension

\- SAP CDS DK installed globally

```bash

npm install -g @sap/cds-dk

```



\## Getting Started



Clone the repository and install dependencies:

```bash

git clone https://github.com/MartinPankraz/DSAGTechXChange26.git

cd 6-sap-cap-opfer-fiori-app

npm install

npm run setup

```



Start the application:

```bash

cds watch

```



Open your browser at `http://localhost:4004`



\## Development



This project uses GitHub Copilot to accelerate SAP CAP development.

Open the project in VS Code and use Copilot Agent Mode to extend the application.



\### Suggested prompts to get started:



\- \*"Create a new SAP CAP function for handling lunch orders"\*

\- \*"Add a menu recommendation service to the CAP backend"\*

\- \*"Extend the LunchOrders entity with a delivery address field"\*



\## Project Structure

```

├── .tools/          # Development tooling and helpers

├── .vscode/         # VS Code workspace configuration

├── db/              # Database schema and test data

├── srv/             # CAP service definitions

└── app/             # Fiori Elements UI

```



\## About



Built with SAP Cloud Application Programming Model (CAP) and SAP Fiori Elements.

Part of the DSAG TechXChange 2026 workshop series.

