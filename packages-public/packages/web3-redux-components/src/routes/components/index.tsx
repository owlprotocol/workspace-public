import { Route } from '@tanstack/react-router'
import { rootRoute } from '../__root.js'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { Web3Redux } from '@owlprotocol/web3-redux'
import { Button } from '@chakra-ui/react'

export const componentsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'components',
})

export const componentsIndexRoute = new Route({
    getParentRoute: () => componentsRoute,
    path: '/',
    component: About2,
})

export const InitializeButton = () => {
    const dispatch = useDispatch()
    const onClick = useCallback(() => {
        dispatch(Web3Redux.actions.initialize(undefined))
    }, [])

    //@ts-expect-error
    return (<Button onClick={onClick}>Initialize</Button>);
}

export const componentsInitialize = new Route({
    getParentRoute: () => componentsRoute,
    path: 'initialize',
    component: InitializeButton,
})


export const componentsAll = componentsRoute.addChildren([
    componentsIndexRoute,
    componentsInitialize
])


function About2() {
    return <div>Hello from About !!!!!</div>
}
