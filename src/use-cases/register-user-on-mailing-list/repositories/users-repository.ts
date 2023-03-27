import { UserData } from '../dtos/user-data'

export interface UsersRepository {
    create(user: UserData): Promise<void>
    findUserByEmail(email: string): Promise<UserData>
    findAllUsers(): Promise<UserData[]>
    exists(user: UserData): Promise<boolean>
}
