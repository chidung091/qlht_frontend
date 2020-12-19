export class SupervisorRoleModel {
  name: string
  isDefault: boolean
  isStatic: boolean
  isPublic: boolean
  concurrencyStamp: string
  remark: string
  description: string
  isActive: boolean
  roleType: number
  roleTypeDescription: string
  parentRole: string
  id: string
  extraProperties: any;
}
