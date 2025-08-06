---
title: Quick Dexie.js Tutorial
description: Dexie is a wrapper library for IndexedDB that makes client-side database operations much easier and more intuitive.
publishedDate: '2025-08-06'
category: Front End
---

# Complete Dexie.js Tutorial: Basics to Advanced

## What is Dexie.js?

Dexie.js is a wrapper library for IndexedDB that provides:
- **Simple API**: Much easier than raw IndexedDB
- **Promise-based**: Modern async/await support
- **Type-safe**: Works great with TypeScript
- **Powerful querying**: SQL-like operations
- **Transaction support**: ACID compliance
- **Schema versioning**: Easy database migrations

### Why Choose Dexie over Raw IndexedDB?
- IndexedDB API is complex and verbose
- Dexie provides intuitive, promise-based methods
- Better error handling and debugging
- Automatic transaction management

## Installation & Setup

### NPM Installation
```bash
npm install dexie
```

### CDN (for HTML projects)
```html
<script src="https://unpkg.com/dexie@latest/dist/dexie.js"></script>
```

### ES6 Import
```javascript
import Dexie from 'dexie';
```

### CommonJS
```javascript
const Dexie = require('dexie');
```

## Basic Concepts

### Key Terms
- **Database**: Container for your data
- **Object Store**: Similar to a table in SQL
- **Index**: Allows efficient querying on specific fields
- **Primary Key**: Unique identifier for each record
- **Transaction**: Group of operations that succeed or fail together

### IndexedDB vs SQL Comparison
```
SQL Table     →  IndexedDB Object Store
Row          →  Object/Record  
Column       →  Property
Primary Key  →  Key Path
Index        →  Index
```

## Creating Your First Database

### Basic Database Setup
```javascript
// Define the database
class MyAppDB extends Dexie {
  constructor() {
    super('MyAppDatabase');
    
    // Define schemas
    this.version(1).stores({
      users: '++id, name, email, age',
      posts: '++id, title, content, userId, createdAt',
      tags: '++id, name, color'
    });
  }
}

// Create database instance
const db = new MyAppDB();
```

### Schema Definition Syntax
```javascript
// Schema patterns:
'++id'                    // Auto-incrementing primary key
'id'                      // Primary key (you provide values)
'++id, name, email'       // Primary key + indexed fields
'id, name, *tags'         // Primary key + indexed field + multi-entry index
'++id, name, [firstName+lastName]' // Compound index
```

### Opening the Database
```javascript
// Database opens automatically on first use
// But you can explicitly open it:
db.open().then(() => {
  console.log('Database opened successfully');
}).catch(err => {
  console.error('Failed to open database:', err);
});
```

## CRUD Operations

### Create (Adding Data)

#### Add Single Record
```javascript
// Add one user
await db.users.add({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});

// Add with specific ID
await db.users.add({
  id: 1,
  name: 'Jane Smith',
  email: 'jane@example.com',
  age: 25
});
```

#### Add Multiple Records
```javascript
// Bulk add
await db.users.bulkAdd([
  { name: 'Alice', email: 'alice@example.com', age: 28 },
  { name: 'Bob', email: 'bob@example.com', age: 32 },
  { name: 'Charlie', email: 'charlie@example.com', age: 24 }
]);
```

#### Put vs Add
```javascript
// add() fails if key already exists
await db.users.add({ id: 1, name: 'John' }); // Works
await db.users.add({ id: 1, name: 'Jane' }); // Throws error

// put() overwrites existing records
await db.users.put({ id: 1, name: 'John' }); // Works
await db.users.put({ id: 1, name: 'Jane' }); // Overwrites John with Jane
```

### Read (Retrieving Data)

#### Get by Primary Key
```javascript
// Get single record by ID
const user = await db.users.get(1);
console.log(user); // { id: 1, name: 'Jane', email: 'jane@example.com', age: 25 }

// Get multiple records by IDs
const users = await db.users.bulkGet([1, 2, 3]);
```

