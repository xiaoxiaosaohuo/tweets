export type NavMenu = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?:any;
  desc?:string;
}
export interface NavItem extends NavMenu {
  subMenu?:NavMenu[]
}
