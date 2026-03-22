CREATE DATABASE todo_tutorial;

USE todo_tutorial;
-- Creo 3 tablas
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(255) NOT NULL,
  mail VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
--todos tiene una FK de users porque cada todo pertenece a un usuario

CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  completed BOOLEAN DEFAULT FALSE,
  description TEXT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
--shared_todos tiene dos FKs, una de todos y otra de users, porque cada registro en shared_todos representa la relación entre un todo y un usuario con el que se ha compartido ese todo.
CREATE TABLE shared_todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  todo_id INT NOT NULL,
  user_id INT NOT NULL,
  shared_with_user_id INT NOT NULL,
  FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (shared_with_user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- Inserto algunos usuarios de ejemplo
INSERT INTO users (name, mail, password) VALUES ('Luca', 'luca@example.com', 'password1');
INSERT INTO users (name, mail, password) VALUES ('Mar', 'mar@example.com', 'password4');

INSERT INTO todos (title, user_id)
VALUES
("🏋️ Ir al gimnasio", 1),
("📚 Estudiar para el examen", 1),
("🛒 Hacer las compras", 1),
("🍳 Preparar el desayuno", 1),
("🚶 Salir a caminar", 1),
("💻 Trabajar en el proyecto", 1),
("📞 Llamar a un amigo", 1),
("🧹 Limpiar la habitación", 1),
("✉️ Responder emails", 1);

INSERT INTO shared_todos (todo_id, user_id, shared_with_user_id)
VALUES (1, 1, 2);   
