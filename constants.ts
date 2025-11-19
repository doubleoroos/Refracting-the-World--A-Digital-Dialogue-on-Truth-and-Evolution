import { Photographer, Section } from './types';

export const NAV_ITEMS = [
  { label: 'Project Identity', id: Section.HERO },
  { label: 'Pillar A: Perception', id: Section.PILLAR_1 },
  { label: 'Pillar B: Process', id: Section.PILLAR_2 },
  { label: 'Pillar C: Education', id: Section.LEARNING },
  { label: 'The Consortium', id: Section.TEAM },
  { label: 'Strategy & Timeline', id: Section.MANIFESTO },
];

export const PHOTOGRAPHERS: Photographer[] = [
  {
    name: 'Roos van der Jagt',
    role: 'Photographer / Curator (NL)',
    bio: 'Curatorial vision focusing on the intersection of historical context and modern interpretation.',
    image: 'https://picsum.photos/id/338/400/500'
  },
  {
    name: 'Ronald Tilleman',
    role: 'Architectural / Fine Art (NL)',
    bio: 'Specializes in precise geometric compositions that challenge spatial perception and structural reality.',
    image: 'https://picsum.photos/id/101/400/500'
  },
  {
    name: 'Prakash Kumararajan',
    role: 'Documentary Photographer (Intl)',
    bio: 'Explores the raw reality of subjects, providing the "Reference Reality" for our visual experiments.',
    image: 'https://picsum.photos/id/203/400/500'
  },
  {
    name: 'Mike Pasarella',
    role: 'Conceptual / Abstract (NL)',
    bio: 'Pushes the medium towards abstraction, questioning where photography ends and digital art begins.',
    image: 'https://picsum.photos/id/244/400/500'
  }
];