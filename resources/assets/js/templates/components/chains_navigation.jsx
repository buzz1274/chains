import React from 'react';

export default class ChainsNavigation extends React.Component {
    render() {
        return (
            <React.Fragment>
                <table className='table table-condensed table-hover runs'>
                    <thead>
                        <tr className='table_nav'>
                            <td colSpan='3'>
                                <div className='table_title'>Chains</div>
                                <i title='Chains'
                                    className='oi oi-plus pull-right' />
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>HELLO WORLD</td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}