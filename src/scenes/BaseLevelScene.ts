import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { EnemyBase } from '../entities/EnemyBase';
import { WeaponSystem } from '../systems/WeaponSystem';
import { SpawnerDirector } from '../systems/SpawnerDirector';
import { VehicleSystem } from '../systems/VehicleSystem';
import { AudioManager } from '../systems/AudioManager';
import { CameraController } from '../systems/CameraController';
import { ParticleFX } from '../systems/ParticleFX';
import { HUD } from '../ui/HUD';
import { runState } from '../state/runState';

export abstract class BaseLevelScene extends Phaser.Scene {
  protected player!: Player;
  protected enemies!: Phaser.Physics.Arcade.Group;
  protected platforms!: Phaser.Physics.Arcade.StaticGroup;
  protected semisolids!: Phaser.Physics.Arcade.StaticGroup;
  protected keys!: Record<string, Phaser.Input.Keyboard.Key>;
  protected director!: SpawnerDirector;
  protected weapon!: WeaponSystem;
  protected vehicle!: VehicleSystem;
  protected audioMan!: AudioManager;
  protected cameraCtrl!: CameraController;
  protected fx!: ParticleFX;
  protected hud!: HUD;
  protected checkpointIndex = 0;

  createBase(characterKey: string): void {
    this.physics.world.setBounds(0, 0, 2200, 360);
    this.add.tileSprite(1100, 108, 2200, 216, 'bg-sky');
    this.add.tileSprite(1100, 132, 2200, 150, 'bg-hills').setDepth(1);

    this.platforms = this.physics.add.staticGroup();
    for (let i = 0; i < 14; i += 1) this.platforms.create(80 + i * 160, 194, 'ground');

    this.semisolids = this.physics.add.staticGroup();
    this.semisolids.create(550, 140, 'platform-thin');
    this.semisolids.create(1300, 120, 'platform-thin');

    this.enemies = this.physics.add.group({ classType: EnemyBase, runChildUpdate: false });
    this.audioMan = new AudioManager(this);
    this.fx = new ParticleFX(this);
    this.weapon = new WeaponSystem(this, this.audioMan, this.fx, this.enemies);
    this.vehicle = new VehicleSystem(this, this.weapon);
    this.player = new Player(this, 48, 160, characterKey, this.weapon, this.audioMan, this.fx);

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.enemies, this.platforms);
    this.physics.add.overlap(this.player, this.enemies, (_p, e) => {
      this.player.takeDamage((e as EnemyBase).typeId.includes('llama') ? 12 : 8);
    });

    this.keys = this.input.keyboard!.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      shoot: Phaser.Input.Keyboard.KeyCodes.J,
      melee: Phaser.Input.Keyboard.KeyCodes.K,
      grenade: Phaser.Input.Keyboard.KeyCodes.L,
      interact: Phaser.Input.Keyboard.KeyCodes.E
    }) as Record<string, Phaser.Input.Keyboard.Key>;

    this.cameraCtrl = new CameraController(this);
    this.cameraCtrl.bind(this.player);
    this.cameras.main.setBounds(0, 0, 2200, 216);
    this.director = new SpawnerDirector(this, this.enemies);
    this.hud = new HUD(this, this.player, this.weapon, this.vehicle);

    runState.levelStartTime = this.time.now;
  }

  protected commonUpdate(time: number): void {
    this.player.update(this.keys as never, time);
    this.enemies.children.each((child) => {
      (child as EnemyBase).behave(this.player.x, time);
      return true;
    });

    if (this.player.hp <= 0) {
      runState.deaths += 1;
      runState.lives -= 1;
      this.scene.restart();
    }

    const checks = [700, 1500];
    checks.forEach((x, i) => {
      if (this.player.x > x && this.checkpointIndex < i + 1) {
        this.checkpointIndex = i + 1;
        runState.checkpoints[this.scene.key] = { x: x + 10, y: 160 };
      }
    });

    this.hud.update();
  }
}
