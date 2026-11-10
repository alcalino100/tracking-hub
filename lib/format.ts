// lib/format.ts
export const format = {
  currency: (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);
  },
  
  number: (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  },
  
  percent: (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'percent', 
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value / 100);
  },
  
  decimal: (value: number, decimals: number = 2) => {
    return value.toFixed(decimals);
  },
  
  relative: (date: Date | string) => {
    const now = new Date();
    const target = new Date(date);
    const diff = Math.abs(now.getTime() - target.getTime());
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) return `há ${seconds}s`;
    if (minutes < 60) return `há ${minutes}m`;
    if (hours < 24) return `há ${hours}h`;
    return `há ${days}d`;
  },
  
  compact: (value: number) => {
    const abs = Math.abs(value);
    if (abs >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (abs >= 1000) return `${(value / 1000).toFixed(1)}k`;
    return value.toString();
  }
};

export const privacy = {
  maskEmail: (email: string) => {
    if (!email) return '';
    const [local, domain] = email.split('@');
    if (!local || !domain) return '***';
    return local[0] + '***@' + domain;
  },
  
  maskName: (name: string) => {
    if (!name) return '';
    return name[0] + '***';
  },
  
  shortHash: (hash: string) => {
    if (!hash) return '';
    return hash.slice(0, 8);
  }
};
