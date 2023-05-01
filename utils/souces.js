import Ambiance from '../static/sounds/noel/ambiance.mp3'
import Miaou from '../static/sounds/noel/miaou.mp3'
import Shake from '../static/sounds/noel/shake.mp3'
import Magic from '../static/sounds/noel/magic.mp3'
import Scratch from '../static/sounds/noel/scratch.mp3'
import Swoosh from '../static/sounds/noel/swoosh.mp3'
import Coucou from '../static/sounds/noel/coucou.ogg'
import Chime from '../static/sounds/noel/chime.mp3'
import Star from '../static/sounds/noel/star.mp3'

export default [
  {
    name: 'ambiance',
    type: 'audio',
    path: Ambiance,
    options: {
      loop: true,
      volume: 0.24,
    },
  },
  {
    name: 'miaou',
    type: 'audio',
    path: Miaou,
    options: {
      loop: true,
    },
  },
  {
    name: 'shake',
    type: 'audio',
    path: Shake,
    options: {
      loop: true,
    },
  },
  {
    name: 'magic',
    type: 'audio',
    path: Magic,
  },
  {
    name: 'scratch',
    type: 'audio',
    path: Scratch,
  },
  {
    name: 'swoosh',
    type: 'audio',
    path: Swoosh,
  },
  {
    name: 'coucou',
    type: 'audio',
    path: Coucou,
  },
  {
    name: 'chime',
    type: 'audio',
    path: Chime,
  },
  {
    name: 'star',
    type: 'audio',
    path: Star,
  },
]
