class ActionKind(Enum):
    Walking = 0
    Idle = 1
    Jumping = 2
@namespace
class SpriteKind:
    coin = SpriteKind.create()
    goal = SpriteKind.create()
def startTarget():
    global goal2, book
    scene.set_background_color(11)
    tiles.place_on_random_tile(userSprite, assets.tile("""
        miMosaico6
        """))
    goal2 = sprites.create(assets.image("""
        computer
        """), SpriteKind.goal)
    tiles.place_on_random_tile(goal2, assets.tile("""
        tileForBook
        """))
    for valor in tiles.get_tiles_by_type(assets.tile("""
        money
        """)):
        book = sprites.create(assets.image("""
            libro
            """), SpriteKind.coin)
        tiles.place_on_tile(book, valor)
        tiles.set_tile_at(valor, assets.tile("""
            transparency16
            """))
def initialDialogue():
    scene.set_background_color(1)
    game.set_dialog_cursor(assets.image("""
        user
        """))
    game.set_dialog_frame(img("""
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
        """))
    game.show_long_text("¡Hola!              ¿Como está?", DialogLayout.BOTTOM)
    game.show_long_text("¡Me alegro muchisimo! Ojala poder decir lo mismo pero a pesar de hacer un dia precioso tengo muchas cosas que hacer...",
        DialogLayout.FULL)
    game.show_long_text("¿Como? ¿Quieres ayudarme? ¡Gracias! eres muy amable, me alegro de haberte encontrado por aqui ¡No se que hubiera echo sin ti!",
        DialogLayout.FULL)
    game.show_long_text("Necesito ayuda con los deberes, debo recolectar todas las tareas y mandarselas a mi profesor, mediante el ordenador",
        DialogLayout.FULL)
    game.show_long_text("Recuerda, no siempre todo es lo que parece ;) ",
        DialogLayout.FULL)
    game.show_long_text("¡Gracias por la ayuda!", DialogLayout.BOTTOM)

def on_a_pressed():
    global jump
    if userSprite.is_hitting_tile(CollisionDirection.BOTTOM):
        userSprite.vy = -150
    elif jump == 0:
        userSprite.vy = -150
        jump = 1
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def recetNextLevel():
    global level
    game.splash("NEXT LEVEL - ", level + 1)
    music.play(music.melody_playable(music.jump_up),
        music.PlaybackMode.IN_BACKGROUND)
    info.set_score(0)
    level = level + 1
    sprites.destroy_all_sprites_of_kind(SpriteKind.coin)
    sprites.destroy_all_sprites_of_kind(SpriteKind.goal)

def on_on_overlap(sprite, otherSprite):
    info.change_score_by(1)
    sprites.destroy(otherSprite, effects.smiles, 1000)
    music.play(music.melody_playable(music.magic_wand),
        music.PlaybackMode.IN_BACKGROUND)
sprites.on_overlap(SpriteKind.player, SpriteKind.coin, on_on_overlap)

def finishGame():
    music.play(music.melody_playable(music.jump_up),
        music.PlaybackMode.IN_BACKGROUND)
    game.set_dialog_cursor(assets.image("""
        user
        """))
    game.set_dialog_frame(img("""
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
        """))
    game.splash("¡Felicidades! ",
        "Gracias a ti he podido entregar todos los trabajos :D")
    info.change_score_by(39)
    game.game_over(True)
def nextLevel():
    global lista
    lista = [tilemap("""
            nivel7
            """),
        tilemap("""
            nivel1
            """),
        tilemap("""
            nivel4
            """),
        tilemap("""
            nivel5
            """)]
    return lista[level]

def on_on_overlap2(sprite2, otherSprite2):
    if info.score() >= 10:
        if level < 3:
            recetNextLevel()
            tiles.set_current_tilemap(nextLevel())
            startTarget()
        elif level == 3:
            finishGame()
    else:
        userSprite.say_text("Me faltan libros :(", 1000, False)
sprites.on_overlap(SpriteKind.player, SpriteKind.goal, on_on_overlap2)

lista: List[tiles.TileMapData] = []
jump = 0
book: Sprite = None
goal2: Sprite = None
userSprite: Sprite = None
level = 0
initialDialogue()
level = 0
userSprite = sprites.create(assets.image("""
    user
    """), SpriteKind.player)
scene.camera_follow_sprite(userSprite)
userSprite.ay = 350
info.set_score(0)
controller.move_sprite(userSprite, 100, 0)
tiles.set_current_tilemap(nextLevel())
startTarget()

def on_forever():
    global jump
    if userSprite.is_hitting_tile(CollisionDirection.BOTTOM):
        jump = 0
forever(on_forever)
