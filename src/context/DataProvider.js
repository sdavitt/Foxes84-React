import { createContext, useState } from "react";

const DataProvider = props => {
    // declare state variables here
    // and then set them up as global context accessible by all children of the DataProvider
    const [cart, setCart] = useState({size: 0, total: 0, animals: {}});

    return (
        <DataContext.Provider value={{'cart': cart, 'setCart': setCart}}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;
export let DataContext = createContext();