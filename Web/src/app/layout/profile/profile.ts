export class Profile {
    id: string;
    full_name: string;
    first_name: string;
    last_name: string;
    gender: string;
    BirthDate: string;
    email: string;
    phone: string;
    to_chuc_id: string;
    phong_ban_id: string;
    img_data: {
        file_data: string;
        name: string;
        module: string;
        path: string;
    };
    avatar_url: string;
    to_chuc: any;
    phong_ban: object;
}
export class Pass {
    oldPass: string;
    newPass: string;
    codeResult: string;
    Result: string;
}
