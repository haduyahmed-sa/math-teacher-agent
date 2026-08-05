# Math Teacher AI

## Vision
Math Teacher AI is an intelligent educational platform designed to help teachers create lessons, worksheets, exams, and student performance insights quickly and professionally. The product combines modern AI-assisted workflows with a polished and accessible web experience.

## Goals
- Reduce the time teachers spend preparing instructional materials.
- Provide high-quality educational content aligned with classroom needs.
- Support Arabic-first experiences with a modern and responsive UI.
- Build a scalable foundation for future AI-powered teaching features.
- Deliver a clean and maintainable product architecture.

## Architecture
- Frontend: Next.js App Router with TypeScript.
- Styling: Tailwind CSS.
- UI structure: reusable components with shared layouts.
- Routing: public landing page at `/` and authenticated experience under `/dashboard` and future protected routes.
- State and data: currently static UI and local components; backend integration to be added later.

## Folder Structure
```text
frontend/
  app/
    page.tsx
    layout.tsx
    (app)/
      layout.tsx
      dashboard/page.tsx
  components/
    app-shell/
    dashboard/
  public/
  package.json
```

## Coding Standards
- Use TypeScript for all new components and utilities.
- Keep components small, reusable, and focused on a single responsibility.
- Follow clear naming conventions using descriptive PascalCase component names.
- Prefer functional components and explicit props.
- Keep styles utility-driven with Tailwind CSS.
- Maintain Arabic RTL-friendly layouts and accessible semantics.
- Write production-ready code that is easy to extend.

## UI Guidelines
- Use a modern, calm, and professional visual language.
- Follow a ChatGPT + Notion-inspired aesthetic with soft shadows and rounded surfaces.
- Prioritize clarity, spacing, and readability.
- Support responsive design for mobile, tablet, and desktop.
- Keep a dark-mode-ready foundation in the design system.
- Use Arabic-first copy and RTL alignment.

## AI Architecture
- AI features will be orchestrated through modular services.
- Content generation should be separated from UI rendering.
- Prompt templates and instructional logic should be reusable and configurable.
- AI outputs should be validated and structured before display.
- Future roadmap includes lesson generation, worksheet creation, assessment generation, and student analysis.

## Roadmap
### Phase 1: Foundation
- Landing page
- Dashboard shell
- Shared layout and navigation
- Reusable UI components

### Phase 2: Core AI Features
- Lesson plan generation
- Worksheet generation
- Test generation
- Student analytics summaries

### Phase 3: Experience Enhancements
- Authentication and protected routes
- User profiles and saved content
- Improved personalization and history

### Phase 4: Scale and Quality
- Backend API integration
- Data persistence
- Analytics and feedback loops
- Advanced AI tuning and evaluation
