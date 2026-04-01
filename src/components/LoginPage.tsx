import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Заполните все поля");
      return;
    }

    setLoading(true);
    // Simulate network request
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);

    // Navigate to main page after "login"
    navigate("/");
  };

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-card__logo">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v9.28a4.39 4.39 0 0 0-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h3V3h-6z" />
          </svg>
        </div>

        <h1 className="auth-card__title">Добро пожаловать</h1>
        <p className="auth-card__subtitle">Войдите, чтобы слушать подкасты</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="login-email">Email</label>
            <input
              id="login-email"
              className="auth-form__input"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="login-password">Пароль</label>
            <input
              id="login-password"
              className="auth-form__input"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="auth-form__error">{error}</p>}

          <button className="auth-form__submit" type="submit" disabled={loading}>
            {loading ? <span className="auth-form__spinner" /> : "Войти"}
          </button>
        </form>

        <p className="auth-card__footer">
          Нет аккаунта?{" "}
          <Link className="auth-card__link" to="/register">
            Зарегистрироваться
          </Link>
        </p>

        <Link className="auth-card__back" to="/">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Вернуться к подкастам
        </Link>
      </div>
    </div>
  );
}