#### Get All Records
```javascript
// Get all users
const allUsers = await db.users.toArray();

// Get count
const userCount = await db.users.count();
```

### Update (Modifying Data)

#### Update by Primary Key
```javascript
// Update specific fields
await db.users.update(1, { age: 31, email: 'john.doe@example.com' });

// Update using object with primary key
await db.users.put({
  id: 1,
  name: 'John Doe Updated',
  email: 'john.updated@example.com',
  age: 31
});
```

#### Bulk Update
```javascript
// Update multiple records
await db.users.bulkUpdate([
  { key: 1, changes: { age: 31 } },
  { key: 2, changes: { age: 26 } }
]);
```

#### Modify with Function
```javascript
// Modify using a function
await db.users.update(1, user => {
  user.lastLogin = new Date();
  user.loginCount = (user.loginCount || 0) + 1;
});
```

### Delete (Removing Data)

#### Delete by Primary Key
```javascript
// Delete single record
await db.users.delete(1);

// Delete multiple records
await db.users.bulkDelete([1, 2, 3]);
```

#### Delete with Conditions
```javascript
// Delete all users under 25
await db.users.where('age').below(25).delete();

// Clear entire table
await db.users.clear();
```

## Querying Data

### Basic Where Queries
```javascript
// Exact match
const youngUsers = await db.users.where('age').equals(25).toArray();

// Range queries
const adults = await db.users.where('age').above(18).toArray();
const seniors = await db.users.where('age').aboveOrEqual(65).toArray();
const minors = await db.users.where('age').below(18).toArray();
const middleAged = await db.users.where('age').between(30, 50).toArray();

// String queries
const johnsUsers = await db.users.where('name').startsWith('John').toArray();
const gmailUsers = await db.users.where('email').endsWith('@gmail.com').toArray();
```

### Array Queries
```javascript
// Any of these values
const specificUsers = await db.users
  .where('id')
  .anyOf([1, 3, 5, 7])
  .toArray();

// None of these values  
const excludedUsers = await db.users
  .where('age')
  .noneOf([25, 30, 35])
  .toArray();
```

### Complex Conditions
```javascript
// Chaining conditions (AND logic)
const query = await db.users
  .where('age').above(25)
  .and(user => user.email.includes('@gmail.com'))
  .toArray();

// OR logic using filter
const orQuery = await db.users
  .filter(user => user.age > 30 || user.name.startsWith('A'))
  .toArray();
```

### Sorting and Limiting
```javascript
// Order by indexed field
const sortedUsers = await db.users.orderBy('age').toArray();
const reverseSorted = await db.users.orderBy('age').reverse().toArray();

// Limit results
const firstFive = await db.users.orderBy('name').limit(5).toArray();

// Offset and limit (pagination)
const page2 = await db.users.orderBy('name').offset(10).limit(5).toArray();
```

## Indexes and Performance

### Understanding Indexes
```javascript
class MyDB extends Dexie {
  constructor() {
    super('MyDB');
    this.version(1).stores({
      // Primary key + indexed fields
      users: '++id, name, email, age, *tags',
      //          ↑     ↑      ↑     ↑    ↑
      //     primary  index  index index multi-entry
      
      // Compound indexes
      posts: '++id, title, userId, [userId+createdAt], createdAt'
      //                            ↑
      //                    compound index for efficient
      //                    user posts by date queries
    });
  }
}
```

### When to Use Indexes
- **Index**: Fields you'll query with `where()`
- **Don't Index**: Fields you only display or modify
- **Compound Index**: When you frequently query multiple fields together

### Performance Tips
```javascript
// ✅ Good: Uses index
await db.users.where('age').above(25).toArray();

// ❌ Bad: No index, scans all records
await db.users.filter(user => user.height > 180).toArray();

// ✅ Better: Add height to schema
// users: '++id, name, age, height'
await db.users.where('height').above(180).toArray();
```

## Advanced Querying

