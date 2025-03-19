
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

    //%blockid=begin_getspritehitthewallsprite
    //%block="get $cursprite hitting $hittedsprite in wacking hitbox $wackinghitbox|| but get push by dx: $dx dy: $dy"
    //%cursprite.shadow=variables_get cursprite.defl=mySprite
    //%hittedsprite.shadow=variables_get hittedsprite.defl=otherSprite
    //%wackinghitbox.shadow=toggleYesNo
    //%weight=90
    export function HitCollision(cursprite: Sprite, hittedsprite: Sprite, wackinghitbox: boolean, dx: number = 0, dy: number = 0) {
        let CurSprite = cursprite
        let HittedSprite = hittedsprite
        if (CurSprite.overlapsWith(HittedSprite)) {
            if (CurSprite.vy == 0 && CurSprite.vx != 0) {
                if (CurSprite.vx > 0 && CurSprite.right > HittedSprite.left) {
                    if (dx > 0) {
                        if (wackinghitbox) {
                            HitboxKick(cursprite, hittedsprite, 1, 0)
                            HittedSprite.left = CurSprite.right - Math.abs(cursprite.data["Dx"])
                        } else {
                            HittedSprite.left = CurSprite.right
                        }
                    } else {
                        if (wackinghitbox) {
                            HitboxKick(cursprite, hittedsprite, -1, 0)
                            CurSprite.left += 0 - Math.abs(cursprite.data["Dx"])
                        } else {
                            CurSprite.left += 0 - Math.abs(CurSprite.right - HittedSprite.left)
                        }
                        CurSprite.vx = 0
                    }
                } else if (CurSprite.vx < 0 && CurSprite.left < HittedSprite.right) {
                    if (dx < 0) {
                        if (wackinghitbox) {
                            HitboxKick(cursprite, hittedsprite, -1, 0)
                            HittedSprite.right = CurSprite.left + Math.abs(cursprite.data["Dx"])
                        } else {
                            HittedSprite.right = CurSprite.left
                        }
                    } else {
                        if (wackinghitbox) {
                            HitboxKick(cursprite, hittedsprite, 1, 0)
                            CurSprite.right += Math.abs(cursprite.data["Dx"])
                        } else {
                            CurSprite.right += Math.abs(CurSprite.left - HittedSprite.right)
                        }
                        CurSprite.vx = 0
                    }
                }
            } else if (CurSprite.vy != 0 && CurSprite.vx == 0) {
                if (CurSprite.vy > 0 && CurSprite.bottom > HittedSprite.top) {
                    if (dy > 0) {
                        if (wackinghitbox) {
                            HitboxKick(cursprite, hittedsprite, 0, 1)
                            HittedSprite.top = CurSprite.bottom - Math.abs(cursprite.data["Dy"])
                        } else {
                            HittedSprite.top = CurSprite.bottom
                        }
                    } else {
                        if (wackinghitbox) {
                            HitboxKick(cursprite, hittedsprite, 0, -1)
                            CurSprite.bottom += 0 - Math.abs(cursprite.data["Dy"])
                        } else {
                            CurSprite.bottom += 0 - Math.abs(CurSprite.right - HittedSprite.left)
                        }
                        CurSprite.vy = 0
                    }
                } else if (CurSprite.vy < 0 && CurSprite.top < HittedSprite.bottom) {
                    if (dy < 0) {
                        if (wackinghitbox) {
                            HitboxKick(cursprite, hittedsprite, 0, -1)
                            HittedSprite.bottom = CurSprite.top + Math.abs(cursprite.data["Dy"])
                        } else {
                            HittedSprite.bottom = CurSprite.top
                        }
                    } else {
                        if (wackinghitbox) {
                            HitboxKick(cursprite, hittedsprite, 0, 1)
                            CurSprite.top += Math.abs(cursprite.data["Dy"])
                        } else {
                            CurSprite.top += Math.abs(CurSprite.left - HittedSprite.right)
                        }
                        CurSprite.vy = 0
                    }
                }
            }
        }
    }

    function HitboxKick(ucursprite: Sprite, uhittedsprite: Sprite, Dx: number, Dy: number) {
        ucursprite.data["Dx"] = Math.abs(ucursprite.right - uhittedsprite.left)
        ucursprite.data["Dy"] = Math.abs(ucursprite.bottom - uhittedsprite.top)
        if (Dx < 0) {
            ucursprite.data["Dx"] = Math.abs(ucursprite.left - uhittedsprite.right)
        }
        if (Dy < 0) {
            ucursprite.data["Dy"] = Math.abs(ucursprite.top - uhittedsprite.bottom)
        }
        while (!(uhittedsprite.image.overlapsWith(ucursprite.image, ucursprite.data["Dx"] + Dx, ucursprite.data["Dy"] + Dy))) {
            ucursprite.data["Dx"] += Dx
            ucursprite.data["Dy"] += Dy
        }
        while (uhittedsprite.image.overlapsWith(ucursprite.image, ucursprite.data["Dx"] - Dx, ucursprite.data["Dy"] - Dy)) {
            ucursprite.data["Dx"] -= Dx
            ucursprite.data["Dy"] -= Dy
        }
    }
    
}
