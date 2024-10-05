import { Route, Link,  } from 'wouter';
import About from '../pages/About'


const App = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello Kazi</h1>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </nav>
      {/* <Route path="/" component={Home} /> */}
       <Route path="/about" component={About} />
  
     
    </div>
  )
}

export default App