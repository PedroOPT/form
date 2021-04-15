export class CreateUserDto {
    constructor(
        public name: string,
        public email: string,
        public telephone: string, 
        public password: string,
    ) {
    }
}