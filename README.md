# E-Commerce React App

## Overview
This is an e-commerce frontend application built with React and Vite, utilizing the Fake Store API to simulate an online shopping experience. The application aims to provide a modern, responsive interface for browsing products, user authentication, and profile management, with a design inspired by a shared Figma specification. The project is under active development to meet all functional and technical requirements.

## Project Status
As of June 24, 2025, Key components such as the Navbar, Profile, HeroSection, Home layout, and ProductList are implemented, with authentication and API integration and product listing functionality, search/sort/filter features, a dynamic product detail page, user registration, and full login implementation.

## Features
- **Navbar**: Responsive navigation bar with user authentication indicators and logout functionality.
- **Profile Page**: Editable user profile with username, email, name, and address, integrated with the Fake Store API.
- **Hero Section**: Prominent banner on the homepage with a call-to-action.
- **Home Page**: Layout with a hero section, sidebar for filters, and product list (3 cards per row on desktop).
- **Product List**: Grid-based product cards with hover effects and wishlist icons (data placeholder; API integration pending).
- **Responsive Design**: Optimized for desktop, tablet, and mobile screens.
- **Authentication**: Basic token storage in `localStorage` for authenticated user flow.

## Technologies Used
- **Frontend**: React, Vite
- **Routing**: React Router DOM
- **API**: Fetch API (integrated with Fake Store API)
- **Styling**: Raw CSS
- **Type Safety**: TypeScript
- **State Management**: React Context API

## APIs
- **Get All Products**: `GET https://fakestoreapi.com/products` 
- **Add New User**: `POST https://fakestoreapi.com/users` 
- **Login API**: `POST https://fakestoreapi.com/auth/login`
- **Update User**: `PUT https://fakestoreapi.com/users/:id` 

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd e-commerce-react-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
3. Create a `.env` file in the root directory with the following:
   ```
   VITE_API_BASE_URL=https://fakestoreapi.com
   ```
   (Add to `.gitignore` to avoid committing sensitive data.)
4. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
5. Open `http://localhost:5173` in your browser.

## Usage
- Navigate the site using the Navbar.
- View the Profile page after logging in with test credentials (e.g., username: `mor_2314`, password: `83r5^_`).
- Explore the HeroSection and ProductList on the Home page.
- Note: Full product listing, search, sort, filter, and product detail pages are functional.

## File Structure
```
e-commerce-react-app/
├── public/
│   ├── assets/                 # Static images (e.g., placeholder avatars, banners)
├── src/
│   ├── assets/                 # Reusable asset files (e.g., SVGs, CSS)
│   ├── components/             # Reusable UI components
│   │   ├── common/             # General-purpose components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── ProductList.tsx
│   │   │   ├── ProductCard.tsx 
│   │   │   ├── HeroSection.tsx
│   │   ├── auth/               # Authentication-related components
│   │   │   ├── Login.tsx       # New: Login form component
│   │   │   ├── Register.tsx    # New: Registration form component
│   ├── context/                # Context providers
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   ├── pages/                  # Page components
│   │   ├── Home.tsx
│   │   ├── Profile.tsx
│   │   ├── Login.tsx          
│   │   ├── Register.tsx        
│   │   ├── ProductDetail.tsx   
│   │   ├── NotFound.tsx       
│   ├── types/                  # TypeScript type definitions
│   │   ├── index.ts
│   ├── utils/                  # Utility functions
│   │   ├── api.ts              # New: API utility with fetch/axios
│   ├── App.tsx
│   ├── main.tsx
│   ├── styles/                 # Global styles
│   │   ├── global.css          # New: Global CSS resets
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── env.d.ts                # Type definitions for Vite env variables
├── .env                        # Environment variables
├── .gitignore
├── package.json
├── README.md
├── LICENSE                  
```

## Development
### Running Tests
- No test suite is currently implemented. Add tests using a framework like Jest or Vitest as needed.

### Building for Production
```bash
npm run build
```
or
```bash
yarn build
```
The build artifacts will be stored in the `dist/` directory.

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Make your changes and commit: `git commit -m "description of changes"`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Submit a pull request.

## Issues
- Report bugs or suggest features by creating an issue on the repository.
- Current known issues:
  - Product listing API not integrated.
  - Search, sort, and filter functionality missing.
  - Product detail, registration, and full login pages pending.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details (to be added).

## Acknowledgments
- Inspired by the Fake Store API (https://fakestoreapi.com).
- Design guidance from the provided Figma specification.
- Built with assistance from xAI's Grok 3.

## Contact
For questions or support, please contact the project maintainer via the repository.

---
```
