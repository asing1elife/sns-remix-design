import { useState } from 'react'
import ExplorePage from './social/ExplorePage'

type Page = 'explore';

function App() {
  const [currentPage] = useState<Page>('explore');

  if (currentPage === 'explore') {
    return <ExplorePage />;
  }
}

export default App;