### Collection Methods
```javascript
// Transform results
const userNames = await db.users
  .where('age')
  .above(25)
  .toArray()
  .map(user => user.name);

// Find first match
const firstAdult = await db.users
  .where('age')
  .aboveOrEqual(18)
  .first();

// Check existence
const hasMinors = await db.users
  .where('age')
  .below(18)
  .count() > 0;

// Iterate with each()
await db.users.where('age').above(65).each(user => {
  console.log(`Senior user: ${user.name}`);
});
```

### Joins and Relations
```javascript
// Manual joins
async function getUsersWithPosts() {
  const users = await db.users.toArray();
  
  for (const user of users) {
    user.posts = await db.posts
      .where('userId')
      .equals(user.id)
      .toArray();
  }
  
  return users;
}

// More efficient approach
async function getUserPosts(userId) {
  const [user, posts] = await Promise.all([
    db.users.get(userId),
    db.posts.where('userId').equals(userId).toArray()
  ]);
  
  return { ...user, posts };
}
```

### Multi-entry Indexes
```javascript
// Schema with multi-entry index
// posts: '++id, title, *tags'

// Add posts with tags
await db.posts.bulkAdd([
  { title: 'JavaScript Tips', tags: ['javascript', 'programming', 'web'] },
  { title: 'CSS Grid Guide', tags: ['css', 'layout', 'web'] },
  { title: 'React Hooks', tags: ['react', 'javascript', 'hooks'] }
]);

// Query by any tag
const webPosts = await db.posts.where('tags').equals('web').toArray();
const jsPosts = await db.posts.where('tags').equals('javascript').toArray();
```

## Transactions

### Why Use Transactions?
- **Atomicity**: All operations succeed or all fail
- **Consistency**: Database remains in valid state
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Committed changes persist

### Basic Transactions
```javascript
// Simple transaction
await db.transaction('rw', db.users, db.posts, async () => {
  const userId = await db.users.add({
    name: 'John Doe',
    email: 'john@example.com'
  });
  
  await db.posts.add({
    title: 'My First Post',
    content: 'Hello, world!',
    userId: userId
  });
  
  // If any operation fails, both are rolled back
});
```

### Transaction Modes
```javascript
// Read-only transaction
await db.transaction('r', db.users, async () => {
  const users = await db.users.toArray();
  // Can only read, no modifications allowed
});

// Read-write transaction
await db.transaction('rw', db.users, db.posts, async () => {
  // Can read and write to users and posts tables
});
```

### Error Handling in Transactions
```javascript
try {
  await db.transaction('rw', db.users, db.posts, async () => {
    await db.users.add({ name: 'Alice' });
    
    // This will cause rollback if it fails
    await db.posts.add({ 
      title: 'Invalid Post',
      userId: 999999 // Non-existent user
    });
  });
} catch (error) {
  console.log('Transaction failed, all changes rolled back');
}
```

## Schema Versioning

### Why Version Schemas?
- Add new object stores
- Add indexes to existing stores
- Modify existing data structure
- Remove unused stores or indexes

### Basic Versioning
```javascript
class MyDB extends Dexie {
  constructor() {
    super('MyDB');
    
    // Version 1: Initial schema
    this.version(1).stores({
      users: '++id, name, email'
    });
    
    // Version 2: Add age index
    this.version(2).stores({
      users: '++id, name, email, age'
    });
    
    // Version 3: Add posts table
    this.version(3).stores({
      users: '++id, name, email, age',
      posts: '++id, title, content, userId'
    });
  }
}
```

### Data Migration
```javascript
class MyDB extends Dexie {
  constructor() {
    super('MyDB');
    
    this.version(1).stores({
      users: '++id, name, email'
    });
    
    this.version(2)
      .stores({
        users: '++id, name, email, age'
      })
      .upgrade(tx => {
        // Add default age to existing users
        return tx.users.toCollection().modify(user => {
          user.age = 25; // Default age
        });
      });
    
    this.version(3)
      .stores({
        users: '++id, name, email, age',
        posts: '++id, title, content, userId, createdAt'
      })
      .upgrade(tx => {
        // No user data migration needed for new table
        console.log('Added posts table');
      });
  }
}
```

