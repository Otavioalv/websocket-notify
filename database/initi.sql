

CREATE TABLE user_notify (
    id_user SERIAL PRIMARY KEY, 
    name VARCHAR(500) NOT NULL, 
    passwd CHAR(10) NOT NULL, 
    at_date TIMESTAMP DEFAULT now() 
);


CREATE TABLE messages (
    id_messages SERIAL PRIMARY KEY, 
    message TEXT NOT NULL, 
    from_user INTEGER NOT NULL REFERENCES user_notify (id_user) ON DELETE CASCADE, 
    to_user INTEGER NOT NULL REFERENCES user_notify (id_user) ON DELETE CASCADE, 
    at_date TIMESTAMP DEFAULT now() 
);


