import type { ResourceTypes } from "../dataTypes";

// flower sprites are 28px wide, so a run of them lines up edge to edge
const row = (frame: string, fromX: number, toX: number, y: number, step = 28): ResourceTypes[] => {
    const items: ResourceTypes[] = []
    for (let x = fromX; x <= toX; x += step) items.push({ frame, x, y })
    return items
}

const FENCE_STEP = 61
const FENCE_SIDE_STEP = 27

const fenceRow = (facing: 'north' | 'south', fromX: number, count: number, y: number): ResourceTypes[] =>
    Array.from({ length: count }, (_, i) => ({
        frame: `fence-${facing}`,
        x: fromX + i * FENCE_STEP,
        y,
        collider: { width: FENCE_STEP, height: 10 },
    }))

const fenceColumn = (facing: 'east' | 'west', x: number, fromY: number, count: number): ResourceTypes[] =>
    Array.from({ length: count }, (_, i) => ({
        frame: `fence-${facing}`,
        x,
        y: fromY + i * FENCE_SIDE_STEP,
        collider: { width: 10, height: FENCE_SIDE_STEP },
    }))

export const resourcesData: ResourceTypes[] = [
    // tree line along the top edge, peeking in from off the map
    { frame: 'tree', x: 330, y: 66 },
    { frame: 'tree', x: 495, y: 84 },
    { frame: 'tree', x: 690, y: 45 },
    { frame: 'tree', x: 925, y: 100 },

    // trees in the gaps between buildings
    { frame: 'tree', x: 335, y: 170 },
    { frame: 'tree', x: 703, y: 128 },
    { frame: 'tree', x: 955, y: 200 },
    // { frame: 'tree', x: 960, y: 330 },

    // back fences behind the clothes shop and the pizza shop, posts flush with the shop walls
    ...fenceRow('north', 106, 3, 60),
    ...fenceRow('south', 680, 3, 252),
    // fence and flower bed lining the road between the clothes shop and the house
    ...fenceColumn('west', 270, 90, 7),
    ...fenceRow('south', 301, 3, 252),
    { frame: 'flower-bush', x: 290, y: 200 },
    { frame: 'flower-bush', x: 410, y: 198 },

    // fence and flowers by the road left of the clothes shop
    ...fenceRow('south', 40, 1, 252),
    ...fenceColumn('west', 70, 90, 7),
    { frame: 'flower-bush', x: 40, y: 60 },
    { frame: 'flower-bush', x: 15, y: 60 },
    { frame: 'flower-bush', x: 30, y: 70 },
    { frame: 'flower-bush', x: 20, y: 30 },
    { frame: 'flower-bush', x: 20, y: 120 },
    { frame: 'flower-bush', x: 58, y: 100 },
    { frame: 'flower-bush', x: 58, y: 150 },
    { frame: 'flower-bush', x: 30, y: 192 },
    { frame: 'flower-bush', x: 58, y: 198 },
    { frame: 'flower-bush', x: 26, y: 150 },
    { frame: 'flower-bush', x: 20, y: 300 },
    { frame: 'flower-bush', x: 48, y: 308 },

    // // fenced flower garden on the west side, open at the bottom right onto the road
    // ...fenceRow('north', 101, 3, 342),
    // ...fenceColumn('west', 70, 369, 6),
    // ...fenceColumn('east', 253, 369, 4),
    // ...fenceRow('south', 101, 2, 531),
    // ...row('flower-bush', 96, 232, 392, 34),
    // ...row('flower-bush', 96, 232, 440, 34),
    // ...row('flower-bush', 96, 198, 488, 34),
    // { frame: 'tree', x: 10, y: 400 },
    // { frame: 'tree', x: 5, y: 520 },
    // { frame: 'tree', x: 30, y: 620 },

    // fountain in the middle of the plaza; its pivot is the centre of the basin
    { frame: 'fountain', x: 480, y: 432, collider: { width: 100, height: 70 } },

    // flowers between the house and the pizza shop
    { frame: 'flower-bush', x: 690, y: 278 },
    { frame: 'flower-bush', x: 718, y: 284 },
    { frame: 'flower-bush', x: 950, y: 278 },

    // east meadow: fence along the road and down its west side, and a lake
    ...fenceRow('north', 711, 3, 380),
    ...fenceColumn('west', 680, 407, 8),
    // the lake's pivot is its centre, so the collider covers the water inside the stone rim
    { frame: 'lake', x: 840, y: 500, collider: { width: 250, height: 100 } },
]
