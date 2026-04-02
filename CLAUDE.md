# Website Project Instructions

## Git Workflow

After every `git push` to the feature branch (`claude/blue-rectangle-colors-ZBg35`), always merge the changes into `main` and push:

```
git checkout main
git pull origin main
git merge claude/blue-rectangle-colors-ZBg35
git push -u origin main
git checkout claude/blue-rectangle-colors-ZBg35
```

Do this automatically every time without waiting to be asked.
