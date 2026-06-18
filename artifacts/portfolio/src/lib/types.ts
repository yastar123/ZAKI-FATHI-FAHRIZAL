export interface ResultItem {
  number: string;
  title: string;
  text: string;
  metric: string;
}

export interface ComponentItem {
  name: string;
  desc: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  company: string;
  date: string;
  what: string;
  background: string;
  problem: string;
  solution: string;
  method: string;
  result: string;
  conclusion: string;
  benefits: string;
  learnings: string;
  method_steps: string[];
  results: ResultItem[];
  components: ComponentItem[];
  tools: string[];
  badge: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  src: string;
  caption: string;
  type: string;
  display_order: number;
  created_at?: string;
}