### Advanced Migration Example
```javascript
this.version(4)
  .stores({
    users: '++id, name, email, age, fullName',
    posts: '++id, title, content, userId, createdAt'
  })
  .upgrade(async tx => {
    // Create fullName from existing name field
    await tx.users.toCollection().modify(user => {
      if (user.name && !user.fullName) {
        user.fullName = user.name;
      }
    });
    
    // Add createdAt to existing posts
    await tx.posts.toCollection().modify(post => {
      if (!post.createdAt) {
        post.createdAt = new Date().toISOString();
      }
    });
  });
```

## Hooks and Middleware

### Available Hooks
- `creating`: Before adding new records
- `reading`: Before reading records  
- `updating`: Before updating records
- `deleting`: Before deleting records

### Basic Hook Usage
```javascript
class MyDB extends Dexie {
  constructor() {
    super('MyDB');
    
    this.version(1).stores({
      users: '++id, name, email, createdAt, updatedAt'
    });
    
    // Add timestamps automatically
    this.users.hook('creating', (primKey, obj, trans) => {
      obj.createdAt = new Date();
      obj.updatedAt = new Date();
    });
    
    this.users.hook('updating', (modifications, primKey, obj, trans) => {
      modifications.updatedAt = new Date();
    });
  }
}
```

### Advanced Hook Examples
```javascript
// Validation hook
db.users.hook('creating', (primKey, obj, trans) => {
  if (!obj.email || !obj.email.includes('@')) {
    throw new Error('Invalid email address');
  }
});

// Audit logging hook
db.users.hook('updating', (modifications, primKey, obj, trans) => {
  // Log the change
  db.auditLog.add({
    table: 'users',
    action: 'update',
    recordId: primKey,
    changes: modifications,
    timestamp: new Date()
  });
});

// Soft delete hook
db.users.hook('deleting', (primKey, obj, trans) => {
  // Instead of deleting, mark as deleted
  trans.abort(); // Cancel the delete
  return db.users.update(primKey, { 
    deleted: true, 
    deletedAt: new Date() 
  });
});
```

### Global Hooks
```javascript
// Hook that applies to all tables
db.hook('creating', (primKey, obj, trans) => {
  // Add created timestamp to all records
  if (!obj.createdAt) {
    obj.createdAt = new Date();
  }
});
```

## Real-World Examples

### 1. Todo Application
```javascript
class TodoDB extends Dexie {
  constructor() {
    super('TodoApp');
    
    this.version(1).stores({
      todos: '++id, title, completed, priority, dueDate, createdAt',
      categories: '++id, name, color'
    });
    
    // Add timestamps
    this.todos.hook('creating', (primKey, obj, trans) => {
      obj.createdAt = new Date();
      obj.completed = obj.completed || false;
    });
  }
}

const todoDb = new TodoDB();

// Todo operations
class TodoService {
  static async addTodo(title, priority = 'medium', dueDate = null) {
    return await todoDb.todos.add({
      title,
      priority,
      dueDate,
      completed: false
    });
  }
  
  static async toggleTodo(id) {
    const todo = await todoDb.todos.get(id);
    return await todoDb.todos.update(id, { 
      completed: !todo.completed 
    });
  }
  
  static async getTodosByPriority(priority) {
    return await todoDb.todos
      .where('priority')
      .equals(priority)
      .and(todo => !todo.completed)
      .sortBy('dueDate');
  }
  
  static async getOverdueTodos() {
    const now = new Date();
    return await todoDb.todos
      .where('dueDate')
      .below(now)
      .and(todo => !todo.completed)
      .toArray();
  }
}
```

