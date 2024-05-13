import API from "./api";

export const GetUserList = (params = {}) => {
    return new API(`/email_generator/get-email-signature-signed_url/`).attachToken().send();
};

export const Login = (body) => {
    return new API("/auth/login/", "POST").addBodyData(body).send();
};

export const SignUp = (body) => {
    return new API("/auth/signup", "POST").addBodyData(body).send();
};
