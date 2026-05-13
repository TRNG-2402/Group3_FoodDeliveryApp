import { useState } from "react"
import { Button } from "./Components/Button/Button"
import { Input } from "./Components/Input/Input"

function App() {
  const [value, setValue] = useState("");
  return (
    <>
      <section id="center">
        Turbo Feast
      </section>
      {/*Testing only; remove when used*/}
      <Button className={"buttonMedium"}>Test Button</Button>
      <Input type={"Username"} setValue={setValue} customStyle={{ margin: "10px" }} />
      <Input type={"Password"} setValue={setValue} customStyle={{ margin: "10px" }} />
      <Input type={"Name"} setValue={setValue} customStyle={{ margin: "10px" }} />
      <Input type={"Email"} setValue={setValue} customStyle={{ margin: "10px" }} />
      <Input type={"Phone"} setValue={setValue} customStyle={{ margin: "10px" }} />
      <Input type={"Search"} setValue={setValue} customStyle={{ margin: "10px" }} />
      <>{value}</>
    </>
  )
}

export default App
