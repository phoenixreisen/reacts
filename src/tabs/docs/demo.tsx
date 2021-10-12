import { Tabs } from '../tabs.r';
import React from 'react';

export const Demo = () => {

    return (
        <Tabs tabs={['Tab I', 'Tab II', 'Tab III']}>
            <div className="pa3">Tab I</div>
            <div className="pa3">Tab II</div>
            <div className="pa3">Tab III</div>
        </Tabs>
    )
}

export default Demo;