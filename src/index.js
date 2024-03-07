import "./index.css"
import React from 'react';
import { render } from 'react-dom';
import timelineItems from './timelineItems';
import { TimeLine } from './components/TimeLine';

const App = () => (
  <div>
    <h2>Start editing to see some magic happen {'\u2728'}</h2>
    <h3>{timelineItems.length} timeline items to render</h3>
    <section>
      <center>
        <TimeLine/>
      </center>
    </section>
    <br />
    <section>
      <center>David Nuñez 2024</center>
    </section>
  </div>
);

render(<App />, document.getElementById('root'));
