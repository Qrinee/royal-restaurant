# Royal Restaurant - Developer Guide

## Project Overview

This is a Next.js restaurant website with an admin panel. The project includes:
- Public website with menu, about, events, and gallery sections
- Admin panel for managing content (in development)

## Project Structure

```
royal-restaurant/
├── app/                    # Next.js App Router pages
│   ├── components/        # Reusable React components
│   │   ├── Navigation.js       # Shared navigation header
│   │   ├── MenuSection.js      # Menu display section
│   │   ├── MenuCategory.js    # Collapsible menu category
│   │   ├── Footer.js          # Site footer
│   │   ├── AboutSection.js    # About restaurant section
│   │   ├── EventsSection.js   # Events section
│   │   ├── InstagramSection.js # Instagram gallery
│   │   └── AdminLayout.js     # Admin panel layout
│   │
│   ├── page.js            # Home page
│   ├── layout.js          # Root layout
│   ├── globals.css        # Global styles & CSS variables
│   │
│   ├── menu/              # Menu page
│   ├── logowanie-admin/   # Admin login
│   ├── panel-admin-glowny/ # Admin dashboard
│   └── zarzadzanie-*/    # Admin management pages
│
├── lib/                   # Shared libraries
│   ├── constants/         # App constants
│   │   └── restaurant.js      # Restaurant configuration
│   ├── data/             # Data files
│   │   └── menuData.js        # Menu items data
│   └── theme.js          # Theme configuration
│
├── public/               # Static assets
│   ├── images/
│   └── ig/               # Instagram images
│
└── docs/                 # Documentation
    └── DEVELOPER_GUIDE.md
```

## Key Concepts

### 1. CSS Variables (Theme)

All colors and design tokens are defined in [`app/globals.css`](app/globals.css). Always use these variables instead of hardcoded colors:

```css
/* Available CSS variables */
--background      /* Main background */
--foreground      /* Primary text */
--foreground-secondary
--foreground-muted
--accent          /* Primary accent color */
--secondary       /* Secondary color */
--white
--black
```

### 2. Menu Data

All menu items are stored in [`lib/data/menuData.js`](lib/data/menuData.js). 
**Never hardcode menu items in page files.** Instead:

```javascript
// Import from centralized data
import { MENU_CATEGORIES } from "@/lib/data/menuData";
import { SALADS, MAIN_COURSES } from "@/lib/data/menuData";
```

### 3. Constants

Use constants from [`lib/constants/restaurant.js`](lib/constants/restaurant.js) for:
- Restaurant info (address, phone, email)
- Opening hours
- Routes

```javascript
import { RESTAURANT_INFO, OPENING_HOURS, ROUTES } from "@/lib/constants/restaurant";
```

## Component Guidelines

### Creating New Components

1. Create components in `app/components/`
2. Add JSDoc comments with description
3. Export both named exports and default export when appropriate

```javascript
/**
 * ComponentName Component
 * 
 * Brief description of what this component does.
 * 
 * @param {Object} props
 * @param {string} props.example - Example prop
 */
export default function ComponentName({ example }) {
  return <div>{example}</div>;
}
```

### Reusable Patterns

- Use the [`MenuCategory`](app/components/MenuCategory.js) component for menu sections
- Use the [`AdminLayout`](app/components/AdminLayout.js) for admin pages
- Use CSS variables instead of hardcoded colors

## Working with Pages

### Adding a New Public Page

1. Create folder in `app/` with `page.js`
2. Import shared components as needed
3. Use CSS variables for styling

### Adding a New Admin Page

1. Create folder in `app/` with `page.js`
2. Wrap content with `AdminLayout`:

```javascript
import AdminLayout from "@/app/components/AdminLayout";

export default function NewAdminPage() {
  return (
    <AdminLayout title="Page Title">
      {/* Your content */}
    </AdminLayout>
  );
}
```

## Styling Guidelines

### Do's

✅ Use CSS variables:
```javascript
className="bg-[var(--background)] text-[var(--foreground)]"
```

✅ Use Tailwind classes for layout and spacing

✅ Keep components small and focused

### Don'ts

❌ Don't use hardcoded colors:
```javascript
// BAD
className="bg-blue-500 text-gray-700"

// GOOD
className="bg-[var(--accent)] text-[var(--foreground)]"
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Common Issues

### Theme Colors Not Matching

If colors don't match between CSS and JS:
1. Check [`app/globals.css`](app/globals.css) CSS variables
2. Check [`lib/theme.js`](lib/theme.js) - these should match
3. Update both files if needed

### Menu Not Updating

All menu data is in [`lib/data/menuData.js`](lib/data/menuData.js).
Do not manually edit menu in page files - it should be imported from there.

## Technology Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS 4
- **Fonts**: Geist Sans/Mono, Playfair Display
- **Language**: JavaScript

## Getting Help

- Check existing components in `app/components/`
- Review the constants in `lib/constants/`
- Look at existing page implementations

---

*Last updated: 2026-03-18*
