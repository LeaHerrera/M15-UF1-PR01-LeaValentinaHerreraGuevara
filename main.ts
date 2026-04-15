namespace SpriteKind {
    export const coin = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (myCatSprite.vy == 0) {
        myCatSprite.vy = -125
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.coin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite, effects.rings, 500)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`miMosaico`, function (sprite, location) {
    game.gameOver(false)
})
let coin: Sprite = null
let myCatSprite: Sprite = null
scene.setBackgroundColor(13)
myCatSprite = sprites.create(assets.image`theCat`, SpriteKind.Player)
controller.moveSprite(myCatSprite, 100, 0)
tiles.setCurrentTilemap(tilemap`nivel1`)
myCatSprite.ay = 350
scene.cameraFollowSprite(myCatSprite)
for (let valor of tiles.getTilesByType(assets.tile`money`)) {
    coin = sprites.create(assets.image`coin`, SpriteKind.coin)
    tiles.placeOnTile(coin, valor)
    tiles.setTileAt(valor, assets.tile`transparency16`)
}
