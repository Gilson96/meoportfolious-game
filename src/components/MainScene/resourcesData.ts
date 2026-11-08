import type { ResourceTypes } from "../dataTypes";

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

const QUINCUNX_STEP_X = 34
const QUINCUNX_STEP_Y = 22

// quincunx arragement
const quincunx = (frame: string, fromX: number, toX: number, fromY: number, rows: number, shiftFirstRow = false, scale?: number): ResourceTypes[] =>
    Array.from({ length: rows }, (_, row) => {
        const startX = fromX + ((row + (shiftFirstRow ? 1 : 0)) % 2) * (QUINCUNX_STEP_X / 2)
        const count = Math.floor((toX - startX) / QUINCUNX_STEP_X) + 1
        return Array.from({ length: count }, (_, i) => ({
            frame,
            x: startX + i * QUINCUNX_STEP_X,
            y: fromY + row * QUINCUNX_STEP_Y,
            scale,
        }))
    }).flat()

export const resourcesData: ResourceTypes[] = [
    { frame: 'tree', x: 120, y: 100 },
    { frame: 'tree', x: 220, y: 550 },
    { frame: 'tree', x: 220, y: 100 },
    { frame: 'tree', x: 240, y: 400 },
    { frame: 'tree', x: 700, y: 220 },
    { frame: 'tree', x: 730, y: 420 },
    { frame: 'tree', x: 730, y: 600 },
    { frame: 'tree', x: 940, y: 280 },
    { frame: 'tree', x: 940, y: 380 },
    
    ...fenceRow('south', 40, 1, 252),
    ...fenceRow('south', 40, 2, 310),
    ...fenceRow('south', 40, 1, 485),
    ...fenceColumn('west', 70, 90, 7),
    ...fenceColumn('west', 270, 90, 7),
    ...fenceRow('south', 180, 2, 485),
    ...fenceRow('south', 301, 3, 252),
    ...fenceRow('south', 301, 3, 252),
    ...fenceRow('north', 106, 3, 60),
    ...fenceRow('south', 680, 3, 252),
    ...fenceRow('north', 106, 3, 60),
    ...fenceRow('south', 680, 3, 252),
    ...fenceRow('north', 711, 3, 380),
    ...fenceColumn('west', 680, 407, 8),

    ...quincunx('flower-bush', 18, 190, 332, 6),
    ...quincunx('flower-bush', 80, 110, 100, 8),
    ...quincunx('flower-bush', 300, 440, 120, 5),
    ...quincunx('flower-bush', 680, 750, 270, 2),
    ...quincunx('flower-bush', 750, 910, 120, 5),

    { frame: 'fountain', x: 480, y: 432, collider: { width: 104, height: 74 } },

    { frame: 'lamp-post', x: 412, y: 386, radius: 6 },
    { frame: 'lamp-post', x: 548, y: 386, radius: 6 },
    { frame: 'lamp-post', x: 290, y: 360, radius: 6 },
    { frame: 'lamp-post', x: 290, y: 480, radius: 6 },

    { frame: 'bench', x: 235, y: 460, scale: 1.2, collider: { width: 36, height: 20 } },

    { frame: 'lake', x: 840, y: 500, collider: { width: 250, height: 100 } },
   
    { frame: 'rocks', x: 700, y: 410, radius: 6, scale: 0.7 },
    { frame: 'rocks', x: 700, y: 430, radius: 6, scale: 0.7 },
    { frame: 'rocks', x: 700, y: 450, radius: 6, scale: 0.7 },
    { frame: 'rocks', x: 885, y: 380, radius: 6, scale: 0.7 },
    { frame: 'rocks', x: 910, y: 380, radius: 6, scale: 0.7 },
]
