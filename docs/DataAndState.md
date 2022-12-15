# Data and State

Graph data stored in LocalStorage by default.
Save graph file.
Load graph file.

Data scheme: JSON is the easiest. Let's see how far it takes us.

## Graph Data Structure Candidates 

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

### Conclusion

We'll use an **adjacency list.**

## Graph Operations Pseudocode

### Add a dot

```ts
// Generate an ID for the dot. Make sure the ID isn't in use.
do {const dotId = generateDotId()}
while (dots.hasOwnProperty(dotId))

// Add the dot and a place for its lines.
dots[dotId] = [posX, posY]
lines[dotId] = new Set()
```

### Add a line

```ts
// Both dots always know what lines they have.
lines[dotAId].add(dotBId)
lines[dotBId].add(dotAId)
```

### Delete a dot

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

### Delete a line
```ts
// Cut the line from both ends.
lines[dotAId].remove(dotBId)
lines[dotBId].remove(dotAId)
```

Note: this operation requires that the line knows which dots it's connected to. This will be handled at the presentation/interaction layer: Each line SVG object will have data attributes containing the IDs of its corresponding dots.