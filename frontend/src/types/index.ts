export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'staff' | 'student';
} 