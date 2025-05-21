export interface HeaderMenuItem {
  title: string;
  href: string;
}

export const HEADER_MENU: HeaderMenuItem[] = [
  { title: '아티스트', href: '/artists' },
  { title: '스케줄', href: '/schedule' },
  { title: '타임라인', href: '/timeline' },
];
