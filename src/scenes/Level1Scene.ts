import Phaser from 'phaser';
import { BaseLevel } from '../core/BaseLevel';
import { runState } from '../state/runState';
import type { WeaponId } from '../config/weapons';
import { SCENES } from './sceneKeys';

export class Level1Scene extends BaseLevel {
  private cages!: Phaser.Physics.Arcade.StaticGroup;
  private pickups!: Phaser.Physics.Arcade.Group;

  constructor() { super(SCENES.Level1); }

  create(): void {
    this.createBase(runState.selectedCharacter === 0 ? 'char-0' : 'char-1');
    this.director.wave(460, 160, ['melee', 'shooter']);
    this.director.wave(980, 160, ['shooter', 'lobber']);

    this.cages = this.physics.add.staticGroup();
    this.cages.create(620, 168, 'cage');
    this.cages.create(1480, 168, 'cage');
    this.physics.add.overlap(this.player, this.cages, (_p, cage) => {
      if (Phaser.Input.Keyboard.JustDown(this.keys.interact)) {
        cage.destroy();
        runState.rescues += 1;
        runState.score += 250;
        this.audioMan.rescue();
        const p = this.pickups.create((cage as Phaser.GameObjects.Sprite).x, (cage as Phaser.GameObjects.Sprite).y - 16, 'pickup') as Phaser.Physics.Arcade.Image;
        p.setData('type', Phaser.Utils.Array.GetRandom(['grenade', 'score', 'weapon']));
      }
    });

    this.pickups = this.physics.add.group();
    this.physics.add.overlap(this.player, this.pickups, (_p, item) => {
      const type = (item as Phaser.Physics.Arcade.Image).getData('type');
      if (type === 'grenade') runState.grenades += 2;
      if (type === 'score') runState.score += 300;
      if (type === 'weapon') {
        const w = Phaser.Utils.Array.GetRandom<WeaponId>(['smg', 'shotgun', 'rocket', 'flame', 'laser']);
        this.weapon.setWeapon(w);
      }
      this.audioMan.pickup();
      item.destroy();
    });

    this.add.text(30, 26, 'Yana y Kusi arrancan el viaje minero.', { fontFamily: 'monospace', fontSize: '9px' }).setScrollFactor(0);
  }

  update(time: number): void {
    this.commonUpdate(time);
    if (this.player.x > 2080) this.scene.start(SCENES.Level2);
  }
}
