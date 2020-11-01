export interface sitedata {
    id?: number;
    name: string;
    clientUrl: string;
} 
export interface siteStatus extends sitedata{
    status: boolean,
}