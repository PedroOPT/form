export class UserAccount {
    constructor(
        public username: string,
        public password: string,
        public confirmationToken: string,
        public recoverToken: string,
        public roles: string[],
        public active: boolean
        ) { }
}