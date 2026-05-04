import { column, defineDb, defineTable } from "astro:db";

const Role = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text({ unique: true }),
  }
});

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    email: column.text({ unique: true }),
    password: column.text(),
    role: column.text({ references: () => Role.columns.id }),
    createdAt: column.date(),
  }
});

const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    expiresAt: column.date(),
    userId: column.text({ references: () => User.columns.id }),
  }
});

export default defineDb({
  tables: { User, Session, Role }
});