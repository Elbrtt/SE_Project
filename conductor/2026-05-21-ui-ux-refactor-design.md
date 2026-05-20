# Design Document: UI Component Standardization & Steam Overhaul

## 1. Rationale & Objectives
The goal is to provide a consistent and premium user experience by aligning diverse game card components into a unified visual structure. Additionally, the design will lean into "Steam" aesthetic patterns—characterized by high-contrast layouts, immersive hover states, and clear action hierarchies—to improve user familiarity and engagement.

## 2. Component Specifications

### 2.1 Game Cards (Unified)
- **Structure**:
  - `image-container`: Aspect ratio 16:9 or similar, with overlaid status badges (e.g., "OWNED").
  - `info-block`: Title (prominent), Category (subtle), and Action Area.
- **Action Area**:
  - Contextual buttons based on state (Discover: "Own Now"; Library: "Download" or "Play").
- **Visuals**:
  - Darker card backgrounds with subtle borders.
  - Accent colors for primary actions (Steam blue/green inspirations).

### 2.2 Friends Container
- **Cleanup**: Remove `friend-actions` from the container level.
- **Organization**: Ensure cards are laid out in a clean vertical list with consistent spacing.

## 3. Decision Matrix

| Decision | Selection | Rationale |
| :--- | :--- | :--- |
| **Refactor Strategy** | Unified Structure | Maintains separation of concerns for Discover/Library logic while ensuring visual parity. |
| **Steam Aesthetic** | Full Overhaul | Provides a more immersive and "pro" feel to the application. |

## 4. Verification Criteria
- [ ] Card structure is identical across Discover and Library pages.
- [ ] "Steam-like" hover effects are present and performant.
- [ ] Friends list container is free of redundant action-related classes.
