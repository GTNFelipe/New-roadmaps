import {
  Terminal, Coffee, Database, FileText, Wrench, Binary, Boxes, Table2, Blocks,
  ShieldCheck, Activity, Network, Leaf, RefreshCw, GitMerge, Lock, Package,
  Cloud, Globe, ArrowLeftRight, Workflow, Handshake, Brain, Target, Briefcase
} from 'lucide-react';

export const HABITS = ['h1', 'h2', 'h3'];

export const PJ_MANUAL = [
  { icon: <Target className="w-4 h-4 text-cyan-400" />, titleKey: "pj1_title", textKey: "pj1_text", titleColor: "text-cyan-400", descColor: "text-cyan-300/80" },
  { icon: <Briefcase className="w-4 h-4 text-pink-500" />, titleKey: "pj2_title", textKey: "pj2_text", titleColor: "text-pink-500", descColor: "text-pink-300/80" },
  { icon: <ShieldCheck className="w-4 h-4 text-purple-400" />, titleKey: "pj3_title", textKey: "pj3_text", titleColor: "text-purple-400", descColor: "text-purple-300/80" }
];

export const PHASES = [
  {
    id: 'phase1',
    schedule: [
      { id: 'p1-mon', dayKey: 'monday', topicKey: 'p1_mon_top', icon: <Terminal className="w-5 h-5 text-purple-400" />, tasks: ['p1_mon_t1', 'p1_mon_t2', 'p1_mon_t3'] },
      { id: 'p1-tue', dayKey: 'tuesday', topicKey: 'p1_tue_top', icon: <Coffee className="w-5 h-5 text-orange-400" />, tasks: ['p1_tue_t1', 'p1_tue_t2', 'p1_tue_t3'] },
      { id: 'p1-wed', dayKey: 'wednesday', topicKey: 'p1_wed_top', icon: <Database className="w-5 h-5 text-emerald-400" />, tasks: ['p1_wed_t1', 'p1_wed_t2', 'p1_wed_t3'] },
      { id: 'p1-thu', dayKey: 'thursday', topicKey: 'p1_thu_top', icon: <FileText className="w-5 h-5 text-cyan-400" />, tasks: ['p1_thu_t1', 'p1_thu_t2', 'p1_thu_t3'] },
      { id: 'p1-fri', dayKey: 'friday', topicKey: 'p1_fri_top', icon: <Wrench className="w-5 h-5 text-pink-400" />, tasks: ['p1_fri_t1', 'p1_fri_t2', 'p1_fri_t3'] }
    ]
  },
  {
    id: 'phase2',
    schedule: [
      { id: 'p2-mon', dayKey: 'monday', topicKey: 'p2_mon_top', icon: <Binary className="w-5 h-5 text-purple-400" />, tasks: ['p2_mon_t1', 'p2_mon_t2', 'p2_mon_t3'] },
      { id: 'p2-tue', dayKey: 'tuesday', topicKey: 'p2_tue_top', icon: <Boxes className="w-5 h-5 text-blue-400" />, tasks: ['p2_tue_t1', 'p2_tue_t2', 'p2_tue_t3'] },
      { id: 'p2-wed', dayKey: 'wednesday', topicKey: 'p2_wed_top', icon: <Table2 className="w-5 h-5 text-emerald-400" />, tasks: ['p2_wed_t1', 'p2_wed_t2', 'p2_wed_t3'] },
      { id: 'p2-thu', dayKey: 'thursday', topicKey: 'p2_thu_top', icon: <Blocks className="w-5 h-5 text-cyan-400" />, tasks: ['p2_thu_t1'] },
      { id: 'p2-fri', dayKey: 'friday', topicKey: 'p2_fri_top', icon: <ShieldCheck className="w-5 h-5 text-pink-400" />, tasks: ['p2_fri_t1', 'p2_fri_t2'] }
    ]
  },
  {
    id: 'phase3',
    schedule: [
      { id: 'p3-mon', dayKey: 'monday', topicKey: 'p3_mon_top', icon: <Activity className="w-5 h-5 text-purple-400" />, tasks: ['p3_mon_t1', 'p3_mon_t2'] },
      { id: 'p3-tue', dayKey: 'tuesday', topicKey: 'p3_tue_top', icon: <Network className="w-5 h-5 text-blue-400" />, tasks: ['p3_tue_t1', 'p3_tue_t2', 'p3_tue_t3'] },
      { id: 'p3-wed', dayKey: 'wednesday', topicKey: 'p3_wed_top', icon: <Database className="w-5 h-5 text-emerald-400" />, tasks: ['p3_wed_t1', 'p3_wed_t2', 'p3_wed_t3'] },
      { id: 'p3-thu', dayKey: 'thursday', topicKey: 'p3_thu_top', icon: <Leaf className="w-5 h-5 text-cyan-400" />, tasks: ['p3_thu_t1', 'p3_thu_t2', 'p3_thu_t3'] },
      { id: 'p3-fri', dayKey: 'friday', topicKey: 'p3_fri_top', icon: <RefreshCw className="w-5 h-5 text-pink-400" />, tasks: ['p3_fri_t1', 'p3_fri_t2'] }
    ]
  },
  {
    id: 'phase4',
    schedule: [
      { id: 'p4-mon', dayKey: 'monday', topicKey: 'p4_mon_top', icon: <GitMerge className="w-5 h-5 text-purple-400" />, tasks: ['p4_mon_t1', 'p4_mon_t2'] },
      { id: 'p4-tue', dayKey: 'tuesday', topicKey: 'p4_tue_top', icon: <Lock className="w-5 h-5 text-blue-400" />, tasks: ['p4_tue_t1', 'p4_tue_t2'] },
      { id: 'p4-wed', dayKey: 'wednesday', topicKey: 'p4_wed_top', icon: <Package className="w-5 h-5 text-emerald-400" />, tasks: ['p4_wed_t1'] },
      { id: 'p4-thu', dayKey: 'thursday', topicKey: 'p4_thu_top', icon: <Cloud className="w-5 h-5 text-cyan-400" />, tasks: ['p4_thu_t1'] },
      { id: 'p4-fri', dayKey: 'friday', topicKey: 'p4_fri_top', icon: <Globe className="w-5 h-5 text-pink-400" />, tasks: ['p4_fri_t1'] }
    ]
  },
  {
    id: 'phase5',
    schedule: [
      { id: 'p5-mon', dayKey: 'monday', topicKey: 'p5_mon_top', icon: <ArrowLeftRight className="w-5 h-5 text-purple-400" />, tasks: ['p5_mon_t1', 'p5_mon_t2'] },
      { id: 'p5-tue', dayKey: 'tuesday', topicKey: 'p5_tue_top', icon: <Workflow className="w-5 h-5 text-blue-400" />, tasks: ['p5_tue_t1'] },
      { id: 'p5-wed', dayKey: 'wednesday', topicKey: 'p5_wed_top', icon: <Cloud className="w-5 h-5 text-emerald-400" />, tasks: ['p5_wed_t1'] },
      { id: 'p5-thu', dayKey: 'thursday', topicKey: 'p5_thu_top', icon: <Handshake className="w-5 h-5 text-cyan-400" />, tasks: ['p5_thu_t1', 'p5_thu_t2'] },
      { id: 'p5-fri', dayKey: 'friday', topicKey: 'p5_fri_top', icon: <Brain className="w-5 h-5 text-pink-400" />, tasks: ['p5_fri_t1'] }
    ]
  }
];