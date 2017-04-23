CREATE TABLE transaction (
  id SERIAL PRIMARY KEY,
  description VARCHAR(30),
  value NUMERIC(9, 2) NOT NULL,
  date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ,
  user_account_id INTEGER REFERENCES user_account(id) NOT NULL
);

CREATE TRIGGER updated_at BEFORE UPDATE ON transaction
  FOR EACH ROW EXECUTE PROCEDURE updated_at();

---

DROP TABLE transaction;
