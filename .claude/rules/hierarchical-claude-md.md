# Hierarchical CLAUDE.md Standards

This document defines the standards for hierarchical CLAUDE.md files in the project.

## Priority Order

CLAUDE.md files are processed in the following priority order (highest to lowest):

1. `./CLAUDE.md` - Project-specific CLAUDE.md
2. `./.claude/rules/*.md` - Rule files in .claude/rules/ directory
3. `~/.claude/CLAUDE.md` - Global CLAUDE.md in user's home directory
4. `./CLAUDE.local.md` - Local overrides (should be gitignored)

## Rule File Naming Convention

All rule files in `.claude/rules/` should follow this naming pattern:
- `[topic]-standards.md` (e.g., `error-handling-standards.md`, `testing-standards.md`)
- Use kebab-case for multi-word topics
- Be descriptive but concise

## Rule File Structure

Each rule file should follow this structure:

```markdown
# [Rule Topic] Standards

Brief description of what this rule covers.

## Requirements

- Specific requirement 1
- Specific requirement 2
- etc.

## Best Practices

- Best practice 1
- Best practice 2
- etc.

## Examples

```typescript
// Example code showing proper implementation
```

## References

- Link to relevant documentation
- Link to related issues or discussions
```

## Implementation Guidelines

1. Rule files should be focused on a single topic
2. Avoid duplication between rule files
3. When in doubt, create a new rule file rather than adding to an existing one
4. Rule files should be readable and actionable
5. Include concrete examples when possible
6. Reference external standards or documentation when applicable

## Updates and Maintenance

- Review rule files quarterly for relevance
- Remove outdated rules
- Consolidate related rules when appropriate
- Ensure all team members are aware of new or updated rules