function loginForm(msg?:string) {
  return /*html*/ `
    <div class="login-wrapper">
      <div class="login-card">
        <form action="/login" method="POST" class="card">
          <h2>Sign In</h2>
          ${msg ? `<span>${msg}</span>`:""}
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" required>
          </div>
    
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required>
          </div>
    
          <button type="submit" class="btn-primary">Log In</button>
        </form>
      </div>
    </div>
    `;
}
export {loginForm}