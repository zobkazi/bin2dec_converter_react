import { Route, Link,  } from 'wouter';
import About from '../pages/About'
import Home from '../pages/Home'
import Todos from '../pages/Todos'


const App = () => {
  return (
    <div className=''>

      <nav className='flex text-4xl gap-2 justify-center items-center'>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/todo">Todos</Link>
      </nav>
      <Route path="/" component={Home} />
       <Route path="/about" component={About} />
       <Route path="/todo" component={Todos} />
  
     
    </div>
  )
}

export default App