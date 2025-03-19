# AI Scraper API - Product Requirements Document

## 1. Introduction

### 1.1 Purpose

AI Scraper API is a service designed for developers and data analysts who need to extract structured data from websites but lack the expertise or time to write their own web scrapers. The service simplifies the data extraction process by leveraging AI to transform web content into structured JSON data according to user-specified formats.

### 1.2 Product Overview

The product consists of a web application with a user-friendly interface and a REST API that allows users to scrape web content and convert it into structured JSON data. The service uses Gemini AI to interpret and transform web content based on user requirements.

### 1.3 Target Audience

- Developers without web scraping expertise
- Data analysts and researchers who need structured web data
- Businesses requiring rapid data extraction solutions
- Anyone looking to automate the process of extracting web data in a specific format

## 2. User Experience

### 2.1 Landing Page

- Product introduction and value proposition
- Features and benefits overview
- Pricing information (if applicable)
- Sign-in and sign-up buttons prominently displayed
- Authentication options: GitHub and Google

### 2.2 Authentication

- Sign-up with GitHub or Google OAuth
- Sign-in with GitHub or Google OAuth
- Implementation using NextAuth
- Secure session management

### 2.3 Dashboard

- Overview of user's projects displayed as cards
- Create new project button
- Project analytics (usage statistics, if applicable)
- Account settings access

### 2.4 Project Creation

- Form to input project name
- Field for Gemini API key input
- Information about API key security and encryption
- Upon creation, user receives an API key to access our endpoints

### 2.5 Project Details

- Project configuration options
- API endpoint information and usage examples
- API key management (reset, revoke)
- Usage statistics and logs

## 3. Technical Requirements

### 3.1 Frontend

- Next.js with Turbopack
- Shadcn UI components for consistent design
- Responsive design for mobile and desktop
- Proper folder structure separating UI components from logic

### 3.2 Backend

- Separate API structure from frontend
- REST API endpoints for scraping and authentication
- Secure handling of user credentials and API keys
- Rate limiting and usage monitoring

### 3.3 Database

- PostgreSQL database
- Drizzle ORM for database operations
- Schemas for users, projects, and API usage logs
- Secure storage of encrypted Gemini API keys

### 3.4 Deployment

- Docker containerization
- Docker Compose configuration for app and database
- Environment variable management
- CI/CD pipeline (optional)

## 4. Functional Requirements

### 4.1 Scraping Process

1. User makes a request to our API endpoint with:
   - Target URL to scrape
   - Desired JSON format (example or schema)
   - Authentication token
2. Backend validates the request and user's API key
3. Backend makes a request to https://r.jina.ai/{TARGET_URL} to get markdown content
4. Backend decrypts the user's Gemini API key
5. Backend sends the markdown content to Gemini API with instructions to format it according to the user's JSON format
6. Gemini API returns formatted JSON
7. Backend returns the formatted JSON to the user

### 4.2 API Endpoints

#### Authentication Endpoints

- POST /api/auth/token - Generate API token
- DELETE /api/auth/token - Revoke API token

#### Scraping Endpoints

- POST /api/scrape
  - Request Body:
    ```json
    {
      "url": "https://example.com",
      "output_format": {
        "type": "json_example | json_schema",
        "format": {...}  // Example JSON or JSON Schema
      }
    }
    ```
  - Response:
    ```json
    {
      "status": "success",
      "data": {...}  // Formatted data according to requested format
    }
    ```

#### Project Management Endpoints

- GET /api/projects - List user projects
- POST /api/projects - Create new project
- GET /api/projects/{id} - Get project details
- PUT /api/projects/{id} - Update project
- DELETE /api/projects/{id} - Delete project

### 4.3 Security Requirements

- HTTPS for all communications
- API key authentication
- Encryption of user's Gemini API keys in the database
- CSRF protection
- Rate limiting to prevent abuse
- Input validation to prevent injection attacks

## 5. Non-functional Requirements

### 5.1 Performance

- API response time under 5 seconds for typical scraping tasks
- Support for concurrent API requests
- Efficient caching strategy for repeated requests

### 5.2 Scalability

- Horizontal scaling capability
- Database performance optimization
- Load balancing configuration

### 5.3 Reliability

- Error handling for all API endpoints
- Graceful degradation during high load
- Monitoring and logging of system performance

### 5.4 Security

- Regular security audits
- Dependency vulnerability scanning
- Data protection compliance (GDPR, etc.)

## 6. Constraints and Limitations

### 6.1 Technical Constraints

- Dependence on third-party services (r.jina.ai, Gemini API)
- Rate limits imposed by these services
- Potential for changes in their APIs

### 6.2 Business Constraints

- Cost of Gemini API usage (passed to users)
- Legal considerations regarding web scraping
- Compliance with terms of service of target websites

## 7. Future Enhancements

- Support for additional AI models beyond Gemini
- Advanced scraping features (JavaScript rendering, etc.)
- Scheduled scraping jobs
- Custom scraping rules and preprocessing options
- Data transformation and export options
