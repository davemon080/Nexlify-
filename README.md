
# Nexlify Portfolio - GitHub Deployment Guide

Since this project is hosted on GitHub, we use **Environment Variables** to keep your database credentials and API keys secure.

## 1. Local Setup
1. Create a file named `.env` in the root directory.
2. Copy the contents of `.env.example` into `.env`.
3. Replace the placeholder values with your actual Neon DB URL and Gemini API Key.

## 2. GitHub Deployment (GitHub Actions / Pages)
If you are using GitHub Actions to deploy:
1. Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions**.
2. Add the following **Repository Secrets**:
   - `VITE_DATABASE_URL`: Your Neon connection string.
   - `VITE_GEMINI_API_KEY`: Your Google Gemini API Key.
3. These will be injected into the build automatically.

## 3. SQL Initialization (Neon Console)
Run these commands in your [Neon SQL Editor](https://console.neon.tech/) to prepare the database:

```sql
-- Create Tables
CREATE TABLE IF NOT EXISTS projects (id TEXT PRIMARY KEY, title TEXT, category TEXT, image TEXT);
CREATE TABLE IF NOT EXISTS enquiries (id TEXT PRIMARY KEY, name TEXT, email TEXT, mobile TEXT, service TEXT, message TEXT, date TEXT);
CREATE TABLE IF NOT EXISTS site_config (key TEXT PRIMARY KEY, value TEXT);

-- Initial Config
INSERT INTO site_config (key, value) VALUES 
('passcode', '1234'),
('about_heroTitle', 'The Story Behind Nexlify.'),
('about_mainText', 'Nexlify began with a simple observation...'),
('about_secondaryText', 'I founded Nexlify to be that bridge...')
ON CONFLICT DO NOTHING;
```
