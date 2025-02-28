const AuthServer = {
  handleRequest: (method, url, data, callback) => {
      if (method === 'POST' && url === '/api/auth/register') {
          const { username, email, password } = JSON.parse(data);
          const users = Database.getUsers();
          
          if (users.some(user => user.username === username)) {
              callback({ status: 400, message: 'Username already exists' });
              return;
          }
          
          Database.addUser({ username, email, password });
          callback({ status: 201, message: 'User registered successfully' });
      } 
      else if (method === 'POST' && url === '/api/auth/login') {
          const { username, password } = JSON.parse(data);
          const users = Database.getUsers();
          
          const user = users.find(user => user.username === username && user.password === password);
          if (user) {
              callback({ status: 200, message: 'Login successful' });
          } else {
              callback({ status: 401, message: 'Invalid username or password' });
          }
      } 
      else {
          callback({ status: 400, message: 'Invalid request' });
      }
  }
};
