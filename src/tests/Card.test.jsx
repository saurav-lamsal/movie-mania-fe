import { getByText, render } from "@testing-library/react"
import Card from "../card/Card";

//Testing components render

const mockMovie ={
    id:1,
    content: 'this is a khatra movie',
    title:"Inception",
    // genre:'',
}

test('movie card rendering',()=>{
    render(<Card  title={mockMovie.title}/>);
    expect(screen.getByText('Inception').toBeInTheDocument())
})