# Basic React Review
In this app, we are going to set up a Harry Potter characters list. We will be able to view, add to, and delete from a list of characters' names, houses, and pictures. (Maybe add in favoriting functionality)

## Setup
- open up your terminal and ```cd``` into the folder that you want to save your react app in
- run ```npx create-react-app [app-name]``` 
    - example: ```npx create-react-app harry-potter-app```
- once the command has finished running, ```cd``` into the project directory
    - example: ```cd harry-potter-app```
- run ```code .``` to open the project in VS Code
- in src/App.js, delete everything inside of the return parentheses and put a ```div``` tag with an ```h1``` inside, you can also delete the logo import line
    - example: 
    ```html
    <div>
        <h1>Harry Potter App</h1>
    </div>
    ```
- add a "Components" folder to your "src" folder
- open the VS code integrated terminal (ctrl+~) and run ```npm start``` to see your app in the browser

## Converting App.js into a Class Component
Since we want to be able to view a list of our characters, we are going to need to hold state somewhere. Because App.js is our main component, we are going to hold state here. To do this, we are going to convert App.js from a functional component into a class component.

- at the top of our App.js component, we will need to import Component from React, to do this we will use destructuring, and we can just add in some code to the line that's importing React. Your first line should look like this:
    ```js 
    import React, { Component } from 'react'
    ```
- now cut (cmd+x) the return statement with the JSX inside and delete the function App. Now we can remake this as a class by using the class keyword and extending Component. Every React class Component is required to have a render() method, so add that. Then you can paste the return inside of the render. Now your component should look like this: 
    ```js 
    import React, {Component} from 'react'
    import './App.css'

    class App extends Component {
    render() {
        return (
            <div>
                <h1>Harry Potter App</h1>
            </div>
            )
        }
    }

    export default App
    ```
- if you killed the ```npm start``` process, then start it again. if you didn't, then your app should look the same now as it did when App was a functional component

## Displaying Dummy Data
Now our App component is ready for state. We will need to write a constructor function and initialize state in that function. Our state is going to be an array of objects. For right now, we are just going to give the objects one key value pair -- name -- to keep track of characters' names. Then we'll map over that array and display each name. 

- Above the render, at the top of our App class, we are going to write a constructor function, inside that constructor, we will invoke the super function, and then we will initialize state as an object with one property, which we will call "characters" and whose value will be an array. Inside that array, put two objects each with one key value pair. One whose name is "Harry" and the other "Voldemort". Your constructor should look like this: 
```js
constructor() {
    super()

    this.state = {
        characters: [
            {
                name: 'Harry'
            },
            {
                name: 'Voldemort'
            }
        ]
    }
}
```
- Now we want to display these two names (and any others we might add) in our render. To do that, we are going to map over our array in state and return JSX from that map. Remember that renders can only return JSX and that maps return an array of the same length as the initial array, running the callback function we give them for each item in the initial array. Also note that we can escape the JSX using curly braces and that top parent node of JSX needs a unique "key" prop. For this project, we will use character names since those shouldn't repeat. Your render should look like this now: 
```js
  render() {
    let mappedChars = this.state.characters.map(char => {
      return (
        <div key={char.name}>
          <h2>{char.name}</h2>
        </div>
      )
    })

    return (
      <div>
        <h1>Harry Potter App</h1>
        <div>{mappedChars}</div>
      </div>
    )
  }
```
- Your app should now have both the title "Harry Potter App" and the two character names below that ("Harry" & "Voldemort")

## Adding More Info to Our Characters
Now that your app is displaying character names for us, let's make things a little more interesting by adding their houses and pictures. We are just going to need to add some properties to our character objects and add to the return of our map function so we can see the data we're adding.

- Add a "house" property to your characters whose value will be "gryffindor", "ravenclaw", "hufflepuff" or "slytherin". Add an image property whose value will be the URL of a picture of the character. Each character object in your array should now look like this: 
```js
{
    name: 'Harry',
    house: 'Gryffindor',
    image: 'data:image/jpeg/thingyougotwhenyouchose/copyimageaddress'
}
```
- Now let's get this info to display in our render -- we'll be adding it in the return of the callback we're passing to map. Above the ```<h2>``` tag, add an ```<img />``` tag. Image tags need two attributes: ```src``` and ```alt```. Give ```alt``` whatever string you like, something like 'profile' perhaps. As for the ```src```, we are going to use the URLs that we are storing on the character objects. How are we going to access JavaScript inside our JSX? By using curly braces! And how are we going to access the value of a property? Dot notation! (Also add a ```<p>``` tag for the house.) Now your mappedChars should look like this: 
```js
    let mappedChars = this.state.characters.map(char => {
      return (
        <div key={char.name}>
          <img src={char.image} alt='profile'/>
          <h2>{char.name}</h2>
          <p>{char.house}</p>
        </div>
      )
    })
```

## Creating a Reusable Card Component & Passing Data as Props
Let's make our code a little cleaner by making a component that will handle the display of each card. This is a typical practice in React -- making components to handle individual parts of the app makes things easier to manage when you have a big app. I know it sort of seems more complicated to separate things out when our apps are small, but it really will help in the future. 

