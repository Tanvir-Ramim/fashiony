
import { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';

const LoaderRoute = ({children}) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
          setLoading(false);
        }, 2000);
    
        return () => clearTimeout(timeout);
      }, []);
    if (loading) {
        return <Loader></Loader>;
      }
      return children
};

export default LoaderRoute;