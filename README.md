# Coca Slug

Videojuego 2D web retro run-and-gun **original** ambientado en el norte argentino (Salta/Jujuy), hecho con **Phaser 3 + TypeScript + Vite**.

## Ejecutar
```bash
npm install
npm run dev
npm run build
```
Build estático listo en `dist/`.

## Controles
- `A / D`: mover
- `W`: saltar (jump buffer + coyote time)
- `S`: agacharse
- `J`: disparo principal
- `K`: melee
- `L`: granada
- `E`: interactuar / montar vehículo
- `1`: Start desde menú
- `2`: toggle volumen master en menú

## Personajes
- **Yana Crespín**: poncho azul, postura firme.
- **Kusi Quispe**: chaleco violeta y bufanda naranja.

## Features arcade feel implementadas
- Resolución base 384x216, pixel perfect y nearest-neighbor.
- Hitstop configurable (`FEEL.hitstopMs`).
- Coyote time + jump buffer + shoot buffer.
- Invulnerabilidad breve y blink al daño.
- Cámara follow con lerp + look-ahead.
- Partículas pixel (polvo/impacto) y screenshake configurable.
- HUD: vidas, HP, arma/munición, granadas, score, rescates y estado de vehículo.

## Armas
Base + 5 especiales:
- Ametralladora rápida (`smg`)
- Escopeta (`shotgun`)
- Cohete AOE (`rocket`)
- Lanzallamas por tick (`flame`)
- Láser piercing (`laser`)

## Vehículo original
**Carrito Minero 4x4 caricaturesco**:
- Subir/bajar con `E`
- Movimiento, salto, disparo vía sistema de armas
- HP propio y explosión visual

## Niveles
- **Level1**: onboarding implícito, pickups, rescates, enemigos base.
- **Level2**: introduce vehículo, llamas enemigas y hazard.
- **Boss**: 2 fases, ataques telegrafiados y barra de vida.
- **Results**: resumen final (score/rescates/tiempo/muertes).

## Reemplazar sprites procedurales por PNG
1. Colocá PNGs en `public/assets/`.
2. En `PreloadScene`, reemplazá `makeTex(...)` por `this.load.image('key', '/assets/mi_sprite.png')`.
3. Mantené keys (`char-0`, `enemy-shooter`, etc.) para evitar cambios en gameplay.

## Agregar un nivel nuevo
1. Crear `src/scenes/Level3Scene.ts` extendiendo `BaseLevelScene`.
2. Llamar `createBase(...)`, setear waves con `SpawnerDirector`.
3. Agregar transición al siguiente nivel en `update`.
4. Registrar escena en `src/main.ts`.

## Ajuste de game feel
`src/config/gameConfig.ts`:
- `hitstopMs`, `shakeIntensity`
- `gravity`
- `coyoteMs`, `jumpBufferMs`, `shootBufferMs`

Además podés retocar:
- velocidad de player (`Player.update`)
- fire rate/daño/speed de armas (`src/config/weapons.ts`)
- stats IA (`src/config/enemies.ts`)
