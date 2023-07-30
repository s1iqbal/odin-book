import {useContext} from 'react';
import { myContext } from './Context';
function HomePage() {
  const  ctx = useContext(myContext);
  console.log(ctx)
  return (
    <div>Home</div>
  )
}

export default HomePage