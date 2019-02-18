export default class User {
    constructor({id, username, avatar, name, email, provider}) {
        this.id = id;
        this.username = username;
        this.avatar = avatar;
        this.name = name;
        this.email = email;
        this.provider = provider;
    }

    id: string;
    username: string;
    avatar: string;
    name: string;
    email: string;
    provider: string;
}
