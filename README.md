# GitHub Talent Scout

A modern React application designed to help recruiters discover and manage potential candidates from GitHub. This tool allows users to browse GitHub profiles, save promising candidates, and organize their recruitment pipeline efficiently


[Video Demo](https://www.youtube.com/watch?v=udfcvH4S2bI)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Candidate Search](#candidate-search)
  - [Saved Candidates](#saved-candidates)
- [Building for Production](#building-for-production)
- [Environment Variables](#environment-variables)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

## Features

- Browse GitHub profiles with detailed user information
- Search for specific GitHub users
- Save potential candidates for later review
- Manage and organize saved candidates
- Responsive dark-themed UI
- Real-time filtering and sorting for saved candidates

## Technologies Used

- React 18
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- GitHub REST API

## Prerequisites

Before running this project, ensure you have:

- **Node.js** (version 18 or higher)
- A **GitHub Personal Access Token** with `user` scope permissions

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd github-talent-scout
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file in the root directory:

   ```bash
   VITE_GITHUB_TOKEN=your_github_token_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

### Candidate Search

- View GitHub profiles one at a time
- Click `+` to save a candidate
- Click `-` to skip to the next profile
- Use the search bar to find specific GitHub users

### Saved Candidates

- View all saved candidates in a structured list
- Apply filters and sorting options
- Remove candidates from your saved list when necessary

## Building for Production

To generate an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Environment Variables

Required environment variables:

- `VITE_GITHUB_TOKEN`: Your GitHub Personal Access Token

## License

This project is licensed under the **MIT License**. See the `LICENSE.md` file for details.

## Acknowledgments

- GitHub API for data access
- React and Vite communities for excellent documentation
- Tailwind CSS for streamlined styling

## Contact

GitHub: [Hieu Tran](https://github.com/hieu12-12)

