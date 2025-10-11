# ShopSphere: Full-Stack E-Commerce Application 🛍️

Welcome to **ShopSphere**, a complete full-stack e-commerce application featuring a dynamic **React frontend** and a robust **Spring Boot backend**. This project is designed to showcase a modern, feature-rich shopping experience from client to server.



---

## 🏗️ Architecture

ShopSphere uses a classic client-server architecture:

* **Frontend (Client):** A responsive single-page application (SPA) built with **React** that provides a rich user interface. It runs on `http://localhost:3000`.
* **Backend (Server):** A powerful RESTful API built with **Spring Boot** that handles business logic, data persistence, and serves data to the frontend. It runs on `http://localhost:8080`.

---

## 🛠️ Technology Stack

| Component | Technology       | Description                                          |
| :-------- | :--------------- | :--------------------------------------------------- |
| **Backend** | **Spring Boot** | Core framework for building the REST API.            |
|           | **Spring MVC** | For creating REST controllers and handling HTTP requests. |
|           | **Spring Data JPA**| For data persistence and repository management.      |
|           | **Hibernate** | JPA implementation for object-relational mapping (ORM). |
|           | **H2 / MySQL** | In-memory or relational database for storing data.   |
|           | **Maven** | For project dependency management and build automation. |
| **Frontend**| **React.js** | Library for building the user interface.             |
|           | **Tailwind CSS** | A utility-first CSS framework for rapid UI development. |
|           | **Axios** | For making asynchronous HTTP requests to the backend.  |
|           | **Context API** | For managing global state like cart and wishlist.    |

---

## ✨ Key Features

* **Full-Stack Integration:** Seamless communication between the React frontend and Spring Boot backend.
* **RESTful API:** A well-defined API for managing products, reviews, and more.
* **Dynamic Product Catalog:** Products are fetched from the backend and displayed in a responsive grid or list view.
* **Shopping Cart & Wishlist:** All cart and wishlist operations are handled and persisted through the backend.
* **Modern UI/UX:** A sleek, responsive interface with smooth animations.
* **Scalable Codebase:** Clean, organized code structure for both frontend and backend.

---

## 🚀 Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

* **Java Development Kit (JDK) 17 or higher**
* **Apache Maven**
* **Node.js and npm**
* An IDE like IntelliJ IDEA for the backend and VS Code for the frontend.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/chitranshu234/E-com.git](https://github.com/chitranshu234/E-com.git)
    cd E-com
    ```

2.  **Set up the Backend (Spring Boot):**
    * Navigate to the `backend` directory: `cd backend`
    * (Optional) Update the `src/main/resources/application.properties` file with your database credentials if you are not using the default H2 in-memory database.
    * Build the project using Maven:
        ```bash
        mvn clean install
        ```
    * Run the application from your IDE (like IntelliJ) or by using the command:
        ```bash
        java -jar target/your-project-name.jar
        ```
    * The backend server will start on `http://localhost:8080`.

3.  **Set up the Frontend (React):**
    * Open a **new terminal** and navigate to the `frontend` directory: `cd frontend`
    * Install NPM packages:
        ```bash
        npm install
        ```
    * Run the application:
        ```bash
        npm run dev
        ```
    * The frontend development server will start on `http://localhost:3000`.

You can now access the application in your browser!

---

## 📦 Product Data Model

The backend API should provide product data in the following JSON format for the frontend to consume correctly.

```json
{
  "id": 1,
  "name": "QuantumCore Gaming PC",
  "brand": "StellarTech",
  "images": [
    "[https://example.com/image1.jpg](https://example.com/image1.jpg)",
    "[https://example.com/image2.jpg](https://example.com/image2.jpg)"
  ],
  "price": 1999.99,
  "discountPrice": 1799.99,
  "shortDescription": "High-performance gaming desktop with the latest components.",
  "fullDescription": "The QuantumCore Gaming PC is engineered for elite gaming performance. Featuring a next-gen CPU, top-tier graphics card, and ultra-fast SSD, it handles AAA titles and creative workloads with ease.",
  "averageRating": 4.8,
  "reviewCount": 152,
  "tags": ["gaming", "pc", "desktop", "esports"]
}