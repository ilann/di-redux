import { Role } from "./Roles";




export type User  = {
    id: string;
    name: string;
    roles: Array<Role>;
};