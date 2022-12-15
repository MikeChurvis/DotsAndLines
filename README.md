# Dots and Lines

An unordered graph plotter with extra steps.

## Modes

Image mode:
- Left-Click + Drag to move image.
- Right-Click image to remove it.
- Left-Click + Drag image corner handle to resize image.

Dot mode: 
- Left-Click to place a dot.
- Left-Click + Drag a dot to move it. 
- Right-Click a dot to remove it.

Line mode:
- Left-Click a dot to select it.
- With a dot selected, Left-Click a different dot to draw a line between them.
- Right-Click a line to remove it.

## Data and State

Graph data stored in LocalStorage by default.
Save graph file.
Load graph file.

Data scheme: JSON is the easiest. Let's see how far it takes us.

### Graph Data Structure Candidates 

**Adjacency List**

```json
{
    "dots": {
        "key-1": [10, 10],
        "key-2": [20, 20],
        "key-3": [0, 30]
    },
    "lines": {
        "key-1": ["key-2"],
        "key-2": ["key-1", "key-3"],
        "key-3": ["key-2"]
    }
}
```

We maintain a two-way edge map. If the mapping were one-way, then whenever a node is deleted, every edge would need to be searched for that node's key. 

Computing whether or not there is an edge can be done in O(1) time (`lines[key].length > 0`).

Note: while the JSON representation for lines is an array, the in-memory representation will be a Set object to facilitate fast lookups.

**Adjacency matrix.**

```json
{
    "dots": [
        [0, 0],
        [10, 0],
        [10, 10],
        [0, 10]
    ],
    "lines": [
        true,
        false, true,
        false, true, false,
    ]
}
```

The adjacency matrix is triangular. Its size is always n*(n-1)/2 where n is the number of dots. This means O(n^2) space growth. That alone is a dealbreaker; I want to support an arbitrary number of points, and quadratic growth is not good for that.

#### Conclusion

We'll use an **adjacency list.**

### Graph Operations Pseudocode

#### Add a dot

```ts
// Generate an ID for the dot. Make sure the ID isn't in use.
do {const dotId = generateDotId()}
while (dots.hasOwnProperty(dotId))

// Add the dot and a place for its lines.
dots[dotId] = [posX, posY]
lines[dotId] = new Set()
```

#### Add a line

```ts
// Both dots always know what lines they have.
lines[dotAId].add(dotBId)
lines[dotBId].add(dotAId)
```

#### Delete a dot

```ts
// Find doomedDot's neighbors.
let neighborIds = lines[doomedDotId]

// Cut lines pointing to doomedDot.
for (let neighborId in neighborIds) {
    dots[neighborId].delete(doomedDotId)
}

// Cut lines pointing away from doomedDot.
lines.delete(doomedDotId)

// Destroy doomedDot.
dots.delete(doomedDotId)
```

#### Delete a line
```ts
// Cut the line from both ends.
lines[dotAId].remove(dotBId)
lines[dotBId].remove(dotAId)
```

Note: this operation requires that the line knows which dots it's connected to. This will be handled at the presentation/interaction layer: Each line SVG object will have data attributes containing the IDs of its corresponding dots.

## Versioning

### Minimum Viable Product (0.1)

- [ ] Project scaffolded.
- [ ] Data structures in place.
- [ ] Data operations in place (add/move/delete dot, add/remove line).
- [ ] Dots on screen.
- [ ] Lines on screen.
- [ ] In dot mode, Click screen to add dot.
- [ ] In dot mode, Drag dot to move dot.
- [ ] In dot mode, Right-Click dot to delete dot.
- [ ] In line mode, Click dot to select dot. Click a different dot to draw a line to it.
- [ ] In line mode, Drag from one dot to another to draw a line between them.
- [ ] In line mode, Right-Click a line to remove it.

### Save and Load (0.2)

- [ ] Data is serializeable to JSON.
- [ ] Data persists in LocalStorage as JSON string.
- [ ] Autosave on change to data.
- [ ] Export graph data as JSON.
- [ ] Export workspace as ZIP.
- [ ] Import graph data from JSON.
- [ ] Import workspace from ZIP.
- [ ] Save SVG image of workspace.

### Canvas Manipulation (0.3)

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