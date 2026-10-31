export type WorkBranch = 'digital' | 'print' | 'social' | 'leadership';

export interface Work {
  id: string;
  branch: WorkBranch;
  title: string;
  meta: string;
  file: string;
  featured: boolean;
  order: number;
}
