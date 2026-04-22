enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const coin = SpriteKind.create()
    export const goal = SpriteKind.create()
}
function startTarget () {
    scene.setBackgroundColor(11)
    tiles.placeOnRandomTile(userSprite, assets.tile`miMosaico6`)
    goal = sprites.create(assets.image`computer`, SpriteKind.goal)
    tiles.placeOnRandomTile(goal, assets.tile`tileForBook`)
    for (let valor of tiles.getTilesByType(assets.tile`money`)) {
        book = sprites.create(assets.image`libro`, SpriteKind.coin)
        tiles.placeOnTile(book, valor)
        tiles.setTileAt(valor, assets.tile`transparency16`)
    }
}
function initialDialogue () {
    scene.setBackgroundColor(1)
    game.setDialogCursor(assets.image`user`)
    game.setDialogFrame(img`
        .....cccccccccccccc.....
        ...cbd111111111111dbc...
        ..cd1111111111111111dc..
        .cd111111111111111111dc.
        .b11111111111111111111b.
        cd11111111111111111111dc
        c1111111111111111111111c
        c1111111111111111111111c
        c1111111111111111111111c
        c1111111111111111111111c
        c1111111111111111111111c
        c1111111111111111111111c
        c1111111111111111111111c
        c1111111111111111111111c
        c1111111111111111111111c
        c1111111111111111111111c
        cd11111111111111111111dc
        cb11111111111111111111bc
        ccd111111111111111111dc.
        .ccd1111111111111111dcc.
        ..c111111111111111dbcc..
        .b11dcccccccccccccccc...
        cddcccccccccccccccc.....
        ccccc...................
        `)
    game.showLongText("¡Hola!              ¿Como está?", DialogLayout.Bottom)
    game.showLongText("¡Me alegro muchisimo! Ojala poder decir lo mismo pero a pesar de hacer un dia precioso tengo muchas cosas que hacer...", DialogLayout.Full)
    game.showLongText("¿Como? ¿Quieres ayudarme? ¡Gracias! eres muy amable, me alegro de haberte encontrado por aqui ¡No se que hubiera echo sin ti!", DialogLayout.Full)
    game.showLongText("Necesito ayuda con los deberes, debo recolectar todas las tareas y mandarselas a mi profesor, mediante el ordenador", DialogLayout.Full)
    game.showLongText("Recuerda, no siempre todo es lo que parece ;) ", DialogLayout.Bottom)
    game.showLongText("¡Gracias por la ayuda!", DialogLayout.Bottom)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (userSprite.isHittingTile(CollisionDirection.Bottom)) {
        userSprite.vy = -150
    } else if (jump == 0) {
        userSprite.vy = -150
        jump = 1
    }
})
function recetNextLevel () {
    game.splash("NEXT LEVEL - ", level + 1)
    music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.InBackground)
    info.setScore(0)
    level = level + 1
    sprites.destroyAllSpritesOfKind(SpriteKind.coin)
    sprites.destroyAllSpritesOfKind(SpriteKind.goal)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.coin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite, effects.smiles, 1000)
    music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
})
function finishGame () {
    music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.InBackground)
    game.setDialogCursor(assets.image`user`)
    game.setDialogFrame(img`
        .....cccccccccccccc.....
        ...cbd111111111111dbc...
        ..cd1111111111111111dc..
        .cd111111111111111111dc.
        .b11111111111111111111b.
        cd11111111111111111111dc
        c1111111111111111111111c
        c1111111111111111111111c
        c1111111111111111111111c
        c1111111111111111111111c
        c1111111111111111111111c
        c1111111111111111111111c
        c1111111111111111111111c
        c1111111111111111111111c
        c1111111111111111111111c
        c1111111111111111111111c
        cd11111111111111111111dc
        cb11111111111111111111bc
        ccd111111111111111111dc.
        .ccd1111111111111111dcc.
        ..c111111111111111dbcc..
        .b11dcccccccccccccccc...
        cddcccccccccccccccc.....
        ccccc...................
        `)
    game.splash("¡Felicidades! ", "Gracias a ti he podido entregar todos los trabajos :D")
    info.changeScoreBy((lista.length - 1) * 10)
    game.gameOver(true)
}
function nextLevel () {
    lista = [
    tilemap`nivel7`,
    tilemap`nivel1`,
    tilemap`nivel4`,
    tilemap`nivel5`
    ]
    return lista[level]
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.goal, function (sprite, otherSprite) {
    if (info.score() >= 10) {
        if (level < lista.length - 1) {
            recetNextLevel()
            tiles.setCurrentTilemap(nextLevel())
            startTarget()
        } else if (level == lista.length - 1) {
            finishGame()
        }
    } else {
        userSprite.sayText("Me faltan libros :(", 1000, false)
    }
})
let lista: tiles.TileMapData[] = []
let jump = 0
let book: Sprite = null
let goal: Sprite = null
let userSprite: Sprite = null
let level = 0
initialDialogue()
level = 0
userSprite = sprites.create(assets.image`user`, SpriteKind.Player)
scene.cameraFollowSprite(userSprite)
userSprite.ay = 350
info.setScore(0)
controller.moveSprite(userSprite, 100, 0)
tiles.setCurrentTilemap(nextLevel())
startTarget()
forever(function () {
    if (userSprite.isHittingTile(CollisionDirection.Bottom)) {
        jump = 0
    }
})
