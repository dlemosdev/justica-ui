export type JusticaMenu = {
  label: string | null;
  active?: boolean;
  visible?: boolean;
  href?: string;
  module?: string;
  route?: string;
  icon?: string;
  items?: JusticaMenu[];
};
