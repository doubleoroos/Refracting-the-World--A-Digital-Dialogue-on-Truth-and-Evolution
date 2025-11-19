import React from 'react';

export enum Section {
  HERO = 'hero',
  PILLAR_1 = 'fluidity-of-truth',
  PILLAR_2 = 'evolution-of-lens',
  MANIFESTO = 'manifesto',
  LEARNING = 'learning-hub',
  TEAM = 'consortium'
}

export type Language = 'en' | 'fr';

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

export interface CarouselItem {
  image: string;
  caption: string;
  artist: string;
  altText: string;
}

export interface Content {
  nav: NavItem[];
  hero: {
    tag: string;
    dates: string;
    title: string;
    subtitle: string;
    intro: React.ReactNode;
    cta: string;
  };
  pillarA: {
    tag: string;
    title: string;
    description: React.ReactNode;
    labels: {
      raw: string;
      processed: string;
      aiButton: string;
      aiButtonActive: string;
      aiPrompt: string;
      visualizeButton: string;
      visualizeLoading: string;
    }
  };
  pillarB: {
    tag: string;
    title: string;
    description: string;
    layers: {
      output: { label: string; desc: string };
      darkroom: { label: string; desc: string };
      physics: { label: string; desc: string };
    }
  };
  pillarC: {
    tag: string;
    title: string;
    description: React.ReactNode;
    curriculumTitle: string;
    topics: string[];
    note: string;
    preview: string;
    loading: string;
  };
  team: {
    tag: string;
    title: string;
    desc: string;
  };
  manifesto: {
    tag: string;
    title: React.ReactNode;
    summary: {
      button: string;
      loading: string;
      title: string;
    };
    imageGen: {
      title: string;
      subtitle: string;
      placeholder: string;
      button: string;
      loading: string;
    };
    cards: {
      pool: { title: string; desc: string };
      eco: { title: string; desc: string };
      access: { title: string; desc: string };
      fair: { title: string; desc: string };
    };
    carousel: {
      title: string;
      items: CarouselItem[];
    };
    timeline: {
      title: string;
      phases: { phase: string; dates: string; title: string; desc: string; current?: boolean }[];
    };
    budget: {
      title: string;
      allocationTitle: string;
      items: string[];
      incomeTitle: string;
      income: string[];
    }
  };
  footer: {
    submission: string;
  }
}