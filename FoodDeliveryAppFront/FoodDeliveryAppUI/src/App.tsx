import { Button } from "./Components/Button/Button"

function App() {
  return (
    <>
      <section id="center">
        Turbo Feast
      </section>
      {/*Testing only; remove when used*/}
      <Button className="button button-orange" onClick={() => {
        fetch("https://dog.ceo/api/breeds/image/random")
          .then(res => console.log(res.body));
      }}>Button Orange</Button>
      <Button
        className="button button-white" onClick={() => { }}
        customStyle={{ margin: "10px" }}
      >Button White</Button>
      <Button
        className="button button-orange button-long"
        onClick={() => { }}
      >Button Long</Button>
    </>
  )
}

export default App
