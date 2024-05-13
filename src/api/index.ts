import API from "./api";

export const Login = (body) => {
    return new API("/auth/login/", "POST").addBodyData(body).send();
};

export const SignUp = (body) => {
    return new API("/auth/signup", "POST").addBodyData(body).send();
};

export const GetChats = (params = {}) => {
    return new API(`/chats`).attachToken().send();
};

export const GetUsers = (params = {}) => {
    return new API(`/users`).attachToken().send();
};

export const GetMessagesById = (id) => {
    return new API(`/messages/` + id).attachToken().send();
};

export const PostMessage = (body) => {
    return new API(`/messages/`, "POST").addBodyData(body).attachToken().send();
};
