import request from "supertest";
import app from "../server";

describe("UserController", () => {
  let userData = {
    username: "Test User",
    email: "test@example.com",
    password: "password123",
    active: true,
    role: ["ADMIN"],
  };

  let idUserCriado = "";
  let token = "";

  it("Registrar novo usuário sem e-mail", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send({ ...userData, email: "" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email não informado");
  });

  it("Registrar novo usuário sem senha", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send({ ...userData, password: "" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Senha não informada");
  });

  it("Registrar novo usuário sem nome", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send({ ...userData, username: "" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Nome não informado");
  });

  it("Registrar novo usuário", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("email", userData.email);
    expect(response.body.user).toHaveProperty("username", userData.username);
    expect(response.body.message).toBe("Criado com sucesso");

    idUserCriado = response.body.user._id;
  });

  it("Não deve permitir o registro de um usuário com e-mail duplicado", async () => {
    await request(app).post("/api/users/register").send(userData);

    const response = await request(app)
      .post("/api/users/register")
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email já cadastrado");
  });

  it("Fazer login do usuário sem e-mail", async () => {
    const response = await request(app).post("/api/auth/signIn").send({
      email: "",
      password: userData.password,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email não informado");
  });

  it("Fazer login do usuário sem senha", async () => {
    const response = await request(app).post("/api/auth/signIn").send({
      email: userData.email,
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Senha não informada");
  });

  it("Fazer login do usuário com usuário não encontrado", async () => {
    const response = await request(app).post("/api/auth/signIn").send({
      email: "teste@hotmail.com",
      password: userData.password,
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Usuário não encontrado!");
  });

  it("Fazer login do usuário com senha inválida", async () => {
    const response = await request(app).post("/api/auth/signIn").send({
      email: userData.email,
      password: "senha123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Senha inválida");
  });

  it("Fazer login do usuário", async () => {
    const response = await request(app).post("/api/auth/signIn").send({
      email: userData.email,
      password: userData.password,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("email", userData.email);
    expect(response.body).toHaveProperty("username", userData.username);
    expect(response.body).toHaveProperty("accessToken");

    token = response.body.accessToken;
  });

  it("Buscar usuário por ID", async () => {
    const response = await request(app)
      .get(`/api/users/getById/${idUserCriado}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.user).toHaveProperty("email", userData.email);
    expect(response.body.user).toHaveProperty("username", userData.username);
  });

  it("Buscar todos os usuários", async () => {
    const response = await request(app)
      .get("/api/users/getAll")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("users");
  });

  it("Atualizar usuário sem informar o nome", async () => {
    let data = { ...userData, id: idUserCriado, username: "" };

    const response = await request(app)
      .put("/api/users")
      .send(data)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Nome não informado");
  });

  it("Atualizar usuário sem informar o e-mail", async () => {
    let data = { ...userData, id: idUserCriado, email: "" };

    const response = await request(app)
      .put("/api/users")
      .send(data)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email não informado");
  });

  it("Atualizar usuário", async () => {
    let data = { ...userData, id: idUserCriado, username: "Test User Updated" };

    const response = await request(app)
      .put("/api/users")
      .send(data)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty("email", userData.email);
    expect(response.body.user).toHaveProperty("username", "Test User Updated");
    expect(response.body.message).toBe("Editado com sucesso");
  });

  it("Deletar usuário", async () => {
    const response = await request(app)
      .delete(`/api/users/${idUserCriado}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
  });
});
