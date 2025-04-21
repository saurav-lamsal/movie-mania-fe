import { renderHook } from "@testing-library/react"
import useFetchMovies from "../services/fetchdata"

//mocking the fetch api
global.fetch = jest.function(()=>
    Promise.resolve({
        json: () => Promise.resolve({results:[{id: 1, title:"movie 1"}]})
    })
)

test('fetch moview',async()=>{
    const { result, waitForNextUpdate} = renderHook(()=>useFetchMovies()) 
    //renderHook: just like render, but for hooks
    
    //waitForNextUpdate : waits until hook updates during the async fetch call
    await waitForNextUpdate();

    expect(result.current.data.length).toBeGreaterThan(0)
    // result.current: gives you the current state of the hook

})