
//%block="Begin"
//%icon="\uf0c6" color="#2f0eeb"
namespace begin {

    //%blockid=begin_getspriteonlocation
    //%block="get sprite of kind $kind on $location"
    //%location.shadow=mapgettile
    //%kind.shadow=spritekind
    //%weight=100
    export function getSpriteOnTilemapLocation(kind: number, location: tiles.Location) {
        for (let sprv of sprites.allOfKind(kind)) {
            const sprloc = sprv.tilemapLocation()
            if (sprloc.col == location.col && sprloc.row == location.row) return sprv
        }
        return undefined
    }

    //%blockid=begin_getspriteonsprite
    //%block="get sprite of kind $kind on $uspr location"
    //%kind.shadow=spritekind
    //%uspr.shadow=variables_get uspr.defl=mySprite
    //%weight=99
    export function getSpriteOnSpriteLocation(kind: number, uspr: Sprite) {
        const usprloc = uspr.tilemapLocation()
        for (let sprv of sprites.allOfKind(kind)) {
            const sprvloc = sprv.tilemapLocation()
            if (usprloc.col == sprvloc.col && usprloc.row == sprvloc.row) return sprv
        }
        return undefined
    }

    //%blockid=begin_getspriteonspriteoverlap
    //%block="get sprite of kind $kind on $uspr overlaps"
    //%kind.shadow=spritekind
    //%uspr.shadow=variables_get uspr.defl=mySprite
    //%weight=98
    export function getSpriteOnSpriteoverlap(kind: number, uspr: Sprite) {
        for (let sprv of sprites.allOfKind(kind)) {
            if (sprv.overlapsWith(uspr)) return sprv
        }
        return undefined
    }
    
}
