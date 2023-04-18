import {describe, expect, test} from '@jest/globals';
import { RouteModel } from './route.model';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {  } from 'react-dom';
import { render } from '@testing-library/react';

const TestComponent:React.FC = () => {
    return(<h1>Route Model Test</h1>)
}

const route:RouteModel = {
    path:"/test",
    component:TestComponent
}

describe('route model test', () => {

    it('route model should be success', () => {
        const {container} = render(
            <MemoryRouter initialEntries={[route.path]}>
                <Routes>
                    <Route path={route.path} element={<route.component/>}/>
                </Routes>
            </MemoryRouter>
        )
        expect(container.innerHTML).toMatch("Route Model Test");
    });

    it('route model should be empty', () => {
        const {container} = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path={route.path} element={<route.component/>}/>
                </Routes>
            </MemoryRouter>
        )
        expect(container.innerHTML).toMatch("");
    });

});