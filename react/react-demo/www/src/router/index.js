import Home from '../components/home';
import About from '../components/about';
import Blog from '../components/blog';
import Empty from '../components/empty';


export default [
  { path: '/',
    component: Home,
    exact: true
  },
  { path: '/about',
    component: About
  },
  { path: '/blog',
    component: Blog
  },
  {
    component: Empty
  }
]