import * as moment from 'moment';
export interface ICreateRoleDto {
    name: string | undefined;
    displayName: string | undefined;
    normalizedName: string | undefined;
    description: string | undefined;
    grantedPermissions: string[] | undefined;
}

export class RoleDto implements IRoleDto {

    constructor(data?: IRoleDto) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (this as any)[property] = (data as any)[property];
            }
        }
    }
    name: string | undefined;
    displayName: string | undefined;
    normalizedName: string | undefined;
    description: string | undefined;
    grantedPermissions: string[] | undefined;
    id: number;

    static fromJS(data: any): RoleDto {
        data = typeof data === 'object' ? data : {};
        const result = new RoleDto();
        result.init(data);
        return result;
    }

    init(data?: any) {
        if (data) {
            this.name = data.name;
            this.displayName = data.displayName;
            this.normalizedName = data.normalizedName;
            this.description = data.description;
            if (Array.isArray(data.grantedPermissions)) {
                this.grantedPermissions = [] as any;
                for (const item of data.grantedPermissions)
                    this.grantedPermissions.push(item);
            }
            this.id = data.id;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data.name = this.name;
        data.displayName = this.displayName;
        data.normalizedName = this.normalizedName;
        data.description = this.description;
        if (Array.isArray(this.grantedPermissions)) {
            data.grantedPermissions = [];
            for (const item of this.grantedPermissions)
                data.grantedPermissions.push(item);
        }
        data.id = this.id;
        return data;
    }

    clone(): RoleDto {
        const json = this.toJSON();
        const result = new RoleDto();
        result.init(json);
        return result;
    }
}

export interface IRoleDto {
    name: string | undefined;
    displayName: string | undefined;
    normalizedName: string | undefined;
    description: string | undefined;
    grantedPermissions: string[] | undefined;
    id: number;
}

export interface IRoleListDto {
    name: string | undefined;
    displayName: string | undefined;
    isStatic: boolean;
    isDefault: boolean;
    creationTime: moment.Moment;
    id: number;
}

export class RoleListDtoListResultDto implements IRoleListDtoListResultDto {

    constructor(data?: IRoleListDtoListResultDto) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (this as any)[property] = (data as any)[property];
            }
        }
    }
    items: RoleListDto[] | undefined;

    static fromJS(data: any): RoleListDtoListResultDto {
        data = typeof data === 'object' ? data : {};
        const result = new RoleListDtoListResultDto();
        result.init(data);
        return result;
    }

    init(data?: any) {
        if (data) {
            if (Array.isArray(data.items)) {
                this.items = [] as any;
                for (const item of data.items)
                    this.items.push(RoleListDto.fromJS(item));
            }
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data.items = [];
            for (const item of this.items)
                data.items.push(item.toJSON());
        }
        return data;
    }

    clone(): RoleListDtoListResultDto {
        const json = this.toJSON();
        const result = new RoleListDtoListResultDto();
        result.init(json);
        return result;
    }
}

export interface IRoleListDtoListResultDto {
    items: RoleListDto[] | undefined;
}

export class RoleListDto implements IRoleListDto {

    constructor(data?: IRoleListDto) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (this as any)[property] = (data as any)[property];
            }
        }
    }
    name: string | undefined;
    displayName: string | undefined;
    isStatic: boolean;
    isDefault: boolean;
    creationTime: moment.Moment;
    id: number;

    static fromJS(data: any): RoleListDto {
        data = typeof data === 'object' ? data : {};
        const result = new RoleListDto();
        result.init(data);
        return result;
    }

    init(data?: any) {
        if (data) {
            this.name = data.name;
            this.displayName = data.displayName;
            this.isStatic = data.isStatic;
            this.isDefault = data.isDefault;
            this.creationTime = data.creationTime ? moment(data.creationTime.toString()) : undefined as any;
            this.id = data.id;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data.name = this.name;
        data.displayName = this.displayName;
        data.isStatic = this.isStatic;
        data.isDefault = this.isDefault;
        data.creationTime = this.creationTime ? this.creationTime.toISOString() : undefined as any;
        data.id = this.id;
        return data;
    }

    clone(): RoleListDto {
        const json = this.toJSON();
        const result = new RoleListDto();
        result.init(json);
        return result;
    }
}

export interface IRoleListDto {
    name: string | undefined;
    displayName: string | undefined;
    isStatic: boolean;
    isDefault: boolean;
    creationTime: moment.Moment;
    id: number;
}
