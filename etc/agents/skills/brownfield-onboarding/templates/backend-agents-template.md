# Backend Agent Constitution - [Project Name]

> Guidelines for AI agents working on backend code.
> Last updated: [Date]

## Backend Context

### Technology Stack
- **Language**: [Python/Node.js/Rust/Go/etc.]
- **Framework**: [Django/Express/Axum/FastAPI/etc.]
- **Version**: [version]
- **Database**: [PostgreSQL/MongoDB/MySQL/etc.]
- **ORM**: [SQLAlchemy/Prisma/TypeORM/etc.]
- **Cache**: [Redis/Memcached/None]
- **Message Queue**: [RabbitMQ/Kafka/SQS/None]

### Project Structure
```
[Backend directory structure]
```

## Backend Coding Principles

### API Design

1. **Endpoint Naming**
   - [RESTful conventions or other pattern]
   - [Versioning strategy]
   - [Naming conventions]

2. **Request/Response Format**
   ```json
   {
     "success": true,
     "data": {},
     "error": null,
     "meta": {}
   }
   ```

3. **HTTP Status Codes**
   - 200: [usage]
   - 201: [usage]
   - 400: [usage]
   - 401: [usage]
   - 403: [usage]
   - 404: [usage]
   - 500: [usage]

4. **Authentication/Authorization**
   - [Auth mechanism: JWT/Session/OAuth]
   - [How to protect endpoints]
   - [Permission checking pattern]

### Data Handling

1. **Database Access**
   - [ORM usage patterns]
   - [Transaction handling]
   - [Query optimization guidelines]

2. **Data Validation**
   - [Validation library and approach]
   - [Where validation happens]
   - [Error message format]

3. **Data Serialization**
   - [Serializer/DTO pattern]
   - [Handling nested data]
   - [Sensitive data filtering]

### Business Logic

1. **Service Layer**
   - [Location and organization]
   - [Service responsibilities]
   - [Dependency injection pattern]

2. **Domain Models**
   - [Model organization]
   - [Model methods vs. service methods]
   - [Model relationships]

3. **Error Handling**
   ```python
   # Example error handling pattern
   try:
       # business logic
   except SpecificError as e:
       # handle and log
   ```

### Patterns to Follow

- ✅ [Pattern 1]: [Description]
- ✅ [Pattern 2]: [Description]
- ✅ [Pattern 3]: [Description]

### Anti-Patterns to Avoid

- ❌ [Anti-pattern 1]: [Why and alternative]
- ❌ [Anti-pattern 2]: [Why and alternative]

## Security Guidelines

- **Input Validation**: [Always validate and sanitize input]
- **SQL Injection Prevention**: [Use parameterized queries]
- **XSS Prevention**: [Output encoding requirements]
- **CSRF Protection**: [Token/header requirements]
- **Secrets Management**: [Environment variables, vault usage]
- **Rate Limiting**: [Implementation approach]

## Performance Guidelines

- **N+1 Query Prevention**: [Eager loading patterns]
- **Caching Strategy**: [What to cache and when]
- **Async Operations**: [When to use async/background jobs]
- **Database Indexing**: [Index strategy and guidelines]

## Testing Guidelines

- **Unit Tests**: [Service and model testing]
- **Integration Tests**: [API endpoint testing]
- **Database Tests**: [Test database usage]
- **Mocking Strategy**: [External service mocking]

## Logging & Monitoring

### Logging Standards
```python
# Example logging pattern
logger.info("User action", extra={
    "user_id": user.id,
    "action": "login",
    "ip": request.ip
})
```

### What to Log
- Authentication events
- Error conditions
- Performance metrics
- Business-critical operations

### What NOT to Log
- Passwords or secrets
- PII (unless anonymized)
- Full request/response bodies (unless debugging)

## For AI Agents: Backend Validation

When making backend changes:
- [ ] API follows project conventions
- [ ] Input validation implemented
- [ ] Error handling comprehensive
- [ ] Tests cover happy + error paths
- [ ] No SQL injection vulnerabilities
- [ ] Secrets not hardcoded
- [ ] Logging added for important operations
- [ ] Database migrations created if needed
