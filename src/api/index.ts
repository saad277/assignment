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

export const GetChatsById = (id) => {
    return new API(`/chats/` + id).attachToken().send();
};

export const GetUsers = (params = {}) => {
    return new API(`/users`).attachToken().send();
};

export const GetMessagesById = (id) => {
    return new API(`/messages/` + id).attachToken().send();
};

export const PostMessage = (body, id) => {
    return new API(`/chats/${id}/message`, "POST").addBodyData(body).attachToken().send();
};

export const CreateGroup = (body) => {
    return new API(`/groups`, "POST").addBodyData(body).attachToken().send();
};

export const CreateChat = (body) => {
    return new API(`/chats`, "POST").addBodyData(body).attachToken().send();
};

export const DeleteChat = (id) => {
    return new API(`/chats/` + id, "DELETE").attachToken().send();
};

export const DeleteGroup = (id) => {
    return new API(`/groups/` + id, "DELETE").attachToken().send();
};
