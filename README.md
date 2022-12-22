# Dots and Lines

[![Continuous Integration](https://github.com/MikeChurvis/DotsAndLines/actions/workflows/ci.yml/badge.svg)](https://github.com/MikeChurvis/DotsAndLines/actions/workflows/ci.yml)

An unordered graph plotter with extra steps.

## Stack

Frontend
- Vite
- React
- TypeScript

Tests
- Vitest
- Playwright

## Versions

### Minimum Viable Product (0.1)

- [X] Project scaffolded (see [checklist](docs/ScaffoldingChecklist.md)).
- [ ] Data structures in place (see [data sketch](docs/DataAndState.md)).
- [ ] Data operations in place (add/move/delete dot, add/remove line).
- [ ] Dots on screen.
- [ ] Lines on screen.
- [ ] In dot mode, Click screen to add dot.
- [ ] In dot mode, Drag dot to move dot.
- [ ] In dot mode, Right-Click dot to delete dot.
- [ ] In line mode, Click dot to select dot. Click a different dot to draw a line to it.
- [ ] In line mode, Drag from one dot to another to draw a line between them.
- [ ] In line mode, Right-Click a line to remove it.

### Save & Load (0.2)

- [ ] Data is serializeable to JSON.
- [ ] Data persists in LocalStorage as JSON string.
- [ ] Autosave on change to data.
- [ ] Export graph data as JSON.
- [ ] Export workspace as ZIP.
- [ ] Import graph data from JSON.
- [ ] Import workspace from ZIP.
- [ ] Save SVG image of workspace.

### Viewport & Background (0.3)

- [ ] Grid on screen.
- [ ] Scroll mousewheel to zoom viewport around cursor.
- [ ] Drag empty part of screen to move viewport.
- [ ] Viewport pan-and-zoom.
- [ ] Add an image to the viewport.
- [ ] In image mode, Drag image to move the image.
- [ ] In image mode, Drag image handles to resize the image.

### Quality of Life Improvements (1.0)

- [ ] Select dot size (small, medium, large)
- [ ] Select line thickness (thin, thick)
- [ ] Center Viewport button.
- [ ] Help sidebar
- [ ] Undo
- [ ] Redo
- [ ] Select multiple dots, drag to move all at once.
- [ ] Selection brush
- [ ] Deselection by holding Alt and painting or clicking.
- [ ] Keyboard pan-and-zoom.
- [ ] Dark mode (toggleable, defaults to user's system preference)
- [ ] High contrast mode (black BG, white dots, white lines)
- [ ] UI size selection (?)
- [ ] Touchscreen support
- [ ] Animations (toggleable, defaults to user's `prefers-reduced-motion` setting)
- [ ] Aesthetics

### Future (1.x)

- [ ] Support multiple images (?)
- [ ] Support layers (?)
- [ ] Colored dots (?)
- [ ] Basic graph analytics (?)

## Resources

Viewport pan-and-zoom: https://codepen.io/mrobin604/pen/yjmrjj

SVG.js library: https://svgjs.dev/docs/3.0/shape-elements/

SVG scaling tips: https://css-tricks.com/scale-svg/