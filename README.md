# ShopSphere: Full-Stack E-Commerce Application 🛍️

Welcome to **ShopSphere**, a complete full-stack e-commerce application featuring a dynamic **React frontend** and a robust **Spring Boot backend**. This project is designed to showcase a modern, feature-rich shopping experience from client to server.



---

## ## 🏗️ Architecture

ShopSphere uses a classic client-server architecture, organized within a single monorepo:

* **Frontend (Client):** A responsive single-page application (SPA) built with **React** that provides a rich user interface.
* **Backend (Server):** A powerful RESTful API built with **Spring Boot** that handles business logic and data persistence using an **H2 in-memory database**.

---

## ## 🛠️ Technology Stack

| Component  | Technology      | Description                                                 |
| :--------- | :-------------- | :---------------------------------------------------------- |
| **Backend** | **Spring Boot** | Core framework for building the REST API.                   |
|            | **Spring Data JPA** | For data persistence and repository management.             |
|            | **H2 Database** | An in-memory database for development and testing.        |
|            | **Maven** | For project dependency management and build automation.       |
| **Frontend** | **React.js** | Library for building the user interface.                    |
|            | **Tailwind CSS** | A utility-first CSS framework for rapid UI development.     |
|            | **Axios** | For making asynchronous HTTP requests to the backend.       |
|            | **Context API** | For managing global state like the shopping cart.           |

---

## ## ✨ Key Features

* **Full-Stack Integration:** Seamless communication between the React frontend and Spring Boot backend.
* **Dynamic Product Catalog:** Products are fetched from the backend and displayed in a responsive grid or list view.
* **Shopping Cart & Wishlist:** All cart and wishlist operations are handled and persisted through the backend.
* **Modern UI/UX:** A sleek, responsive interface with smooth animations for a great user experience.
* **Scalable Codebase:** Clean, organized code structure for both frontend and backend in a monorepo.

---

## ## 🚀 Getting Started

To get the entire application running locally, follow these steps.

### ### Prerequisites

* **Java Development Kit (JDK) 17 or higher**
* **Apache Maven**
* **Node.js and npm**

### ### Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/chitranshu234/E-com.git](https://github.com/chitranshu234/E-com.git)
    cd E-com
    ```

2.  **Run the Backend (Spring Boot):**
    * Navigate to the `backend` directory:
        ```bash
        cd backend
        ```
    * Build the project using Maven:
        ```bash
        mvn clean install
        ```
    * Run the application:
        ```bash
        java -jar target/your-project-name.jar
        ```
    * The backend server will start on `http://localhost:8080`. The H2 database console can be accessed at `http://localhost:8080/h2-console`.

3.  **Run the Frontend (React):**
    * Open a **new terminal** and navigate to the `frontend` directory from the root `E-com` folder:
        ```bash
        cd frontend
        ```
    * Install the necessary packages:
        ```bash
        npm install
        ```
    * Start the development server:
        ```bash
        npm start
        ```
    * The frontend will be available at `http://localhost:3000`.

---

## 📁 Project Structure

This project uses a **monorepo** to keep the frontend and backend code in a single, organized repository.
