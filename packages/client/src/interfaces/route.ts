export default interface IRoute {
    path: string;
    name: string;
    exact: boolean;
    component: any;
    button?: string;
    props?: any;
}