### 2. Chat Application
```javascript
class ChatDB extends Dexie {
  constructor() {
    super('ChatApp');
    
    this.version(1).stores({
      messages: '++id, content, userId, channelId, timestamp, *mentions',
      users: '++id, username, avatar, lastSeen',
      channels: '++id, name, type, participants'
    });
  }
}

const chatDb = new ChatDB();

class ChatService {
  static async sendMessage(content, userId, channelId) {
    // Extract mentions from message content
    const mentions = content.match(/@(\w+)/g) || [];
    
    return await chatDb.transaction('rw', chatDb.messages, chatDb.users, async () => {
      const messageId = await chatDb.messages.add({
        content,
        userId,
        channelId,
        timestamp: new Date(),
        mentions: mentions.map(m => m.substring(1)) // Remove @
      });
      
      // Update user's last activity
      await chatDb.users.update(userId, { lastSeen: new Date() });
      
      return messageId;
    });
  }
  
  static async getChannelMessages(channelId, limit = 50) {
    return await chatDb.messages
      .where('channelId')
      .equals(channelId)
      .reverse()
      .limit(limit)
      .toArray();
  }
  
  static async getUserMentions(username) {
    return await chatDb.messages
      .where('mentions')
      .equals(username)
      .reverse()
      .toArray();
  }
}
```

### 3. E-commerce Cart
```javascript
class ShopDB extends Dexie {
  constructor() {
    super('ShopApp');
    
    this.version(1).stores({
      products: '++id, name, price, category, inStock',
      cartItems: '++id, productId, quantity, addedAt',
      orders: '++id, items, total, status, createdAt'
    });
  }
}

const shopDb = new ShopDB();

class CartService {
  static async addToCart(productId, quantity = 1) {
    const existingItem = await shopDb.cartItems
      .where('productId')
      .equals(productId)
      .first();
    
    if (existingItem) {
      return await shopDb.cartItems.update(existingItem.id, {
        quantity: existingItem.quantity + quantity
      });
    } else {
      return await shopDb.cartItems.add({
        productId,
        quantity,
        addedAt: new Date()
      });
    }
  }
  
  static async getCartWithProducts() {
    const cartItems = await shopDb.cartItems.toArray();
    const productIds = cartItems.map(item => item.productId);
    const products = await shopDb.products.bulkGet(productIds);
    
    return cartItems.map(item => ({
      ...item,
      product: products.find(p => p.id === item.productId)
    }));
  }
  
  static async checkout() {
    return await shopDb.transaction('rw', shopDb.cartItems, shopDb.orders, async () => {
      const cartItems = await this.getCartWithProducts();
      
      const total = cartItems.reduce((sum, item) => 
        sum + (item.product.price * item.quantity), 0
      );
      
      const orderId = await shopDb.orders.add({
        items: cartItems,
        total,
        status: 'pending',
        createdAt: new Date()
      });
      
      // Clear cart
      await shopDb.cartItems.clear();
      
      return orderId;
    });
  }
}
```

## Best Practices

### 1. Database Design
```javascript
// ✅ Good: Logical separation
class AppDB extends Dexie {
  constructor() {
    super('MyApp');
    
    this.version(1).stores({
      // User-related data
      users: '++id, email, username, createdAt',
      userProfiles: '++id, userId, firstName, lastName, avatar',
      
      // Content
      posts: '++id, authorId, title, content, publishedAt, *tags',
      comments: '++id, postId, authorId, content, createdAt',
      
      // System
      settings: 'key, value',
      cache: '++id, key, data, expiresAt'
    });
  }
}

// ❌ Bad: Everything in one store
// users: '++id, email, firstName, lastName, posts, comments, settings'
```

### 2. Indexing Strategy
```javascript
// ✅ Good: Index fields you query
this.version(1).stores({
  posts: '++id, authorId, publishedAt, status, *tags, title',
  //              ↑         ↑          ↑      ↑      ↑
  //           query by   order by  filter  search  search
  
  // Compound index for common query patterns
  analytics: '++id, userId, [userId+date], date, event'
  //                  ↑         ↑          ↑      ↑
  //                user    user+date   all by  event
  //                stats   time series  date   type
});

// ❌ Bad: Over-indexing
// posts: '++id, authorId, title, content, publishedAt, createdAt, updatedAt, status, views, likes'
//        Only index what you actually query!
```

