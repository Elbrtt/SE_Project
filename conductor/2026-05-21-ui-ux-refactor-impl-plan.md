# Implementation Plan - UI Component Standardization & Steam Overhaul

## Objective
Standardize the `game-card` and `library-game-card` components into a unified visual structure and adopt a "Full Overhaul" Steam-inspired aesthetic. Cleanup the `friends-container` by removing redundant class logic.

## Key Files & Context
- `src/services/app.js`: Contains `renderFriendsList` logic.
- `src/services/gameLibraryService.js`: Contains `createGameCard` and `renderLibraryGames` templates.
- `src/styles/components/cards.css`: Main stylesheet for card components.
- `src/styles/pages/friends.css`: Styles for the friends page components.

## Implementation Steps

### Phase 1: Friends Container Cleanup
1.  **Refactor `renderFriendsList`**: In `src/services/app.js`, ensure `friends-container` does not have redundant classes.
2.  **Verify Styles**: Check `friends.css` for any accidental definitions that need removal.

### Phase 2: Game Card Structural Alignment
1.  **Refactor `createGameCard`**: In `src/services/gameLibraryService.js`, update the HTML template to match the `library-game-card` structure (Image top, Info block bottom).
2.  **Refactor `renderLibraryGames`**: Ensure the library card template is consistent with the new unified structure.

### Phase 3: Steam "Full Overhaul" Styling
1.  **Update `cards.css`**:
    -   Define a common base for all game cards.
    -   Implement Steam-like hover effects (scaling, glow).
    -   Update buttons (`own-btn`, `play-btn`) to use Steam-inspired gradients and border treatments.
    -   Add status treatments (Downloading progress, Owned badge) with Steam-like styling.

## Verification & Testing
- **Visual Audit**: Verify cards on the Discover page match the structure of the Library page.
- **Interactivity Test**: Ensure "Own Now", "Download", and "Play" buttons function correctly after structural changes.
- **Friends Page Test**: Confirm the friends list renders correctly without the redundant classes.
