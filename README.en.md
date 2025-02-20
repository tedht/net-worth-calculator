# Net Worth Calculator

## Table of Contents

- [Description](#description)
- [System Requirements](#system-requirements)
- [Launching the application](#launching-the-application)
- [Authors](#authors)

## Description

"Net Worth Calculator" is a web application coded using React MUI. It allows users to
calculate their net worth (Difference between the total value of their assets and the 
total value of their liabilities). 

Uses are able to create an account or log into an existing, and add, edit or delete entries (assets or laibilities).

There is also a Stats page that allow the user to view statistics concerning their assets and liabilities (mean, median, proportions...) as well as a Search page allowing them to search for specific entries and sort them depending on their name, value, category and type (asset or liability). 

## System Requirements

To run this application, ensure your system meets the following requirements:
- Node.js (version 18+ recommended)
- npm (version 9+ recommended)
- JSON Server

Note that this project has only been tested on Windows. There is no garentee that it will 
work on other operating systems.

## Running the application

### Install the dependencies
Before running the application, install the required dependencies :
```bash
cd frontend
npm install

cd backend
npm install
npm install json-server
```

### Run the backend :
```bash
cd backend
json-server --watch db.json --port 5000
```

### Run the frontend :
```bash
cd frontend
npm run dev
```
## Authors

- **Author :** Ted Herambert