### 3. Transaction Usage
```javascript
// ✅ Good: Use transactions for related operations
async function createUserWithProfile(userData, profileData) {
  return await db.transaction('rw', db.users, db.userProfiles, async () => {
    const userId = await db.users.add(userData);
    await db.userProfiles.add({
      ...profileData,
      userId
    });
    return userId;
  });
}

// ❌ Bad: Separate operations without transaction
async function createUserWithProfileBad(userData, profileData) {
  const userId = await db.users.add(userData);
  // If this fails, user exists without profile!
  await db.userProfiles.add({ ...profileData, userId });
  return userId;
}
```

### 4. Error Handling
```javascript
// ✅ Good: Comprehensive error handling
async function safeUserOperation(userId, updates) {
  try {
    const result = await db.users.update(userId, updates);
    
    if (result === 0) {
      throw new Error(`User ${userId} not found`);
    }
    
    return { success: true, userId };
    
  } catch (error) {
    if (error.name === 'ConstraintError') {
      return { success: false, error: 'Constraint violation' };
    } else if (error.name === 'DataError') {
      return { success: false, error: 'Invalid data' };
    } else {
      console.error('Unexpected database error:', error);
      return { success: false, error: 'Database operation failed' };
    }
  }
}
```

### 5. Performance Optimization
```javascript
// ✅ Good: Batch operations
async function bulkUpdateUsers(updates) {
  const modifications = updates.map(update => ({
    key: update.id,
    changes: update.changes
  }));
  
  return await db.users.bulkUpdate(modifications);
}

// ❌ Bad: Individual operations in loop
async function updateUsersBad(updates) {
  for (const update of updates) {
    await db.users.update(update.id, update.changes);
  }
}

// ✅ Good: Use indexes for filtering
async function getActiveUsers() {
  return await db.users.where('status').equals('active').toArray();
}

// ❌ Bad: Filter without index
async function getActiveUsersBad() {
  return await db.users.filter(user => user.status === 'active').toArray();
}
```

### 6. Memory Management
```javascript
// ✅ Good: Process large datasets in chunks
async function processLargeDataset() {
  let offset = 0;
  const batchSize = 1000;
  
  while (true) {
    const batch = await db.records
      .orderBy('id')
      .offset(offset)
      .limit(batchSize)
      .toArray();
    
    if (batch.length === 0) break;
    
    // Process batch
    await processBatch(batch);
    
    offset += batchSize;
  }
}

// ❌ Bad: Load everything into memory
async function processLargeDatasetBad() {
  const allRecords = await db.records.toArray(); // Could be millions!
  await processAllRecords(allRecords);
}
```

### 7. Data Validation
```javascript
class ValidatedDB extends Dexie {
  constructor() {
    super('ValidatedDB');
    
    this.version(1).stores({
      users: '++id, email, username, createdAt'
    });
    
    // Validation hooks
    this.users.hook('creating', (primKey, obj, trans) => {
      this.validateUser(obj);
    });
    
    this.users.hook('updating', (modifications, primKey, obj, trans) => {
      this.validateUserModifications(modifications);
    });
  }
  
  validateUser(user) {
    if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) {
      throw new Error('Invalid email address');
    }
    
    if (!user.username || user.username.length < 3) {
      throw new Error('Username must be at least 3 characters');
    }
  }
  
  validateUserModifications(modifications) {
    if (modifications.email && !/\S+@\S+\.\S+/.test(modifications.email)) {
      throw new Error('Invalid email address');
    }
  }
}
```

## Conclusion

Dexie.js provides a powerful, intuitive way to work with client-side databases. Key takeaways:

1. **Start Simple**: Begin with basic CRUD operations
2. **Index Wisely**: Only index fields you query
3. **Use Transactions**: For related operations that must succeed together  
4. **Handle Errors**: Always implement proper error handling
5. **Version Carefully**: Plan schema changes and migrations
6. **Optimize Performance**: Use bulk operations and proper indexing
7. **Validate Data**: Use hooks for automatic validation and timestamps

With these concepts and examples, you're ready to build robust client-side applications with Dexie.js!