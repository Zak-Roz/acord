import User from "../entities/user.entity";

export class UserDto {
    readonly id: number;
    readonly username: string;
    readonly isVerified: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(data: User) {
        this.id = data.id;
        this.username = data.username;
        this.isVerified = data.isVerified;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
