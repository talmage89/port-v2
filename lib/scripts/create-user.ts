import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import "dotenv/config";

// Args: username, password, name (optional), email (optional), role (optional)
async function createUser() {
  try {
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
      console.error("❌ Usage: npm run create-user <username> <password> [name] [email] [role]");
      process.exit(1);
    }
    
    const username = args[0];
    const password = args[1];
    const name = args[2] || username;
    const email = args[3] || null;
    const role = args[4] || "editor";
    
    // Validate role
    if (role !== "admin" && role !== "editor") {
      console.error("❌ Role must be either 'admin' or 'editor'");
      process.exit(1);
    }
    
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.username, username));
    if (existingUser.length > 0) {
      console.error(`❌ User with username '${username}' already exists`);
      process.exit(1);
    }
    
    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const result = await db.insert(users).values({
      username,
      passwordHash,
      name,
      email,
      role,
    }).returning();
    
    console.log(`✅ Successfully created user '${username}' with role '${role}'`);
    console.log(result[0]);
    
    return result[0];
  } catch (error) {
    console.error("❌ Error creating user:", error);
    process.exit(1);
  }
}

// Execute the function
createUser(); 