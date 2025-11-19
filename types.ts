export enum Section {
  HERO = 'hero',
  PILLAR_1 = 'fluidity-of-truth',
  PILLAR_2 = 'evolution-of-lens',
  MANIFESTO = 'manifesto',
  LEARNING = 'learning-hub',
  TEAM = 'consortium'
}

export interface NavItem {
  label: string;
  id: Section;
}

export interface Photographer {
  name: string;
  role: string;
  bio: string;
  image: string;
}