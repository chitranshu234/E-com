ShopSphere: A Modern E-Commerce Frontend
ShopSphere is a feature-rich, single-page e-commerce frontend built with React and styled with Tailwind CSS. This project serves as a demonstration of modern frontend development practices, component-based architecture, and state management in a realistic e-commerce setting.

✨ Features
Modern UI/UX: Clean, responsive, and intuitive design suitable for any e-commerce platform.

Persistent Dark Mode: Seamlessly switch between light and dark themes with user preference saved to localStorage.

Component-Based Architecture: Fully broken down into reusable components for pages, cards, modals, and more.

Client-Side Routing: Uses react-router-dom for instant page navigation without reloads.

Advanced Product Filtering: Filter products by category, brand, price range, and minimum rating.

Product Sorting: Sort products by price, rating, or name.

Grid & List Views: Toggle between product grid and list layouts on the products page.

Shopping Cart: Fully functional cart with capabilities to add, remove, and update item quantities.

Wishlist & Comparison: Users can add products to a wishlist or a comparison list.

Quick View: View product details in a modal without leaving the current page.

🚀 Tech Stack
Framework: React 18+ (with Hooks)

Build Tool: Vite

Styling: Tailwind CSS

Routing: React Router DOM

Icons: Lucide React

State Management: React Context API

🛠️ Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
You need to have Node.js and npm (or yarn) installed on your system.

Node.js (which includes npm)

Installation & Setup
Clone the repository:

Bash

git clone https://github.com/your-username/shopsphere.git
Navigate to the project directory:

Bash

cd shopsphere
Install dependencies:

Bash

npm install
Run the development server:

Bash

npm run dev
The application will now be running on http://localhost:5173 (or the next available port).

📂 Project Structure
The project is contained within a single App.jsx file for simplicity, but it's structured logically to be easily broken into separate files.

/src
└── App.jsx  (Contains all components, pages, contexts, and mock data)
Logical Component Breakdown
Contexts: ThemeProvider, CartProvider, WishlistProvider, etc., for global state management.

Components: Reusable UI elements like Header, Footer, ProductCard, ThemeToggle, FiltersPanel, and QuickViewModal.

Pages: Top-level components for each route, such as HomePage, ProductsPage, ProductDetailPage, and CartPage.

API/Data: Mock data and asynchronous functions (fetchProducts, fetchProductById) to simulate a real-world API.

🤝 Contributing
Contributions are welcome! If you have suggestions for improvements or find any issues, please feel free to open an issue or submit a pull request.