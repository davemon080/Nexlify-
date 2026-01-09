
import { neon } from 'https://esm.sh/@neondatabase/serverless';
import { Project, Enquiry, SiteData } from '../types';
import { SERVICES, PORTFOLIO } from '../constants';

// Safe access for DATABASE_URL to prevent crashes in environments where process is undefined
const getDbUrl = () => {
  const DEFAULT_URL = "postgresql://neondb_owner:npg_5dUqIlf4XuzD@ep-shy-wind-ah2kspty-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require";
  try {
    return (typeof process !== 'undefined' && process.env) ? (process.env as any).DATABASE_URL || DEFAULT_URL : DEFAULT_URL;
  } catch {
    return DEFAULT_URL;
  }
};

const DATABASE_URL = getDbUrl();
const sql = neon(DATABASE_URL);

export const dbService = {
  async setupDatabase() {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS projects (
          id TEXT PRIMARY KEY, 
          title TEXT, 
          category TEXT, 
          image TEXT
        );
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS enquiries (
          id TEXT PRIMARY KEY, 
          name TEXT, 
          email TEXT, 
          mobile TEXT, 
          service TEXT, 
          message TEXT, 
          date TEXT
        );
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS site_config (
          key TEXT PRIMARY KEY, 
          value TEXT
        );
      `;
      
      await sql`
        INSERT INTO site_config (key, value) 
        VALUES ('passcode', '1234') 
        ON CONFLICT (key) DO NOTHING;
      `;
      
      return true;
    } catch (error) {
      console.error("Database Setup Error:", error);
      throw error;
    }
  },

  async getSiteData(): Promise<SiteData> {
    try {
      const configRows = await sql`SELECT * FROM site_config`;
      const projects = await sql`SELECT * FROM projects ORDER BY id DESC`;
      const enquiries = await sql`SELECT * FROM enquiries ORDER BY id DESC`;
      
      const config = configRows.reduce((acc: any, curr: any) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {});

      return {
        logo: config.logo || null,
        heroImage: config.heroImage || null,
        passcode: config.passcode || '1234',
        services: SERVICES,
        projects: projects.length > 0 ? (projects as Project[]) : PORTFOLIO,
        enquiries: enquiries as Enquiry[],
        aboutContent: {
          heroTitle: config.about_heroTitle || "The Story Behind Nexlify.",
          mainText: config.about_mainText || "Nexlify began with a simple observation: most digital agencies either focused solely on code or solely on design.",
          secondaryText: config.about_secondaryText || "We combine the precision of high-end web development with the emotional impact of professional writing."
        }
      };
    } catch (error: any) {
      if (!error.message?.includes('does not exist')) {
        console.error("DB Fetch Error:", error);
      }
      
      return {
        logo: null,
        heroImage: null,
        passcode: '1234',
        services: SERVICES,
        projects: PORTFOLIO,
        enquiries: [],
        aboutContent: { 
          heroTitle: "The Story Behind Nexlify.", 
          mainText: "Nexlify began with a simple observation: most digital agencies either focused solely on code or solely on design.", 
          secondaryText: "We combine the precision of high-end web development with the emotional impact of professional writing." 
        }
      };
    }
  },

  async addProject(project: Project) {
    await sql`INSERT INTO projects (id, title, category, image) VALUES (${project.id}, ${project.title}, ${project.category}, ${project.image})`;
  },

  async deleteProject(id: string) {
    await sql`DELETE FROM projects WHERE id = ${id}`;
  },

  async addEnquiry(enquiry: Enquiry) {
    await sql`INSERT INTO enquiries (id, name, email, mobile, service, message, date) VALUES (${enquiry.id}, ${enquiry.name}, ${enquiry.email}, ${enquiry.mobile}, ${enquiry.service}, ${enquiry.message}, ${enquiry.date})`;
  },

  async deleteEnquiry(id: string) {
    await sql`DELETE FROM enquiries WHERE id = ${id}`;
  },

  async updateConfig(key: string, value: string | null) {
    await sql`INSERT INTO site_config (key, value) VALUES (${key}, ${value}) ON CONFLICT (key) DO UPDATE SET value = ${value}`;
  }
};
