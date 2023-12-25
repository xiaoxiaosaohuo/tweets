export enum IRole {
  USER="User",
  ADMIN='Admin'
}

export enum OrderStatus {
  PENDING='Pending',
  PROCESSING='Processing',
  COMPLETED='Completed',
  CANCELLED='Canceled'
}
export type IUser = {
    id: number;
    name: string;
    role: IRole;
    [key:string]:any
}

export type ISession = {
    user: IUser;
}

export type APIRes = {
  success: boolean;
  data:any;
  msg?:string;
}
