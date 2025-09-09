---
trigger: manual
---

# Feature-Based React Architecture Rules

## Core Principles

### 1. Feature Isolation
- **Rule**: Each feature should be decoupled from others as much as possible
- **Implementation**: Organize code by feature domains, not by file types
- **Structure**: Use `/features/{feature-name}/` folders instead of `/components/`, `/utils/`, etc.

### 2. Single Responsibility Components
- **Rule**: Split components to focus on single features/domains
- **Bad**: `<Post>` component that renders post content AND comments
- **Good**: `<Post>` component for post content + separate `<Comments>` component
- **Benefit**: Easier maintenance, testing, and feature development

## Folder Structure Rules

### 3. Feature-Based Organization
```
src/
├── features/
│   ├── post/
│   │   ├── components/
│   │   │   └── post.tsx
│   │   └── queries/
│   │       └── get-post.ts
│   └── comment/
│       ├── components/
│       │   └── comments.tsx
│       └── queries/
│           └── get-comments.ts
```

### 4. Query Function Naming
- **Rule**: Keep query functions focused and descriptive
- **Bad**: `getPostWithCommentsAndAuthor()`
- **Good**: `getPost()`, `getComments()`, `getAuthor()`
- **Exception**: Performance-critical joins are acceptable but should be clearly documented

## Data Fetching Rules

### 5. Domain-Focused Queries
- **Rule**: Each query function should serve a single domain
- **Implementation**: 
  - `getPost()` fetches only post data
  - `getComments()` fetches only comments data
  - Avoid nested includes unless performance-critical

### 6. Parallel Data Fetching
- **Rule**: Use `Promise.all()` for independent data requests
- **Implementation**:
```typescript
const [post, comments] = await Promise.all([
  getPost(postId),
  getComments(postId)
]);
```

### 7. Component Composition for Performance
- **Rule**: Use component composition to maintain feature isolation while enabling parallel fetching
- **Pattern**: Fetch data at parent level, pass composed components as props
```typescript
const PostPage = async ({ postId }) => {
  const [post, comments] = await Promise.all([
    getPost(postId),
    getComments(postId)
  ]);
  
  return (
    <Post 
      post={post} 
      comments={<Comments comments={comments} />} 
    />
  );
};
```

## Component Design Rules

### 8. Prop Interface Clarity
- **Rule**: Use descriptive prop names instead of generic ones
- **Bad**: Using only `children` prop
- **Good**: Named props like `comments={<Comments />}` 
- **Benefit**: Self-documenting component interfaces

### 9. Client/Server Component Isolation
- **Rule**: Component composition allows independent Client/Server Component decisions
- **Benefit**: One feature becoming client-side doesn't force others to be client-side

### 10. Data Dependency Minimization
- **Rule**: Components should only receive the data they need
- **Implementation**: Pass specific data objects, not parent objects with nested relations
- **Example**: Pass `comments` array to `<Comments>`, not entire `post` object

## Performance Rules

### 11. Avoid Waterfall Fetching
- **Rule**: Don't chain dependent requests when data is independent
- **Bad**: Fetching post first, then comments in sequence
- **Good**: Fetching post and comments in parallel

### 12. N+1 Problem Awareness  
- **Rule**: Avoid making individual requests for each item in a list
- **Context**: On list pages, prefer single queries with joins over multiple individual queries
- **Solution**: Use joined queries for list views, but maintain feature separation for detail views

## Exception Handling Rules

### 13. Performance-Critical Joins
- **Rule**: Complex joins are acceptable when performance demands it
- **Requirement**: Must be clearly documented and justified
- **Scope**: Typically for complex pages or performance-critical operations

### 14. Lazy Loading Considerations
- **Rule**: Evaluate if all related data needs to be fetched immediately
- **Alternative**: Consider lazy loading with hidden panes or on-demand fetching
- **Example**: Comments could be loaded on user interaction rather than page load

## Code Organization Best Practices

### 15. Feature Boundary Enforcement
- **Rule**: Prevent feature cross-contamination in components
- **Implementation**: Components should only import from their own feature or shared utilities
- **Monitoring**: Watch for growing import lists from other features

### 16. Scalability Mindset
- **Rule**: These patterns are essential for large projects, optional for small ones
- **Guideline**: Implement feature-based architecture when team size > 3 or codebase > 50 components
- **Benefit**: Easier onboarding, parallel development, and maintenance

## Implementation Checklist

### For Each New Feature:
- [ ] Create dedicated feature folder under `/features/`
- [ ] Separate components and queries into domain-specific files
- [ ] Ensure components only handle their domain data
- [ ] Use composition pattern for complex pages
- [ ] Implement parallel data fetching where possible
- [ ] Document any performance-critical joined queries

### Code Review Checklist:
- [ ] No cross-feature logic contamination
- [ ] Query functions are single-purpose
- [ ] Components receive minimal necessary data
- [ ] Parallel fetching used for independent data
- [ ] Feature boundaries are respected