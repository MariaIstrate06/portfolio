import { WorkBranch } from '../models';

/**
 * Branch colors are used ONLY for the four visual-stories branches and the
 * "selected visuals" cards on home (brief §3) — nowhere else on the site.
 * `anchor` is the visual-stories section id, which differs from the `print`
 * branch key (the mockup calls that section "physical").
 */
export interface BranchInfo {
  anchor: 'digital' | 'physical' | 'social' | 'leadership';
  num: string;
  name: string;
  sub: string;
  bg: string;
  ink: string;
}

/** Display order of the branches, used by visual stories and the home page. */
export const BRANCH_ORDER: WorkBranch[] = ['social', 'digital', 'print', 'leadership'];

export const BRANCH_INFO: Record<WorkBranch, BranchInfo> = {
  digital: {
    anchor: 'digital',
    num: '02',
    name: 'digital graphic design',
    sub: 'logos, identities, album covers, key visuals',
    bg: 'var(--purple)',
    ink: 'var(--text)',
  },
  print: {
    anchor: 'physical',
    num: '03',
    name: 'physical graphic design',
    sub: 'banners, billboards, roll-ups, print, editorial',
    bg: 'var(--red)',
    ink: 'var(--text)',
  },
  social: {
    anchor: 'social',
    num: '01',
    name: 'social media',
    sub: 'campaigns, carousels, giveaways',
    bg: 'var(--mint)',
    ink: 'var(--bg)',
  },
  leadership: {
    anchor: 'leadership',
    num: '04',
    name: 'creative leadership',
    sub: "graphic design trainings i've held",
    bg: 'var(--green)',
    ink: 'var(--bg)',
  },
};
