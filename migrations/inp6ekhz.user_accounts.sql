CREATE TABLE user_account (
  id SERIAL PRIMARY KEY,
  google_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
);

CREATE TRIGGER updated_at BEFORE UPDATE ON user_account
  FOR EACH ROW EXECUTE PROCEDURE updated_at();

---

DROP TABLE user_account;
