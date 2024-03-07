### Time Line Tool

This tool will display the list of Tasks from the timelineitems.js file into an responsive calendar tool with multiple rows.

- The tool allows to visualize the task data in form of color bars
- Edit the task text inline
- Show a menu with resize buttons on hover of task bars
- Resize the Tasks according to the calendar
- Zoom in, out and reset the View

I didn't use external libraries to generate the project, I implemented the task viewer tool using plain SVG with React
The state is handled using the Custom Hook useTimeLine.

## Installation and Execution

After uncompressing the zip file
cd TIMELINE PROJECT
npm install
npm run start
Open the Browser and go to
http://localhost:3000

- How long you spent on the assignment.
  I spent 3 hours
- What you like about your implementation.
  I like that I'm using SVG to create the User interface so it looks visually detailed. I like the random colors generation tool that I added and the animation at the beginning. I'm getting better at working with SVGs, I can create reactangles, circles, text, add animation which represents data.
- What you would change if you were going to do it again.
  Maybe I would use a global reducer and would dispatch actions to update and retrieve data from a central store
- How you made your design decisions. For example, if you looked at other timelines for inspiration, please note that.
  I have used this kind of roadmap creation tools in the past and I have always enjoyed the immediate hability to resize the tasks and fast editing. I saw a couple of vertical timelines which were also interesting for me, I think that implementation could work better in mobile screens which are more vertically used. But I went for the classic.
- How you would test this if you had more time.
  The React applications are tested most commonly using Jest and React Testing Library for the most part of the use cases. When the code includes components with high usability like drag and drop, recording, accelerometer interaction and test inputs from the Browser APIs, I would use Playwrigth or Cypress. I would make a combination of Jest with React Testing Library to make the unit tests and I would use Playwrigth for the integration test.

# About

This exercise was implemented by David Nuñez in 2024
