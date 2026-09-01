import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || '';

const authService = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, user, token };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed',
      };
    }
  },

  // Register user
  register: async (email, password, name, role) => {
    try {
      const response = await axios.post(`${API_BASE}/api/auth/register`, {
        email,
        password,
        name,
        role,
      });
      return { success: true, userId: response.data.userId };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed',
      };
    }
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Check if user has permission
  hasPermission: (user, permission) => {
    const permissions = {
      'Super Admin': [
        'view_all',
        'manage_users',
        'manage_candidates',
        'manage_feedback',
        'manage_offers',
        'manage_salary',
        'manage_policies',
        'manage_onboarding',
        'manage_induction',
        'view_reports',
        'manage_communications',
      ],
      'HR Manager': [
        'view_candidates',
        'manage_offers',
        'manage_salary',
        'manage_policies',
        'manage_onboarding',
        'manage_induction',
        'view_feedback',
        'view_reports',
        'manage_communications',
      ],
      'Recruiter': [
        'view_candidates',
        'manage_candidates',
        'manage_feedback',
        'view_offers',
        'view_salary',
        'view_policies',
        'view_reports',
      ],
      'Interviewer': [
        'view_candidates',
        'view_feedback',
        'add_feedback_comments',
      ],
      'Candidate': [
        'view_own_profile',
        'view_offer',
        'acknowledge_policies',
        'view_communications',
      ],
    };

    const userPermissions = permissions[user?.role] || [];
    return userPermissions.includes(permission);
  },

  // Check if user can access module
  canAccessModule: (user, module) => {
    const moduleAccess = {
      'Super Admin': [
        'dashboard',
        'candidates',
        'feedback',
        'offers',
        'salary',
        'policies',
        'onboarding',
        'induction',
        'reports',
        'users',
        'communications',
      ],
      'HR Manager': [
        'dashboard',
        'candidates',
        'feedback',
        'offers',
        'salary',
        'policies',
        'onboarding',
        'induction',
        'reports',
        'communications',
      ],
      'Recruiter': [
        'dashboard',
        'candidates',
        'feedback',
        'offers',
        'reports',
      ],
      'Interviewer': [
        'dashboard',
        'feedback',
      ],
      'Candidate': [
        'my-profile',
        'my-offer',
        'my-policies',
        'my-communications',
      ],
    };

    const userModules = moduleAccess[user?.role] || [];
    return userModules.includes(module);
  },

  // Get user dashboard data
  getDashboardData: async (userId, role) => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/dashboard/${userId}?role=${role}`,
        {
          headers: { Authorization: `Bearer ${authService.getToken()}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return null;
    }
  },
};

export default authService;
