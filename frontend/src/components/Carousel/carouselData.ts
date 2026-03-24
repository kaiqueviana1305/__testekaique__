export type Platform = 'meta' | 'google' | 'both';

export interface SlideMetric {
  label: string;
  value: string;
  color: string;
}

export interface SlideData {
  id: number;
  type: 'cover' | 'error' | 'cta';
  errorNumber?: number;
  platform?: Platform;
  title: string;
  subtitle?: string;
  body?: string;
  tip?: string;
  metrics?: SlideMetric[];
  bgClass: string;
  accentColor: string;
}

export const PLATFORM_COLORS: Record<Platform, string> = {
  meta: '#1877F2',
  google: '#EA4335',
  both: '#E30613',
};

export const PLATFORM_LABELS: Record<Platform, string> = {
  meta: 'Meta Ads · Advantage+',
  google: 'Google Ads · PMax',
  both: 'Advantage+ & PMax',
};

export const slides: SlideData[] = [
  {
    id: 1,
    type: 'cover',
    platform: 'both',
    title: '5 Erros que Destroem suas Campanhas Advantage+ e PMax',
    subtitle: 'Você está cometendo algum desses?',
    bgClass: 'bg-[#0d0d0d]',
    accentColor: '#E30613',
  },
  {
    id: 2,
    type: 'error',
    errorNumber: 1,
    platform: 'meta',
    title: 'Lutar contra o algoritmo em vez de alimentá-lo',
    body: 'No Advantage+, o algoritmo precisa de sinais de audiência para otimizar. Deixar os campos de interesse em branco é como contratar um vendedor e não apresentá-lo aos clientes.',
    tip: 'Dê pelo menos 2–3 interesses iniciais como ponto de partida. O algoritmo agradece.',
    bgClass: 'bg-gradient-to-br from-[#0d1117] to-[#0d2a4a]',
    accentColor: '#1877F2',
  },
  {
    id: 3,
    type: 'error',
    errorNumber: 2,
    platform: 'google',
    title: 'Matar a campanha antes do aprendizado terminar',
    body: 'PMax precisa de no mínimo 4–6 semanas para sair da fase de aprendizado. Pausar ou alterar drasticamente antes disso reinicia tudo — e você perde o trabalho do algoritmo.',
    tip: 'Não mexa em lances, orçamentos ou assets nas primeiras 4 semanas. Tenha paciência.',
    bgClass: 'bg-gradient-to-br from-[#0d1117] to-[#2a0d0d]',
    accentColor: '#EA4335',
  },
  {
    id: 4,
    type: 'error',
    errorNumber: 3,
    platform: 'google',
    title: 'Assets criativos fracos no PMax',
    body: 'O PMax é tão bom quanto os criativos que você fornece. Assets genéricos = resultados genéricos.',
    tip: 'Forneça o máximo de assets: 15 imagens, 5 vídeos, 5 headlines, 5 descrições. Qualidade > quantidade.',
    metrics: [
      { label: 'Imagens', value: '15 slots', color: '#EA4335' },
      { label: 'Vídeos', value: '5 slots', color: '#FBBC04' },
      { label: 'Textos', value: '5 + 5', color: '#34A853' },
    ],
    bgClass: 'bg-[#111111]',
    accentColor: '#EA4335',
  },
  {
    id: 5,
    type: 'error',
    errorNumber: 4,
    platform: 'meta',
    title: 'Não usar exclusões de audiência no Advantage+',
    body: 'Sem exclusões, o Advantage+ pode gastar sua verba com clientes atuais, concorrentes, ou públicos que nunca convertem. Dinheiro queimado à toa.',
    tip: 'Exclua: clientes recentes, listas de supressão e públicos irrelevantes para o negócio.',
    bgClass: 'bg-[#E30613]',
    accentColor: '#ffffff',
  },
  {
    id: 6,
    type: 'cta',
    platform: 'both',
    title: 'Chega de queimar verba.',
    subtitle: 'Vem pra Seppala.',
    body: 'Gerenciamos Advantage+ e PMax com estratégia, dados e criatividade para escalar o seu negócio.',
    bgClass: 'bg-[#0d0d0d]',
    accentColor: '#E30613',
  },
];