- In the Components folder, make a folder called "Card", and inside that folder, make a file called "Card.js" and a file called "Card.css" -- once again this is just a preferred folder structure that might seem excessive but is actually very helpful.
- "Card.js" is just going to display data for us and won't need state, so we can write it as a functional component. The data it's displaying will be coming from "App.js" as props, so we do need to remember to include ```props``` as an argument for our function. Initially it will look like this: 
```js
import React from 'react'

function Card(props) {
    return (
        <div></div>
    )
}

export default Card
```
- Now let's actually copy over the code that we want from "App.js", which is in the return of the callback we passed to the map we ran on our array of characters in state. The only problem is that we are trying to reference "char" but our Card component doesn't know what that is unless we pass it the data using props. Let's just plan on using "char" still (we know we can call it that because we will be naming the props in "App.js"). So anywhere we have "char" in our return, we can just add "props." before it. Also, you can get rid of the "key" because we will be handling that in "App.js" still. The return of our Card component should look like this now: 
```js
    return (
        <div>
            <img src={props.char.image} alt='profile'/>
            <h2>{props.char.name}</h2>
            <p>{props.char.house}</p>
      </div>
    )
```
- And back in "App.js" we can import "Card.js" and pass it the "char" prop. 
    - import "Card.js": 
    ```js 
    import Card from './Components/Card/Card'
    ```
    - change the map callback return 
    ```js
    return (
        <Card char={char} key={char.name}/>
    )
    ```
- Now the app in the browser should look the same as it did before we added Card. 


## Adding Characters
Instead of making this in App and then moving it to a new component, let's just start in the new Component. So, in your Components folder, add a folder named "Adder" and then files inside that folder named "Adder.js" and "Adder.css". 

Adder will need to hold it's own state because it's where we are going to capture user inputs -- like typing. It will also need to receive props because App.js will hold the function that actually adds the character into our list. We will pass the function down to Adder, which can then invoke it passing in data that it's holding.

- import React and Component at the top and set up a class Component named Adder with a contructor that initializes state as an object with 3 key value pairs, "image", "name", and "house". Initially, the value of image and name should be empty strings, but house should be 'Gryffindor' because that's going to be the first option in our dropdown menu for the houses.  
- It should also have a render that has two inputs, a select, and a button. ```<select>``` tags create dropdown menus, they contain ```<option>``` tags with the names of the possible choices inside. For us, we are going to put the house names in there, so there should be 4 option tags inside your select. We can use dropdowns to make things more convenient for users, but also make sure that we are only receiving specific data back (whereas with a regular input box, people could type whatever they want). 
- The two inputs should have their type set to text, the first one should have a placeholder of name, the second should be imageURL. The button should say "add" on it. 
- Your code should look like this: 
```js
import React, { Component } from 'react'

class Adder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            image: '',
            name: '', 
            house: 'Gryffindor'
        }
    }

    render() {
        return (
            <div>
                <input type='text'/>
                <input type='text'/>
                <select>
                    <option>Gryffindor</option>
                    <option>Slytherin</option>
                    <option>Hufflepuff</option>
                    <option>Ravenclaw</option>
                </select>
                <button>add</button>
            </div>
        )
    }
}

export default Adder
```
- Now let's go import this into App.js so that we can see what we have made. (Import it at the top and render it on the line before the mappedChars). Now we can see it in the browser. And we can even type in the fields, select options from the dropdown, and press the button, but nothing is actually happening when we do this. It doesn't add the character yet. And we have no way to reference what the user has typed because we aren't storing their inputs on state yet. 
- So back in the Adder.js, we are going to make a changeHandler function, this will take care of setting the user inputs onto state. We are going to make what's called a "universal change handler" which basically just means it's very reuable and uses a lot of references. We will add this between the contructor and the render. And we will bind it to the Adder class in the contructor. It looks like this: 
```js
    // in the constructor 
    this.handleChange = this.handleChange.bind(this)

    //outside the constructor, above the render
    handleChange(e){
        let {value, name} = e.target
        this.setState({
            [name]: value
        })
    }
```
- And then we are going to add it as the function to be run in the event of an onChange to our inputs and select. You'll notice that the changeHandler is going to destructure "name" and "value" off of the event target. The value will be what the user inputs. But we need to give the ```input``` and ```<select>``` tags a name attribute that is equal to the name of their key on state. Our JSX will end up like this: 
```js
    return (
        <div>
            <input 
                type='text' 
                placeholder='name' 
                onChange={this.handleChange}
                name='name'/>
            <input 
                type='text' 
                placeholder='imageURL' 
                onChange={this.handleChange}
                name='image'/>
            <select 
                placeholder='house'
                onChange={this.handleChange}
                name='house'>
                <option>Gryffindor</option>
                <option>Slytherin</option>
                <option>Hufflepuff</option>
                <option>Ravenclaw</option>
            </select>
            <button>add</button>
        </div>
    )
```
- Back in App.js, we are going to make the function that will add a character into the array on state. Ideally, we would just be receiving an object into this function, and then just pushing that object onto the end of our array. So, let's write it that way. Add this function to App.js between the constructor and the render and don't forget to bind add in the contructor.
```js
  add(obj) {
    this.setState({
      characters: [...this.state.characters, obj]
    })
  }
```
