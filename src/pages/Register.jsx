export default function Register() {
  // Mock page: the form does nothing yet.
  // TODO: connect to Supabase auth (supabase.auth.signUp)
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="wrap section auth">
      <div className="auth-card">
        <aside className="auth-aside">
          <span className="eyebrow">JOIN TUNEZA</span>
          <h1 className="display">Your next instrument starts here.</h1>
          <ul className="auth-perks">
            <li>Post listings for your used gear</li>
            <li>Save favorites and track your orders</li>
            <li>Be first to see new drops and offers</li>
          </ul>
        </aside>

        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="display">Create account</h2>
          <p className="auth-sub">It only takes a minute.</p>

          <label className="field">
            <span>Full name</span>
            <input type="text" name="name" autoComplete="name" placeholder="Your name" required />
          </label>

          <label className="field">
            <span>Email</span>
            <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
          </label>

          <div className="field-row">
            <label className="field">
              <span>Password</span>
              <input type="password" name="password" autoComplete="new-password" placeholder="At least 8 characters" required />
            </label>
            <label className="field">
              <span>Confirm password</span>
              <input type="password" name="confirm" autoComplete="new-password" placeholder="Repeat password" required />
            </label>
          </div>

          <label className="check">
            <input type="checkbox" name="terms" required />
            <span>I agree to the <a href="#">Terms of use</a> and <a href="#">Privacy policy</a></span>
          </label>

          <button type="submit" className="btn btn-clay">Create account</button>

          <p className="auth-switch">Already have an account? <a href="#">Log in</a></p>
        </form>
      </div>
    </section>
  );
}