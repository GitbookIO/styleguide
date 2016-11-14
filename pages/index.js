import React from 'react';
const Page = require('./components/Page');
const Button = require('../src/Button');

export default () => {
    return (
        <Page title="Alerts" active="alerts">
            <button onClick={e => alert('Hello')}>Hello World</button>
            <Button onClick={e => alert('Hello')}>Hello World 2</Button>
        </Page>
    );
};
