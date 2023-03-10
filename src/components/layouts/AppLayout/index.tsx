import React, {useEffect} from 'react';

interface Props {
    children: React.ReactNode,
    title: string
}

const AppLayout: React.FC<Props> = ({children, title}) => {
    useEffect(() => {
        document.title = title;
    },[])

    return (
        <div className='AppLayout'>
            {children}
        </div>
    );
};

export default AppLayout;