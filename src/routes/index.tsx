import { createFileRoute } from '@tanstack/react-router';

import Header from './-components/Header';

import Input from './-pages/input/Input';

import './index.css';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  
    return (
        <section>
            <Header />
            <Input />
        </section>
    );
}
